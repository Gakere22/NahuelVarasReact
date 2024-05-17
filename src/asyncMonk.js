
const productos =[{
   
},
];

export default function Productos(){

   
return productos;

}


export const getProductos = ()=>{
    return new Promise((resolve)=>{
        const prod = productos;  
        setTimeout(()=>{
            resolve(prod)
        },1000);
    });
};
        
       
export const getProductosByCategoria = (categoria)=>{
    return new Promise((resolve)=>{
        const prod = productos.filter((pro)=>(pro.cat === categoria))  
        setTimeout(()=>{
            resolve(prod)
        },1000);
    });
};


export const getProductoId = (id)=>{
    return new Promise((resolve)=>{
        const producto = productos.find((pro)=>(pro.id === id));
        setTimeout(()=>{
            resolve(producto);
        },2000);
    });    
};