import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {DH, DW} from '../utils/responsive';
import TreeItem from './TreeItem';

const ProductTree = ({data}: any) => {
  return (
    <View style={styles.productContainer}>
      <FlatList
        data={data}
        keyExtractor={item => item.name}
        renderItem={({item}) => <TreeItem item={item} />}
        ListEmptyComponent={<Text>No items found.</Text>}
        bounces={true}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ProductTree;

const styles = StyleSheet.create({
  productContainer: {
    paddingVertical: DW(5),
    borderWidth: 2,
    borderColor: 'blue',
    paddingHorizontal: DW(2),
    marginHorizontal: DW(1),
    height: DH(60),
    backgroundColor: '#C4C4C4',
  },
});
