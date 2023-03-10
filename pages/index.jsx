import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Layout from '@/components/Layout'
import Link from 'next/link';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

const inter = Inter({ subsets: ['latin'] })


export default function Home({initialPokemon }) {
  console.log(initialPokemon)
  const [pokemon, setPokemon] = useState(initialPokemon);
  const [hasMore, setHasMore] = useState(true);
  // const [category, setCategory] = useState('');
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(50);
  const [val, setValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Fungsi loadmore, nambah 50 setiap kali scroll kebawah
  const loadMore = async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
      const { results } = await res.json();
      const newPokemon = results.map((pokemon, index) => {
        const paddedId = ('00' + (index + 1)).slice(-3);
        const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
        return { ...pokemon, image };
      });
      setPokemon((prev) => [...prev, ...newPokemon]);
      setOffset((prev) => (parseInt(prev) || 0) + limit);
    
  };

  return (
    <Layout title="Pokedex by Naufal Ihsan">
      <h1 className="text-4xl mb-8 text-center">Pokedex</h1>
      <div className="container mx-auto">
        <InfiniteScroll
          pageStart={0}
          loadMore={loadMore}
          hasMore={hasMore}
          loader={<div key={0}>Data Not Found</div>}
        >
          <div className="flex flex-wrap justify-center">
            {pokemon?.map((pokeman, index) => (
              <div key={index} className="w-full md:w-1/3 lg:w-4/4 px-3 mb-4 ">
                <Link href={`/pokemon?val=${pokeman.name}`}>
                  <span className="border p-4 border-grey my-2 hover:shadow-lg hover:bg-green-100 capitalize flex items-center text-lg bg-gray-200 rounded-md w-ful">
                    <img src={pokeman?.image} alt={pokeman.name} className="w-20 h-20 mr-3" />
                    <span className="mr-2 font-bold">{index + 1}.</span>
                    {pokeman.name}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=25');
    const { results } = await res.json();
    const initialPokemon = results.map((pokemon, index) => {
      const paddedId = ('00' + (index + 1)).slice(-3); //00n
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
      return { ...pokemon, image };
    });
    return {
      props: { initialPokemon },
    };
  } catch (err) {
    console.error(err);
  }
}
