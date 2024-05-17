
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping} from '@fortawesome/free-solid-svg-icons'
import { faBagShopping} from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react';
import CartContext from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart } from "react-icons/ai";

export default function CartWidget(conta){


    const {cantidad} = useContext(CartContext);

    return(
        <>
            <div className='cartWidgest'>
                <div className='cartWidgestIcon'>
                <Link to='/carrito' >
                    <AiOutlineShoppingCart />
                </Link>
                </div>
                <div>
                <span className='contador-cardWidget'>{cantidad}</span>
                </div>
            </div>
            
        
        </>

    );




}