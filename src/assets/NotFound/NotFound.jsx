import React from "react";
import { Link } from "react-router-dom";

export default function NotFound(){

 const error404 = 'https://i.ibb.co/XVDjBCJ/error404.jpg';
    return (
        <>
        <div className="notFound">    
            <div className="notFound-imagen">            
                <img src={error404}></img>
            </div>
            <Link to='/' className="Links">Volver Inicio</Link>
        </div>
        </>    
         

    )

}