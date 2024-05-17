import { Link } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget'
import { Button, Menu, MenuButton } from '@chakra-ui/react';
import { MenuList } from '@chakra-ui/react';
import { MenuItem } from '@chakra-ui/react';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Flex } from '@chakra-ui/react';

export default function MenuNavegacion(){

    
    return(
        <> 
          <nav className='background-nav-bar'>
               
                <div className='nav-bar'>
                    <button className="boton-nav-bar" >
                        <Link to='/categorias/Maquinas'  >Maquinas</Link>
                    </button>           
                    <button className="boton-nav-bar">
                        <Link to='/categorias/Repuestos'>Repuestos</Link>
                    </button>  
                </div>          
            
                
            <CartWidget ></CartWidget>   
         </nav>
        </> 
    );
}