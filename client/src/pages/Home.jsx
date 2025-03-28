import React, { useEffect, useState } from 'react'
import HomeLayout from '../component/Layout/HomeLayout'
import GenderCollection from '../component/Product/GenderCollection'
import NewArrivals from '../component/Product/NewArrivals'
import ProductDetail from '../component/Product/ProductDetail'
import ProductGrid from '../component/Product/ProductGrid'
import FeaturedCollection from '../component/Product/FeaturedCollection'
import FeaturedSection from '../component/Product/FeaturedSections'
import {useDispatch, useSelector} from 'react-redux'
import { fetchProductsByFilter } from '../redux/slices/productSlice'
import axiosInstance from '../utils/axios'

const Home = () => {
  const dispatch = useDispatch()
  const {products, loading, error} = useSelector(state => state.products)
  const [bestSeller, setBestSeller] = useState(null)

  useEffect(() => {
    dispatch (fetchProductsByFilter({
      gender: "Nữ",
      category: "Áo",
      limit: 8
    }))
    const fetchBestSeller = async () => {
      try {
        const response = await axiosInstance.get('/api/products/best-seller')
        setBestSeller(response.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchBestSeller()
  }, [dispatch])
  return (
    <div>
        <HomeLayout />
        <GenderCollection />
        <NewArrivals />

        {/* Best Seller */}
        <h2 className="text-3xl text-center font-bold mb-4">Sản phẩm bán chạy</h2>
        {bestSeller ? (<ProductDetail productId={bestSeller._id} />) : (<p className='text-center'>Loading...</p>)}
        

        <div className="container mx-auto">
          <h2 className="text-3xl text-center font-bold mb-4">
            Áo dành cho nữ
          </h2>
          <ProductGrid products={products} loading={loading} error={error} />
        </div>

        <FeaturedCollection />
        <FeaturedSection />
    </div>

  )
}

export default Home