import React, { useState, useEffect, useCallback } from 'react'
import ProductCard from './product-card'

const ProductCardsSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const products = [
    {
      title: 'Fresh Snacks & Sweets',
      discount: 20,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTafVYz0B4_5J0MyZ7dD15ZZUR0wbyYHhMB_3upuWF3CcRJey4eISZUMXmN7vpFf7pH1dw&usqp=CAU',
      backgroundColor: 'bg-[#ffe8dd]'
    },
    {
      title: 'Fresh & Healthy Organic Fruits',
      discount: 35,
      image: 'https://www.recipetineats.com/tachyon/2020/08/My-best-Vanilla-Cake_9-SQ.jpg',
      backgroundColor: 'bg-[#ffe0e5]'
    },
    {
      title: 'Healthy Bakery Products',
      discount: 30,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ3dU2YNn01QVCNDI5FLgsU0vBgwp_sSJx0Q&s',
      backgroundColor: 'bg-[#dcf7e8]'
    }
  ]

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % products.length)
  }, [products.length])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length)
  }, [products.length])

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide()
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(intervalId)
  }, [nextSlide])

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * (100 / 3)}%)` }}
        >
          {[...products, ...products.slice(0, 2)].map((product, index) => (
            <div key={index} className="  w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-2">
              <ProductCard
                title={product.title}
                discount={product.discount}
                image={product.image}
                backgroundColor={product.backgroundColor}
              />
            </div>
          ))}
        </div>
      
      </div>
      <div className="flex justify-center mt-4">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 w-2 rounded-full mx-1 ${
              currentSlide === index ? 'bg-green-500' : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductCardsSection

