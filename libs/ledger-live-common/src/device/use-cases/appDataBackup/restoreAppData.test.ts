import Transport from "@ledgerhq/hw-transport";
import { Observable, firstValueFrom, lastValueFrom } from "rxjs";
import { RestoreAppDataEvent, RestoreAppDataEventType } from "./types";
import { restoreAppData } from "./restoreAppData";

jest.mock("@ledgerhq/hw-transport");
jest.mock("@ledgerhq/device-core", () => ({
  restoreAppStorageInit: jest.fn().mockResolvedValue(undefined),
  restoreAppStorage: jest.fn().mockResolvedValue(undefined),
  restoreAppStorageCommit: jest.fn().mockResolvedValue(undefined),
}));

const DECODED_STORED_DATA =
  "Ledger Flex marks the new standard for Ledger devices, featuring a secure E Ink touchscreen, NFC, and our new Security Key app that will allow you to go from painful logins to passwordless ease, all from your secure Ledger device. On Ledger's 10th anniversary, we are proud to introduce the secure touchscreen category, featuring Ledger Stax and now, Ledger Flex. With Ledger Flex, you can manage your crypto assets with ease, and with the new Security Key app, you can log in to your favorite services with a simple tap. Ledger Flex is the new standard for Ledger devices, and we are excited to bring it to you.";

describe("restoreAppData", () => {
  let transport: Transport;
  let appName: string;
  let appData: string;

  beforeEach(() => {
    // Initialize the transport, app name and app data before each test
    transport = {} as unknown as Transport;
    appName = "MyApp";
    appData = Buffer.from(DECODED_STORED_DATA).toString("base64");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should restore the app data by emitting relative events sequentially when data size > 255", async () => {
    const restoreObservable: Observable<RestoreAppDataEvent> = restoreAppData(
      transport,
      appName,
      appData,
    );
    const events: RestoreAppDataEvent[] = [];

    // Subscribe to the observable to receive the restore events
    restoreObservable.subscribe((event: RestoreAppDataEvent) => {
      events.push(event);
    });

    const firstValue: RestoreAppDataEvent = await firstValueFrom(restoreObservable);
    expect(firstValue).toEqual({
      type: RestoreAppDataEventType.AppDataInitialized,
    });

    const lastValue: RestoreAppDataEvent = await lastValueFrom(restoreObservable);
    expect(lastValue).toEqual({
      type: RestoreAppDataEventType.AppDataRestored,
    });

    expect(events).toContainEqual({
      type: RestoreAppDataEventType.Progress,
      data: expect.any(Number),
    });

    expect(events).toHaveLength(5);
  });

  it("should restore the app data by emitting relative events sequentially when data size < 255", async () => {
    const restoreObservable: Observable<RestoreAppDataEvent> = restoreAppData(
      transport,
      appName,
      "Ledger Flex",
    );
    const events: RestoreAppDataEvent[] = [];

    // Subscribe to the observable to receive the restore events
    restoreObservable.subscribe((event: RestoreAppDataEvent) => {
      events.push(event);
    });

    const firstValue: RestoreAppDataEvent = await firstValueFrom(restoreObservable);
    expect(firstValue).toEqual({
      type: RestoreAppDataEventType.AppDataInitialized,
    });

    const lastValue: RestoreAppDataEvent = await lastValueFrom(restoreObservable);
    expect(lastValue).toEqual({
      type: RestoreAppDataEventType.AppDataRestored,
    });

    expect(events).toContainEqual({
      type: RestoreAppDataEventType.Progress,
      data: expect.any(Number),
    });

    expect(events).toHaveLength(3);
  });
});
