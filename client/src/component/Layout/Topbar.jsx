import React from 'react'
import { TbBrandMeta } from 'react-icons/tb'
import { IoLogoInstagram } from 'react-icons/io'
import { RiTwitterXLine } from 'react-icons/ri'
const Topbar = () => {
  return (
    <div className='bg-rabbit-red text-white'>
        <div className="container mx-auto flex justify-between items-center py-3 px-4">
            <div className='hidden md:flex items-center space-x-4 '>
                <a href="#" className="hover:text-gray-300">
                    <TbBrandMeta className='size-5' />
                </a>
                <a href="#" className="hover:text-gray-300">
                    <IoLogoInstagram className='size-5' />
                </a>
                <a href="#" className="hover:text-gray-300">
                    <RiTwitterXLine className='size-4' />
                </a>
            </div>
            <div className="text-sm text-center flex-grow">
                <span>Vận chuyển toàn thế giới - Hệ thống vận chuyển nhanh và tin cậy!</span>
            </div>
            <div className="text-sm hidden md:block">
                <a href="tel:+123456" className="hover:text-gray-300">
                    +1 (234) 567-890
                </a>
            </div>
        </div>
    </div>
  )
}

export default Topbar