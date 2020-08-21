import { FETCH_LIST_ITEMS, UPDATE_LIST_ITEMS } from "../actions/types";

const INITIAL_STATE = [
  {
    id: 3,
    name: "Tomato",
    total_price: "1200.00",
    image_tag:
      "http://localhost:8000/media/CACHE/images/items/potato/68e393027e26f9dd4d63349275d3caee.png",
    total_quantity: "3.000",
    unit: "kg",
    base_quantity: 0.25,
    base_unit: "kg",
    base_price: 100,
    order: 0,
    list: 13,
    item: 2,
    calories: 361,
    fat: 19,
    carbs: 9,
    protein: 37,
  },
  {
    id: 4,
    name: "Potato",
    total_price: "160.00",
    image_tag:
      "http://localhost:8000/media/CACHE/images/items/tomato/74288f072498472e5360f2a098655f6f.png",
    total_quantity: "1.000",
    unit: "kg",
    base_quantity: 0.5,
    base_unit: "kg",
    base_price: 40,
    order: 1,
    list: 13,
    item: 1,
    calories: 360,
    fat: 19,
    carbs: 9,
    protein: 37,
  },
  {
    id: 5,
    name: "Onion",
    total_price: "1200.00",
    image_tag:
      "http://localhost:8000/media/CACHE/images/items/potato/68e393027e26f9dd4d63349275d3caee.png",
    total_quantity: "3.000",
    unit: "kg",
    base_quantity: 0.75,
    base_unit: "kg",
    base_price: 102,
    order: 0,
    list: 13,
    item: 2,
    calories: 362,
    fat: 19,
    carbs: 9,
    protein: 37,
  },
  {
    id: 6,
    name: "Carrot",
    total_price: "1200.00",
    image_tag:
      "http://localhost:8000/media/CACHE/images/items/potato/68e393027e26f9dd4d63349275d3caee.png",
    total_quantity: "3.000",
    unit: "kg",
    base_quantity: 0.25,
    base_unit: "kg",
    base_price: 101,
    order: 0,
    list: 13,
    item: 2,
    calories: 365,
    fat: 19,
    carbs: 9,
    protein: 37,
  },
  {
    id: 7,
    name: "Cucumber",
    total_price: "1200.00",
    image_tag:
      "http://localhost:8000/media/CACHE/images/items/potato/68e393027e26f9dd4d63349275d3caee.png",
    total_quantity: "3.000",
    unit: "kg",
    base_quantity: 1,
    base_unit: "kg",
    base_price: 105,
    order: 0,
    list: 13,
    item: 2,
    calories: 364,
    fat: 19,
    carbs: 9,
    protein: 37,
  },
  {
    id: 8,
    name: "Spinach",
    total_price: "1200.00",
    image_tag:
      "http://localhost:8000/media/CACHE/images/items/potato/68e393027e26f9dd4d63349275d3caee.png",
    total_quantity: "3.000",
    unit: "kg",
    base_quantity: 0.5,
    base_unit: "kg",
    base_price: 104,
    order: 0,
    list: 13,
    item: 2,
    calories: 363,
    fat: 19,
    carbs: 9,
    protein: 37,
  },
];

export default (state = INITIAL_STATE, action) => {
  if (action.type === FETCH_LIST_ITEMS) {
    return state;
  } else if (action.type === UPDATE_LIST_ITEMS) {
    return state.map((item) => {
      if (item.id === action.payload.id) {
        item.name = action.payload.name;
      }

      return item;
    });
  }

  return state;
};
