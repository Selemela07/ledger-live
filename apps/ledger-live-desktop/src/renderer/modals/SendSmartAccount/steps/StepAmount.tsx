import React, { Fragment, PureComponent, useMemo } from "react";
import invariant from "invariant";
import { ProtoNFT } from "@ledgerhq/types-live";
import { getNFT } from "@ledgerhq/live-nft";
import { Trans } from "react-i18next";
import { getMainAccount } from "@ledgerhq/live-common/account/index";
import TrackPage from "~/renderer/analytics/TrackPage";
import Box from "~/renderer/components/Box";
import Button from "~/renderer/components/Button";
import CurrencyDownStatusAlert from "~/renderer/components/CurrencyDownStatusAlert";
import ErrorBanner from "~/renderer/components/ErrorBanner";
import SpendableBanner from "~/renderer/components/SpendableBanner";
import BuyButton from "~/renderer/components/BuyButton";
import Label from "~/renderer/components/Label";
import Input from "~/renderer/components/Input";
import { useSelector } from "react-redux";
import { getAllNFTs } from "~/renderer/reducers/accounts";
import AccountFooter from "../AccountFooter";
import styled from "styled-components";
import Alert from "~/renderer/components/Alert";

// FormattedVal is a div, we want to avoid having it on a second line
const TextContent = styled.div`
  font-weight: bold;
  text-align: center;
`;
import AmountField from "../fields/AmountField";
import { StepProps } from "../types";
import { getLLDCoinFamily } from "~/renderer/families";

const StepAmount = (props: StepProps) => {
  const {
    t,
    account,
    parentAccount,
    transaction,
    onChangeTransaction,
    onChangeQuantities,
    error,
    status,
    bridgePending,
    maybeAmount,
    onResetMaybeAmount,
    updateTransaction,
    currencyName,
    isNFTSend,
    walletConnectProxy,
  } = props;
  invariant(transaction, "transaction required");
  invariant(account, "account required");

  const mainAccount = getMainAccount(account, parentAccount);
  invariant(mainAccount, "main account required");

  const specific = getLLDCoinFamily(transaction.family);
  const allNfts = useSelector(getAllNFTs) as ProtoNFT[]; // filter(Boolean) not working because: typescript.
  const nft = useMemo(() => {
    const { contract, tokenId } = specific.nft?.getNftTransactionProperties(transaction) || {};

    return getNFT(contract, tokenId, allNfts);
  }, [allNfts, specific.nft, transaction]);

  const nftQuantity = useMemo(() => {
    const { quantity } = specific.nft?.getNftTransactionProperties(transaction) || {};

    return quantity?.toFixed();
  }, [specific.nft, transaction]);

  if (!status) return null;

  return (
    <Box flow={4}>
      <TrackPage
        category="Send Flow"
        name="Step Amount"
        currencyName={currencyName}
        isNFTSend={isNFTSend}
        walletConnectSend={walletConnectProxy}
      />
      <CurrencyDownStatusAlert currencies={[mainAccount.currency]} />
      {error ? <ErrorBanner error={error} /> : null}
      <Fragment key={account.id}>
        {!isNFTSend ? (
          <SpendableBanner
            account={account}
            parentAccount={parentAccount}
            transaction={transaction}
          />
        ) : null}
        {isNFTSend ? (
          nft?.standard === "ERC1155" ? (
            <Box mb={2}>
              <Label>{t("send.steps.amount.nftQuantity")}</Label>
              <Input
                value={nftQuantity}
                onChange={onChangeQuantities}
                error={status?.errors?.amount}
              />
            </Box>
          ) : null
        ) : (
          <AmountField
            status={status}
            account={account}
            parentAccount={parentAccount}
            transaction={transaction}
            onChangeTransaction={onChangeTransaction}
            bridgePending={bridgePending}
            walletConnectProxy={walletConnectProxy}
            t={t}
            initValue={maybeAmount}
            resetInitValue={onResetMaybeAmount}
          />
        )}
        <Alert type="primary" noIcon>
          <TextContent>✨ Your gas fees are sponsored for this transaction ✨</TextContent>
        </Alert>
      </Fragment>
    </Box>
  );
};
export class StepAmountFooter extends PureComponent<StepProps> {
  onNext = async () => {
    const { transitionTo } = this.props;
    transitionTo("summary");
  };

  render() {
    const { account, parentAccount, status, bridgePending, isNFTSend } = this.props;
    const { errors } = status;
    if (!account) return null;
    const mainAccount = getMainAccount(account, parentAccount);
    const isTerminated = mainAccount.currency.terminated;
    const hasErrors = Object.keys(errors).length;
    const canNext = !bridgePending && !hasErrors && !isTerminated;
    const { maxPriorityFee: maxPriorityFeeError, maxFee: maxFeeError } = errors;

    return (
      <>
        {!isNFTSend ? (
          <AccountFooter parentAccount={parentAccount} account={account} status={status} />
        ) : null}
        {maxPriorityFeeError || maxFeeError ? (
          <BuyButton currency={mainAccount.currency} account={mainAccount} />
        ) : null}
        <Button
          id={"send-amount-continue-button"}
          isLoading={bridgePending}
          primary
          disabled={false}
          onClick={this.onNext}
        >
          <Trans i18nKey="common.continue" />
        </Button>
      </>
    );
  }
}

export default StepAmount;
