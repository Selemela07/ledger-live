import { expect, device } from "detox";
import { Application } from "../page/index";

let app: Application;

describe("Onboarding - Read Only", () => {
  beforeAll(() => {
    app = new Application();
  });

  $TmsLink("B2CQA-1752");
  it("is able to buy a nano from the onboarding flow", async () => {
    await app.onboarding.startOnboarding();
    await app.onboarding.chooseNoLedgerYet();
    await app.onboarding.chooseToBuyLedger();
    await app.buyDevice.buyNano();
    await app.buyDevice.expectBuyNanoWebPage();
  });

  $TmsLink("B2CQA-370");
  $TmsLink("B2CQA-1753");
  $TmsLink("B2CQA-1806");
  it("goes through discover app and should see an empty portfolio page", async () => {
    await device.launchApp();
    await device.reloadReactNative();
    await app.onboarding.startOnboarding();
    await app.onboarding.chooseNoLedgerYet();
    await app.onboarding.chooseToExploreApp();
    await app.portfolio.waitForPortfolioPageToLoad();
    await expect(app.portfolio.portfolioSettingsButton()).toBeVisible();
    await app.portfolio.waitForPortfolioReadOnly();
  });

  $TmsLink("B2CQA-364");
  it("buy a nano from the market page", async () => {
    await app.portfolio.waitForPortfolioReadOnly();
    await app.portfolio.openWalletTabMarket();
    await app.market.searchAsset("BTC");
    await app.market.openAssetPage("Bitcoin (BTC)");
    await app.market.buyAsset();
    await app.buyDevice.buyNano();
    await app.buyDevice.expectBuyNanoWebPage();
  });
});
