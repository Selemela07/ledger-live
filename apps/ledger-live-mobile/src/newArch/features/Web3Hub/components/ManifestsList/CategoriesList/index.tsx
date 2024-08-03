import React from "react";
import { StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Box } from "@ledgerhq/native-ui";
import useCategoriesListViewModel, {
  type useCategoriesListViewModelProps,
} from "./useCategoriesListViewModel";
import Badge from "./Badge";

const identityFn = (item: string) => item;

type Props = useCategoriesListViewModelProps;

const renderItem = ({
  item,
  extraData,
}: {
  item: string;
  extraData?: useCategoriesListViewModelProps;
}) => {
  return (
    <Badge
      onPress={() => extraData?.selectCategory(item)}
      label={item}
      selected={extraData?.selectedCategory === item}
    />
  );
};

export default function CategoriesList({ selectedCategory, selectCategory }: Props) {
  const { data, extraData } = useCategoriesListViewModel({ selectedCategory, selectCategory });

  return (
    <FlashList
      testID="web3hub-categories-scroll"
      horizontal
      contentContainerStyle={styles.container}
      keyExtractor={identityFn}
      renderItem={renderItem}
      ListEmptyComponent={<Box height={32} />} // Empty box for first height calculation, could be improved
      estimatedItemSize={50}
      data={data}
      showsHorizontalScrollIndicator={false}
      extraData={extraData}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
});
