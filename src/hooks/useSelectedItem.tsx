import {useState, useCallback} from 'react';
import {
  getItemPathId,
  findItemById,
  deselectDescendants,
} from '../utils/commonMethods';
import {IItem} from '../types';

// Define the custom hook
function useSelectedItemToggle(
  initialState = [],
  flatProductTreeData: IItem[],
) {
  const [selectedItems, setSelectedItems] = useState(initialState);

  const toggleItem = useCallback(
    item => {
      setSelectedItems(currentSelectedItems => {
        const currentItemPathId = getItemPathId(item, flatProductTreeData);
        const isCurrentlySelected = currentSelectedItems.some(
          selectedItem =>
            getItemPathId(selectedItem, flatProductTreeData) ===
            currentItemPathId,
        );

        // Remove the item if it's already selected
        if (isCurrentlySelected) {
          return currentSelectedItems.filter(
            selectedItem =>
              getItemPathId(selectedItem, flatProductTreeData) !==
              currentItemPathId,
          );
        } else {
          // Add the new item
          let newSelectedItems = [...currentSelectedItems, item];

          // Deselect all ancestors of the newly selected item
          let currentItem = item;
          while (currentItem.parent !== null) {
            const parentItem = findItemById(
              currentItem.parent,
              flatProductTreeData,
            );
            newSelectedItems = newSelectedItems.filter(
              selectedItem => selectedItem.id !== parentItem.id,
            );
            currentItem = parentItem;
          }

          // Deselect all descendants of the newly selected item
          return deselectDescendants(
            item.id,
            flatProductTreeData,
            newSelectedItems,
          );
        }
      });
    },
    [flatProductTreeData],
  );

  return {selectedItems, toggleItem};
}

export default useSelectedItemToggle;
