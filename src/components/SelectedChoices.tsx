import React, {useMemo} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useProductTree} from '../context/ContextProvider';
import {groupItems} from '../utils/commonMethods';
import {DW} from '../utils/responsive';
import {IItem} from '../types';
import * as Constant from '../utils/constants';

const RenderSelectedItems: React.FC = () => {
  const {selectedItems} = useProductTree();

  const memoizedGroupedItems = useMemo(() => {
    return groupItems(selectedItems);
  }, [selectedItems]);

  const renderItem = ({item}: {item: IItem}) => (
    <View style={styles.variantItem}>
      <Text style={styles.variantText}>
        {item.type === Constant.VARIENTS
          ? `${item.parentName}: ${item.children.join(', ')}`
          : `all ${item.name} devices`}
      </Text>
    </View>
  );

  const keyExtractor = (item: IItem) => item.name;

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Selected Variants</Text>
      <FlatList
        data={memoizedGroupedItems}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        bounces={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    paddingTop: DW(5),
  },
  titleText: {
    fontSize: DW(5),
    fontWeight: '500',
  },

  variantText: {
    fontSize: DW(3.5),
  },

  variantItem: {
    padding: DW(2),
    backgroundColor: '#C4C4C4',
    marginRight: DW(2),
    marginTop: DW(2),
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});

export default RenderSelectedItems;
