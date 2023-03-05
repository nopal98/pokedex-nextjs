import React,  { useState, useEffect } from 'react';
import Head from 'next/head'
import Link from 'next/link';
import { AiOutlineMenu } from "react-icons/ai";
import Image from 'next/image';

export default function Layout({title, children}){
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const handleScroll = () => {
    const scrollPercent = (window.pageYOffset / (document.body.scrollHeight - window.innerHeight)) * 100;
    setIsVisible(scrollPercent > 10);
    };
    const backToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      };

      useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);
    return(
        <div className='bg-gray-300'>
            <Head>
                <title>{title}</title>
                <meta name="description" content="Pokedex by Naufal Ihsan" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <nav className="bg-gray-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
          <Link href="/">
            <span className="flex-shrink-0 text-white font-bold text-lg tracking-tight">Pokedex by Naufal</span>
           </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
            <Link href="/">
              <span
                href="#"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </span>
            </Link>
            <Link href="/fav">
              <span
                href="#"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Favorite
              </span>
             </Link>
              <a
                href="https://wa.me/6285885881998"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
               Contact
              </a>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-gray-600 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:bg-gray-800 focus:text-white transition duration-150 ease-in-out"
             
            > <AiOutlineMenu></AiOutlineMenu>
              <span className="sr-only">Open main menu</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 sm:px-3">
        <Link href="/">
          <span className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900">
            Home
          </span>
          </Link>
          <Link href="/fav">
          <span
            href="#"
            className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
          >
            Favorit
          </span>
          </Link>
          <a href="https://wa.me/6285885881998" className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">
            Contact
          </a>
        </div>
      </div>
    </nav>
            <main className="container mx-auto max-xl pt-3 min-h-screen">
                {children}
            </main>
            <button
            className="fixed bottom-5 right-5 inline-block bg-green-200 rounded-full bg-danger p-2 uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)]" onClick={backToTop} style={{  display: `${isVisible ? 'block' : 'none'}`, }}>
                <img src="up.png" alt=""  />
            </button>
        </div>
    )
}