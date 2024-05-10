import React, { useCallback, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useProductTree } from "../context/ContextProvider";
import CustomCheckBox from "../components/CustomCheckbox";
import { DW } from "../utils/responsive";

const TreeItem = React.memo(({ item }: any) => {
  const { selectedItems, toggleItem } = useProductTree();
  const [expanded, setExpanded] = useState(false);

  const handlePress = useCallback(() => {
    if (item.children) {
      setExpanded((prevExpanded) => !prevExpanded);
    }
  }, [item]);

  const isItemSelected = selectedItems.includes(item);
  const isSubtextVisible = !expanded && item.itemCount > 0;
  const isSubCategory = expanded && item.children;

  return (
    <View>
      <View style={styles.row}>
        <CustomCheckBox
          isItemSelected={isItemSelected}
          toggleItem={toggleItem.bind(null, item)}
          testId="custom-checkbox"
        />
        <TouchableOpacity onPress={handlePress} style={styles.button}>
          <Text style={styles.textLarge}>{item.name}</Text>
          {isSubtextVisible ? (
            <Text style={styles.textSmall}>{`+${item.itemCount} Devices`}</Text>
          ) : null}
        </TouchableOpacity>
      </View>
      {isSubCategory ? (
        <FlatList
          data={item.children}
          renderItem={({ item: childItem }) => (
            <TreeItem key={childItem.name} item={childItem} />
          )}
          keyExtractor={(childItem) => childItem.name}
          style={styles.childrenWrapper}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      ) : null}
    </View>
  );
});

export default TreeItem;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 7,
  },
  checkBoxWrapper: {
    backgroundColor: "#fff",
  },
  button: {
    paddingLeft: 20,
  },
  textLarge: {
    fontSize: DW(5),
  },
  textSmall: {
    fontSize: DW(3),
  },
  childrenWrapper: {
    marginLeft: 20,
  },
});
