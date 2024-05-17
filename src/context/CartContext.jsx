import React, { useEffect } from "react";
import { children, createContext, useState } from "react";

const Context = createContext();

export const CartProvider = ({children})=>{

    const[cantidad, setCantidad] = useState(0)
 
    const[carrito, setCarrito] = useState([])

    const[valorTotal, setValorTotal] = useState(0);

    const estaEnCarrito = (id) => {
        
        return carrito.some((pro) => pro.id === id)
        
    }

    

    const agregarAlCarro = (prod,cant) => {
        
        prod.stock = prod.stock - 1
        
        const nuevoProd = {
            ...prod,
            cant
        }
     
        if (estaEnCarrito(nuevoProd.id)){
           
            const carritoActualizado = carrito.map((pro)=>{
                if (pro.id === nuevoProd.id){
                   
                  return ({ ...pro, cant: pro.cant + nuevoProd.cant});
                    
                }
                return pro
            })
            setCarrito(carritoActualizado)
           
        }else{
            
            setCarrito([...carrito, nuevoProd])
            
        }
       
    };
   


    useEffect(()=>{
        let valor = 0;
        let cant = 0;
        carrito.forEach((el) => { 
            valor = valor + (el.precio * el.cant);
            cant = cant + el.cant; 
        });
            setValorTotal(valor);
            setCantidad(cant);
    },[carrito]);

   


    const eliminarItem = (id)=>{
        
        const carritoActualizado = carrito.filter((pro)=>pro.id !== id);
        
        setCarrito([...carritoActualizado]);
    }

        
    
    const vaciarCarrito = ()=> {
        setCarrito([])
    }

    const data = {carrito, cantidad,valorTotal, agregarAlCarro, eliminarItem, vaciarCarrito};


 
 return(
    <>
        <Context.Provider value={data}>
            {children}
        </Context.Provider>
    </>
 )
}

export default Context;
