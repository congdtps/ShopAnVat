import React, { useCallback, useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import {  selectorsApiDetail} from '../../store/selectors';
import { getCartProductsApi, getProductsDetail } from '../Data/getData';
import { getApiProductsDetail } from '../../store/actions';
import { addToCartDetail } from '../../store/actions';
import { addAPICart , updateAPICart } from '../Data/CRUData';

const Detail = () => {


    // Lưu số lượng mặc định của sản phẩm 
    const [quantity,setQuantity]=useState(1)


    // Hàm xử lí khi tăng số lượng sản phẩm
    const handlerPlusQuantity=()=>{
        setQuantity(quantity=>quantity+1)
    }

    // Hàm xử lí khi giảm số lượng sản phẩm
    const handlerMinusQuantity=()=>{
    
        setQuantity(quantity=>{
            if(quantity>1){
                return quantity-1
            }else{
                return quantity
            }
            
        }
        )
    }

    //Lấy id từ trình duyện
    const {id}=useParams()


    
    const dispatch= useDispatch()


    //Lấy giữ liệu đã được lưu bên redux của mảng có tên là detailApi
    const detailProduct=useSelector(selectorsApiDetail())
    

    // Hàm xử lí so sánh id trên trình duyền, và id của json productsDetail để lưu thông tin vào redux của mảng có tên là detailApi
    const getIdDetail=useCallback(async()=>{
        try {
            const productDetails= await getProductsDetail()
            const checkIdDetail=productDetails.find((product)=>{
                return product.id===id
            })
            dispatch(getApiProductsDetail(checkIdDetail))
                        

        } catch (error) {
            console.log(error);
            
        }
    },[dispatch,id])

    // Hàm xử lí api
    useEffect(()=>{
        getIdDetail()
    },[getIdDetail])

    // Hàm xử lí khi ấn nút mua trong trang chi tiết
    const handlerAddCart=async(data)=>{
        try {
            // Xử lí thêm hoặc cập nhật sản phẩm trong json productsDetail
            const apiProductCart= await getCartProductsApi()
            const checkIdCartProduct=apiProductCart.find(product=>product.id===data.id)
            if(checkIdCartProduct){
                // Cập nhật sản phẩm
                let plusQuantity=checkIdCartProduct.quantity+quantity;
                let plusTotalItem=checkIdCartProduct.price * plusQuantity
                const dataUpdateCart={...checkIdCartProduct,quantity:plusQuantity,totalItem:plusTotalItem}
                await updateAPICart(dataUpdateCart,dataUpdateCart.id)
            }else{
                // Thêm sản phẩm mới
                const dataNew={
                    id:data.id,
                    image:data.image,
                    name:data.name,
                    price:data.price,
                    size:data.size,
                    quantity:quantity,
                }
                await addAPICart(dataNew)
            }

            // Thêm sản phẩm vào mảng có tên items để lưu vào local trong redux
            dispatch(addToCartDetail({
                id:data.id,
                image:data.image,
                name:data.name,
                price:data.price,
                size:data.size,
                quantity:quantity,
            }))          
        } catch (error) {
            console.log(error);
            
        }

    }


    // Hiện thông báo
    const notify = () => toast(`Thêm sản phẩm thành công`,{
        icon:'✅',
        duration: 1000,
    });
    
    

    // Render giao diện
    return (
        <div className='bg-[#fefcf1]'>
        <Toaster position="bottom-right"
                reverseOrder={false} />
            <div className=" py-[180px] mobile:py-[100px] laptop:py-[180px]">
                <div className="w-[1280px] mx-[auto] my-0 mobile:min-w-[355px] mobile:max-w-full mobile:p-[20px]  laptop:px-0  laptop:w-[1280px] laptop:my-[0] laptop:mx-[auto]">
                    <div className=" flex mb-3">
                                <div className=" font-semibold border-r-black border-r-[3px] pr-3 transition-all hover:opacity-60 mobile:text-[18px] laptop:text-[16px]">
                                    <Link to={`/`}>Trang chủ</Link> 
                                </div>
                                <div className=" font-semibold pl-3 transition-all hover:opacity-60 mobile:text-[18px] laptop:text-[16px]">
                                    <Link to={`/`}>Ăn vặt</Link>
                                </div>
                    </div>
                    <div className="grid grid-cols-[600px,50%] justify-between mobile:flex mobile:flex-col tablet:flex-row laptop:grid">
                        <div className="">
                            <div className=" flex my-5 gap-4">
                            <div className=" mobile:hidden laptop:block w-[100px] h-[100px] rounded-2xl">
                                <img className=' max-w-full w-full h-full object-cover rounded-2xl' src={`imgsApi/${detailProduct.image}`} alt="" />
                            </div>
                            <div className=" w-[400px]  rounded-2xl mobile:flex mobile:justify-center laptop:block laptop:w-[400px] laptop:h-[400px]">
                                <img className='max-w-full h-full w-full  object-cover rounded-2xl mobile:w-[250px] mobile:h-[250px] laptop:w-[400px] laptop:h-[400px]' src={`imgsApi/${detailProduct.image}`} alt="" />
                            </div>
                        </div>
                        </div>
                        
                        <div className="">
                            <div className=" text-[32px] font-semibold mobile:text-[22px] mobile:font-bold laptop:text-[32px] laptop:font-semibold">
                                {detailProduct.name}
                            </div>
                            <div className=" text-[28px] font-bold text-mainColor my-3 mobile:text-[22px]">
                                {detailProduct.price} đ
                            </div>
                            <div className=" text-[20px] font-semibold my-4 mobile:text-[22px] laptop:text-[18px] flex items-center gap-10">
                                Số lượng:
                                <div className="grid laptop:grid-cols-[repeat(3,50px)] items-center mobile:mt-2 laptop:mt-0 mobile:grid-cols-[repeat(3,60px)] mobile:justify-center tablet:grid-cols-[repeat(3,30px)] laptop:justify-start">
                                    <div className=" rounded-[10px]   border border-mainColor text-[24px] flex justify-center items-center text-center font-bold hover:bg-mainColor hover:text-white cursor-pointer transition-all" onClick={handlerPlusQuantity}>
                                        +
                                    </div>
                                    <div className=" text-center text-[16px] font-semibold mobile:text-xl laptop:text-[18px]" value={quantity} >{quantity}</div>
                                    <div className="   rounded-[10px]   border border-mainColor text-[24px] flex justify-center items-center text-center font-bold  hover:bg-mainColor hover:text-white cursor-pointer transition-all" onClick={handlerMinusQuantity} >
                                        -
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 my-10">
                                <div className="text-[18px] font-semibold">
                                    Chọn loại: 
                                </div>
                                <div className="">
                                    <button className='px-[20px] py-[8px] w-full border rounded-2xl bg-[#fae88f] border-mainColor font-semibold transition-all hover:bg-mainColor hover:text-white'>{detailProduct.size}</button>
                                </div>
                            </div>
                            <div className=" mt-6 w-[200px] h-[40px] bg-[#87b44b] text-white rounded-[50%] flex justify-center items-center text-xl hover:bg-green-700 transition-all cursor-pointer mobile:w-full mobile:rounded-xl mobile:mt-[40px] laptop:mt-[20px] laptop:rounded-[20px] laptop:w-[300px]" onClick={()=>handlerAddCart(detailProduct)}>
                                <button className='w-full' onClick={notify}>
                                    <i class="fa-solid fa-bag-shopping"></i>
                                </button>
                            </div>
                            <div className=" mt-[40px]">
                                <div className=" font-bold">
                                    Mô tả sản phẩm:
                                </div>
                                <div className="mt-[20px] text-justify font-semibold ">
                                    {detailProduct.des}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;