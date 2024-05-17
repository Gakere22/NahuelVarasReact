
import { useState } from "react";
import { useContador } from "../../hook/useContador";
import { Link } from "react-router-dom";


export default function DetalleItem({prod, agregarAlCarro}){
  
    
    const {valor, incrementar, decrementar, reiniciar} = useContador(1,0,prod.stock);


    
   
        return(
            <> {prod!==undefined?
            <div className="item-Producto-Marco">
                <div className="item-Producto">
                    <div className="item-Producto-Imagen-Contenedor">
                    <img src= {prod.imagen} className="item-Producto-Imagen" ></img>
                    </div>
                    <div className="item-Producto-Descripcion">
                        <span className="item-Producto-Descripcion-Texto">Modelo {prod.modelo}</span>
                        <br/>
                        <span className="item-Producto-Descripcion-Texto">Fuerza {prod.fuerza}</span>
                        <br/>
                        <span className="item-Producto-Descripcion-Texto">Consumo {prod.consumo}</span>
                        <div>
                            <span className="item-Producto-Descripcion-Texto">{valor}</span>
                            <br/>
                            <button className="botonItemDetalle" onClick={incrementar}>+</button>
                            {prod.stock > 0?<button className="botonItemDetalle" onClick={() => agregarAlCarro(prod,valor)}>Agregar al Carrito</button>:<span>Sin stock disponible</span>}
                        
                            <button className="botonItemDetalle" onClick={decrementar}>-</button>
                        </div>
                        <button className="boton-Ir-Carrito">
                            <Link to='/carrito'>Ir al Carrito</Link>
                        </button>
                    </div>
                </div>
            </div>
             : <span></span>
                }
            </>
        )

}

/*()=>(agregarAlCarro(valor))*/ 