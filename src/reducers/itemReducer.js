import {
  ITEMS_FETCH_STARTED,
  ITEMS_FETCH_SUCCESS,
  ITEMS_FETCH_ERRORED,
  CART_ADD_ITEM,
  CART_ADD_QTY,
  CART_DEL_QTY,
  CART_DELETE_ITEM,
} from "../types/itemTypes";
import { initialState } from "../store/InitialState";
import { REHYDRATE } from "redux-persist";

const singleReducer = (state = initialState, action) => {
  switch (action.type) {
    case ITEMS_FETCH_STARTED:
      return {
        ...state,
        isLoading: true,
      };
    case ITEMS_FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: action.payload,
        hasErrored: false,
        total: 0,
      };
    case ITEMS_FETCH_ERRORED:
      return {
        isLoading: false,
        items: [],
        hasErrored: true,
      };
    case CART_ADD_QTY:
      let addedItemA = state.items.find((item) => item.id === action.id);
      addedItemA.quantity += 1;
      let newTotal = (
        Number(state.total || 0) + Number(addedItemA.price)
      ).toFixed(2);
      return {
        ...state,
        total: newTotal,
      };
    case CART_DEL_QTY:
      let addedItemD = state.items.find((item) => item.id === action.id);
      if (addedItemD.quantity === 1) {
        let new_items = state.addedItems.filter(
          (item) => item.id !== action.id
        );
        let newTotal = (
          Number(state.total || 0) - Number(addedItemD.price)
        ).toFixed(2);
        return {
          ...state,
          addedItems: new_items,
          total: newTotal,
        };
      } else {
        addedItemD.quantity -= 1;
        let newTotal = (
          Number(state.total || 0) - Number(addedItemD.price)
        ).toFixed(2);
        return {
          ...state,
          total: newTotal,
        };
      }
    case CART_DELETE_ITEM:
      let itemToRemove = state.addedItems.find((item) => action.id === item.id);
      let new_items = state.addedItems.filter((item) => action.id !== item.id);

      //calculating the total
      let newTotalD = (
        Number(state.total || 0) -
        Number(itemToRemove.price) * Number(itemToRemove.quantity)
      ).toFixed(2);
      return {
        ...state,
        addedItems: new_items,
        total: newTotalD,
      };
    case CART_ADD_ITEM:
      const addedItem = state.items.find((item) => item.id === action.id);
      //check if the action id exists in the addedItems
      const existed_item =
        state.addedItems === undefined
          ? undefined
          : state.addedItems.find((item) => item.id === action.id);
      if (existed_item) {
        addedItem.quantity += 1;
        return {
          ...state,
          total: (Number(state.total || 0) + Number(addedItem.price)).toFixed(
            2
          ),
        };
      } else {
        addedItem.quantity = 1;
        let newTotal = (
          Number(state.total || 0) + Number(addedItem.price)
        ).toFixed(2);
        return {
          ...state,
          addedItems: [...(state.addedItems || []), addedItem],
          total: newTotal,
        };
      }
    default:
      return state;
  }
};

export default singleReducer;
