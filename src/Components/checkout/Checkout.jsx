import React, { useContext, useState } from "react";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Heading,
    Button,
    Flex,
  } from '@chakra-ui/react'
import { Timestamp, addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import Context from "../../context/CartContext";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

const Checkout = () => {

    const {cantidad, carrito, valorTotal,eliminarItem, vaciarCarrito} = useContext(Context);
    
    const [usuario, setUsuario] = useState(
        {
            nombre: '',
            mail: '',
            reingresoMail: '',
            dni: '',
            telefono:''
        }
    )

    const[validaEmail, setValidaEmail]=useState(true);

    const[error, setError]= useState({})


    const navigate = useNavigate();

     

   
    const altaUsuario = (event)=>{
        
        setUsuario((usuario)=>({
            ...usuario,
            [event.target.name]: event.target.value    
            }
        ))
    }

    let mailVacio = false;
    const emailValidar = ()=>{
        if(usuario.mail!== ''){   
            if(usuario.mail === usuario.reingresoMail){
                setValidaEmail(true)
            }else{
                setValidaEmail(false)
            }
        }else{
            mailVacio = true;
        }
     }   


    const validarForm = ()=>{
        const errores = {}
        if(usuario.nombre === ''){
            errores.nombre = 'Debe ingresar nombre';
            
        }
        if(usuario.mail ===''){
            errores.mail= 'Debe ingresar mail'
           
        }
        if(usuario.reingresoMail ===''){
            errores.reingresoMail= 'Debe reingresar mail'
            
        }
        if(usuario.dni ===''){
            errores.dni= 'Debe ingresar dni'
           
        }
        if(usuario.telefono ===''){
            errores.telefono= 'Debe ingresar telefono'
            
        }
        setError(errores)

        return Object.keys(errores).length === 0
    }    

    
    

    const enviarOrden = async ()=> {
        emailValidar();
        const esValidoForm = validarForm();
       
       
        
        const contenidoCarrito = cantidad > 0;
      
        if(esValidoForm && validaEmail && contenidoCarrito){
            const ordenColeccion = collection(db, 'ordenes')
        
            try {
                    for(const item of carrito){
                        const productoDocRef = doc(db,'productos',item.id)
                        const productoActual = await getDoc(productoDocRef)

                        const stockActual = productoActual.data().stock

                        if(stockActual >= item.cant){
                            await updateDoc(productoDocRef,{
                                stock: stockActual - item.cant
                            })
                        }else{
                            Swal.fire("No hay stock suficiente para " + `${item.nombre}` +
                            " se elimina del carrito" )
                            eliminarItem(item.id)
                        }
                      
                        
                    }
                
                    const orden = {
                        comprador: usuario,
                        items: carrito,
                         total: valorTotal
                    
                    }

                    const ordenDocRef = await addDoc(ordenColeccion, orden)
                    Swal.fire({
                        title: "Grecias por su compra",
                        text: "Su codigo de orden: "+ ordenDocRef.id ,
                        icon: "success"
                      })            
                    .then(()=>{
                        vaciarCarrito()
                         navigate('/')    
                    })
            } catch (error) {
                console.log(error)
                Swal.fire("Se presento un error, por favor intente  mas tarde. Disculpe las molestias");
            }

            

        }else{
            if(!esValidoForm){
                Swal.fire("Debe completar todos los campos del formulario")
            }
            if(!validaEmail){
                Swal.fire("Los mails ingresados deben coincidir")
            }
            if(!contenidoCarrito){
                Swal.fire("No hay productos en el carrito")
            }
            
        }

    }


return (
    <div className="tablaCaja">
        <Flex direction={"column"} justify= {'center'} align={'center'}  mt={10} w={"100%"}>
        <Heading fontSize={20} textColor={"grey"} mt={15}>Datos de Facturacion</Heading>
            <FormControl w="50%">
                <FormControl  mt={3} >
                    <Input type='text' name="nombre" placeholder="Ingrese nombre" onChange={altaUsuario} />
                  
                </FormControl>
                <FormControl   mt={5} >   
                    <Input type='email'name="mail" placeholder="Ingrese mail"  onChange={altaUsuario}/>
                        
                </FormControl >
                <FormControl   mt={5} >
                    <Input type='email' name="reingresoMail" placeholder="Reingresar mail" onChange={altaUsuario} />
                    
                
                </FormControl  >
                <FormControl   mt={5} >
                    <Input type='text'name="dni" placeholder="Ingrese nro de documento" onChange={altaUsuario}/>
                    
                </FormControl>
                <FormControl mt={5} w={"100%"}>    
                    <Input type='text'name="telefono" placeholder="Ingrese nro de telefono" onChange={altaUsuario}/>
                </FormControl>
                <Flex w={"100%"} justify={"center"}>
                    <button mt={5} onClick={enviarOrden} className="boton-Comprar"> Enviar Orden </button>
                </Flex>   
            </FormControl>
        </Flex>
    </div>
)

}

export default Checkout

