// Action của các nút trang giao diện ngoại trừ trang chi tiết sản phẩm thêm vào giỏ hàng và lưu vào local trong mảng items
export const addToCart=(data)=>{
    return {
        type:'cart/addtocart',
        payload:{
            data
        }
    }
}

// Action của nút trang chi tiết sản phẩm thêm vào giỏ hàng và lưu vào local trong mảng items
export const addToCartDetail=(data)=>{
    return {
        type:'cart/addtocartdetail',
        payload:{
            data
        }
    }
}


// Action tăng số lượng sản phẩm trong local trong mảng items
export const plusItemCart=(id)=>{
    return {
        type:'cart/plusitemcart',
        payload:id
    }
}



// Action giảm số lượng sản phẩm trong local trong mảng items
export const minusItemCart=(id)=>{ 
    return {
        type:'cart/minusitemcart',
        payload:id
    }
}

// Action xóa sản phẩm trong local  dựa theo id
export const removeItemCart=(id)=>{
    return {
        type:'cart/removeitemcart',
        payload:id
    }
}

// Action lấy thông tin sản phẩm trong json products để lưu vào redux
export const getApiProducts=(data)=>{
    return {
        type:'api/getapiproducts',
        payload:{data}
    }
}


// Action lấy thông tin chi tiết sản phẩm trong json productsDetail để lưu vào redux
export const getApiProductsDetail=(data)=>{
    return {
        type:'api/getapiproductsdetail',
        payload:{data}
    }
}

