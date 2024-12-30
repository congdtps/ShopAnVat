import React, { useReducer} from 'react';
import chuchuLogo from '../../imgs/chuchu_logo.png';
import {useSelector,useDispatch} from 'react-redux'
import { selectorsItems } from '../../store/selectors';
import { plusItemCart,minusItemCart , removeItemCart} from '../../store/actions';
import { Link } from 'react-router-dom';
import { getCartProductsApi } from '../Data/getData';
import {updateAPICart,deleteAPICart } from '../Data/CRUData';

// state khởi tạo của useReducer
const initialState={
    onNav:`hidden`,
    onCart:`hidden`
}


// Hàm xử lí các action của useReducer, dùng để xử lí các nút bấm mở thanh nav và giỏ hàng trên giao diện mobile và tablet
const handlerNavReduce=(state,action)=>{
    switch (action.type) {
        // Action ấn vào icon menu thì hiện ra nav
        case 'CLICK':
            {  

                return {...state,onNav:`block`}
            }
            
        // Action ấn vào icon close hoặc ấn vào vùng đc bảo bọc bởi nav thì ẩn nav
        case 'CLOSE':{
            return {...state,onNav:`hidden`}
        }


        // Action ấn vào icon cart thì hiện ra giỏ hàng
        case 'CLICKCART':{
            return {
                ...state,
                onCart:`flex`
            }
        }

        // Action ấn vào icon close hoặc vùng được bao bọc bởi cart thì ẩn cart
        case 'CLOSECART':{

            return {
                ...state,
                onCart:`hidden`
            }
        }

        default:
            alert("Hehe, Tìm người ta yêu")
            break;
    }

    return state
}





