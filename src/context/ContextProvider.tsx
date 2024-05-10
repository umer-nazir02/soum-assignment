import React, {createContext, useContext} from 'react';
import useSelectedItemToggle from '../hooks/useSelectedItem';
import {flattenItems} from '../utils/commonMethods';
import {productTreeData} from '../utils/mock';
import {ProductTreeContextProps, ProductTreeProviderProps} from '../types';

const defaultContextValue: ProductTreeContextProps = {
  selectedItems: [],
  toggleItem: () => {},
};

export const ProductTreeContext =
  createContext<ProductTreeContextProps>(defaultContextValue);

export const ProductTreeProvider: React.FC<ProductTreeProviderProps> = ({
  children,
}) => {
  const flatProductTreeData = flattenItems(productTreeData);

  //Custom Hook for toggleItems and SelectedItem states
  const {selectedItems, toggleItem} = useSelectedItemToggle(
    [],
    flatProductTreeData,
  );

  return (
    <ProductTreeContext.Provider value={{selectedItems, toggleItem}}>
      {children}
    </ProductTreeContext.Provider>
  );
};

export const useProductTree = () => useContext(ProductTreeContext);
