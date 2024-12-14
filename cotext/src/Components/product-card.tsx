import React from 'react';

import { FC } from 'react'

interface ProductCardProps {
  title: string
  discount: number
  image: string
  backgroundColor: string
}

const ProductCard: FC<ProductCardProps> = ({ title, discount, image, backgroundColor }) => {
  return (
    <div className={`rounded-2xl p-6 ${backgroundColor} relative overflow-hidden p-8 `}>
      <div className="flex justify-between items-center">
        <div className="space-y-4 max-w-[60%]">
          <h2 className="text-2xl font-bold leading-tight">{title}</h2>
          <div className="space-y-1">
            <span className="text-4xl font-bold text-green-500">{discount}%</span>
            <p className="text-gray-600">Off on first order</p>
          </div>
          <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors">
            Shop Now
          </button>
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-40 h-40">
          <div className="relative w-full h-full">
            <div className="absolute  w-64 h-64 bg-black rounded-full overflow-hidden ">
            <svg width={160} height={160} className="w-full h-full">
  <image
    href={image}
    width="160"
    height="210"
    preserveAspectRatio="xMidYMid slice"
  />
</svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard

