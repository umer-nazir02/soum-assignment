import React from "react";
import { ProductTreeProvider } from "./context/ContextProvider";
import ProductTree from "./components/TreeViewNode";
import HeaderComponent from "./components/Header";
import RenderSelectedItems from "./components/SelectedChoices";
import { productTreeData } from "./utils/mock";

const Main = () => {
  return (
    <ProductTreeProvider>
      <HeaderComponent title={"Browse Products"} />
      <ProductTree data={productTreeData} />
      <RenderSelectedItems />
    </ProductTreeProvider>
  );
};

export default Main;
