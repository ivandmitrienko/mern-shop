import { Product } from "types";
import { Constants } from "./actions";
import axios from "../../utils/config";
import { Dispatch } from "react";
import { Types } from "mongoose";

export interface DispatchAction {
  product?: Product,
  type: Constants
}


export const addNewProductToBase = ({ nameOfProduct, nameOfPrice, image, count }: Product) => {
  return (dispatch: Dispatch<DispatchAction>) => {
    dispatch(addTodoStarted());

    axios
      .post('https://mernapp-7977ff1afd46.herokuapp.com/products', {
        nameOfProduct,
        nameOfPrice,
        image,
        count,
      })
      .then((res) => {
        dispatch(addTodoSuccess(res.data));
      })
      .catch((err) => {
        dispatch(addTodoFailure(err.message));
      });
  };
};

export const getProductsFromBase = () => {
  return (dispatch: Dispatch<DispatchAction>) => {
    axios
      .get('https://mernapp-7977ff1afd46.herokuapp.com/products')
      .then((res) => {
        dispatch(addProducts(res.data))
      })
      .catch((err) => {
        dispatch(addTodoFailure(err.message));
      });
  }
}

export const deleteProductFromBase = (_id?: Types.ObjectId) => {
  return (dispatch: Dispatch<DispatchAction>) => {
    axios
      .delete(`https://mernapp-7977ff1afd46.herokuapp.com/ProductDescription/${_id}`)
      .then((res) => {
        dispatch(deleteProductFromRedux(res.data._id))
      })
      .catch((err) => {
        dispatch(addTodoFailure(err.message));
      });
  }
}

export const addCountofProductToBase = (product: Product) => {
  return (dispatch: Dispatch<DispatchAction>) => {
    axios
      .put('https://mernapp-7977ff1afd46.herokuapp.com', { product })
      .then((res) => {
        dispatch(addCountofProductToRedux(res.data._id))
      })
      .catch((err) => {
        dispatch(addTodoFailure(err.message));
      });
  }
}

const addProducts = (products: Product[]) => ({
  type: Constants.GET_PRODUCTS,
  products
})

const deleteProductFromRedux = (id: Types.ObjectId) => ({
  type: Constants.DELETE_PRODUCT,
  id
})

const addCountofProductToRedux = (id: Types.ObjectId) => ({
  type: Constants.ADD_PRODUCT_COUNT,
  id
})

const addTodoSuccess = (product: Product) => ({
  type: Constants.ADD_PRODUCT,
  product
});

const addTodoStarted = () => ({
  type: Constants.ADD_PRODUCT_STARTED,
});

const addTodoFailure = (error: Error) => ({
  type: Constants.ADD_PRODUCT_FAILURE,
  payload: {
    error,
  },
});



