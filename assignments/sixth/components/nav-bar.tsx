"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white py-4 px-6 flex items-center justify-between relative">
      <Link href="/" className="text-2xl font-bold text-blue-500">
        AirB&I
      </Link>
      <div className="hidden md:flex gap-8">
        {[
          { name: 'HOME', route: '/' },
          { name: 'APARTMENTS', route: '/apartments' },
          { name: 'GALLERY', route: '/gallery' },
          { name: 'BOOK NOW', route: '/book-now' },
          { name: 'BLOG', route: '/blog' },
          { name: 'CONTACT', route: '/contact' }
        ].map((item) => (
          <Link
            key={item.name}
            href={item.route}
            className="text-gray-700 hover:text-blue-500 transition-colors"
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-gray-700 hover:text-blue-500 transition-colors">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-md md:hidden">
          <div className="flex flex-col items-center gap-4 py-4">
            {[
              { name: 'HOME', route: '/' },
              { name: 'APARTMENTS', route: '/apartments' },
              { name: 'GALLERY', route: '/gallery' },
              { name: 'BOOK NOW', route: '/book-now' },
              { name: 'BLOG', route: '/blog' },
              { name: 'CONTACT', route: '/contact' }
            ].map((item) => (
              <Link
                key={item.name}
                href={item.route}
                className="text-gray-700 hover:text-blue-500 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}