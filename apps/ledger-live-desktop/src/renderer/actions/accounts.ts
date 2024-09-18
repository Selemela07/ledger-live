import { Dispatch } from "redux";
import { Account, AccountUserData } from "@ledgerhq/types-live";
import { AccountComparator } from "@ledgerhq/live-wallet/ordering";
import { getKey } from "~/renderer/storage";
import { PasswordIncorrectError } from "@ledgerhq/errors";
import { getDefaultAccountName } from "@ledgerhq/live-wallet/accountName";

export const removeAccount = (payload: Account) => ({
  type: "DB:REMOVE_ACCOUNT",
  payload,
});

export const initAccounts = (data: [Account, AccountUserData][]) => {
  const accounts = data.map(([account]) => account);
  const accountsUserData = data
    .filter(([account, userData]) => userData.name !== getDefaultAccountName(account))
    .map(([, userData]) => userData);
  return {
    type: "INIT_ACCOUNTS",
    payload: {
      accounts,
      accountsUserData,
    },
  };
};

export const replaceAccounts = (accounts: Account[]) => ({
  type: "DB:REPLACE_ACCOUNTS",
  payload: accounts,
});

export const reorderAccounts = (comparator: AccountComparator) => (dispatch: Dispatch) =>
  dispatch({
    type: "DB:REORDER_ACCOUNTS",
    payload: { comparator },
  });

export const fetchAccounts = () => async (dispatch: Dispatch) => {
  const data = await getKey("app", "accounts", []);
  console.log({fetchAccountsdata: data})
  if (!data) throw new PasswordIncorrectError("app accounts seems to still be encrypted");
  return dispatch(initAccounts(data));
};

type UpdateAccountAction = {
  type: string;
  payload: { updater: (account: Account) => Account; accountId?: string };
};

export type UpdateAccountWithUpdater = (
  accountId: string,
  updater: (account: Account) => Account,
) => UpdateAccountAction;

export const updateAccountWithUpdater: UpdateAccountWithUpdater = (accountId, updater) => {
  console.log(`updateAccountWithUpdater`)
  return {
  type: "DB:UPDATE_ACCOUNT",
  payload: { accountId, updater },
  }
};

export type UpdateAccount = (account: Partial<Account>) => UpdateAccountAction;
export const updateAccount: UpdateAccount = payload => {
  console.log(`updateAccount`)

  return {
  type: "DB:UPDATE_ACCOUNT",
  payload: {
    updater: (account: Account) => ({ ...account, ...payload }),
    accountId: payload.id,
  },
}
};

export const cleanAccountsCache = () => ({ type: "DB:CLEAN_ACCOUNTS_CACHE" });
export const cleanFullNodeDisconnect = () => ({
  type: "DB:CLEAN_FULLNODE_DISCONNECT",
});
