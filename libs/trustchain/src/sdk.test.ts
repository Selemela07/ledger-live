import { crypto } from "@ledgerhq/hw-trustchain";
import { sdk } from "./sdk";

test("encryptUserData + decryptUserData", async () => {
  const obj = {
    foobar: 42,
    toto: "tata",
  };
  const keypair = await crypto.randomKeypair();
  const trustchain = {
    rootId: "",
    walletSyncEncryptionKey: crypto.to_hex(keypair.privateKey),
  };
  const encrypted = await sdk.encryptUserData(trustchain, obj);
  const decrypted = await sdk.decryptUserData(trustchain, encrypted);
  expect(decrypted).toEqual(obj);
});
