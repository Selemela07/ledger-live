import { ConfigInfo } from "@ledgerhq/live-config/LiveConfig";
import { getEnv } from "@ledgerhq/live-env";

export const tezosConfig: Record<string, ConfigInfo> = {
  config_currency_tezos: {
    type: "object",
    default: {
      status: {
        type: "active",
      },
      baker: {
        url: getEnv("API_TEZOS_BAKER"),
      },
      explorer: {
        url: getEnv("API_TEZOS_TZKT_API"),
        maxTxQuery: getEnv("TEZOS_MAX_TX_QUERIES"),
      },
      node: {
        url: getEnv("API_TEZOS_NODE"),
      },
      fees: {
        minGasLimit: 600,
        minRevealGasLimit: 300,
        minStorageLimit: 0,
        minFees: 500,
        minEstimatedFees: 500,
      },
    },
  },
};
