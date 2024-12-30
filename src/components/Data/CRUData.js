import { API_CART_PRODUCTS, API_INFO_PERSON } from "./getData"

// Hàm xử lí dành cho json cartProducts

// Hàm xử lí thêm sản phẩm
export const addAPICart=async(data)=>{
    try {
        const my_obj_add={
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(data)
        }
        const response= await fetch (API_CART_PRODUCTS,my_obj_add)
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



// Hàm xử lí cập nhật sản phẩm
export const updateAPICart=async(data,id)=>{
    try {
        const my_obj_add={
            method:'PUT',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(data)
        }
        const response= await fetch (API_CART_PRODUCTS+'/'+id,my_obj_add)
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

// Hàm xử lí xóa sản phẩm
export const deleteAPICart=async(id)=>{
    try {
        const my_obj_add={
            method:'DELETE',
        }
        const response= await fetch (API_CART_PRODUCTS+'/'+id,my_obj_add)
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


// Hàm xử lí dành cho json infoPerson

// Hàm xử lí thêm thông tin khách hàng
export const addAPInfoPerson=async(data)=>{
    try {
        const my_obj_add={
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(data)
        }
        const response= await fetch (API_INFO_PERSON,my_obj_add)
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