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
      .post('/products', {
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
      .get('/products')
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
      .delete(`/ProductDescription/${_id}`)
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
      .put('/', { product })
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



