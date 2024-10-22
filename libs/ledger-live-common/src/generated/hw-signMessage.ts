import casper from "../families/casper/hw-signMessage";
import filecoin from "../families/filecoin/hw-signMessage";
import internet_computer from "../families/internet_computer/hw-signMessage";
import stacks from "../families/stacks/hw-signMessage";
import { messageSigner as bitcoin } from "../families/bitcoin/setup";
import { messageSigner as evm } from "../families/evm/setup";
import { messageSigner as ton } from "../families/ton/setup";
import { messageSigner as vechain } from "../families/vechain/setup";

export default {
  casper,
  filecoin,
  internet_computer,
  stacks,
  bitcoin,
  evm,
  ton,
  vechain,
};
