import React, { PureComponent } from 'react';
import style from './Layout.module.scss';

interface QuantityProps {
    setMoreCount: ()=>void,
    setLessCount:()=>void,
    children:React.ReactNode
}

export default class Quantity extends PureComponent<QuantityProps> {

    render() {
        return (
            <div className={style.quantity}>
                <button onClick={this.props.setMoreCount}>+</button>
                <span>{this.props.children}</span>
                <button onClick={this.props.setLessCount}>-</button>
            </div>
        )
    }
}

