import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface Category {
  name: string;
  items: number;
}

interface PromoCard {
  title: string;
  discount: number;
  image: string;
}

const categories: Category[] = [
  { name: "Cake & Milk", items: 65 },
  { name: "Fresh Meat", items: 30 },
  { name: "Vegetables", items: 25 },
  { name: "Apple & Mango", items: 45 },
  { name: "Strawberry", items: 68 },
  { name: "Vegetables", items: 42 },
];

const promoCards: PromoCard[] = [
  {
    title: "Cake",
    discount: 50,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ074QxUkgT2RnrXCaysI_aeAsL5w0LMOBdEA&s"
  },
  {
    title: "Sweets",
    discount: 40,
    image: "data:image/jpeg;base64,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"
  }
];

export default function FoodCategories() {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="container mx-auto p-4 px-20 flex flex-col md:flex-row gap-6 " >
      {/* Categories List */}
      <div className="md:w-1/3">
        <p className="text-5xl lg:text-7xl font-bold mb-6 leading-tight text-blue-950">
        "Fresh, custom cakes for every occasion. Make your moments sweeter with us!"


        </p>
      </div>

      {/* Promo Cards */}
      <div className="flex-1 grid md:grid-cols-2 gap-6 ">
        {promoCards.map((card, index) => (
          <div
            key={index}
            className={`
              relative overflow-hidden rounded-lg cursor-pointer transition-transform duration-300
              ${hoveredCard === index ? 'scale-105' : ''}
            `}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="relative aspect-[3/4]">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-4 left-4 text-white text-5xl font-bold flex items-baseline">
                {card.discount}
                <span className="text-2xl ml-1">%</span>
                <span className="text-xl ml-2">OFF</span>
              </div>
              <div className="absolute bottom-4 left-4">
                <h3 className="text-white text-2xl font-semibold">{card.title}</h3>
                <button className="mt-2 px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

