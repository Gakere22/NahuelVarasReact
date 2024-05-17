import { useState } from "react";



export const useListaCarrito = () =>{

    const [lista, setLista] = useState([null]);

    const agregar = (el)=>{
        let prod = lista;    
        if (lista.length === 0){
            setLista([...lista, el])    
        } else{
            const ele = prod.find(elemento =>{
            return elemento.id === el.id
            })
            if(ele ==! undefined){
                ele.stock++;
                setLista(prod)
            } else{
                setLista([...lista, el]);
            }   
            
            }
    }

    return (lista, agregar)
}