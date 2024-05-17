import React from "react";
import { useEffect, useState }  from "react";
import { getProductoId } from "../../asyncMonk";
import { useNavigate, useParams } from "react-router-dom";
import DetalleItem from "../DetalleItem/DetalleItem";
import { useContext } from "react";
import Context from "../../context/CartContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { CircularProgress, CircularProgressLabel, Flex } from '@chakra-ui/react'
export default function ItemDetailContainer(){


const [prod, setProd] = useState(null);
const { productoId } = useParams()
const {agregarAlCarro} = useContext(Context);



const navigate = useNavigate();
const [loading, setLoading] = useState(true)


useEffect(()=>{
    
    const getProducto = async () =>{

        const queryRef = doc(db, 'productos', productoId)
        const response = await getDoc(queryRef)
        
        const nuevoItem = {
            ...response.data(),
            id: response.id    
        } 
        
        setProd(nuevoItem)
        setLoading(false)
    }
    getProducto()
   
    },[productoId]);



return(
<>
    <div className="fondo-base">
        <div className="Lista-Item-Conenedor">
            {
            loading?
            <Flex   justify={"center"} align = {"center"} h={"50wh"} >
                <CircularProgress value={80} />
            </Flex>
            :
            <DetalleItem prod={prod} agregarAlCarro={agregarAlCarro}  />        
            }
        </div>
    </div>  
</>
)
}
