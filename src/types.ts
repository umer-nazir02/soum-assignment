export interface IItem {
  name: string;
  itemCount: number;
  type: string;
  parent: number | null;
  parentName: string | null;
  child: boolean;
  isSelected: boolean;
  id: number;
  children: IItem[];
}

export interface Product {
  id: string;
  parent?: string;
  children?: Product[];
}

export interface ProductTreeContextProps {
  selectedItems: IItem[];
  toggleItem: (item: Product) => void;
}

export interface ProductTreeProviderProps {
  children: React.ReactNode;
}

export interface CustomCheckBoxProps {
  isItemSelected: boolean;
  toggleItem: () => void;
  testId: string;
}
