import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  // 
  const navigate = useNavigate()
  const [filter, setFilter] = useState({
    category: "",
    gender: "",
    colors: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 1000000,
  })

  const [priceRange, setPriceRange] = useState([0, 1000000])

  const category = ["Áo", "Quần"]

  const colors = [
    "Black", 
    "White", 
    "Red", 
    "Blue", 
    "Green", 
    "Yellow", 
    "Orange", 
    "Purple", 
    "Pink", 
    "Brown", 
    "Beige", 
    "Navy"
  ]

  const size = ["S", "M", "L", "XL", "XXL"]

  const material = [
    "Vải Cotton",
    "Len",
    "Vải Polyester",
    "Lụa",
    "Vải Viscose",
    "Vải Fleece"
  ]

  const Brand = [
    "Valentino",
    "Nina Ricci",
    "Louis Vuitton",
    "Givenchy",
    "Dior"
  ]

  const gender = ["Nam", "Nữ"]

  useEffect(() => {
    const param = Object.fromEntries([...searchParams])
    setFilter({
      category: param.category || "",
      gender: param.gender || "",
      colors: param.colors || "",
      size: param.size ? param.size.split(",") : [],
      material: param.materials ? param.materials.split(",") : [],
      brand: param.brand ? param.brand.split(",") : [],
      minPrice: param.minPrice || 0,
      maxPrice: param.maxPrice || 10000000
    })
    setPriceRange([param.minPrice || 0, param.maxPrice || 10000000])
  }, [searchParams])

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target
    console.log({name, value, checked, type})
    let newFilter = {...filter}
    if (type === "checkbox") {
      if (checked) {
        newFilter[name] = [...(newFilter[name] || []), value]
      } else {
        newFilter[name] = newFilter[name].filter((item) => item !== value)
      }
    } else {
      newFilter[name] = value
    }
    setFilter(newFilter)
    UpdateURLParam(newFilter)
  }

  const UpdateURLParam = (newFilter) => {
    const params = new URLSearchParams()
    Object.keys(newFilter).forEach((key) => {
      if (Array.isArray(newFilter[key]) && newFilter[key].length > 0) {
        params.append(key, newFilter[key].join(","))
      } else if (newFilter[key]){ 
        params.append(key, newFilter[key])
      }
    })
    setSearchParams(params)
    navigate(`?${params.toString()}`)
  }

  const handlePriceChange = (e) => {
    const newPrice = e.target.value
    setPriceRange([0, newPrice])
    const newFilter = {...filter, minPrice: 0, maxPrice: newPrice}
    setFilter(filter)
    UpdateURLParam(newFilter)
  }
  return (
    <div className='p-4'>
      <h3 className="text-xl font-medium text-gray-800 mb-4">
        Lọc
      </h3>

      {/* Category Filter */}
      <div className="mb-6">
        <label className='block text-gray-600 font-medium mb-2'>Loại sản phẩm</label>
        {category.map((category) => (
          <div key={category} className="flex items-center mb-1">
            <input 
              type="radio" 
              value={category}
              onChange={handleFilterChange}
              name='category' 
              
              className='mr-2 size-4 text-blue-500 focus:ring-blue-400 border-gray-300'
            />
            <span className="text-gray-700">{category}</span>
          </div>
        ))}
      </div>

        {/* Gender Filter */}
      <div className="mb-6">
        <label className='block text-gray-600 font-medium mb-2'>Giới tính</label>
        {gender.map((gender) => (
          <div key={gender} className="flex items-center mb-1">
            <input 
              type="radio" 
              name='gender' 
              value={gender}
              onChange={handleFilterChange}
              className='mr-2  size-4 text-blue-500 focus:ring-blue-400 border-gray-300'
            />
            <span className="text-gray-700">{gender}</span>
          </div>
        ))}
      </div>

      {/* Color Filter */}
        <div className="mb-6">
          <label className='block text-gray-600 font-medium mb-2'>Màu sắc</label>
          <div className="flex flex-wrap gap-2">
            {colors.map((colors) => (
              <button 
                key={colors}
                name='colors'
                value={colors}
                onClick={handleFilterChange}
                className={`size-8 rounded-full border border-gray-300 cursor-pointer 
                transition hover:scale-105 ${filter.colors === colors ? "ring-2 ring-blue-500" : ""}`}
                style={{ backgroundColor: colors.toLowerCase() }}
              >
                
              </button>
            ))}
          </div>
        </div>

        {/* Size Filter */}
        <div className="mb-6">
            <label className='block text-gray-600 font-medium mb-2'>Kích cỡ</label>
            {size.map((size) => (
              <div 
                key={size}
                className="flex items-center mb-1">
                  <input 
                    type="checkbox"
                    name='size'
                    value={size}
                    onChange={handleFilterChange}
                    className='mr-2 size-4 text-blue-500 focus:ring-blue-400 border-gray-300' />
                  <span className="">{size}</span>
                </div>
            ))}
        </div>

        {/* Material Filter */}
        <div className="mb-6">
            <label className='block text-gray-600 font-medium mb-2'>Vật liệu</label>
            {material.map((material) => (
              <div 
                key={material}
                className="flex items-center mb-1">
                  <input 
                    type="checkbox"
                    value={material}
                    onChange={handleFilterChange}
                    name='material'
                    className='mr-2 size-4 text-blue-500 focus:ring-blue-400 border-gray-300' />
                  <span className="">{material}</span>
                </div>
            ))}
        </div>

        {/* Brand Filter */}
        <div className="mb-6">
            <label className='block text-gray-600 font-medium mb-2'>Thương hiệu</label>
            {Brand.map((brand) => (
              <div 
                key={brand}
                className="flex items-center mb-1">
                  <input 
                    type="checkbox"
                    value={brand}
                    onChange={handleFilterChange}
                    name='brand'
                    className='mr-2 size-4 text-blue-500 focus:ring-blue-400 border-gray-300' />
                  <span className="">{brand}</span>
                </div>
            ))}
        </div>

        {/* Price Filter */}
        <div className="mb-8">
          <label className='block text-gray-600 font-medium mb-2'>Giá</label>
          <input 
            type="range" 
            name='priceRange'
            min={0} 
            max={10000000}
            value={priceRange[1].toLocaleString("vi-VN")}
            onChange={handlePriceChange}
            className='w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer' 
          />

          <div className="flex justify-between text-gray-600 mt-2">
            <span>0 đ</span>
            <span>{priceRange[1].toLocaleString("vi-VN")} đ</span>
          </div>
        </div>
    </div>
  )
}

export default FilterSidebar