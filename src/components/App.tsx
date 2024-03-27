import React, { Component} from 'react';
import { Routes, Route } from "react-router-dom";
import ProductList from './ProductList';
import Layout from './Layout';
import styles from './App.module.scss';
import Product from './Product';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { connect } from 'react-redux';
import { getProductsFromBase } from './actions/product-actions';

interface IProps {
  getProducts: ()=>void;
}

class App extends Component<IProps>{

  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    return (
      <div className={styles.app}>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<ProductList />} />
            <Route path='/ProductDescription/:id' element={<Product />} />
          </Route>
        </Routes>
      </div>
    )
  }
}

const mapDispatchToProps=(dispatch: ThunkDispatch<undefined, undefined, Action>)=>({
getProducts:() => dispatch(getProductsFromBase())
})

export default connect(null, mapDispatchToProps)(App)
