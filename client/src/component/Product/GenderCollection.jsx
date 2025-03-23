import React from 'react'
import MenCollectionImg from '../../assets/mens-collection.webp'
import WomenCollectionImg from '../../assets/womens-collection.webp'
import { Link } from 'react-router-dom'
const GenderCollection = () => {
  return (
    <section className='py-16 px-4 lg:px-0'>
        <div className="container mx-auto flex flex-col md:flex-row gap-8">
            {/* Women Collection */}
            <div className='relative flex-1'>
                <img src={WomenCollectionImg} alt="Women Collection" className='w-full h-[700px] object-cover' />
                <div className="absolute bottom-8 left-8 rounded-sm bg-white bg-opacity-90 p-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">Bộ sưu tập của nữ giới</h2>
                    <Link to="/collection/all?gender=Nữ" className='text-gray-900 underline'>Mua sắm ngay</Link>
                </div>
            </div>

            {/* Men Collection */}
            <div className='relative flex-1'>
                <img src={MenCollectionImg} alt="Men Collection" className='w-full h-[700px] object-cover' />
                <div className="absolute bottom-8 left-8 rounded-sm bg-white bg-opacity-90 p-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">Bộ sưu tập của nam giới</h2>
                    <Link to="/collection/all?gender=Nam" className='text-gray-900 underline'>Mua sắm ngay</Link>
                </div>
            </div>
        </div>
    </section>
  )
}

export default GenderCollection