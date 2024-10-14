import { DeviceLabels } from "./DeviceLabels";

export class AppInfos {
  constructor(
    public readonly name: string,
    public readonly sendPattern?: Partial<{ [key in DeviceLabels]: string }>,
    public readonly receivePattern?: DeviceLabels[],
    public readonly delegatePattern?: DeviceLabels[],
  ) {}

  getValue(label: DeviceLabels): string | undefined {
    return this.sendPattern?.[label] || "";
  }

  static readonly BITCOIN = new AppInfos(
    "Bitcoin",
    /*[
      DeviceLabels.AMOUNT,
      DeviceLabels.ADDRESS,
      DeviceLabels.CONTINUE,
      DeviceLabels.REJECT,
      DeviceLabels.SIGN,
    ],*/

    {
      [DeviceLabels.AMOUNT]: DeviceLabels.AMOUNT.valueOf(),
      [DeviceLabels.ADDRESS]: DeviceLabels.ADDRESS.valueOf(),
      [DeviceLabels.CONTINUE]: DeviceLabels.CONTINUE.valueOf(),
      [DeviceLabels.REJECT]: DeviceLabels.REJECT.valueOf(),
      [DeviceLabels.SIGN]: DeviceLabels.SIGN.valueOf(),
    },
    [DeviceLabels.ADDRESS, DeviceLabels.APPROVE, DeviceLabels.REJECT],
  );
  static readonly BITCOIN_TESTNET = new AppInfos(
    "Bitcoin Test",
    {
      [DeviceLabels.AMOUNT]: DeviceLabels.AMOUNT.valueOf(),
      [DeviceLabels.ADDRESS]: DeviceLabels.ADDRESS.valueOf(),
      [DeviceLabels.CONTINUE]: DeviceLabels.CONTINUE.valueOf(),
      [DeviceLabels.REJECT]: DeviceLabels.REJECT.valueOf(),
      [DeviceLabels.SIGN]: DeviceLabels.SIGN.valueOf(),
    },
    [DeviceLabels.ADDRESS, DeviceLabels.APPROVE, DeviceLabels.REJECT],
  );
  static readonly DOGECOIN = new AppInfos(
    "Dogecoin",
    //[DeviceLabels.AMOUNT, DeviceLabels.ADDRESS, DeviceLabels.ACCEPT, DeviceLabels.REJECT],
    {
      [DeviceLabels.AMOUNT]: DeviceLabels.AMOUNT.valueOf(),
      [DeviceLabels.ADDRESS]: DeviceLabels.ADDRESS.valueOf(),
      [DeviceLabels.ACCEPT]: DeviceLabels.ACCEPT.valueOf(),
      [DeviceLabels.REJECT]: DeviceLabels.REJECT.valueOf(),
    },
    [DeviceLabels.ADDRESS, DeviceLabels.APPROVE, DeviceLabels.REJECT],
  );
  static readonly ETHEREUM = new AppInfos(
    "Ethereum",
    {
      [DeviceLabels.AMOUNT]: DeviceLabels.AMOUNT.valueOf(),
      [DeviceLabels.TO]: DeviceLabels.TO.valueOf(),
      [DeviceLabels.ACCEPT]: DeviceLabels.ACCEPT.valueOf(),
      [DeviceLabels.REJECT]: DeviceLabels.REJECT.valueOf(),
    },
    //[DeviceLabels.AMOUNT, DeviceLabels.TO, DeviceLabels.ACCEPT, DeviceLabels.REJECT],
    [DeviceLabels.ADDRESS, DeviceLabels.APPROVE, DeviceLabels.REJECT],
  );
  static readonly ETHEREUM_HOLESKY = new AppInfos(
    "Ethereum Holesky",
    //[DeviceLabels.AMOUNT, DeviceLabels.TO, DeviceLabels.ACCEPT, DeviceLabels.REJECT],
    {
      [DeviceLabels.AMOUNT]: DeviceLabels.AMOUNT.valueOf(),
      [DeviceLabels.TO]: DeviceLabels.TO.valueOf(),
      [DeviceLabels.ACCEPT]: DeviceLabels.ACCEPT.valueOf(),
      [DeviceLabels.REJECT]: DeviceLabels.REJECT.valueOf(),
    },
    [DeviceLabels.ADDRESS, DeviceLabels.APPROVE, DeviceLabels.REJECT],
  );
  static readonly ETHEREUM_SEPOLIA = new AppInfos(
    "Ethereum Sepolia",
    {
      [DeviceLabels.AMOUNT]: DeviceLabels.AMOUNT.valueOf(),
      [DeviceLabels.TO]: DeviceLabels.TO.valueOf(),
      [DeviceLabels.ACCEPT]: DeviceLabels.ACCEPT.valueOf(),
      [DeviceLabels.REJECT]: DeviceLabels.REJECT.valueOf(),
    },
    [DeviceLabels.ADDRESS, DeviceLabels.APPROVE, DeviceLabels.REJECT],
  );
  static readonly ETHEREUM_CLASSIC = new AppInfos(
    "Ethereum Classic",
    {
      [DeviceLabels.AMOUNT]: DeviceLabels.AMOUNT.valueOf(),
      [DeviceLabels.TO]: DeviceLabels.TO.valueOf(),
      [DeviceLabels.ACCEPT]: DeviceLabels.ACCEPT.valueOf(),
      [DeviceLabels.REJECT]: DeviceLabels.REJECT.valueOf(),
    },
    [DeviceLabels.ADDRESS, DeviceLabels.APPROVE, DeviceLabels.REJECT],
  );
  static readonly SOLANA = new AppInfos(
    "Solana",
    {
      [DeviceLabels.TRANSFER]: DeviceLabels.TRANSFER.valueOf(),
      [DeviceLabels.RECIPIENT]: DeviceLabels.RECIPIENT.valueOf(),
      [DeviceLabels.APPROVE]: DeviceLabels.APPROVE.valueOf(),
      [DeviceLabels.REJECT]: DeviceLabels.REJECT.valueOf(),
    },
    //[DeviceLabels.TRANSFER, DeviceLabels.RECIPIENT, DeviceLabels.APPROVE, DeviceLabels.REJECT],
    [DeviceLabels.PUBKEY, DeviceLabels.APPROVE, DeviceLabels.REJECT],
    [DeviceLabels.DELEGATE_FROM, DeviceLabels.DEPOSIT, DeviceLabels.APPROVE, DeviceLabels.REJECT],
  );
  static readonly POLKADOT = new AppInfos(
    "Polkadot",
    {
      [DeviceLabels.DEST]: DeviceLabels.DEST.valueOf(),
      [DeviceLabels.AMOUNT]: DeviceLabels.AMOUNT.valueOf(),
      [DeviceLabels.APPROVE]: DeviceLabels.APPROVE.valueOf(),
      [DeviceLabels.REJECT]: DeviceLabels.REJECT.valueOf(),
    },
    //[DeviceLabels.DEST, DeviceLabels.AMOUNT, DeviceLabels.CAPS_APPROVE, DeviceLabels.CAPS_REJECT],
    [DeviceLabels.ADDRESS, DeviceLabels.CAPS_APPROVE, DeviceLabels.CAPS_REJECT],
  );
  static readonly TRON = new AppInfos(
    "Tron",
    {
      [DeviceLabels.AMOUNT]: DeviceLabels.AMOUNT.valueOf(),
      [DeviceLabels.TO]: DeviceLabels.TO.valueOf(),
      [DeviceLabels.SIGN]: DeviceLabels.SIGN.valueOf(),
      [DeviceLabels.CANCEL]: DeviceLabels.CANCEL.valueOf(),
    },
    //[DeviceLabels.AMOUNT, DeviceLabels.TO, DeviceLabels.SIGN, DeviceLabels.CANCEL],
    [DeviceLabels.ADDRESS, DeviceLabels.APPROVE, DeviceLabels.CANCEL],
  );
  static readonly RIPPLE = new AppInfos(
    "Ripple",
    {
      [DeviceLabels.AMOUNT]: DeviceLabels.AMOUNT.valueOf(),
      [DeviceLabels.DESTINATION]: DeviceLabels.DESTINATION.valueOf(),
      [DeviceLabels.SIGN]: DeviceLabels.SIGN.valueOf(),
      [DeviceLabels.REJECT]: DeviceLabels.REJECT.valueOf(),
    },
    //[DeviceLabels.AMOUNT, DeviceLabels.DESTINATION, DeviceLabels.SIGN, DeviceLabels.REJECT],
    [DeviceLabels.ADDRESS, DeviceLabels.APPROVE, DeviceLabels.REJECT],
  );
  static readonly CARDANO = new AppInfos(
    "Cardano",
    {
      [DeviceLabels.SEND]: DeviceLabels.SEND.valueOf(),
      [DeviceLabels.SEND_TO_ADDRESS]: DeviceLabels.SEND_TO_ADDRESS.valueOf(),
      [DeviceLabels.APPROVE]: DeviceLabels.APPROVE.valueOf(),
      [DeviceLabels.REJECT]: DeviceLabels.REJECT.valueOf(),
    },
    //[DeviceLabels.SEND, DeviceLabels.SEND_TO_ADDRESS, DeviceLabels.APPROVE, DeviceLabels.REJECT],
    [DeviceLabels.ADDRESS, DeviceLabels.CONFIRM, DeviceLabels.REJECT],
  );
  static readonly STELLAR = new AppInfos(
    "Stellar",
    {
      [DeviceLabels.SEND]: DeviceLabels.SEND.valueOf(),
      [DeviceLabels.DESTINATION]: DeviceLabels.DESTINATION.valueOf(),
      [DeviceLabels.FINALIZE]: DeviceLabels.FINALIZE.valueOf(),
      [DeviceLabels.CANCEL]: DeviceLabels.CANCEL.valueOf(),
    },
    //[DeviceLabels.SEND, DeviceLabels.DESTINATION, DeviceLabels.FINALIZE, DeviceLabels.CANCEL],
    [DeviceLabels.ADDRESS, DeviceLabels.APPROVE, DeviceLabels.REJECT],
  );
  static readonly BITCOIN_CASH = new AppInfos(
    "Bitcoin Cash",
    {
      [DeviceLabels.AMOUNT]: DeviceLabels.AMOUNT.valueOf(),
      [DeviceLabels.ADDRESS]: DeviceLabels.ADDRESS.valueOf(),
      [DeviceLabels.ACCEPT]: DeviceLabels.ACCEPT.valueOf(),
      [DeviceLabels.REJECT]: DeviceLabels.REJECT.valueOf(),
    },
    //[DeviceLabels.AMOUNT, DeviceLabels.ADDRESS, DeviceLabels.ACCEPT, DeviceLabels.REJECT],
    [DeviceLabels.ADDRESS, DeviceLabels.APPROVE, DeviceLabels.REJECT],
  );
  static readonly ALGORAND = new AppInfos(
    "Algorand",
    {
      [DeviceLabels.AMOUNT]: DeviceLabels.AMOUNT.valueOf(),
      [DeviceLabels.RECEIVER]: DeviceLabels.RECEIVER.valueOf(),
      [DeviceLabels.CAPS_APPROVE]: DeviceLabels.CAPS_APPROVE.valueOf(),
      [DeviceLabels.CAPS_REJECT]: DeviceLabels.CAPS_REJECT.valueOf(),
    },
    /*[
      DeviceLabels.AMOUNT,
      DeviceLabels.RECEIVER,
      DeviceLabels.CAPS_APPROVE,
      DeviceLabels.CAPS_REJECT,
    ],*/
    [DeviceLabels.ADDRESS, DeviceLabels.CAPS_APPROVE, DeviceLabels.CAPS_REJECT],
  );
  static readonly COSMOS = new AppInfos(
    "Cosmos",
    {
      [DeviceLabels.AMOUNT]: DeviceLabels.AMOUNT.valueOf(),
      [DeviceLabels.TO]: DeviceLabels.TO.valueOf(),
      [DeviceLabels.CAPS_APPROVE]: DeviceLabels.CAPS_APPROVE.valueOf(),
      [DeviceLabels.CAPS_REJECT]: DeviceLabels.CAPS_REJECT.valueOf(),
    },
    //[DeviceLabels.AMOUNT, DeviceLabels.TO, DeviceLabels.CAPS_APPROVE, DeviceLabels.CAPS_REJECT],
    [DeviceLabels.ADDRESS, DeviceLabels.CAPS_APPROVE, DeviceLabels.CAPS_REJECT],
    [
      DeviceLabels.PLEASE_REVIEW,
      DeviceLabels.AMOUNT,
      DeviceLabels.CAPS_APPROVE,
      DeviceLabels.CAPS_REJECT,
    ],
  );
  static readonly TEZOS = new AppInfos(
    "Tezos",
    {
      [DeviceLabels.AMOUNT]: DeviceLabels.AMOUNT.valueOf(),
      [DeviceLabels.DESTINATION]: DeviceLabels.DESTINATION.valueOf(),
      [DeviceLabels.ACCEPT]: DeviceLabels.ACCEPT.valueOf(),
      [DeviceLabels.REJECT]: DeviceLabels.REJECT.valueOf(),
    },
    //[DeviceLabels.AMOUNT, DeviceLabels.DESTINATION, DeviceLabels.ACCEPT, DeviceLabels.REJECT],
    [DeviceLabels.ADDRESS, DeviceLabels.APPROVE, DeviceLabels.REJECT],
  );
  static readonly POLYGON = new AppInfos(
    "Polygon",
    {
      [DeviceLabels.AMOUNT]: DeviceLabels.AMOUNT.valueOf(),
      [DeviceLabels.ADDRESS]: DeviceLabels.ADDRESS.valueOf(),
      [DeviceLabels.ACCEPT]: DeviceLabels.ACCEPT.valueOf(),
      [DeviceLabels.REJECT]: DeviceLabels.REJECT.valueOf(),
    },
    // [DeviceLabels.AMOUNT, DeviceLabels.ADDRESS, DeviceLabels.ACCEPT, DeviceLabels.REJECT],
    [DeviceLabels.ADDRESS, DeviceLabels.APPROVE, DeviceLabels.REJECT],
  );
  static readonly BINANCE_SMART_CHAIN = new AppInfos(
    "Binance Smart Chain",
    {
      [DeviceLabels.AMOUNT]: DeviceLabels.AMOUNT.valueOf(),
      [DeviceLabels.ADDRESS]: DeviceLabels.ADDRESS.valueOf(),
      [DeviceLabels.ACCEPT]: DeviceLabels.ACCEPT.valueOf(),
      [DeviceLabels.REJECT]: DeviceLabels.REJECT.valueOf(),
    },
    //[DeviceLabels.AMOUNT, DeviceLabels.ADDRESS, DeviceLabels.ACCEPT, DeviceLabels.REJECT],
    [DeviceLabels.ADDRESS, DeviceLabels.APPROVE, DeviceLabels.REJECT],
  );
  static readonly TON = new AppInfos(
    "Ton",
    {
      [DeviceLabels.AMOUNT]: DeviceLabels.AMOUNT.valueOf(),
      [DeviceLabels.TO]: DeviceLabels.TO.valueOf(),
      [DeviceLabels.APPROVE]: DeviceLabels.APPROVE.valueOf(),
      [DeviceLabels.REJECT]: DeviceLabels.REJECT.valueOf(),
    },
    //[DeviceLabels.AMOUNT, DeviceLabels.TO, DeviceLabels.APPROVE, DeviceLabels.REJECT],
    [DeviceLabels.ADDRESS, DeviceLabels.APPROVE, DeviceLabels.REJECT],
  );
  static readonly NEAR = new AppInfos(
    "Near",
    {
      [DeviceLabels.AMOUNT]: DeviceLabels.AMOUNT.valueOf(),
      [DeviceLabels.DESTINATION]: DeviceLabels.DESTINATION.valueOf(),
      [DeviceLabels.ACCEPT]: DeviceLabels.ACCEPT.valueOf(),
      [DeviceLabels.REJECT]: DeviceLabels.REJECT.valueOf(),
    },
    //[DeviceLabels.AMOUNT, DeviceLabels.DESTINATION, DeviceLabels.ACCEPT, DeviceLabels.REJECT],
    [DeviceLabels.WALLET_ID, DeviceLabels.APPROVE, DeviceLabels.REJECT],
    [
      DeviceLabels.VIEW_HEADER,
      DeviceLabels.RECEIVER,
      DeviceLabels.CONTINUE_TO_ACTION,
      DeviceLabels.VIEW_ACTION,
      DeviceLabels.METHOD_NAME,
      DeviceLabels.DEPOSIT,
      DeviceLabels.REJECT,
      DeviceLabels.SIGN,
    ],
  );
  static readonly LS = new AppInfos("LedgerSync");
  static readonly EXCHANGE = new AppInfos("Exchange", {
    [DeviceLabels.SEND]: DeviceLabels.SEND.valueOf(),
    [DeviceLabels.GET]: DeviceLabels.GET.valueOf(),
    [DeviceLabels.FEES]: DeviceLabels.FEES.valueOf(),
    [DeviceLabels.ACCEPT]: DeviceLabels.ACCEPT.valueOf(),
    [DeviceLabels.REJECT]: DeviceLabels.REJECT.valueOf(),
  });
  /*[
    DeviceLabels.SEND,
    DeviceLabels.GET,
    DeviceLabels.FEES,
    DeviceLabels.ACCEPT_AND_SEND,
    DeviceLabels.REJECT,
  ]);*/
}
