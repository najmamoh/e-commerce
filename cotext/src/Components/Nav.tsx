import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <div className="bg-green-50 py-12  relative overflow-hidden ">
      <div className="container mx-auto px-20 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 z-10">
          <h2 className="text-green-500 font-medium mb-4 text-lg">
            <span className="border-b-2 border-green-500">100%</span> Organic Fruits
          </h2>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight text-gray-900">
            Explore fresh &<br />Sweet Cake.
          </h1>
          <p className="text-gray-600 mb-8 max-w-md">
          "Delight in every bite! 🍰 At [Araweelo Cakes], we craft fresh, custom cakes and treats for all your special moments. Order today and make your celebrations sweeter!"          </p>
          <button className="bg-green-500 text-white px-8 py-3 rounded-md hover:bg-green-600 transition duration-300">
            Shop Now
          </button>
        </div>
        <div className="lg:w-1/2 relative ml-20">
          <div className="w-[500px] h-[500px] bg-green-200 rounded-full overflow-hidden relative">
          <svg width="500" height="500">
  <image
    href="data:image/jpeg;base64,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"
    x="0"
    y="0"
    width="100%"
    height="100%"
  />
</svg>

          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-24 h-24">
        {/* <image
          src="/placeholder.svg?height=96&width=96"
          alt="Leaf decoration"
          width={96}
          height={96}
        /> */}
      </div>
      <div className="absolute top-1/4 left-1/4 w-16 h-16 opacity-50">
        <image
          href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMbSk8ez-72GaJL3DhzrhDwp9cKj8EBK7JOA&s"
       
        />
      </div>
      <div className="absolute bottom-0 left-1/3 w-32 h-32">
        <image
          href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMbSk8ez-72GaJL3DhzrhDwp9cKj8EBK7JOA&s"
       
        />
      </div>
      <div className="absolute bottom-1/4 right-1/4 w-8 h-8">
        <div className="w-2 h-2 bg-green-300 rounded-full"></div>
      </div>
      <div className="absolute bottom-10 right-10">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

