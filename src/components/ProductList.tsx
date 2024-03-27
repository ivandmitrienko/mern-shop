import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Items from './Items';
import style from './Layout.module.scss';
import { RootState, Product } from 'types';

class ProductList extends PureComponent<StateProps> {

  render() {
    return (
      <div className={style.productList} >
        {this.props.products.map((product, index) => <Items
          key={index}
          product = {product}
          index={index}
          _id={product._id}
        />)}
        {this.props.products.length ?
          <div className={style.totalPrice}>
            Total: {(this.props.products as Product[]).reduce((acc:number, curr:Product) => { return acc + (curr.nameOfPrice * curr.count) }, 0)}$
          </div> :
          null
        }
      </div>
    )
  }
}

const mapStateToProps = (state:RootState) => {
  return {
    products: state.products.products
  };
};

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps, null)(ProductList);
