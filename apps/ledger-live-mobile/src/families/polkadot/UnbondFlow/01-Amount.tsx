import invariant from "invariant";
import { BigNumber } from "bignumber.js";
import useBridgeTransaction from "@ledgerhq/live-common/bridge/useBridgeTransaction";
import React, { useCallback, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Switch,
  Keyboard,
  SafeAreaView,
} from "react-native";
import { useSelector } from "react-redux";
import { Trans } from "react-i18next";
import { useTheme } from "@react-navigation/native";
import type { Transaction as PolkadotTransaction } from "@ledgerhq/live-common/families/polkadot/types";
import { useDebounce } from "@ledgerhq/live-common/hooks/useDebounce";
import { getAccountCurrency, getMainAccount } from "@ledgerhq/live-common/account/index";
import { getAccountBridge } from "@ledgerhq/live-common/bridge/index";
import { accountScreenSelector } from "~/reducers/accounts";
import { NavigatorName, ScreenName } from "~/const";
import { track, TrackScreen } from "~/analytics";
import LText from "~/components/LText";
import CurrencyUnitValue from "~/components/CurrencyUnitValue";
import Button from "~/components/Button";
import KeyboardView from "~/components/KeyboardView";
import CurrencyInput from "~/components/CurrencyInput";
import TranslatedError from "~/components/TranslatedError";
import { getFirstStatusError, hasStatusError } from "../../helpers";
import FlowErrorBottomModal from "../components/FlowErrorBottomModal";
import SendRowsFee from "../SendRowsFee";
import type { StackNavigatorProps } from "~/components/RootNavigator/types/helpers";
import { PolkadotUnbondFlowParamList } from "./type";
import { useMaybeAccountUnit } from "~/hooks/useAccountUnit";
import { NotEnoughBalance } from "@ledgerhq/errors";
import { StackNavigationProp } from "@react-navigation/stack";
import { Alert, Text } from "@ledgerhq/native-ui";
import { formatCurrencyUnit } from "@ledgerhq/live-common/currencies/index";
import { useSettings } from "~/hooks";

type Props = StackNavigatorProps<PolkadotUnbondFlowParamList, ScreenName.PolkadotUnbondAmount>;

