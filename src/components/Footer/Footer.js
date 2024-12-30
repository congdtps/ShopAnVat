import React from 'react';
import chuchuLogo from '../../imgs/chuchu_logo.png';


// Làm footer

const Footer = () => {
    return (
        <div>
        <div className="bg-[#6c903c] ">
            <div className="flex h-[373px] w-[1280px]  my-[0] mx-[auto] items-center flex-wrap px-[30px] justify-between mobile:min-w-[355px] mobile:max-w-full mobile:mx-[0] laptop:w-[1280px] laptop:my-[0] laptop:mx-[auto]">
                <div className="">
                    <div className="flex items-center gap-3">
                        <img className='w-[50px] h-[50px] max-w-full object-cover' src={chuchuLogo} alt="" />
                        <h2 className=' font-bold text-white text-[18px]'>
                            ChuChu Shop
                        </h2>
                    </div>
                    <div className="">
                        <div className=" font-semibold text-white text-[16px]">
                            Hotline: 0585 86 52 48
                        </div>
                        <div className=" font-semibold text-white text-[16px]">
                            Địa chỉ: 36, đường số 3, phường Bình Hưng Hòa, quận Bình Tân, TP. HCM
                        </div>
                        
                    </div>
                </div>
                <div className="">
                    <div className="font-bold text-white text-[18px] mb-3">
                        Truy cập nhanh
                    </div>
                    <div className="font-semibold text-white text-[16px]">
                        Sản phẩm bán chạy
                    </div>
                    <div className="font-semibold text-white text-[16px]">
                        Sản phẩm mới ra mắt
                    </div>
                    <div className="font-semibold text-white text-[16px]">
                        Giỏ hàng
                    </div>
                </div>
                <div className="font-bold text-white text-[18px]">
                    Copyright © by Đỗ Thành Công
                </div>
            </div>
        </div>
        </div>
    );
};

export default Footer;