import React, { useEffect, useState, PropsWithChildren  } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import Skeleton from 'react-loading-skeleton';
import { PuffLoader } from "react-spinners";
import { BiTrashAlt } from "react-icons/bi";
import Image from 'next/image';

export default function Fav({items}){
    const [loading, setLoading] = useState(true);
    function InlineWrapperWithMargin({ children }, PropsWithChildren) {
        return <span style={{ marginRight: '0.5rem' }}>{children}</span>
    }
    const router = useRouter()
    const [favorites, setFavorites] = useState(() => {
        //  Akses localstorage pada clientside ketika data ready
        if (typeof window !== "undefined") {
          const items = localStorage.getItem("favorite");

        // Validasi Alert apakah user udah punya pokemon fav?
          if (items != null) {
            if(JSON.parse(items).length != 0){
              return JSON.parse(items);
            }else{
              Swal.fire({
                text: 'Yah, List Favorit Pokemon Kamu Kosong',
                icon: 'warning',
                timer: 3500,
                showCancelButton: false,
                showConfirmButton: false
              })
              setTimeout(() => {
                router.push('/')
              }, 3000);
            }
        }else{
            Swal.fire({
                text: 'Anda belum memiliki Pokemon Favorite',
                icon: 'warning',
                timer: 3500,
                showCancelButton: false,
                showConfirmButton: false
              })
              setTimeout(() => {
                router.push('/')
              }, 3300);
              
          }
        }
        return [];
      });
      const handleDelete = (id, name) => {
        const updatedFavorites = favorites.filter((favorite) => favorite.id !== id);
        localStorage.setItem("favorite", JSON.stringify(updatedFavorites));
        setFavorites(updatedFavorites);
        Swal.fire({
          text: `${name} Berhasil dihapus`,
          icon: 'success',
          timer: 1500,
          showCancelButton: false,
          showConfirmButton: false
        })
        const items = localStorage.getItem("favorite");
        if(JSON.parse(items).length != 0){
          return true
        }else{
          setTimeout(() => {
            Swal.fire({
              text: 'Yah, List Favorit Pokemon Kamu Kosong',
              icon: 'warning',
              timer: 3500,
              showCancelButton: false,
              showConfirmButton: false
            })
          }, 2000);
          
          setTimeout(() => {
            router.push('/')
          }, 3000);
        }
      };
    useEffect(() => {
        setLoading(false);
      
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
          <div className="flex flex-wrap justify-center w-100">
        {favorites.sort((a, b) => a.id - b.id).map((favorite, index) => (
          
        <div className="w-1/1 md:w-3/12 lg:w-3/12 px-1 mb-4 mx-4 rounded overflow-hidden shadow-lg bg-green-300"  key={index}>
          
          <h4 className="font-bold text-xl p-3 text-center">{favorite.id}. {favorite.name.charAt(0).toUpperCase() + favorite.name.slice(1)}</h4>
          <img className="mx-auto" src={favorite.image} alt={favorite.name} />
          <h4 className="font-bold text-base ml-4">Types : {favorite.types.map((type, index) => (
          <span className="inline-block bg-gray-200 rounded px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"  key={index}>{type.type.name}</span>
          ))}</h4>
          <h4 className="font-bold text-base ml-4">Detail :
          <span className="inline-block bg-gray-200 rounded px-2 py-1 text-sm font-semibold text-gray-700 mr-2 ml-1 mb-2">Weight : {favorite.weight}</span>
          <span className="inline-block bg-gray-200 rounded px-2 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Height : {favorite.height}</span>
          </h4>

          <h4 className="font-bold text-base ml-4">Ability : {favorite.abilities.map((ability, index) => (
            <span className="inline-block bg-gray-200 rounded px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2" key={index}>{ability.ability.name}</span>
            ))}</h4>
           <div className="px-6 py-4">
                <div className="overflow-auto">
                    <div  style={{height: "175px"}}>
                        <table className="table-auto border-collapse border-b-0 whitespace-no-wrap w-full"  style={{borderCollapse: "separate", borderSpacing: "6px"}}>
                        <tbody>
                            {favorite.stats.map((stat, index) => (
                                <tr key={index}>
                                <td className="border-t-0 px-3 py-1 text-gray-600"  >{stat.stat.name}</td>
                                <td className="border-t-0 px-3 py-2 text-center text-gray-800 bg-orange-100 rounded">{stat.base_stat}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
          <button type="button"
                className="border border-green-400 w-full text-ba-500 rounded px-1 py-1 transition duration-500 ease select-none text-white bg-red-800 hover:bg-red-600 focus:outline-none focus:shadow-outline"
                onClick={() => handleDelete(favorite.id, favorite.name)}>
                <div className="flex justify-center">
                <span className="text-center mt-5 flex items-center"><BiTrashAlt /><span className="ml-1"> Hapus</span></span>
            </div>
            </button>
        </div>
         ))}
         </div>
         </div>
      </Layout>
    );
}