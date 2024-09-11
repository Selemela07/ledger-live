import React, { useMemo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "styled-components/native";
import { findCryptoCurrencyByKeyword } from "@ledgerhq/live-common/currencies/index";
import { BUY_SELL_UI_APP_ID } from "@ledgerhq/live-common/wallet-api/constants";
import { useFeature } from "@ledgerhq/live-common/featureFlags/index";
import { NavigatorName, ScreenName } from "~/const";
import { getStackNavigatorConfig } from "~/navigation/navigatorConfig";
import { useTranslation } from "react-i18next";
import styles from "~/navigation/styles";
import type { PtxLiveAppNavigatorParamList } from "./types/PtxLiveAppNavigator";
import type { StackNavigatorProps } from "./types/helpers";
import { PtxScreen } from "~/screens/PTX";

const Stack = createStackNavigator<PtxLiveAppNavigatorParamList>();

const createExchangeScreen =
  (screenName: ScreenName.ExchangeBuy | ScreenName.ExchangeSell) =>
  (
    props: StackNavigatorProps<
      PtxLiveAppNavigatorParamList,
      ScreenName.ExchangeBuy | ScreenName.ExchangeSell
    >,
  ) => {
    const buySellUiFlag = useFeature("buySellUi");
    const { t } = useTranslation();
    const defaultPlatform = buySellUiFlag?.params?.manifestId || BUY_SELL_UI_APP_ID;

    return (
      <PtxScreen
        {...props}
        config={{
          screen: screenName,
          navigator: NavigatorName.Exchange,
          btnText: t("common.quote"),
        }}
        route={{
          ...props.route,
          params: {
            account: props.route.params?.defaultAccountId,
            currency: props.route.params?.currency
              ? findCryptoCurrencyByKeyword(props.route.params?.currency)?.id
              : props.route.params?.defaultCurrencyId,
            goToURL: props.route.params?.goToURL,
            lastScreen: props.route.params?.lastScreen,
            platform: props.route.params?.platform || defaultPlatform,
            referrer: props.route.params?.referrer,
          },
        }}
      />
    );
  };

const ExchangeBuy = createExchangeScreen(ScreenName.ExchangeBuy);
const ExchangeSell = createExchangeScreen(ScreenName.ExchangeSell);

export default function ExchangeLiveAppNavigator(_props?: Record<string, unknown>) {
  const { colors } = useTheme();

  const stackNavigationConfig = useMemo(() => getStackNavigatorConfig(colors, true), [colors]);

  return (
    <Stack.Navigator {...stackNavigationConfig}>
      <Stack.Screen
        name={ScreenName.ExchangeBuy}
        options={{
          headerStyle: styles.headerNoShadow,
          title: "",
        }}
      >
        {props => <ExchangeBuy {...props} />}
      </Stack.Screen>

      <Stack.Screen
        name={ScreenName.ExchangeSell}
        options={{
          headerStyle: styles.headerNoShadow,
        }}
      >
        {props => <ExchangeSell {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
