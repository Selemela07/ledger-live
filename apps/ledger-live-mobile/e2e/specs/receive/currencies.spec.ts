import { loadBleState, loadConfig } from "../../bridge/server";
import DeviceAction from "../../models/DeviceAction";
import { knownDevice } from "../../models/devices";
import { waitForElementById } from "../../helpers";
import { getCryptoCurrencyById } from "@ledgerhq/live-common/currencies/index";
import { Application } from "../../page/index";

let app: Application;
let deviceAction: DeviceAction;
let first = true;

$TmsLink("B2CQA-651");
$TmsLink("B2CQA-1854");
describe("Receive different currency", () => {
  beforeAll(async () => {
    await loadConfig("onboardingcompleted", true);
    await loadBleState({ knownDevices: [knownDevice] });
    app = new Application();
    deviceAction = new DeviceAction(knownDevice);

    await app.portfolio.waitForPortfolioPageToLoad();
  });

  it.each([
    ["bitcoin"],
    ["ethereum", "Ethereum"],
    ["bsc"],
    ["ripple"],
    //["solana"], // TOFIX Error during flow
    ["cardano"],
    ["dogecoin"],
    ["tron"],
    ["avalanche_c_chain"],
    ["polygon", "Polygon"],
    ["polkadot"],
    ["cosmos", "Cosmos"],
  ])("receive on %p (through scanning)", async (currencyId: string, network: string = "") => {
    const currency = getCryptoCurrencyById(currencyId);
    const currencyName = getCryptoCurrencyById(currencyId).name;

    await app.receive.openViaDeeplink();
    await app.common.performSearch(currencyName);
    await app.receive.selectCurrency(currencyName);
    if (network) {
      await app.receive.selectNetwork(network);
    }
    if (first) {
      await deviceAction.selectMockDevice();
      first = false;
    }
    await deviceAction.openApp();
    await app.receive.selectAccount(`${currencyName} 2`);
    await app.receive.doNotVerifyAddress();
    await waitForElementById(app.receive.accountAddress);
    await app.receive.expectReceivePageIsDisplayed(currency.ticker, `${currencyName} 2`);
  });
});
