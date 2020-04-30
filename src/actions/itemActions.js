import {
  ITEMS_FETCH_STARTED,
  ITEMS_FETCH_SUCCESS,
  ITEMS_FETCH_ERRORED,
  CART_ADD_ITEM,
  CART_ADD_QTY,
  CART_DEL_QTY,
  CART_DELETE_ITEM,
} from "../types/itemTypes";
import axios from "axios";

export const items_fetch_started = () => {
  return {
    type: ITEMS_FETCH_STARTED,
  };
};

export const items_fetch_success = (items) => {
  return {
    type: ITEMS_FETCH_SUCCESS,
    payload: items,
  };
};

export const items_fetch_errored = (hasErrored) => {
  return {
    type: ITEMS_FETCH_ERRORED,
    payload: hasErrored,
  };
};

export const addToCart = (id) => {
  return {
    type: CART_ADD_ITEM,
    id,
  };
};

export const addQuantityToCart = (id) => {
  return {
    type: CART_ADD_QTY,
    id,
  };
};

export const delQuantityFromCart = (id) => {
  return {
    type: CART_DEL_QTY,
    id,
  };
};

export const cartDeleteItem = (id) => {
  return {
    type: CART_DELETE_ITEM,
    id,
  };
};

export function itemsFetchData(url) {
  return (dispatch) => {
    dispatch(items_fetch_started());
    axios
      .get(url)
      .then((response) => {
        let items = response.data;
        let output = items.map((option) => {
          // New properties to be added
          const newPropsObj = {
            quantity: 0,
            price: (5.35 * Number(option.id)).toFixed(2),
          };

          // Assign new properties and return
          return Object.assign(option, newPropsObj);
        });
        dispatch(items_fetch_success(output));
      })
      .catch((error) => {
        dispatch(items_fetch_errored(true));
      });
  };
}
