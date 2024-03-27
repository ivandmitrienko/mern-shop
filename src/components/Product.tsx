import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from "react-router-dom";
import style from './Layout.module.scss';
import { RootState, Product } from 'types';

const ProductFunc: React.FC = () => {

  const { id } = useParams();
  const product = useSelector(
    (state: RootState) => {
      return state.products.products.find(
        (product: Product) => product._id === id
      )
    }
  );

  if (product) {
    return (
      <div className={style.itemOfProduct}>
        <span>Name of Product: {product.nameOfProduct}</span>
        <div className={style.itemOfImg}>
          <img src={product.image} alt="" />
        </div>
        <span>Count: {product.count}</span>
        <span>Price: {product.nameOfPrice}$</span>
        <span>Total: {product.nameOfPrice * product.count}$</span>
        <button><NavLink to='/'>Back to List</NavLink> </button>
      </div>
    )
  } else return null
}

export default ProductFunc;