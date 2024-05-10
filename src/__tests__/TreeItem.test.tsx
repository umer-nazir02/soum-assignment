/* eslint-disable testing-library/prefer-screen-queries */
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import CustomCheckBox from "../components/CustomCheckbox";
import TreeItem from "../components/TreeItem";

jest.mock("../src/context/ContextProvider", () => ({
  useProductTree: jest.fn(),
  ProductTreeContext: jest.requireActual("../src/context/ContextProvider")
    .ProductTreeContext, // Use the real context for provider wrapping if needed
}));

// Helper function to provide context
const mockContext = (selectedItems: any, toggleItem: () => {}) => {
  require("../src/context/ContextProvider").useProductTree.mockImplementation(
    () => ({
      selectedItems,
      toggleItem,
    })
  );
};

describe("TreeItem", () => {
  const item = {
    name: "Test Item",
    itemCount: 3,
    children: [{ name: "Child Item 1" }, { name: "Child Item 2" }],
  };

  it("renders correctly", () => {
    mockContext([], jest.fn());
    const { getByText } = render(<TreeItem item={item} />);
    expect(getByText("Test Item")).toBeTruthy();
    expect(getByText("+3 Devices")).toBeTruthy();
  });

  it("expands and collapses when pressed", () => {
    mockContext([], jest.fn());
    const { getByText, queryByText } = render(<TreeItem item={item} />);
    const toggleButton = getByText("Test Item");
    fireEvent.press(toggleButton);
    expect(queryByText("+3 Devices")).toBeNull(); // Checks if subtext is hidden when expanded
    fireEvent.press(toggleButton);
    expect(getByText("+3 Devices")).toBeTruthy(); // Checks if subtext is visible again when collapsed
  });

  it("shows children when expanded", () => {
    mockContext([], jest.fn());
    const { getByText, queryByText } = render(<TreeItem item={item} />);
    fireEvent.press(getByText("Test Item"));
    expect(getByText("Child Item 1")).toBeTruthy();
    expect(getByText("Child Item 2")).toBeTruthy();
  });

  it("handles item selection through the CustomCheckBox", () => {
    const toggleItem = jest.fn();
    mockContext([item], toggleItem);
    const { getByTestId } = render(<TreeItem item={item} />);
    const checkBox = getByTestId("custom-checkbox");
    fireEvent(checkBox, "onValueChange", { nativeEvent: {} });
    expect(toggleItem).toHaveBeenCalled();
  });

  it("performs onValueChange", () => {
    const toggleItem = jest.fn();
    const isSelected = false;
    mockContext([item], toggleItem);
    const { getByTestId } = render(
      <CustomCheckBox
        isItemSelected={isSelected}
        toggleItem={toggleItem}
        testId="custom-checkbox"
      />
    );
    const checkBox = getByTestId("custom-checkbox");
    fireEvent(checkBox, "onValueChange", { nativeEvent: {} });
    expect(toggleItem).toBeCalledTimes(1);
  });
});