const Header = () => {
    // hook useReducer
    const [state,dispatch]= useReducer(handlerNavReduce,initialState)

    // Hàm xử lí ấn vào icon menu
    const handlerClickNav=()=>{
        dispatch({
            type:"CLICK"
        })
    }

    // Hàm xử lí ấn vào icon close 
    const handlerClickClose=()=>{
        dispatch({
            type:"CLOSE"
        })
        
    }

    // Hàm xử lí ấn vào vùng bao bọc nav
    const handlerClickNavClose=()=>{
        dispatch({
            type:"CLOSE"
        })        
    }

    // Hàm xử lí dừng sự kiện sủi bọt của nav
    const handlerStopCloseEvent=(e)=>{
        e.stopPropagation()
            
    }

    // Hàm xử lí khi ấn vào icon cart
    const handlerClickCart=()=>{
        dispatch({
            type:"CLICKCART"
        })
    }

    // Hàm xử lí khi ấn vào icon close
    const handlerClickCartClose=()=>{
        dispatch({
            type:"CLOSECART"
        })
    }

    // Hàm xử lí ấn vào vùng bao bọc cart
    const handlerClickCartEvent=()=>{
        dispatch({
            type:"CLOSECART"
        })
    }

    // Hàm xử lí dừng sự kiện sủi bọt của cart
    const handlerClickCartCloseEvent=(e)=>{
        e.stopPropagation()
    }


    // Lấy giá trị từ mảng items trong redux
    const cartSelector= useSelector(selectorsItems())
    
    // Tính tổng số lượng sản phẩm hiện có trong mảng items
    const totalQuantity= cartSelector.reduce((total,result)=>{
        return total + result.quantity
    },0)


    const dispatchCart=useDispatch()

    // Hàm xử lí nút tăng số lượng
    const handlerBuyPlus= async(id,product)=>{
        try {
                // Xử lí cập nhật số lượng trong json cartProducts
                const dataProductsCart=await getCartProductsApi()
                    const checkIdCart= dataProductsCart.find(item=>item.id===product.id)
                        if(checkIdCart){
                            let plusQuantity=checkIdCart.quantity+1
                            let plusTotalItem= checkIdCart.price * plusQuantity
                            let  updataData={...checkIdCart,quantity:plusQuantity,totalItem:plusTotalItem}
                            await updateAPICart(updataData,product.id)
                            }
                            // Xử lí lấy thông tin id sản phẩm để so sánh rồi cập nhật thêm sản phẩm đó trong redux
                            dispatchCart(plusItemCart({
                                id
                            }))
        } catch (error) {
            console.log(error);
            
        }
    }

    // Hàm xử lí nút giảm số lượng 
    const handlerBuyMinus=async(id,product)=>{
        try {

            const dataProductsCart=await getCartProductsApi()
            const checkIdCart= dataProductsCart.find(item=>item.id===product.id)
                // Xử lí cập nhật giảm số lượng sản phẩm trong json cartProducts
                if(checkIdCart.quantity>1){
                    let plusQuantity=checkIdCart.quantity-1
                    let plusTotalItem= checkIdCart.price * plusQuantity
                    let  updataData={...checkIdCart,quantity:plusQuantity,totalItem:plusTotalItem}
                    await updateAPICart(updataData,product.id)
                }
                // Xử lí xóa sản phẩm json cartProducts
                else{
                    await deleteAPICart(checkIdCart.id)
                }

                // Xử lí lấy thông tin id sản phẩm để so sánh rồi cập nhật xóa số lượng sản phẩm đó trong redux
                dispatchCart(minusItemCart({
                    id
                }))
        } catch (error) {
            console.log(error);
            
        }
    }

    // Hàm xử lí nút xóa sản phẩm
    const handlerBuyRemove=async(id)=>{
        try {
            // Xử lí xóa sản phẩm trong json cartProducts
            const dataProductsCart=await getCartProductsApi()
            const checkIdCartProduct=dataProductsCart.find(product=>product.id===id)
            if(checkIdCartProduct){
                await deleteAPICart(checkIdCartProduct.id)
            }
            
            // Xử lí lấy thông tin id sản phẩm để so sánh rồi xóa đó sản phẩm trong redux
            dispatchCart(removeItemCart({
                id
            }))
        } catch (error) {
            console.log(error);
            
        }
    }

    // Render giao diện

    return (
        <div>
            <div className=" bg-[#e1ecd2] fixed top-0 right-0 left-0 z-10 ">
                <div className="w-[1280px] h-[80px] my-[0] mx-[auto] flex justify-between items-center mobile:px-[30px] mobile:min-w-[355px] mobile:max-w-full laptop:px-0  laptop:w-[1280px] laptop:my-[0] laptop:mx-[auto] ">
                    <div className="laptop:hidden">
                        <div className="mobile:text-[24px] w-[44px] h-[44px] flex items-center text-[40px] text-mainColor " onClick={handlerClickNav}>
                            <i class="fa-solid fa-bars"></i>
                        </div>
                        
                    </div>
                    <div className="w-[44px] h-[44px] ">
                    <Link to={`/`}>
                        <img className='max-w-full w-full h-full object-cover' src={chuchuLogo} alt="" />
                    </Link>
                    </div>
                    <div className="w-[670px] relative mobile:hidden laptop:block">
                        <input className='w-full py-[8.5px] pr-0 pl-[14px] rounded-3xl focus:outline-[#87b44b]' type="text" name="" id="" placeholder='Nhập từ khóa sản phẩm' />
                        <div className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer text-xl text-mainColor ">
                        <i className='' class="fa-solid fa-magnifying-glass"></i>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 ">
                    <div className="cursor-pointer text-xl text-mainColor laptop:hidden ">
                        <i className='' class="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <div className=" relative w-[40px] h-[40px] bg-mainColor text-white rounded-[50%] flex justify-center items-center text-xl hover:bg-green-700 transition-all cursor-pointer" onClick={handlerClickCart}>
                        <i class="fa-solid fa-bag-shopping"></i>
                        <span className=' absolute top-[-8px] right-[-6px] w-[20px] h-[20px] bg-white rounded-[50%] flex justify-center items-center text-black font-semibold text-[16px]'>
                        {0|| totalQuantity}
                        </span>
                    </div>
                    </div>
                </div>
                <div className="bg-[#87b44b] ">
                    <div className={`w-[1280px]  my-[0px] mx-[auto] mobile:${state.onNav} mobile:fixed mobile:inset-0  mobile:bg-[#00000080] laptop:bg-mainColor  mobile:min-w-[355px] mobile:max-w-full laptop:px-0 laptop:block laptop:w-[1280px] laptop:my-[0] laptop:mx-[auto] laptop:relative`} onClick={handlerClickNavClose}>
                        <ul className={`h-[60px] flex justify-center  gap-8 items-center mobile:block mobile:animate-pullRight  mobile:top-0 mobile:w-[280px] mobile:bg-white mobile:h-[500px] mobile:shadow-xl  laptop:w-full laptop:h-[60px] laptop:bg-mainColor laptop:flex  laptop:relative`} onClick={handlerStopCloseEvent}>
                            <div className=" mobile:flex laptop:hidden flex justify-end pr-10 py-5 text-xl" onClick={handlerClickClose}>
                                <i class="fa-solid fa-x"></i>
                            </div>
                            <li className='mobile:pl-[20px] mobile:pb-6 mobile:pt-5 laptop:pt-0 laptop:pb-0 laptop:pl-0'><Link className={`text-[18px] text-white font-semibold hover:text-green-800 transition-all laptop:text-white mobile:text-mainColor`} to={`/`}>Trang chủ</Link></li>
                            <li className='mobile:pl-[20px] mobile:pb-6  laptop:pb-0 laptop:pl-0'><Link className={`text-[18px] text-white font-semibold hover:text-green-800 transition-all mobile:text-black laptop:text-white`} to={`/`}>Tất cả sản phẩm</Link></li>
                            <li className='mobile:pl-[20px] mobile:pb-6  laptop:pb-0 laptop:pl-0'><Link className={`text-[18px] text-white font-semibold hover:text-green-800 transition-all mobile:text-black laptop:text-white`} to={`/`}>Mới ra mắt</Link></li>
                            <li className='mobile:pl-[20px] mobile:pb-6  laptop:pb-0 laptop:pl-0'><Link className={`text-[18px] text-white font-semibold hover:text-green-800 transition-all mobile:text-black laptop:text-white`} to={`/`}>Bán chạy</Link></li>
                            <li className='mobile:pl-[20px] mobile:pb-6  laptop:pb-0 laptop:pl-0'><Link className={`text-[18px] text-white font-semibold hover:text-green-800 transition-all mobile:text-black laptop:text-white`} to={`/cart`}>Giỏ hàng</Link></li>
                        </ul>
                    </div>
                </div>
                <div className={`fixed inset-0 ${state.onCart} justify-end bg-[#00000080]`} onClick={handlerClickCartEvent}>
                    <div className=" bg-white w-1/2 animate-pullLeft h-auto mobile:w-full tablet:w-1/2" onClick={handlerClickCartCloseEvent}>
                        <div className=" border-b-[#96a6ba] border-b">
                            <div className=" flex justify-between p-8">
                                <div className="flex items-center gap-2 text-xl">
                                    <div className=" font-semibold">
                                        <i class="fa-solid fa-bag-shopping"></i>
                                    </div>
                                    <div className=" font-semibold">
                                        {totalQuantity} Sản phẩm
                                    </div>
                                </div>
                                <div className="text-xl font-semibold transition-all hover:opacity-40 cursor-pointer" onClick={handlerClickCartClose}>
                                    <i class="fa-solid fa-x"></i>
                                </div>
                            </div>
                        </div>
                        <div className=" h-[500px] overflow-auto mobile:h-[400px] tablet:h-[450px] laptop:h-[500px]">
                            {cartSelector.map((product,index)=>{
                                return (
                            <div className="pt-8 px-8" key={product.id}>
                                <div className="">
                                    <div className=" flex justify-between items-center">
                                        <div className={`flex items-center gap-4`}>
                                                <div className="grid laptop:grid-cols-[repeat(1,40px)] items-center mobile:mt-2 laptop:mt-0 mobile:grid-cols-[repeat(1,40px)]">
                                                    <div className=" rounded-[10px]   border border-mainColor text-[24px] flex justify-center items-center text-center font-bold hover:bg-mainColor hover:text-white cursor-pointer transition-all" onClick={()=>handlerBuyPlus(product.id,product)} >
                                                        +
                                                    </div>
                                                    <div className=" text-center py-2 text-xl font-semibold">{product.quantity}</div>
                                                    <div className="   rounded-[10px]   border border-mainColor text-[24px] flex justify-center items-center text-center font-bold  hover:bg-mainColor hover:text-white cursor-pointer transition-all" onClick={()=>handlerBuyMinus(product.id,product)}>
                                                        -
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <div className="flex items-center gap-4">
                                                        <div className=" w-[80px] h-[80px]">
                                                            <img className='w-[80px] h-[80px]  max-w-full  object-cover rounded-[50%] mobile:w-full mobile:h-full' src={`imgsApi/${product.image}`} alt="" />
                                                        </div>
                                                        <div className="">
                                                            <div className=" font-bold  text-xl mobile:text-[16px]">
                                                                {product.name}
                                                            </div>
                                                            <div className="py-2 opacity-80">
                                                                <small>{product.price}đ x {product.quantity}</small>
                                                            </div>
                                                            <div className=" text-mainColor font-bold  text-xl mobile:text-[18px]">
                                                                {product.totalItem} đ
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                        </div>
                                        <div className=" transition-all hover:opacity-40 cursor-pointer mobile:text-xl" onClick={()=> handlerBuyRemove(product.id)}>
                                            <i class="fa-solid fa-x"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                )
                            })}

                        </div>
                       
                        <Link to={`/cart`}>
                        <div className="p-8">
                            <button className=' bg-mainColor text-white p-2 w-full rounded-2xl transition-all hover:bg-green-800 font-bold mobile:p-4 mobile:text-xl laptop:p-2'>Xem giỏ hàng</button>
                        </div>
                        </Link>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default Header;