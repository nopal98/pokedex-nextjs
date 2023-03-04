import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Layout from '@/components/Layout'
import Link from 'next/Link';
const inter = Inter({ subsets: ['latin'] })


export default function Home({pokemon}) {
  console.log(pokemon)
  return (
    <Layout title="Pokedex by Naufal Ihsan">
      <h1 className="text-4xl mb-8 text-center">Pokedex</h1>
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center">
          {pokemon.map((pokeman:any, index:any) => (
            <div key={index} className="w-full md:w-1/3 lg:w-4/4 px-3 mb-4 ">
              <Link href={`/pokemon?id=${index + 1}`}>
                <span className="border p-4 border-grey my-2 hover:shadow-lg capitalize flex items-center text-lg bg-gray-200 rounded-md w-ful">
                  <img
                    src={pokeman.image}
                    alt={pokeman.name}
                    className="w-20 h-20 mr-3"
                  />
                  <span className="mr-2 font-bold">{index + 1}.</span>
                  {pokeman.name}
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>

  )
}

export async function getStaticProps(context) {
  try {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
      const { results } = await res.json();
      const pokemon = results.map((pokemon:any, index:any) => {
      const paddedId = ('00' + (index + 1)).slice(-3); //00n

          const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
          return { ...pokemon, image };
      });
      return {
          props: { pokemon },
      };
  } catch (err) {
      console.error(err);
  }
}
