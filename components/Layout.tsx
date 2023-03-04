import React from 'react'
import Head from 'next/head'
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/Link';

export default function Layout({title, children}){
    const [isOpen, setIsOpen] = useState(false);
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
              <span
                href="https://wa.me/6285885881998"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Contact
              </span>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
              aria-label="Main menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 sm:px-3">
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900"
          >
            Home
          </a>

          <a
            href="#"
            className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
          >
            About
          </a>

          <a
            href="#"
            className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
            <main className="container mx-auto max-xl pt-3 min-h-screen">
                {children}
            </main>
        </div>
    )
}