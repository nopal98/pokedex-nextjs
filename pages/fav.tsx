import React, { useEffect, useState  } from 'react';
import Layout from '../components/Layout';
import Link from 'next/Link';
import Swal from 'sweetalert2'

export default function fav(){
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
                timer: 2000,
                showCancelButton: false,
                showConfirmButton: false
              })
             
          }
        }
        return [];
      });
    const alertSuccess = () => {
        Swal.fire({
            title: 'Hello!',
            text: 'This is a sweet alert!',
            icon: 'success',
            confirmButtonText: 'OK'
          })
      }
    return (
        <Layout title="Favorite Clothes">
        <div className="clothes-container">
         const
        </div>
      </Layout>
    );
}