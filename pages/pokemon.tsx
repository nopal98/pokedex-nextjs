import React, { useState, useEffect } from "react";
import Layout from '../components/Layout';
import Link from 'next/Link';
import Skeleton from 'react-loading-skeleton';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from '@fortawesome/free-solid-svg-icons';


export default function pokemon({pokeman}){
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 700);
      
    }, [pokeman]);
    const handleFavorite = () => {
        // set isFavorite state to true and store clothes data to localstorage
        setIsFavorite(true);
        const favorite = JSON.parse(localStorage.getItem('favorite')) || [];
        favorite.push(pokeman);
        localStorage.setItem('favorite', JSON.stringify(favorite));
      }
    console.log(pokeman)
    if (loading) {
        return(
           
            <Layout title='Pokemon Detail'>
                 <div className="max-w-sm  mx-auto text-center ">
                 Loading. . .
                <Skeleton  baseColor="#8AF6B1" highlightColor="#dfe3dc"  width={400}  height={400}/>
                 
                </div>
            </Layout>
        )
    }

    return (
        <Layout title={pokeman.name}>
            {/* Card Tailwind */}
           
            <div className="max-w-sm rounded overflow-hidden shadow-lg bg-green-300 mx-auto">
                <h4 className="font-bold text-xl p-3 text-center">{pokeman.id}. {pokeman.name.charAt(0).toUpperCase() + pokeman.name.slice(1)}</h4>
                <img className="mx-auto" src={pokeman.image} alt={pokeman.name} />
            <h4 className="font-bold text-base ml-4">Types : {pokeman.types.map((type:any, index) => (
                 <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{type.type.name}</span>
            ))}</h4>
             <h4 className="font-bold text-base ml-4">Detail :
                <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2 ml-1 mb-2">Weight : {pokeman.weight}</span>
                <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Height : {pokeman.height}</span>
             </h4>
             <button
      type="button"
      className="border border-green-500 text-ba-500 rounded px-4 py-2 transition duration-500 ease select-none hover:text-white hover:bg-green-500 focus:outline-none focus:shadow-outline"
      onClick={handleFavorite}
    >
      <FontAwesomeIcon icon={faStar} className='text-yellow-500' />Favorite
      
    </button>
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
    }
}