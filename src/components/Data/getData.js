const API_PRODUCTS='http://localhost:3000/products'
const API_PRODUCTS_DETAIL='http://localhost:3000/productsDetail'
export const API_CART_PRODUCTS='http://localhost:3000/cartProducts'
export const API_INFO_PERSON='http://localhost:3000/infoPerson'


// Lấy api của json products
    export const getData=async()=>{
        try {
            const response= await fetch(API_PRODUCTS)
            if(!response.ok){
            throw new Error("API ERROR");
            }else{
            const data= await response.json()
            
            return data
            }
        } catch (error) {
            console.log(error);    
        }
        }

// Lấy api của json productsDetail
    export const getProductsDetail=async()=>{
        try {
            const response= await fetch(API_PRODUCTS_DETAIL)
            if(!response.ok){
            throw new Error("API ERROR");
            }else{
            const data= await response.json()
            
            return data
            }
        } catch (error) {
            console.log(error);    
        }
        }

// Lấy api của json cartProducts
    export const getCartProductsApi=async()=>{
        try {
            const response=await fetch(API_CART_PRODUCTS)
            if(!response.ok){
                throw new Error("API ERROR");
                
            }else{
                const data=await response.json()
                return data
            }
        } catch (error) {
            console.log(error);
            
        }
    }


// Lấy api của json infoPerson
    export const getInfoPersonApi=async()=>{
        try {
            const response=await fetch(API_INFO_PERSON)
            if(!response.ok){
                throw new Error("API ERROR");
                
            }else{
                const data=await response.json()
                return data
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    