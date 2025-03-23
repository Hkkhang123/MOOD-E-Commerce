import React from 'react'
import { HiShoppingBag } from 'react-icons/hi'
import { HiOutlineCreditCard } from 'react-icons/hi2'
import { HiArrowPathRoundedSquare } from 'react-icons/hi2'
const FeaturedSection = () => {
  return (
    <section className='py-16 px-4 bg-white'>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {/* Featured 1 */}
        <div className="flex flex-col items-center">
          <div className="p-4 rounded-full mb-4">
            <HiShoppingBag className='text-xl' />
          </div>
          <h4 className="tracking-tighter mb-2">VẬN CHUYỂN MIỄN PHÍ TOÀN QUỐC</h4>
          <p className="text-gray-600 text-sm tracking-tighter">
            Dành cho đơn hàng trên 500.000đ
          </p>
        </div>

        {/* Featured 2 */}
        <div className="flex flex-col items-center">
          <div className="p-4 rounded-full mb-4">
            <HiArrowPathRoundedSquare className='text-xl' />
          </div>
          <h4 className="tracking-tighter mb-2">TRONG VÒNG 45 NGÀYNGÀY</h4>
          <p className="text-gray-600 text-sm tracking-tighter">
            Đảm bảo hoàn tiền 100%
          </p>
        </div>

        {/* Featured 3 */}
        <div className="flex flex-col items-center">
          <div className="p-4 rounded-full mb-4">
            <HiOutlineCreditCard className='text-xl' />
          </div>
          <h4 className="tracking-tighter mb-2">THANH TOÁN BẢO MẬT</h4>
          <p className="text-gray-600 text-sm tracking-tighter">
            Quá trình thanh toán bảo mật 100%
          </p>
        </div>
      </div>
    </section>
  )
}

export default FeaturedSection