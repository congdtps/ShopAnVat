import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { selectorsItems } from '../../store/selectors';
import { plusItemCart,minusItemCart,removeItemCart } from '../../store/actions';
import { getCartProductsApi } from '../Data/getData';
import { updateAPICart , deleteAPICart } from '../Data/CRUData';


const Cart = () => {

    // Lấy giữ liệu từ mảng items trong redux
    const cartItemsApi=useSelector(selectorsItems())
    const dispatch=useDispatch()

    // Tính tổng số tiền của giỏ hàng
    const totalAllCart=cartItemsApi.reduce((total,result)=>{
        return total+result.totalItem
    },0)

    // Tính tổng số lượng sản phẩm của giỏ hàng
    const totalQuantityCart=cartItemsApi.reduce((total,result)=>{
        return total+result.quantity
    },0)



    // Hàm xử lí thêm sản phẩm
    const handlerBuyPlus=async (id,product)=>{
        try {
            // Xử lí cập nhật tăng sản phẩm đã có trong json productsDetail
            const dataProductsCart=await getCartProductsApi()
            const checkIdCartProduct=dataProductsCart.find(value=>value.id===id)
            if(checkIdCartProduct){
                const plusQuantity=checkIdCartProduct.quantity+1
                const plusTotalItem=checkIdCartProduct.price * plusQuantity
                const updataCartApi={...checkIdCartProduct, quantity:plusQuantity,totalItem:plusTotalItem}
                await updateAPICart(updataCartApi,updataCartApi.id)
                
            }
            // Xử lí thêm sản phẩm vào mảng items trong redux
            dispatch(plusItemCart({
                id:product.id,
                image:product.image,
                name:product.name,
                price:product.price,
                quantity:product.quantity,
                size:product.size,
                totalItem:product.price
            }))

        } catch (error) {
            console.log(error);
            
        }
    }


    // Hàm xử lí giảm số lượng sản phẩm 
    const handlerBuyMinus=async (id,product)=>{
        try {
            const dataProductsCart=await getCartProductsApi()
            const checkIdCartProduct=dataProductsCart.find(value=>value.id===id)
            // Xử lí cập nhật giảm sản phấm trong json productsDetail
            if(checkIdCartProduct.quantity>1){
                let minusQuantity=checkIdCartProduct.quantity-1
                let minusTotalitem=checkIdCartProduct.price * minusQuantity
                const updataCartApi={...checkIdCartProduct,quantity:minusQuantity,totalItem:minusTotalitem}
                await updateAPICart(updataCartApi,updataCartApi.id)
            }else{
            // Xử lí cập nhật xóa sản phấm trong json productsDetail
                const updataCartApi={...checkIdCartProduct}
                await deleteAPICart(updataCartApi.id)
                
            }
            dispatch(minusItemCart({
                id
            }))
        } catch (error) {
            console.log(error);
            
        }
    }

    // Hàm xử lí xóa sản phẩm
    const handlerBuyDelete=async(id)=>{
        try {
            // Xử lí cập nhật xóa sản phấm trong json productsDetail
            const dataProductsCart=await getCartProductsApi()
            const checkIdCartProduct=dataProductsCart.find(value=>value.id===id)
            if(checkIdCartProduct){
                const deleteCartApi={...checkIdCartProduct}
                await deleteAPICart(deleteCartApi.id)
            }
            // Xử lí xóa sản phẩm trong mảng items trong redux
            dispatch(removeItemCart({
                id
            }))
        } catch (error) {
            console.log(error);
            
        }
    }


    // Nút mua xử lí đưa người dùng sang trang checkout hoặc báo lỗi chưa mua sản phẩm
    const handlerBuyCart=(total)=>{
        if(total<1){
            toast.error("Vui lòng thêm sản phẩm.",{
            duration:1500
            })
        }else{
            window.location.href=`/#/checkout`
        }
    }


    // Render giao diện
    return (
        <div className='pt-[180px] bg-[#fefcf1] mobile:pt-[100px] laptop:pt-[180px] '>
                    <Toaster
            position="bottom-center"
            reverseOrder={true}
            />
            <div className="w-[1280px] my-[0px] mx-[auto] mobile:min-w-[355px] mobile:max-w-full laptop:px-0  laptop:w-[1280px] laptop:my-[0] laptop:mx-[auto] mobile:p-[20px]">
                <div className=" font-bold text-2xl mb-[40px] mobile:text-3xl laptop:text-2xl">
                    Giỏ hàng
                </div>
                <div className=" flex justify-between gap-[30px] mobile:flex-col laptop:flex-row">
                    <div className=" w-[70%] mobile:w-full laptop:w-[70%]">
                        <div className=" mb-[30px]">
                            <div className="flex justify-between bg-white p-[30px] rounded-2xl shadow-md mobile:flex-col tablet:flex-row laptop:flex-row">
                                <div className="">
                                    Tổng sản phẩm ({totalQuantityCart} sản phẩm)
                                </div>
                                <div className="flex gap-[75px] mr-[30px] mobile:hidden tablet:flex tablet:mr-[15px] tablet:gap-[60px] laptop:mr-[30px] laptop:gap-[75px] laptop:flex">
                                    <div className="">Đơn giá</div>
                                    <div className="">Số lượng</div>
                                    <div className="">Thành tiền</div>
                                </div>
                            </div>
                        </div>
                        {cartItemsApi.map((product)=>{
                            return (
                        <div className=" p-[30px] bg-white rounded-2xl shadow-md flex justify-between mb-4 mobile:p-[20px] mobile:flex-col items-center tablet:flex-row laptop:flex-row laptop:p-[30px]" key={product.id}>
                            <div className="flex items-center gap-4 ">
                                <div className="">
                                    <img className='w-[100px] h-[100px] object-cover rounded-2xl mobile:w-[80px] mobile:h-[80px] laptop:w-[100px] laptop:h-[100px]' src={`imgsApi/${product.image}`} alt="" />
                                </div>
                                <div className="">
                                    <div className=" font-bold text-mainColor text-xl mobile:text-[18px] laptop:text-xl">
                                        {product.name}
                                    </div>
                                    <div className=" text-center mt-1 rounded-2xl bg-[#fae88f] border py-[4px] font-bold">
                                        {product.size}
                                    </div>
                                </div>
                            </div>
                            <div className=" grid grid-cols-[130px,120px,130px]  items-center mobile:grid-cols-[280px] mobile:items-center mobile:grid-rows-[repeat(3,50px)] tablet:grid-cols-[130px,120px,130px] tablet:grid-rows-[0] laptop:grid-rows-[0] laptop:grid-cols-[130px,120px,130px]">
                                <div className="font-bold mobile:flex mobile:justify-center laptop:block ">
                                    {product.price} đ
                                </div>
                                <div className="grid laptop:grid-cols-[repeat(3,30px)] items-center mobile:mt-2 laptop:mt-0 mobile:grid-cols-[repeat(3,60px)] mobile:justify-center tablet:grid-cols-[repeat(3,30px)] laptop:justify-start">
                                    <div className=" rounded-[10px]   border border-mainColor text-[24px] flex justify-center items-center text-center font-bold hover:bg-mainColor hover:text-white cursor-pointer transition-all" onClick={()=>handlerBuyPlus(product.id,product)} >
                                        +
                                    </div>
                                    <div className=" text-center text-[16px] font-semibold mobile:text-xl laptop:text-[16px]">{product.quantity}</div>
                                    <div className="   rounded-[10px]   border border-mainColor text-[24px] flex justify-center items-center text-center font-bold  hover:bg-mainColor hover:text-white cursor-pointer transition-all" onClick={()=>handlerBuyMinus(product.id,product)}>
                                        -
                                    </div>
                                </div>
                                <div className="flex gap-4 items-center justify-end mobile:justify-end laptop:justify-end">
                                    <div className=" font-bold text-mainColor text-xl mobile:text-[16px] laptop:text-xl mobile:hidden  tablet:block laptop:block">
                                        {product.totalItem} đ
                                    </div>
                                    <div className=" hover:text-red-500 transition-all cursor-pointer" onClick={()=>handlerBuyDelete(product.id)}>
                                        <i class="fa-solid fa-trash"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                            )
                        })}
                        
                        <Link to={`/`}>
                        <div className=" my-[64px]">
                            <button className='p-2 bg-mainColor rounded-xl text-white font-bold transition-all hover:opacity-60 shadow-xl'>
                                Thêm sản phẩm
                            </button>
                        </div>
                        </Link>
                        
                    </div>
                    <div className=" w-[30%] mobile:w-full laptop:w-[30%]">
                        <div className=" bg-white rounded-2xl shadow-md p-[30px] mb-[10px]">
                            <div className="flex justify-between mb-[20px]">
                                <div className="text-[16px] font-semibold">Giao tới</div>
                                <div className=" text-mainColor font-bold cursor-pointer hover:opacity-60 transition-all">Thêm địa chỉ</div>
                            </div>
                            <div className="text-center font-bold">Vui lòng thêm địa chỉ</div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-md p-[30px] mb-[10px]">
                            <div className=" flex justify-between items-center mb-[10px]">
                                <div className=" font-semibold">Khuyến mãi</div>
                                <div className=""><button className='p-[10px] bg-mainColor rounded-2xl text-white hover:bg-[#e1ecd2] hover:text-mainColor transition-all font-bold shadow-md border-black'>Áp dụng</button></div>
                            </div>
                            <div className="">
                            <input className='w-full border border-black py-[6px] px-[10px] rounded-lg mt-[10px]' type="text" name="" id="" placeholder='Nhập mã khuyến mãi' />
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-md p-[30px] mb-[10px]">
                            <div className=" flex justify-between mb-[20px] items-center">
                                <div className="">Tạm tính</div>
                                <div className="font-bold">{totalAllCart} đ</div>
                            </div>
                            <div className="flex justify-between mb-[20px] items-center">
                                <div className="">Mã khuyến mãi</div>
                                <div className="font-bold">0đ</div>
                            </div>
                            <div className="flex justify-between mb-[20px] items-center">
                                <div className="">Phí vận chuyển</div>
                                <div className="font-bold">0đ</div>
                            </div>
                            <div className="flex justify-between mb-[20px] items-center">
                                <div className="">Tổng tiền</div>
                                <div className="font-bold text-xl text-mainColor">{totalAllCart} đ</div>
                            </div>
                        </div>
                        <div className=" w-full mb-[64px] mt-[40px]">
                            <button className='w-full bg-mainColor p-[8px] rounded-2xl text-white font-bold hover:bg-green-800 transition-all hover:text-white' onClick={()=>handlerBuyCart(totalAllCart)}>Mua hàng</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;