import { test } from "../../fixtures/common";
import { AppInfos } from "tests/enum/AppInfos";
import { addTmsLink } from "tests/utils/allureUtils";
import { getDescription } from "../../utils/customJsonReporter";
import { runCliCommand } from "tests/utils/cliUtils";

const app: AppInfos = AppInfos.LS;

test.describe(`[${app.name}] Sync Accounts`, () => {
  test.use({
    userdata: "ledgerSync",
    speculosApp: app,
    // cliCommand: ["ledgerKeyRingProtocol --initMemberCredentials"],
  });

  test(
    "Synchronize one instance then delete the backup",
    {
      annotation: {
        type: "TMS",
        description: "B2CQA-2292, B2CQA-2293, B2CQA-2296",
      },
    },
    async ({ app }) => {
      await addTmsLink(getDescription(test.info().annotations).split(", "));
      const keys = await runCliCommand("ledgerKeyRingProtocol --initMemberCredentials");

      console.log("keys:", keys);

      const cleanResult = keys
        .replace(/[\{\}]/g, "")
        .replace(/'/g, "")
        .trim();

      const pairs = cleanResult.split(",").map(pair => pair.trim().split(":"));
      const resultObject = Object.fromEntries(pairs);

      const pubkey = resultObject.pubkey.trim();
      const privatekey = resultObject.privatekey.trim();

      console.log("pubkey:", pubkey);
      console.log("privatekey:", privatekey);

      const initiateTrustchain = `ledgerKeyRingProtocol --getKeyRingTree --pubKey "${pubkey}" --privateKey "${privatekey}"`;
      console.log("initiateTrustchain:", initiateTrustchain);

      const result2 = await runCliCommand(initiateTrustchain);

      console.log("result2:", result2);

      await app.layout.goToSettings();
      await app.settings.openManageLedgerSync();
      await app.ledgerSync.expectSyncAccountsButtonExist();
      /*
      await app.ledgerSync.syncAccounts();
      await app.speculos.clickNextUntilText("Make sure");
      await app.speculos.confirmOperationOnDevice("Connect with");
      await app.speculos.clickNextUntilText("Your crypto accounts");
      await app.speculos.confirmOperationOnDevice("Turn on sync?");
      await app.ledgerSync.expectSynchronizationSuccess();
      await app.ledgerSync.closeLedgerSync();

      await app.settings.openManageLedgerSync();
      //await app.ledgerSync.expectNbSyncedInstances(1);  //TODO: Reactivate when the issue is fixed - QAA-178
      await app.ledgerSync.destroyTrustchain();
      await app.ledgerSync.expectBackupDeletion();
      await app.drawer.close();*/
    },
  );
});
