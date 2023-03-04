import React, { useState, useEffect } from "react";
import Layout from '../components/Layout';
import Link from 'next/Link';
import Skeleton from 'react-loading-skeleton';
import { PuffLoader } from "react-spinners";
import Swal from 'sweetalert2'
import { BiArrowBack } from "react-icons/bi";

export default function pokemon({pokeman}){
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);
    
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 500);
      
    }, [pokeman]);
    const handleFavorite = () => {
        
        // set isFavorite state to true and store clothes data to localstorage
        setIsFavorite(true);
        const favorite = JSON.parse(localStorage.getItem('favorite')) || [];
        const checkValidation = favorite.find((item: any) => item.id === pokeman.id);
        if(checkValidation){
            Swal.fire({
                text: `${pokeman.name} sudah ada pada Favorite List`,
                icon: 'warning',
                timer: 2500,
                showCancelButton: false,
                showConfirmButton: false
              })
        }else{
        favorite.push(pokeman);
        localStorage.setItem('favorite', JSON.stringify(favorite));
        Swal.fire({
            text: `${pokeman.name} berhasil ditambahkan ke Favorite List`,
            icon: 'success',
            timer: 2500,
            showCancelButton: false,
            showConfirmButton: false
          })
        }
        console.log(checkValidation)
        
        
      }
    console.log(pokeman)
    if (loading) {
        return(
           
            <Layout title='Pokemon Detail'>
                <div className="max-w-lg  mx-auto text-center ">
                <span className='text-center mr-3'><PuffLoader  loading={loading} size={25} /></span><span className="ml-4">Loading</span>
                <br />
                <Skeleton  baseColor="#8AF6B1" highlightColor="#dfe3dc"  width={400}  height={400}/>
                </div>
               
            </Layout>
        )
    }

    return (
        <Layout title={pokeman.name}>
            {/* Card Tailwind */}
           
            <div className="max-w-sm rounded overflow-hidden shadow-lg bg-green-300 mx-auto">
                <h4 className="font-bold text-xl p-2 mb-0 pb-0 text-center">{pokeman.id}. {pokeman.name.charAt(0).toUpperCase() + pokeman.name.slice(1)}</h4>
                <img className="mx-auto" src={pokeman.image} alt={pokeman.name} />
            <h4 className="font-bold text-base ml-4">Types : {pokeman.types.map((type:any, index) => (
                 <span className="inline-block bg-gray-200 rounded px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{type.type.name}</span>
            ))}</h4>
             <h4 className="font-bold text-base ml-4">Detail :
                <span className="inline-block bg-gray-200 rounded px-2 py-1 text-sm font-semibold text-gray-700 mr-2 ml-1 mb-2">Weight : {pokeman.weight}</span>
                <span className="inline-block bg-gray-200 rounded px-2 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Height : {pokeman.height}</span>
             </h4>
             <h4 className="font-bold text-base ml-4">Ability : {pokeman.abilities.map((ability:any, index) => (
                 <span className="inline-block bg-gray-200 rounded px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{ability.ability.name}</span>
            ))}</h4>
            <div className="px-6 py-4">
                <div className="overflow-auto">
                    <div  style={{height: "175px"}}>
                        <table className="table-auto border-collapse border-b-0 whitespace-no-wrap w-full"  style={{borderCollapse: "separate", borderSpacing: "6px"}}>
                        <tbody>
                            {pokeman.stats.map((stat:any, index) => (
                                <tr >
                                <td className="border-t-0 px-3 py-1 text-gray-600">{stat.stat.name}</td>
                                <td className="border-t-0 px-3 py-2 text-center text-gray-800 bg-orange-100 rounded">{stat.base_stat}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <button type="button"
                className="border border-green-500 w-full text-ba-500 rounded px-4 py-2 transition duration-500 ease select-none hover:text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:shadow-outline inline-flex"
                onClick={handleFavorite}>
                <img src="favorite.png" alt="" style={{ width: "auto", height: "35px" }}/>Tambahkan Ke Favorite List
            </button>
            </div>

            <Link href="/">
            <div className="flex justify-center">
                <span className="text-center mt-5 hover:text-green-600 flex items-center"><BiArrowBack /><span className="ml-1">Kembali</span></span>
            </div>
            </Link>
        </Layout>
    );
}
export async function getServerSideProps({ query }) {
    const id = query.id;
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokeman = await res.json();
        const paddedId = ('00' + id).slice(-3);
        pokeman.image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
        return {
            props: { pokeman },
        };
    } catch (err) {
        console.error(err);
        return { props: {} };
    }
}