import {
  flattenItems,
  getItemPathId,
  groupByParent,
} from "../utils/commonMethods";
import * as Constant from "../utils/constants";

describe("flattenItems", () => {
  it("should flatten a single level of products correctly", () => {
    const products = [
      { id: "1", name: "Product 1", children: [] },
      { id: "2", name: "Product 2", children: [] },
    ];
    const expected = [
      { id: "1", name: "Product 1", children: [], parent: null },
      { id: "2", name: "Product 2", children: [], parent: null },
    ];
    expect(flattenItems(products)).toEqual(expected);
  });

  it("should handle nested children correctly", () => {
    const products = [
      {
        id: "1",
        name: "Product 1",
        children: [{ id: "1-1", name: "Subproduct 1-1", children: [] }],
      },
      { id: "2", name: "Product 2", children: [] },
    ];
    const expected = [
      {
        id: "1",
        name: "Product 1",
        children: [
          {
            id: "1-1",
            name: "Subproduct 1-1",
            children: [],
          },
        ],
        parent: null,
      },
      {
        id: "1-1",
        name: "Subproduct 1-1",
        children: [],
        parent: "1",
      },
      {
        id: "2",
        name: "Product 2",
        children: [],
        parent: null,
      },
    ];
    expect(flattenItems(products)).toEqual(expected);
  });

  it("should handle multiple levels of nesting", () => {
    const products = [
      {
        id: "1",
        name: "Product 1",
        children: [
          {
            id: "1-1",
            name: "Subproduct 1-1",
            children: [
              { id: "1-1-1", name: "Sub-subproduct 1-1-1", children: [] },
            ],
          },
        ],
      },
    ];
    const expected = [
      {
        id: "1",
        name: "Product 1",
        children: [
          {
            id: "1-1",
            name: "Subproduct 1-1",
            children: [
              {
                id: "1-1-1",
                name: "Sub-subproduct 1-1-1",
                children: [],
              },
            ],
          },
        ],
        parent: null,
      },
      {
        id: "1-1",
        name: "Subproduct 1-1",
        children: [
          {
            id: "1-1-1",
            name: "Sub-subproduct 1-1-1",
            children: [],
          },
        ],
        parent: "1",
      },
      {
        id: "1-1-1",
        name: "Sub-subproduct 1-1-1",
        children: [],
        parent: "1-1",
      },
    ];

    expect(flattenItems(products)).toEqual(expected);
  });

  it("should return an empty array when no products are provided", () => {
    expect(flattenItems([])).toEqual([]);
  });
});

describe("getItemPathId", () => {
  it("should return the correct path id for a single item with no parent", () => {
    const items = [{ id: "1", parent: null }];
    const item = items[0];
    expect(getItemPathId(item, items)).toEqual("1");
  });

  it("should correctly concatenate ids for an item with one parent", () => {
    const items = [
      { id: "1", parent: null },
      { id: "2", parent: "1" },
    ];
    const item = items[1];
    expect(getItemPathId(item, items)).toEqual("1-2");
  });

  it("should correctly concatenate ids through multiple levels of nesting", () => {
    const items = [
      { id: "1", parent: null },
      { id: "2", parent: "1" },
      { id: "3", parent: "2" },
    ];
    const item = items[2];
    expect(getItemPathId(item, items)).toEqual("1-2-3");
  });

  it("should handle the case where a parent item is not found", () => {
    const items = [{ id: "1", parent: "999" }]; // 999 is a non-existent parent id
    const item = items[0];

    expect(getItemPathId(item, items)).toEqual("1");
  });

  it("should return the initial item id if all parents are not in the list", () => {
    const items = [{ id: "2", parent: "1" }];
    const item = items[0];
    expect(getItemPathId(item, items)).toEqual("2");
  });
});

describe("groupByParent", () => {
  it("groups items by their parent property", () => {
    const items = [
      { name: "Item1", parent: "1", parentName: "Parent1" },
      { name: "Item2", parent: "1", parentName: "Parent1" },
      { name: "Item3", parent: "2", parentName: "Parent2" },
    ];
    const grouped = groupByParent(items);
    expect(grouped).toEqual({
      "1": {
        name: "1",
        parentName: "Parent1",
        children: ["Item1", "Item2"],
        type: Constant.VARIENTS,
      },
      "2": {
        name: "2",
        parentName: "Parent2",
        children: ["Item3"],
        type: Constant.VARIENTS,
      },
    });
  });

  it("uses item name as key if parent is missing", () => {
    const items = [
      { name: "Item1", parentName: "Parent1" },
      { name: "Item2", parentName: "Parent1" },
    ];
    const grouped = groupByParent(items);
    expect(grouped).toEqual({
      Item1: {
        name: "Item1",
        parentName: "Parent1",
        children: ["Item1"],
        type: Constant.VARIENTS,
      },
      Item2: {
        name: "Item2",
        parentName: "Parent1",
        children: ["Item2"],
        type: Constant.VARIENTS,
      },
    });
  });

  it("handles an empty array correctly", () => {
    const items = [];
    const grouped = groupByParent(items);
    expect(grouped).toEqual({});
  });
});
