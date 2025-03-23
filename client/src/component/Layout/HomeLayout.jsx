import React from 'react'
import heroImg from '../../assets/rabbit-hero.webp'
import { Link } from 'react-router-dom'
const HomeLayout = () => {
  return (
    <section className='relative'>
        <img src={heroImg} alt="Rabbit" className='w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover'/>
        <div className="absolute inset-0 bg-opacity-0 flex items-center justify-center">
            <div className="text-white text-center p-6">
                <h1 className="text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-4">
                    VACATION <br/> READY
                </h1>
                <p className="text-sm tracking-tighter md:text-lg mb-6">Khám phá những outfit du lịch rực rỡ</p>
                <Link to="/collection/all" className='bg-white text-gray-950 px-6 py-2 rounded-sm text-lg'>Hãy mua sắm ngay</Link>
            </div>
        </div>
    </section>
  )
}

export default HomeLayout