export default function PolkadotUnbondAmount({ navigation, route }: Props) {
  const { colors } = useTheme();
  const { locale } = useSettings();
  const { account, parentAccount } = useSelector(accountScreenSelector(route));
  invariant(account, "account is required");
  const bridge = getAccountBridge(account, parentAccount);
  const mainAccount = getMainAccount(account, parentAccount);
  const [maxSpendable, setMaxSpendable] = useState<BigNumber | null>(null);
  const { transaction, setTransaction, status, bridgePending, bridgeError } = useBridgeTransaction(
    () => {
      const t = bridge.createTransaction(mainAccount);
      const transaction = bridge.updateTransaction(t, {
        mode: "unbond",
      });
      return {
        account: mainAccount,
        transaction,
      };
    },
  );
  const debouncedTransaction = useDebounce(transaction, 500);
  useEffect(() => {
    if (!account) return;
    let cancelled = false;
    getAccountBridge(account, parentAccount)
      .estimateMaxSpendable({
        account,
        parentAccount,
        transaction: debouncedTransaction,
      })
      .then(estimate => {
        if (cancelled) return;
        setMaxSpendable(estimate);
      });
    // eslint-disable-next-line consistent-return
    return () => {
      cancelled = true;
    };
  }, [account, parentAccount, debouncedTransaction]);
  const onChange = useCallback(
    (amount: BigNumber) => {
      if (!amount.isNaN()) {
        setTransaction(
          bridge.updateTransaction(transaction, {
            amount,
          }),
        );
      }
    },
    [setTransaction, transaction, bridge],
  );
  const toggleUseAllAmount = useCallback(() => {
    const bridge = getAccountBridge(account, parentAccount);
    if (!transaction) return;
    setTransaction(
      bridge.updateTransaction(transaction, {
        amount: BigNumber(0),
        useAllAmount: !transaction.useAllAmount,
      }),
    );
  }, [setTransaction, account, parentAccount, transaction]);
  const onContinue = useCallback(() => {
    navigation.navigate(ScreenName.PolkadotUnbondSelectDevice, {
      accountId: account.id,
      transaction: transaction as PolkadotTransaction,
      status,
    });
  }, [account, navigation, transaction, status]);
  const onNavigate = useCallback(
    (name: string, options?: object) => {
      (navigation as StackNavigationProp<{ [key: string]: object | undefined }>).navigate(
        name,
        options,
      );
    },
    [navigation],
  );
  const blur = useCallback(() => Keyboard.dismiss(), []);
  const unit = useMaybeAccountUnit(account);
  if (!account || !transaction || !unit) return null;
  const { useAllAmount } = transaction;
  const { amount } = status;
  const error = amount.eq(0) || bridgePending ? null : getFirstStatusError(status, "errors");
  const warning = getFirstStatusError(status, "warnings");
  const hasErrors = hasStatusError(status);

  const isUnbonding = transaction.mode === "unbond";
  const hasErrorDuringUnbonding = error instanceof NotEnoughBalance && isUnbonding;

  const errorMessage = {
    key: `errors.NotEnoughBalanceForUnstaking.global`,
    values: {
      currentBalance: formatCurrencyUnit(unit, account.spendableBalance, {
        showCode: true,
        locale: locale,
      }),
      assetName: unit.code,
    },
  };

  enum LinkEnum {
    Buy = "Buy",
    Swap = "Swap",
    Deposit = "Deposit",
  }

  type linkType = keyof typeof LinkEnum;

  const currency = getAccountCurrency(account);

  const trackLinkPress = (type: linkType) => {
    track("button_clicked", {
      button: type,
      asset: currency.name,
    });
  };

  const onLinkPress = (type: linkType) => {
    trackLinkPress(type);
    if (type === LinkEnum.Buy) {
      onNavigate(NavigatorName.Exchange, {
        screen: ScreenName.ExchangeBuy,
        params: { defaultCurrencyId: currency?.id },
      });
    }
    if (type === LinkEnum.Swap) {
      onNavigate(NavigatorName.Swap, {
        screen: ScreenName.SwapTab,
        params: { currency },
      });
    }
    if (type === LinkEnum.Deposit) {
      onNavigate(NavigatorName.ReceiveFunds, {
        screen: ScreenName.ReceiveConfirmation,
        params: { accountId: account.id, parentId: parentAccount?.id, currency },
      });
    }
  };

  const LinkText = ({ type }: { type: linkType }) => {
    return (
      <Text
        variant="bodyLineHeight"
        fontWeight="bold"
        style={{ textDecorationLine: "underline" }}
        fontSize={14}
        onPress={() => onLinkPress(type)}
      />
    );
  };

  return (
    <>
      <TrackScreen
        category="UnbondFlow"
        name="Amount"
        flow="stake"
        action="withdraw_unbonded"
        currency="dot"
      />
      <SafeAreaView
        style={[
          styles.root,
          {
            backgroundColor: colors.background,
          },
        ]}
      >
        <KeyboardView style={styles.container}>
          <TouchableWithoutFeedback onPress={blur}>
            <View style={styles.root}>
              <View style={styles.wrapper}>
                <CurrencyInput
                  editable={!useAllAmount}
                  isActive
                  onChange={onChange}
                  unit={unit}
                  value={amount}
                  renderRight={
                    <LText
                      semiBold
                      style={[styles.currency]}
                      color={warning ? "orange" : error ? "alert" : "grey"}
                    >
                      {unit.code}
                    </LText>
                  }
                  style={styles.inputContainer}
                  inputStyle={[
                    styles.inputStyle,
                    warning && {
                      color: colors.orange,
                    },
                    error && {
                      color: colors.alert,
                    },
                  ]}
                  hasError={!!error}
                  hasWarning={!!warning}
                />
                <LText
                  style={[styles.fieldStatus]}
                  color={warning ? "orange" : error ? "alert" : "darkBlue"}
                  numberOfLines={2}
                >
                  <TranslatedError error={error || warning} />
                </LText>
              </View>
              <View style={styles.bottomWrapper}>
                {hasErrorDuringUnbonding && (
                  <Alert type="error">
                    <Text
                      textBreakStrategy="balanced"
                      variant="bodyLineHeight"
                      fontSize={14}
                      flex={1}
                    >
                      <Trans
                        i18nKey={errorMessage.key}
                        values={errorMessage.values}
                        components={{
                          linkBuy: LinkText({ type: LinkEnum.Buy }),
                          linkSwap: LinkText({ type: LinkEnum.Swap }),
                          linkDeposit: LinkText({ type: LinkEnum.Deposit }),
                        }}
                      />
                    </Text>
                  </Alert>
                )}
                <View style={styles.available}>
                  <View style={styles.availableLeft}>
                    <LText>
                      <Trans i18nKey="polkadot.unbond.steps.amount.availableLabel" />
                    </LText>
                    <LText semiBold>
                      {maxSpendable ? (
                        <CurrencyUnitValue showCode unit={unit} value={maxSpendable} />
                      ) : (
                        "-"
                      )}
                    </LText>
                  </View>
                  {typeof useAllAmount === "boolean" ? (
                    <View style={styles.availableRight}>
                      <LText style={styles.maxLabel}>
                        <Trans i18nKey="polkadot.unbond.steps.amount.maxLabel" />
                      </LText>
                      <Switch
                        style={styles.switch}
                        value={useAllAmount}
                        onValueChange={toggleUseAllAmount}
                      />
                    </View>
                  ) : null}
                </View>
                <SendRowsFee account={account} transaction={transaction as PolkadotTransaction} />
                <View style={styles.continueWrapper}>
                  <Button
                    event="PolkadotUnbondAmountContinue"
                    type="primary"
                    title={
                      <Trans
                        i18nKey={!bridgePending ? "common.continue" : "send.amount.loadingNetwork"}
                      />
                    }
                    onPress={onContinue}
                    disabled={!!hasErrors || bridgePending}
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardView>
      </SafeAreaView>
      {!hasErrorDuringUnbonding && (
        <FlowErrorBottomModal
          navigation={navigation}
          transaction={transaction as PolkadotTransaction}
          account={account}
          parentAccount={parentAccount}
          setTransaction={setTransaction}
          bridgeError={bridgeError}
        />
      )}
    </>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  topContainer: {
    paddingHorizontal: 32,
    flexShrink: 1,
  },
  container: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 16,
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
  available: {
    flexDirection: "row",
    display: "flex",
    flexGrow: 1,
  },
  availableRight: {
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  availableLeft: {
    justifyContent: "center",
    flexGrow: 1,
  },
  maxLabel: {
    marginRight: 4,
  },
  bottomWrapper: {
    flexGrow: 0,
    alignItems: "stretch",
    justifyContent: "flex-end",
    gap: 12,
    flexShrink: 1,
  },
  continueWrapper: {
    alignSelf: "stretch",
    alignItems: "stretch",
    justifyContent: "flex-end",
    paddingBottom: 16,
  },
  wrapper: {
    flexGrow: 1,
    flexShrink: 1,
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
  },
  inputContainer: {
    flexBasis: 75,
  },
  inputStyle: {
    flex: 0,
    flexShrink: 1,
    textAlign: "center",
  },
  currency: {
    fontSize: 32,
  },
  fieldStatus: {
    fontSize: 14,
    textAlign: "center",
  },
  switch: {
    opacity: 0.99,
  },
});
