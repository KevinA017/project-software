import React, { useState, useEffect } from 'react';
import { supabase } from "./supabaseClient";

function ShopMenu() {
    const [product, setProduct] = useState(null); // Estado para almacenar el producto
  const [loading, setLoading] = useState(true); // Estado para controlar la carga

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from('Productos') // Nombre de la tabla
        .select('*') // Obtener todos los campos
        .limit(1) // Limitar a un solo resultado
        .single(); // Obtener un solo objeto en lugar de un array

      if (error) {
        console.error('Error al cargar el producto:', error);
      } else {
        setProduct(data); // Almacenar el producto en el estado
      }
      setLoading(false); // Cambiar el estado de carga
    };

    fetchProduct(); // Llamar a la función de carga de producto
  }, []); // Solo se ejecuta una vez al montar el componente

  if (loading) {
    return <p>Cargando...</p>; // Mensaje de carga
  }

  // Comprobar si el producto existe
  if (!product) {
    return <p>No hay productos disponibles.</p>;
  }

    return(
        <p>{product.Name}</p>
       
        
    );
}


export default ShopMenu;