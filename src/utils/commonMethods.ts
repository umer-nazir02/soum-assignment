import { IItem, Product } from "../types";
import * as Constant from "./constants";

// Function to flatten the product tree data to make it accessible by id
export const flattenItems = (
  items: Product[],
  parentId: string | null = null
): IItem[] => {
  return items.reduce((acc: IItem[], item: Product) => {
    const newItem = { ...item, parent: parentId };
    acc.push(newItem);
    if (item.children && item.children.length > 0) {
      acc.push(...flattenItems(item.children, item.id));
    }
    return acc;
  }, []);
};

export const getItemPathId = (
  item: IItem,
  flattenProductData: IItem[]
): string => {
  let pathId = `${item.id}`;
  let parentId = item.parent;

  while (parentId !== null) {
    const parentItem = flattenProductData.find((i) => i.id === parentId);

    if (!parentItem) {
      // Handle the case where no parent item is found
      // console.log(`No parent found with id: ${parentId}`);
      break; // Exit the loop or handle it as needed
    }

    pathId = `${parentItem.id}-${pathId}`;
    parentId = parentItem.parent;
  }

  return pathId;
};

export const findItemById = (id: number, flatProductTreeData: IItem[]) =>
  flatProductTreeData.find((i) => i.id === id);

// Deselect all descendants of the newly selected item
export const deselectDescendants = (
  itemId: number,
  flatProductTreeData: IItem[],
  newSelectedItems: IItem[]
) => {
  const descendants = flatProductTreeData.filter((i) =>
    getItemPathId(i, flatProductTreeData).startsWith(
      `${getItemPathId(
        findItemById(itemId, flatProductTreeData),
        flatProductTreeData
      )}-`
    )
  );
  descendants.forEach((descendant) => {
    newSelectedItems = newSelectedItems.filter(
      (selectedItem) => selectedItem.id !== descendant.id
    );
  });
  return newSelectedItems;
};

export const groupByParent = (items: IItem[]): { [key: string]: IItem } => {
  return items.reduce<{ [key: string]: IItem }>((acc, item) => {
    const key = item.parent || item.name;
    if (!acc[key]) {
      acc[key] = {
        name: key,
        parentName: item.parentName,
        children: [],
        type: Constant.VARIENTS,
      };
    }
    acc[key].children.push(item.name);
    return acc;
  }, {});
};

export const groupItems = (selectedItems: IItem[]): IItem[] => {
  const variants = groupByParent(
    selectedItems.filter((item) => item.type === Constant.VARIENTS)
  );
  const nonVariants = selectedItems.filter(
    (item) => item.type !== Constant.VARIENTS
  );
  return [...Object.values(variants), ...nonVariants];
};
