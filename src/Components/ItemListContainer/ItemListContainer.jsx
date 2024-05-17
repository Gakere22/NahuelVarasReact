import { useEffect, useState } from "react";
import Item from "../Item/Item"
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { getProductosByCategoria, getProductos } from "../../asyncMonk";
import { useParams } from "react-router-dom";
import {db} from "../../config/firebase"
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { CircularProgress, CircularProgressLabel, Flex } from '@chakra-ui/react'



export default function ItemListContainer({title}){
    
       
        
        const [items, setItems] = useState([]);
        const{ categoria } = useParams();        
        const [loading, setLoading] = useState(true)       
        
        
        useEffect(()=>{
          
            const getData = async () => {
                const coleccion = collection(db, 'productos')

                const queryRef = !categoria?
                    coleccion
                    :
                    query(coleccion, where('cat' ,'==', categoria))

                    const response = await getDocs(queryRef)

                    const productos = response.docs.map((doc) => {
                
                        const nuevoProd = {
                            ...doc.data(),
                            id: doc.id
                        }
                        return nuevoProd
                    })
                    
                    setItems(productos);
                    setLoading(false);
            }
            getData();

        },[categoria])


        
            

       
       
       

        
        return(
            <>
            <div className="fondo-base">
                
                 
                <div>
                    <h2 className="itemListContainer-titulo">{title}</h2>
                </div>
               <div className="Lista-Item-Conenedor">
                    {
                    loading?
                    <Flex   justify={"center"} align = {"center"} h={"50wh"} >
                        <CircularProgress value={80} />
                    </Flex>
                    :
                    items.map((el)=>(
                        <Item key ={el.id}   id= {el.id} imagen= {el.imagen} nombre={el.nombre} precio1={el.precio} stock1={el.stock} detalle1={el.modelo} detalle2={el.fuerza} detalle3={el.consumo} />
                    ))
                    }
                </div>
                <br/>
                
            </div>
    
            </>
        )
       

}