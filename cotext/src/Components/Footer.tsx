import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-gray-300 py-12">
      <div className="container mx-auto px-24 md:px-16 ">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-10">
          {/* Branding Section */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Fruitify</h2>
            <p className="text-gray-400">
              Fresh and organic fruits delivered to your doorstep. We believe in quality and health.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-green-500">Home</a></li>
              <li><a href="#" className="hover:text-green-500">About Us</a></li>
              <li><a href="#" className="hover:text-green-500">Products</a></li>
              <li><a href="#" className="hover:text-green-500">Contact</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">📞</span> +123 (456) 7890
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">📧</span> info@fruitify.com
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">📍</span> 123 Fruit Street, City, Country
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-green-500 transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-green-500 transition"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-green-500 transition"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-green-500 transition"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Fruitify. All rights reserved. | Designed by You
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
