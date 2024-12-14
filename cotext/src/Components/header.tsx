import React from 'react';
import { Menu, ChevronDown, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const Nav=[
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/AllProducts' },
    { name: 'Blog', path: '/blog' }
  ]
  ;
  return (
    <header className=" bg-gray-800 py-8  mx-auto px-20">
      <div className="container mx-auto flex items-center justify-between">
        <button className="lg:hidden">
          <Menu className="h-6 w-6" />
        </button>     
               <p className='ml-8 text-gray-100'>ARAWEELO_CAKES</p>

        <nav className="hidden lg:flex ml-auto mr-20 space-x-8">
          {Nav.map((item) => (
            <div key={item.name} className="relative group">
              <Link to={item.path} className="text-gray-100 hover:text-gray-900 flex items-center text-sm font-medium">
                {item.name}
                {/* <ChevronDown className="h-4 w-4 ml-1" /> */}
              </Link>
            </div>
          ))}
        </nav>
        <div className="flex items-center">
          <Phone className="h-5 w-5 mr-2 text-gray-100" />
          <span className="text-sm font-medium text-green-700">+123 ( 456 ) ( 7890 )</span>
        </div>
      </div>
    </header>
  );
};

export default Header;

