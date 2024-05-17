import { useState } from "react";
import Swal from 'sweetalert2'

export  const useContador = (inicio = 0, min  , max)=>{

    if (inicio < min || inicio > max) inicio = min;

    const [valor, setValor]= useState(inicio)


    const incrementar = ()=>{
        if (valor < max){
            setValor(valor + 1);
        }else{
            Swal.fire("No hay mas unidades disponibles");
        }
    }

    const decrementar = ()=>{

        if(valor > min){
            setValor(valor - 1 );
        }
    }

    const reiniciar = ()=>{
        setValor(inicio);
    }


    return {valor, incrementar, decrementar, reiniciar}
}