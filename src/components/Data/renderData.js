import React, { useCallback, useEffect} from 'react';
import {useDispatch ,useSelector} from 'react-redux'
import toast, { Toaster } from 'react-hot-toast'
import { getData } from './getData';
import imgIntro from '../../imgs/intro2.png';
import { addToCart,getApiProducts } from '../../store/actions';
import { selectorsApi } from '../../store/selectors';
import { Link } from 'react-router-dom';
import {getCartProductsApi } from './getData';
import { addAPICart,updateAPICart } from './CRUData';
// Làm phần body của trang chủ


    const RenderData = () => {

        const dispatch=useDispatch()

        // Gọi api của products
        const fetchApiProducts=useCallback( async()=>{
            try {
                const data= await getData()
                dispatch(getApiProducts(
                    data
                ))
            } catch (error) {
                console.log(error);
                
            }
        },[dispatch])


        // Xử lí api
        useEffect(()=>{
            fetchApiProducts()
        },[fetchApiProducts])


        // Gọi selector của mảng items của redux để render giao diện
        const cartSelector=useSelector(selectorsApi())        


        // Hàm xử lí khi ấn nút mua trên giao diện
        const handlerBuy=async (product)=>{
            try {
                // Xử lí thêm mới sản phẩm hoặc cập nhật sản phẩm trong json cartProducts
                const dataProductsCart=await getCartProductsApi()
                const checkIdCart= dataProductsCart.find(item=>item.id===product.id)
                // Xử lí cập nhật sản phẩm
                if(checkIdCart){
                    let plusQuantity=checkIdCart.quantity+1
                    let plusTotalItem= checkIdCart.price * plusQuantity
                    let  updataData={...checkIdCart,quantity:plusQuantity,totalItem:plusTotalItem}
                    await updateAPICart(updataData,product.id)
                }else{
                // Xử lí thêm mới sản phẩm
                    const dataProducts={
                        id:product.id,
                        image:product.image,
                        name:product.name,
                        price:product.price,
                        quantity:1,
                        size:product.size,
                        totalItem:product.price
                    }
                    await addAPICart(dataProducts)
                }

                // Xử lí thêm dữ liệu vào redux có state là items để lưu vào local
                dispatch(addToCart({
                    id:product.id,
                    image:product.image,
                    name:product.name,
                    price:product.price,
                    quantity:1,
                    size:product.size,
                    totalItem:product.price
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
            
            <div className='bg-[#fefcf1] laptop:px-0 mobile:pb-[64px]'>
            <div>
            <Toaster position="bottom-right"
                reverseOrder={false} />
    </div>
            <div className="w-[1280px] my-[0] mx-[auto] mobile:min-w-[355px] mobile:max-w-full mobile:mx-[0] laptop:w-[1280px] laptop:my-[0] laptop:mx-[auto]">
                <div className=" flex justify-between pt-[42px] pb-[64px] mobile:justify-center mobile:gap-4  tablet:mx-[10px] flex-wrap laptop:justify-between">
                    <div className="flex mobile:min-w-[168px] tablet:w-[250px] laptop:w-[268px] mobile:flex-col laptop:flex-row h-[98px] laptop:gap-4 laptop:text-start mobile:gap-0 mobile:text-center items-center justify-center bg-white rounded-[10px]">
                        <div className="mobile:text-[20px] laptop:text-[50px] text-[#87b44b]">
                            <i class="fa-solid fa-box"></i>
                        </div>
                        <div className="">
                            <h2 className=' mobile:text-[16px] laptop:text-[20px] font-bold'>Hàng hóa</h2>
                            <p className='text-[14px]'>Luôn luôn tươi ngon</p>
                        </div>
                    </div>
                    
                    <div className="flex mobile:min-w-[168px] tablet:w-[250px] laptop:w-[268px] mobile:flex-col laptop:flex-row h-[98px] laptop:gap-4 laptop:text-start mobile:gap-0 mobile:text-center items-center justify-center bg-white rounded-[10px]">
                        <div className="mobile:text-[20px] laptop:text-[50px] text-[#87b44b]">
                            <i class="fa-solid fa-truck"></i>
                        </div>
                        <div className="">
                            <h2 className=' mobile:text-[16px] laptop:text-[20px] font-bold'>Giao hàng</h2>
                            <p className='text-[14px]'>Nhanh chóng tiết kiệm</p>
                        </div>
                    </div>
                    <div className="flex mobile:min-w-[168px] tablet:w-[250px] laptop:w-[268px] mobile:flex-col laptop:flex-row h-[98px] laptop:gap-4 laptop:text-start mobile:gap-0 mobile:text-center items-center justify-center bg-white rounded-[10px]">
                        <div className="mobile:text-[20px] laptop:text-[50px] text-[#87b44b]">
                            <i class="fa-solid fa-users"></i>
                        </div>
                        <div className="">
                            <h2 className=' mobile:text-[16px] laptop:text-[20px] font-bold'>Tư vấn</h2>
                            <p className='text-[14px]'>Chu đáo tận tâm</p>
                        </div>
                    </div>
                    <div className="flex mobile:min-w-[168px] tablet:w-[250px] laptop:w-[268px] mobile:flex-col laptop:flex-row h-[98px] laptop:gap-4 laptop:text-start mobile:gap-0 mobile:text-center items-center justify-center bg-white rounded-[10px]">
                        <div className="mobile:text-[20px] laptop:text-[50px] text-[#87b44b]">
                            <i class="fa-solid fa-burger"></i>
                        </div>
                        <div className="">
                            <h2 className=' mobile:text-[16px] laptop:text-[20px] font-bold'>Thực phẩm</h2>
                            <p className='text-[14px]'>Vệ sinh, an toàn</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#a5c778] rounded-xl mobile:mx-[10px]">
                    <h1 className='text-center text-[32px] text-white font-bold py-[20px] mobile:text-[18px] tablet:text-[24px] laptop:text-[32px]'>Sản phẩm bán chạy</h1>
                    <div className="grid grid-cols-[repeat(3,310px)] justify-evenly mobile:grid-cols-[310px] tablet:grid-cols-[repeat(2,310px)] laptop:grid-cols-[repeat(3,310px)]">
                        {cartSelector.map((value,index)=>{
                            return (
                            <div className="p-[20px] h-[386px] bg-white rounded-xl mb-[32px]" key={value.id} id={value.id}>
                                <Link to={`/detail/${value.id}`}>
                                <div className="w-[270px] h-[270px] overflow-hidden cursor-pointer mobile:h-[230px] laptop:h-[270px]">
                                    <img className='max-w-full w-full h-full object-cover hover:scale-110 transition-all' src={`imgsApi/${value.image}`} alt="" />
                                </div>
                                </Link>
                                <div className="mt-[10px] mb-[10px]">
                                    <h2 className='text-[#232c35] font-bold mobile:text-[18px] laptop:text-[18px]'>
                                        {value.name}
                                    </h2>
                                </div>
                                <div className="flex justify-between items-center mobile:flex-col laptop:items-baseline laptop:flex-row">
                                    <h2 className='text-[#87b44b] font-bold mobile:text-[18px] laptop:text-[16px]'>
                                        {`${value.price}`}đ
                                    </h2>
                                    <div className={`mobile:w-full laptop:w-[40px] mobile:mt-1 laptop:mt-0 block  `} onClick={()=>handlerBuy(value)}>
                                        <div className=" w-[40px] h-[40px] bg-[#87b44b] text-white rounded-[50%] flex justify-center items-center text-xl hover:bg-green-700 transition-all cursor-pointer mobile:w-full mobile:rounded-xl laptop:rounded-[50%] laptop:w-[40px]" onClick={notify}>
                                            <button>
                                                <i class="fa-solid fa-bag-shopping"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className={`hidden`}>
                                        <div className="grid grid-cols-[repeat(3,60px)] laptop:grid-cols-[repeat(3,30px)] items-center mobile:mt-2 laptop:mt-0">
                                            <div className=" rounded-[10px]   border border-mainColor text-[24px] flex justify-center items-center text-center font-bold hover:bg-mainColor hover:text-white cursor-pointer transition-all" >
                                                -
                                            </div>
                                            <div className=" text-center">{value.quantity}</div>
                                            <div className="   rounded-[10px]   border border-mainColor text-[24px] flex justify-center items-center text-center font-bold  hover:bg-mainColor hover:text-white cursor-pointer transition-all" >
                                                +
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )
                        })}

                    </div>
                    <div className="  ">
                        <img className='w-full max-w-full' src={imgIntro} alt="" />
                    </div>

                </div>
            </div>
        </div>
        );
    };
    /*onClick={()=>handlerBuyPlus(value.id)}*/
    /*onClick={()=>handlerBuyMinus(value.id)}*/
    export default RenderData;

    