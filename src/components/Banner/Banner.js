import React from 'react';
import banner1 from '../../imgs/chuchu_banner1.jpeg'
// import banner4 from '../../imgs/chuchu_banner4.jpeg'
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css"


// Làm banner

const Banner = () => {
    return (
        <div>
            <div className="mt-[80px]">
                <div className="">
                    <div className="">
                    <div className="">
                        <img className=' w-full max-w-full object-cover h-full' src={banner1} alt="" />
                    </div>
                    </div>

                </div>
            </div>
        </div>
    )

        }

export default Banner;