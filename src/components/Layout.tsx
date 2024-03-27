import React, { Dispatch, PureComponent } from 'react';
import { Outlet } from "react-router-dom";
import { BsFillCartPlusFill } from 'react-icons/bs';
import ShopIcons from './ShopIcons';
import Quantity from './Quantity';
import style from './Layout.module.scss';
import { connect } from 'react-redux';
import { Constants } from './actions/actions';
import { RootState, Product } from 'types';
import { addNewProductToBase } from './actions/product-actions';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
;

interface IState {
    displayIcons: boolean,
    image: string,
}

class Layout extends PureComponent<LayoutProps, IState> {

    private nameProduct = React.createRef<HTMLInputElement>();
    private namePrice = React.createRef<HTMLInputElement>();

    constructor(props: LayoutProps) {
        super(props)
        this.state = {
            displayIcons: false,
            image: '',
        }
    }

    showDisplayIcons = () => {
        this.setState({
            displayIcons: !this.state.displayIcons,
        })
    }

    setMoreCount = () => {
        this.props.addCount();
    };

    setLessCount = () => {
        if (this.props.count === 1) {
            return;
        } else {
            this.props.reduceCount();
        }
    };



    addProduct = () => {
        if (this.nameProduct.current?.value && this.namePrice.current?.value && this.state.image) {
            this.props.addName(
                {
                    nameOfProduct: this.nameProduct.current.value,
                    nameOfPrice: Number(this.namePrice.current?.value),
                    image: this.state.image,
                    count: this.props.count,
                }
            );
            this.nameProduct.current.value = '';
            this.namePrice.current.value = '';
            this.setState({
                image: '',
            });
        }
    }

    startImage = () => {
        this.setState({
            image: '',
            displayIcons: !this.state.displayIcons,

        })
    }

    setImage = (picture: string) => {
        if (this.nameProduct.current?.value && Number(this.namePrice.current?.value)) {
            this.setState({
                image: picture,
                displayIcons: !this.state.displayIcons,
            })
        } else {
            alert('Price is Number! Check all strings, please')
        }
    }

    render() {
        return (
            <div className={style.Layout}>
                <div className={style.menu}>
                    <h1>
                        Add product to your cart list
                    </h1>
                    <div className={style.text}>
                        <input type="text" placeholder='Product name' ref={this.nameProduct} />
                        <input type="text" placeholder='Product price' ref={this.namePrice} />
                    </div>
                    <Quantity
                        setMoreCount={this.setMoreCount}
                        setLessCount={this.setLessCount}
                    >
                        {this.props.count}
                    </ Quantity>
                    <div className={style.addicons}>
                        {this.state.image ?
                            <img
                                src={this.state.image}
                                alt=""
                                onClick={this.startImage}
                            />
                            :
                            <BsFillCartPlusFill
                                size={40}
                                color='rgb(173, 173, 173)'
                                onClick={this.showDisplayIcons}
                            />
                        }
                    </div>
                    <>
                        {this.state.displayIcons && <ShopIcons setImage={this.setImage} />}
                    </>
                    <div className={style.addToList}>
                        <button
                            style={{ cursor: `${this.state.image ? 'pointer' : 'not-allowed'}` }}
                            onClick={this.addProduct}>Add to List
                        </button>
                    </div>
                </div>
                <Outlet />
            </div>
        )
    }
}

interface DispatchAction {
    product?: Product,
    type?: Constants
}

type MyExtraArg = undefined;

const mapDispatchToProps = (dispatch: Dispatch<DispatchAction> | ThunkDispatch<Product, MyExtraArg, Action>) => ({
    addName: ({ nameOfProduct, nameOfPrice, image, count}: Product) => {
        dispatch(addNewProductToBase({ nameOfProduct, nameOfPrice, image, count }));
        dispatch({
            type: Constants.RESTART_COUNT,
        });
    },
    addCount: () => {
        dispatch({ type: Constants.ADD_PRICE })
    },
    reduceCount: () => {
        dispatch({ type: Constants.REDUCE_PRICE })
    },
});

const mapStateToProps = (state: RootState) => {
    return {
        count: state.count.count,
    };
};

type LayoutProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
