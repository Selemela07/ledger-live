import React, { Fragment } from "react";
import { Trans } from "react-i18next";
import { HeaderWrapper } from "~/renderer/components/TableContainer";
import { TableLine } from "~/renderer/families/elrond/blocks/Delegation";
import Delegation from "~/renderer/families/elrond/components/Delegations/components/Delegation";
import { DelegationType } from "~/renderer/families/elrond/types";
import {
  MultiversxProvider,
  MultiversxAccount as AccountType,
} from "@ledgerhq/live-common/families/elrond/types";

export interface Props {
  delegations: Array<DelegationType>;
  validators: Array<MultiversxProvider>;
  account: AccountType;
}
const Delegations = (props: Props) => {
  const { delegations, validators, account } = props;
  const columns = [
    "delegation.validator",
    "delegation.status",
    "delegation.delegated",
    "delegation.rewards",
  ];
  return (
    <Fragment>
      <HeaderWrapper>
        {columns.map(column => (
          <TableLine key={column}>
            <Trans i18nKey={column} />
          </TableLine>
        ))}
        <TableLine />
      </HeaderWrapper>

      {delegations.map(delegation => (
        <Delegation
          key={`delegation-${delegation.contract}`}
          delegations={delegations}
          validators={validators}
          account={account}
          {...delegation}
        />
      ))}
    </Fragment>
  );
};
export default Delegations;
