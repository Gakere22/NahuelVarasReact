import React, { useContext } from "react";
import Context from "../context/CartContext";
import { 
    TableContainer, 
    Table ,
    TableCaption,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Tfoot,
    Box
 } from "@chakra-ui/react";
 import { MdOutlineDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";





const Cart = () => {

    const { carrito, eliminarItem, valorTotal, vaciarCarrito} = useContext(Context)
    
   

    return(

        <div className="tablaCaja">
            { carrito.length > 0 ?
           <TableContainer>
                <Table variant='striped' colorScheme='teal'>
                    <TableCaption fontSize={18}> 
                        <span>Carrito - Valor Total : ${valorTotal}</span>
                         
                        <button className="botonVaciarCarrito" onClick={()=>(vaciarCarrito())}>
                            Vaciar Carrito
                        </button>
                        <button className="botonVaciarCarrito">
                            <Link to='/checkout'> Finalizar Compra </Link>
                        </button>
                    </TableCaption>
                    <Thead>
                    <Tr fontSize={18}>
                        <Th textAlign="center">Nombre</Th>
                        <Th textAlign="center">Precio</Th>
                        <Th textAlign="center" isNumeric>Cantidad</Th>
                        <Th textAlign="center" isNumeric>Valor</Th>
                        <Th textAlign="center" >Acciones</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                        {
                        carrito.map((el)=>(
                            <Tr key={el.id} fontSize={18} justifyItems="center">
                                <Td textAlign="center">{el.nombre}</Td>
                                <Td textAlign="center">{el.precio}</Td>
                                <Td textAlign="right">{el.cant}</Td> 
                                 <Td textAlign="right">{el.precio * el.cant}</Td>
                                <Td textAlign="center"><button onClick={()=>(eliminarItem(el.id))}>
                                        <MdOutlineDeleteOutline />
                                    </button> 
                                </Td>
                            </Tr>
                            
                        ))
                        }
                    
            
                    </Tbody>
                    <Tfoot>
                    
                    </Tfoot>
                </Table>
            </TableContainer>

            : 
            <div>

                <div >
                    <Box  fontSize={25} > Carrito Vacio</Box>
                 </div>
                 <div >
                    <Link to='/'>Inicio</Link>
                 </div>
             </div>            
            }
        </div>
    )
}
export default Cart

