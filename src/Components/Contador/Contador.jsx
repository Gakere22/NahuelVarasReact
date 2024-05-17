import React from "react";
import { useContador } from "../../hook/useContador";


export default function Contador(){

    const[valor, incrementar, decrementar, reiniciar]= useContador(1,0,10)

    
    return(
        <>
        <div>
            <div>{valor}</div>
            <div>
                <button onClick={incrementar}> + </button>
                <button onClick={reiniciar}> Eliminar </button>
                <button onClick={decrementar}> - </button>
            </div>
        </div>
        </>
    )
    
 }

