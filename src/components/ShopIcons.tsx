import React, { PureComponent } from 'react';
import { images } from '../images.js';
import style from './ShopIcons.module.scss';

interface ShopIconsProps {
    setImage:(image:string)=> void, 
}

export default class ShopIcons extends PureComponent<ShopIconsProps> {
    
    render() {
        return (
            <div className={style.icons}>
                {images.map((image) => <img src={image} key={image} alt='' onClick={()=>this.props.setImage(image)} />)}
            </div>
        )
    }
}


