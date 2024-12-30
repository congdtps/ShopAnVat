import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectorsItems } from '../../store/selectors';
import toast, { Toaster } from 'react-hot-toast';
import { addAPInfoPerson } from '../Data/CRUData';
import check from '../../imgs/check.png'

const CheckOut = () => {

    // Lưu thông tin tên người dùng
    const [valueName,setValueName]=useState('')
    // Lưu thông tin sđt người dùng
    const [valuePhone,setValuePhone]=useState('')
    // Lưu thông tin email người dùng
    const [valueEmail,setValueEmail]=useState('')
    // Lưu thông tin địa chỉ người dùng
    const [valueAddress,setValueAddress]=useState('')
    // Lưu thông tin phương thức thanh toán người dùng
    const [valuePay,setValuePay]=useState('')

    // Lưu thông tin báo lỗi input 
    const [onWarn,setOnWarn]=useState(false)

    // Lưu thông tin hiện thanh toán thành công.
    const [onSuccess,setOnSuccess]=useState(false)

    // Lấy giữ liệu từ mảng items trong redux
    const cartItemsApi=useSelector(selectorsItems())

    // Xử lí tính tổng tiền của đơn hàng
    const totalAllCart=cartItemsApi.reduce((total,result)=>{
        return total+result.totalItem
    },0)

    // Xử lí tính tổng số lượng sản phẩm có trong giỏ hàng 
    const totalQuantityCart=cartItemsApi.reduce((total,result)=>{
        return total+result.quantity
    },0)

    

    // Hàm xử lí thanh toán
    const handlerClickBuy= async(productAll)=>{
        try {

            // Xử lí báo lỗi nếu trang checkout không có sản phẩm
            if(totalQuantityCart<=0){
                toast.error("Vui lòng thêm sản phẩm.",{
                    duration:1500
                    })
            }
            // Xử lí nếu trang checkout có sản phẩm
            else{
                // Xử lí nếu người dùng chưa điền tên
                if(valueName.trim()===''){
                    toast.error("Vui lòng thêm tên",{
                        duration:1500
                        })
                        setOnWarn(true)
                }

                // Xử lí nếu người dùng đã điền tên
                else{
                    
                    setValueName(valueName)
                    setOnWarn(false)
    
                }
                // Xử lí nếu người dùng chưa điền sđt
                if(valuePhone.trim()===''){
                    toast.error("Vui lòng thêm số điện thoại",{
                        duration:1500
                        })
                        setOnWarn(true)
    
                }
                // Xử lí nếu người dùng điền số điền thoại rồi
                else{
                    setValuePhone(valuePhone)
                    setOnWarn(false)
                    
                }
                // Xử lí nếu người dùng chưa điền email
                if(valueEmail.trim()===''){
                    toast.error("Vui lòng thêm email",{
                        duration:1500
                        })
                        setOnWarn(true)
    
                }
                // Xử lí nếu người dùng đã điền email
                else{
                    setValueEmail(valueEmail)
                    setOnWarn(false)
                    
                }
                // Xử lí nếu người dùng chưa điền địa chỉ
                if(valueAddress.trim()===''){
                    toast.error("Vui lòng thêm địa chỉ",{
                        duration:1500
                        })
                        setOnWarn(true)
    
                }
                // Xử lí nếu người dùng đã điền địa chỉ
                else{
                    setValueAddress(valueAddress)
                    setOnWarn(false)
                    
                }
                // Xử lí nếu người dùng chưa chọn phương thức thanh toán
                if(valuePay.trim()===''){
                    toast.error("Vui lòng thêm phương thức thanh toán",{
                        duration:1500
                        })
                        setOnWarn(true)
    
                }
                // Xử lí nếu người dùng đã chọn phương thức thanh toán
                else{
                    setValuePay(valuePay)
                    setOnWarn(false)
                    
                }
                // Xử lí nếu như đã điền đầy đủ thông tin, thì lưu thông tin vào json infoPerson
                if(valueName.trim()!=='' && valuePhone.trim()!=='' && valueEmail.trim()!=='' && valueAddress.trim()!=='' && valuePay.trim()!=='' ){
                    const data={
                        namePerson:valueName,
                        phonePerson:valuePhone,
                        emailPerson:valueEmail,
                        addressPerson:valueAddress,
                        payPerson:valuePay
                    }
                    await addAPInfoPerson(data)
                        // set lại để hiện thông báo thanh toán thành công và xóa giỏ hàng
                        setOnSuccess(true)
                        localStorage.removeItem('cart')
                    
                }
                
            }
        } catch (error) {
            console.log(error);
            
        }
            
            
    }


    // Hàm xử lí set lại tên người dùng nhập trong input
    const handlerOnChangeName=(e)=>{
        setValueName(e.target.value)
    }   

    // Hàm xử lí set lại sđt người dùng nhập trong input
    const handlerOnChangePhone=(e)=>{
        setValuePhone(e.target.value)
    }

    // Hàm xử lí set lại email người dùng nhập trong input
    const handlerOnChangeEmail=(e)=>{
        setValueEmail(e.target.value)

    }

    // Hàm xử lí set lại địa chỉ người dùng nhập trong input
    const handlerOnChangeAddress=(e)=>{
        setValueAddress(e.target.value)
    }

    // Hàm xử lí set lại ptt người dùng nhập trong input
    const handlerOnChangePay=(e)=>{
        setValuePay(e.target.value)
    }

    // Hàm xử lí đưa người dùng về trang chủ khi thanh toán thành công
    const handlerBackHome=()=>{
        window.location.href=`/`
    }

    

    // render giao diện
    return (
        <div>
        <Toaster
            position="bottom-center"
            reverseOrder={true}
            />
            <div className="pt-[180px] bg-[#fefcf1]  mobile:pt-[100px] laptop:pt-[180px] ">
                <div className="w-[1280px] my-0 mx-auto mobile:min-w-[355px] mobile:max-w-full laptop:px-0  laptop:w-[1280px] laptop:my-[0] laptop:mx-[auto] mobile:p-[20px]">
                    <div className="font-bold text-2xl mb-[40px] mobile:text-3xl laptop:text-2xl">
                        Thanh toán
                    </div>
                    <div className=" flex justify-between gap-[30px] mobile:flex-col laptop:flex-row">
                        <div className="w-[70%] mobile:w-full laptop:w-[70%]">
                            <div className="bg-white p-[30px] rounded-2xl shadow-md mb-2 mobile:p-[10px] laptop:p-[30px]">
                                <div className="text-[18px] font-semibold mb-[20px]">
                                    Tổng sản phẩm ({totalQuantityCart} sản phẩm)
                                </div>
                                {cartItemsApi.map((product,index)=>{
                                    return (
                                <div className="flex justify-between items-center border-b py-4" key={product.id}>
                                    <div className="flex items-center gap-4 mobile:gap-2 tablet:gap-4 laptop:gap-4" >
                                        <div className="">
                                            <img className='w-[50px] h-[50px] object-cover rounded-2xl mobile:w-[80px] mobile:h-[80px] laptop:w-[100px] laptop:h-[100px]' src={`imgsApi/${product.image}`} alt="" />
                                        </div>
                                        <div className="grid grid-cols-[150px] tablet:grid-cols-1 laptop:grid-cols-1">
                                            <div className=" font-bold text-mainColor text-xl mobile:text-[14px] tablet:text-[18px] laptop:text-xl">
                                                {product.name}
                                            </div>
                                            <div className=" text-center mt-1 rounded-2xl bg-[#fae88f] border py-[4px] font-bold mobile:text-[12px]">
                                                {product.size}
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" flex flex-col">
                                        <div className=" font-bold text-mainColor text-xl mobile:text-[14px] text-end tablet:text-xl laptop:text-xl">
                                            {product.totalItem} đ
                                        </div>
                                        <div className="font-bold text-[12px] laptop:block text-end opacity-60">
                                            {product.quantity} x {product.price} đ
                                        </div>
                                    </div>
                                </div>
                                    )
                                })}

                                
                            </div>
                            
                            <div className=" bg-white p-[30px] rounded-2xl shadow-md">
                                <div className="text-[18px] font-semibold mb-[20px]">
                                    Người đặt hàng
                                </div>
                                <div className="">
                                    <input className={`w-full border py-2 px-3  text-[16px] rounded-xl ${onWarn? `border-red-600` : `` }`} type="text" name="" id="" value={valueName} onChange={handlerOnChangeName} placeholder='Họ và tên' />
                                </div>
                                <div className="">
                                    <input className={`w-full border py-2 px-3  text-[16px] rounded-xl my-5 ${onWarn? `border-red-600` : `` }`} type="tel" name="" id="" value={valuePhone} onChange={handlerOnChangePhone} placeholder='Số điện thoại' />
                                </div>
                                <div className="">
                                    <input className={`w-full border py-2 px-3  text-[16px] rounded-xl ${onWarn? `border-red-600` : `` }`} type="email" name="" id="" value={valueEmail} onChange={handlerOnChangeEmail} placeholder='Email' />
                                </div>
                            </div>
                            <div className="bg-white p-[30px] rounded-2xl shadow-md mt-[20px]">
                                <div className="text-[18px] font-semibold mb-[20px]">
                                    Địa chỉ giao hàng
                                </div>
                                <div className="">
                                    <input className={`w-full border py-2 px-3  text-[16px] rounded-xl mb-5 ${onWarn? `border-red-600` : `` } `} type="text" name="" id="" value={valueAddress} onChange={handlerOnChangeAddress} placeholder='Tỉnh/Thành Phố, Quận/Huyện, Phường/Xã' />
                                </div>
                                <div className="">
                                    <textarea className='w-full border pt-5 pb-10 px-3  text-[16px] rounded-xl' name="" id="" placeholder='Ghi chú thêm'></textarea>
                                </div>
                            </div>
                            <div className="bg-white p-[30px] rounded-2xl shadow-md mt-[20px] mb-[64px]">
                                <div className="text-[18px] font-semibold mb-[20px]">
                                    Phương thức thanh toán
                                </div>
                                <div className="">
                                    <div className="flex items-center gap-3">
                                        <input className='h-[20px] w-[20px] cursor-pointer' type="radio" value={`Thanh toán khi nhận hàng`} checked={valuePay === `Thanh toán khi nhận hàng`} onChange={handlerOnChangePay} name="method_pay"  id="" /> <label className=' font-semibold' htmlFor="">Thanh toán khi nhận hàng</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" w-[30%] mobile:w-full laptop:w-[30%]">
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
                            <button className='w-full bg-mainColor p-[8px] rounded-2xl text-white font-bold hover:bg-green-800 transition-all hover:text-white' onClick={()=>handlerClickBuy(cartItemsApi)}>Thanh toán</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div className={`fixed inset-0 bg-[#00000080] z-10 justify-center items-center ${onSuccess ? `flex`:`hidden`}`}>
                <div className="w-[500px] h-[300px] bg-white rounded-2xl p-[40px] animate-pullTop mobile:p-[20px] mobile:mx-5 mobile:h-[250px] tablet:h-[300px] laptop:h-[300px] laptop:p-[40px] laptop:mx-0">
                    <div className="flex justify-center flex-col items-center">
                        <div className="">
                            <img className='w-[100px] h-[100px] mobile:w-[80px] mobile:h-[80px] tablet:w-[100px] tablet:h-[100px] laptop:h-[100px] laptop:w-[100px]' src={check} alt="" />
                        </div>
                        <div className="mt-5 text-[24px] font-semibold mobile:text-[20px] tablet:text-[24px] laptop:text-[24px]">
                            <div className="">Cảm ơn bạn đã đặt hàng.</div>
                        </div>
                        <div className="mt-5">
                            <button className='py-3 px-4 bg-mainColor text-white rounded-2xl font-bold transition-all hover:bg-opacity-60 hover:text-black' onClick={handlerBackHome}>Về trang chủ</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckOut;