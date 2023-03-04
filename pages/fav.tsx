import React, { useEffect, useState, PropsWithChildren  } from 'react';
import Layout from '../components/Layout';
import Link from 'next/Link';
import Swal from 'sweetalert2'
import Skeleton from 'react-loading-skeleton';

import { PuffLoader } from "react-spinners";

export default function fav({items}){
    const [loading, setLoading] = useState(true);
    function InlineWrapperWithMargin({ children }: PropsWithChildren<unknown>) {
        return <span style={{ marginRight: '0.5rem' }}>{children}</span>
    }
    const [favorites, setFavorites] = useState(() => {
        //  Akses localstorage pada clientside ketika data ready
        if (typeof window !== "undefined") {
          const items = localStorage.getItem("favorite");

        // Validasi Alert apakah user udah punya pokemon fav?
          if (items != null) {
            return JSON.parse(items);
          }else{
            Swal.fire({
                text: 'Anda belum memiliki Pokemon Favorite',
                icon: 'warning',
                timer: 200,
                showCancelButton: false,
                showConfirmButton: false
              })
             
          }
        }
        return [];
      });

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1500);
      
    }, [items]);

    if (loading) {
        return(
            <Layout title='Pokemon Detail'>
                 <div className="max-w-lg  mx-auto text-center ">
                <span className='text-center mr-2'><PuffLoader  loading={loading} size={25} /></span><span className="ml-4">Loading</span>
                <br />
                </div>
                <div className="w-full md:w-1/1 lg:w-4/4 text-center px-3 mt-2">
                <Skeleton baseColor="#8AF6B1" highlightColor="#dfe3dc" 
                        count={4}
                        wrapper={InlineWrapperWithMargin}
                        inline
                        width={350}
                        height={200}
                    />
                </div>
                
            </Layout>
        )
    }
    return (
        <Layout title="Favorite Clothes">
          <div className="container mx-auto">
          <div className="flex flex-wrap justify-center">
        {favorites.map((favorite:any) => (
          
        <div className=" md:w-1/1 lg:w-4/4 px-1 mb-4 mx-2 rounded overflow-hidden shadow-lg bg-green-300">
          <h4 className="font-bold text-xl p-3 text-center">{favorite.id}. {favorite.name.charAt(0).toUpperCase() + favorite.name.slice(1)}</h4>
          <img className="mx-auto" src={favorite.image} alt={favorite.name} />
          <h4 className="font-bold text-base ml-4">Types : {favorite.types.map((type:any, index) => (
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{type.type.name}</span>
          ))}</h4>
          <h4 className="font-bold text-base ml-4">Detail :
          <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2 ml-1 mb-2">Weight : {favorite.weight}</span>
          <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Height : {favorite.height}</span>
          </h4>
          <div className="px-6 py-4">
              <div className="overflow-x-auto">
                <table className="table-auto border-collapse border-b-0 whitespace-no-wrap w-full"  style={{borderCollapse: "separate", borderSpacing: "6px"}}>
                    <tbody>
                        <tr >
                        <td className="border-t-0 px-3 py-1 text-gray-600">HP</td>
                        <td className="border-t-0 px-3 py-2 text-center text-gray-800 bg-orange-100 rounded">22</td>
                        <td className="border-t-0 px-3 py-1 text-center text-gray-800">John Doe</td>
                        <td className="border-t-0 px-3 py-2 text-center text-gray-800 bg-orange-100 rounded">22</td>
                        </tr>
                        <tr>
                        <td className="border-t-0 px-3 py-1 text-gray-600">HP</td>
                        <td className="border-t-0 px-3 py-2 text-center text-gray-800 bg-orange-100 rounded">22</td>
                        <td className="border-t-0 px-3 py-1 text-center text-gray-800">John Doe</td>
                        <td className="border-t-0 px-3 py-2 text-center text-gray-800 bg-orange-100 rounded">22</td>
                        </tr>
                        <tr>
                        <td className="border-t-0 px-3 py-1 text-gray-600">HP</td>
                        <td className="border-t-0 px-3 py-2 text-center text-gray-800 bg-orange-100 rounded">22</td>
                        <td className="border-t-0 px-3 py-1 text-center text-gray-800">John Doe</td>
                        <td className="border-t-0 px-3 py-2 text-center text-gray-800 bg-orange-100 rounded">22</td>
                        </tr>
                    </tbody>
                </table>
              </div>
          </div>
        </div>
         ))}
         </div>
         </div>
      </Layout>
    );
}