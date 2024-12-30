

const initalState={
    items:JSON.parse(localStorage.getItem('cart')) || [], // items dùng để lưu thông tin sản phẩm vào local 
    api:[], //api dùng để lưu thông tin sản phẩm của json products
    detailApi:[] //detailApi dùng để lưu thông tin sản phẩm của json productsDetail
}

export const rootReducer=(state=initalState,action)=>{
    
    switch (action.type) {
        case 'cart/addtocart':
            {
                    //logic xử lí thêm vào giỏ hàng trong local
                    const {data}=action.payload
                    

                    const cartCopy= [...state.items]
                    const checkCart= cartCopy.find((product)=>{
                        return product.id === data.id
                    })
                    
                    if(checkCart){
                        checkCart.quantity++
                        checkCart.totalItem=checkCart.quantity * checkCart.price
                        checkCart.dots++
                    }else{
                        cartCopy.push({
                            id:data.id,
                            image:data.image,
                            name:data.name,
                            price:data.price,
                            des:data.des,
                            size:data.size,
                            quantity:1,
                            totalItem:data.price,
                            dots:1,
                            buy:data.buy,
                            buyQuantity:data.buyQuantity
                        })
                    }
                    localStorage.setItem('cart',JSON.stringify(cartCopy))

                    return {
                        ...state,
                        items:cartCopy
                    }
            }
            case 'cart/addtocartdetail':
            {
                    //logic xử lí thêm vào giỏ hàng trong local
                    const {data}=action.payload
                    

                    const cartCopy= [...state.items]
                    const checkCart= cartCopy.find((product)=>{
                        return product.id === data.id
                    })
                    
                    if(checkCart){
                        checkCart.quantity+=data.quantity
                        checkCart.totalItem=checkCart.quantity * checkCart.price
                        checkCart.dots++
                    }else{
                        cartCopy.push({
                            id:data.id,
                            image:data.image,
                            name:data.name,
                            price:data.price,
                            des:data.des,
                            size:data.size,
                            quantity:data.quantity,
                            totalItem:data.price * data.quantity,
                            dots:1,
                            buy:data.buy,
                            buyQuantity:data.buyQuantity
                        })
                    }
                    localStorage.setItem('cart',JSON.stringify(cartCopy))

                    return {
                        ...state,
                        items:cartCopy
                    }
            }            
            
    

        case 'cart/plusitemcart':{

                    // Logic xử lí tăng số lượng sản phẩm trong local

                    const {id}=action.payload
                    const copyCart=[...state.items]
                    const checkPlusCart= copyCart.find((product)=>{
                        return product.id === id
                    })
                    
                    if(checkPlusCart){
                        checkPlusCart.dots++
                        checkPlusCart.quantity++
                        checkPlusCart.totalItem=checkPlusCart.price * checkPlusCart.quantity
                    }
                    localStorage.setItem('cart',JSON.stringify(copyCart))
                    

                    
            return {
                ...state,
                items:copyCart
            }
        }


        case 'cart/minusitemcart':{

                    // Logic xử lí giảm số lượng sản phẩm trong local


                const {id}=action.payload
                const cartCopy=[...state.items]
                const checkMinusCart=cartCopy.find(product=>product.id===id)
                if(checkMinusCart){
                    checkMinusCart.dots--
                    checkMinusCart.quantity--
                    checkMinusCart.totalItem=checkMinusCart.quantity * checkMinusCart.price
                    localStorage.setItem('cart',JSON.stringify(cartCopy))
                }

                if(checkMinusCart.quantity<=0){
                    const removeItemCart=cartCopy.filter(product=>product.id!==id)
                    localStorage.setItem('cart',JSON.stringify(removeItemCart))
                    return {
                        ...state,
                        items:removeItemCart
                    }
                    

                }

            return {
                ...state,
                items:cartCopy
            }
        }


        case 'cart/removeitemcart':{
            // Logic xử lí xóa 1 sản phẩm trong local


            const {id}=action.payload
            const cartCopy= [...state.items]
            const checkRemoveItemCart=cartCopy.filter(product=>product.id!==id)
            localStorage.setItem('cart',JSON.stringify(checkRemoveItemCart))
            
            return {
                ...state,
                items:checkRemoveItemCart
            }
        }

        case 'api/getapiproducts':{

            // lưu trữ json products vào mảng api

            const {data}=action.payload
            

            return {
                ...state,
                api:data
            }
        }

        case 'api/getapiproductsdetail':{


            // lưu trữ json productsDetail vào mảng detailApi


            const {data}=action.payload
            
            return {
                ...state,
                detailApi:data
            }
        }

        default:
                return state
    }

}




