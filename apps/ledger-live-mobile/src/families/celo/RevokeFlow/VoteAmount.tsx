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
import invariant from "invariant";
import { useTheme } from "@react-navigation/native";
import { getAccountBridge } from "@ledgerhq/live-common/bridge/index";
import { Transaction as CeloTransaction } from "@ledgerhq/live-common/families/celo/types";
import { accountScreenSelector, shallowAccountsSelector } from "~/reducers/accounts";
import { NavigatorName, ScreenName } from "~/const";
import { track, TrackScreen } from "~/analytics";
import LText from "~/components/LText";
import CurrencyUnitValue from "~/components/CurrencyUnitValue";
import Button from "~/components/Button";
import KeyboardView from "~/components/KeyboardView";
import CurrencyInput from "~/components/CurrencyInput";
import TranslatedError from "~/components/TranslatedError";
import SendRowsFee from "../SendRowsFee";
import { getFirstStatusError } from "../../helpers";
import type { BaseComposite, StackNavigatorProps } from "~/components/RootNavigator/types/helpers";
import { CeloRevokeFlowFlowParamList } from "./types";
import { useAccountUnit } from "~/hooks/useAccountUnit";
import { NotEnoughBalance } from "@ledgerhq/errors";
import { Alert, Text } from "@ledgerhq/native-ui";
import { StackNavigationProp } from "@react-navigation/stack";
import { getAccountCurrency, getParentAccount } from "@ledgerhq/live-common/account/index";
import { formatCurrencyUnit } from "@ledgerhq/live-common/currencies/index";
import { useSettings } from "~/hooks";

type Props = BaseComposite<
  StackNavigatorProps<CeloRevokeFlowFlowParamList, ScreenName.CeloRevokeAmount>
>;

export default function VoteAmount({ navigation, route }: Props) {
  const { locale } = useSettings();
  const { colors } = useTheme();
  const { account } = useSelector(accountScreenSelector(route));

  invariant(account?.type === "Account", "must be account");

  const [maxSpendable, setMaxSpendable] = useState(0);

  const bridge = getAccountBridge(account);

  const { transaction, setTransaction, status, bridgePending } = useBridgeTransaction(() => {
    return {
      account,
      transaction: {
        ...route.params.transaction,
        amount: new BigNumber(route.params.amount ?? 0),
        mode: "revoke",
        index: route.params.vote?.index,
      } as CeloTransaction,
    };
  });

  invariant(transaction, "transaction must be defined");

  useEffect(() => {
    let cancelled = false;
    bridge.estimateMaxSpendable({ account, transaction }).then(estimate => {
      if (cancelled) return;
      setMaxSpendable(estimate.toNumber());
    });

    return () => {
      cancelled = true;
    };
  }, [transaction, setMaxSpendable, bridge, account]);

  const onChange = (amount: BigNumber) => {
    setTransaction(bridge.updateTransaction(transaction, { amount }));
  };

  const toggleUseAllAmount = () => {
    setTransaction(
      bridge.updateTransaction(transaction, {
        useAllAmount: !transaction.useAllAmount,
      }),
    );
  };

  const onContinue = () => {
    navigation.navigate(ScreenName.CeloRevokeSummary, {
      ...route.params,
      amount: status.amount,
    });
  };

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

  const { useAllAmount } = transaction;
  const { amount } = status;
  const unit = useAccountUnit(account);
  const error = amount.eq(0) || bridgePending ? null : getFirstStatusError(status, "errors");
  const warning = getFirstStatusError(status, "warnings");
  const isRevoking = transaction.mode === "revoke";
  const isRevokingWithFeesError = isRevoking && error instanceof NotEnoughBalance;

  const errorMessage = {
    key: "errors.NotEnoughBalanceForUnstaking.noSwap",
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
  const accounts = useSelector(shallowAccountsSelector);
  const parentAccount = getParentAccount(account, accounts);

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
        category="CeloRevoke"
        name="Amount"
        flow="stake"
        action="revoke"
        currency="celo"
      />
      <SafeAreaView style={[styles.root, { backgroundColor: colors.background }]}>
        <KeyboardView style={styles.container}>
          <TouchableWithoutFeedback onPress={blur}>
            <View style={[styles.root, { backgroundColor: colors.background }]}>
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
                      color={error ? "alert" : warning ? "orange" : "grey"}
                    >
                      {unit.code}
                    </LText>
                  }
                  style={styles.inputContainer}
                  inputStyle={[
                    styles.inputStyle,
                    warning && { color: colors.orange },
                    error && { color: colors.alert },
                  ]}
                  hasError={!!error}
                  hasWarning={!!warning}
                />
                <LText
                  style={[styles.fieldStatus]}
                  color={error ? "alert" : warning ? "orange" : "darkBlue"}
                  numberOfLines={2}
                >
                  <TranslatedError error={error || warning} />
                </LText>
              </View>
              <View style={styles.bottomWrapper}>
                {isRevokingWithFeesError && (
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
                          linkDeposit: LinkText({ type: LinkEnum.Deposit }),
                        }}
                      />
                    </Text>
                  </Alert>
                )}
                <View style={styles.available}>
                  <View style={styles.availableLeft}>
                    <LText>
                      <Trans i18nKey="celo.revoke.flow.steps.amount.available" />
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
                        <Trans i18nKey="celo.revoke.flow.steps.amount.max" />
                      </LText>
                      <Switch
                        style={styles.switch}
                        value={useAllAmount}
                        onValueChange={toggleUseAllAmount}
                      />
                    </View>
                  ) : null}
                </View>
                <SendRowsFee
                  account={account}
                  transaction={transaction}
                  navigation={navigation}
                  route={route}
                />
                <View style={styles.continueWrapper}>
                  <Button
                    event="CeloVoteAmountContinue"
                    type="primary"
                    title={
                      <Trans
                        i18nKey={!bridgePending ? "common.continue" : "send.amount.loadingNetwork"}
                      />
                    }
                    onPress={onContinue}
                    disabled={!!status.errors.amount || bridgePending}
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
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
    flexShrink: 1,
    gap: 12,
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
