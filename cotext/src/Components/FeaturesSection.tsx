import React from "react";
import { FaBox, FaHeadset, FaTruck } from "react-icons/fa"; // Importing icons

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <FaBox className="text-green-600 text-4xl" />,
      title: "Product Packing",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
    },
    {
      icon: <FaHeadset className="text-green-600 text-4xl" />,
      title: "24X7 Support",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
    },
    {
      icon: <FaTruck className="text-green-600 text-4xl" />,
      title: "Delivery in 5 Days",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
    },
  ];

  return (
    <div className="bg-gray-50 py-12 px-20 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-slate-200 shadow-md rounded-lg p-4 text-center hover:shadow-lg transition"
          >
            <div className="mb-4 ml-48">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
