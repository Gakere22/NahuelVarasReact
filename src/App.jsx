import React from "react"
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MenuNavegacion from "./Components/NavBar/MenuNavegacion"
import ItemListContainer from "./Components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./Components/ItemDetailContainer/ItemDetailContainer"  
import Cart from "./Components/Cart"
import { ChakraProvider, Flex } from "@chakra-ui/react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import NotFound from "./assets/NotFound/NotFound"
import { CartProvider } from "./context/CartContext"
import Checkout from "./Components/checkout/Checkout"




function App() {





  const [prodCompra, setProdCompra] = useState([]);

  
 
    
  

  return (
    <>
    <Flex justify="center" direction={"column"}w={"100%"}>
    <ChakraProvider>
    <CartProvider>
        <BrowserRouter>
          <MenuNavegacion></MenuNavegacion>
          <Routes>
            <Route path='/' element={ <ItemListContainer  title='Tienda'/>} > </Route> 
            <Route path='/productos/:productoId' element={<ItemDetailContainer title='Detalle'/>}> </Route>
            <Route path='/categorias/:categoria' element={ <ItemListContainer  title='Tienda Categoria'/>} > </Route>               
            <Route path='/carrito' element={<Cart title='Carrito' />} > </Route>
            <Route path='/checkout' element={<Checkout title="Checkout"/> }> </Route>  
            <Route path='/*' element={<NotFound title='Pagina No encontrada' />} > </Route> 
          </Routes>
        </BrowserRouter>
      </CartProvider>
      
    </ChakraProvider>
    </Flex>
    </>
  )
}

export default App
