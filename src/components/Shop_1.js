import React from "react";
import { useNavigate } from "react-router-dom";  // Importar useNavigate
  
const Shop_1 = () => {

  const navigate = useNavigate();  // Inicializar el hook de navegación

  const callouts = [
    {
      name: 'Ahorros',
      description: 'Explicación',
      imageSrc: 'https://images.pexels.com/photos/6694543/pexels-photo-6694543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      imageAlt: 'Dinero y una calculadora.',
      href: "expense", // Este es el destino de la navegación
    },
    {
      name: 'Planes',
      description: 'Explicación',
      imageSrc: 'https://images.pexels.com/photos/7698735/pexels-photo-7698735.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      imageAlt: 'Hombre explicando un plan.',
      href: '#', // Aquí aún no hay ruta, puedes añadirla más tarde
    },
    {
      name: 'Inversiones',
      description: 'Explicación',
      imageSrc: 'https://images.pexels.com/photos/187041/pexels-photo-187041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      imageAlt: 'Ipad con stocks.',
      href: '#', // Aquí también puedes definir la ruta
    },
  ];

  // Función para manejar el click y la navegación
  const handleClick = (href) => {
    if (href !== '#') { // Verifica que la ruta no sea un valor vacío
      navigate(href);
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold text-gray-900">Categorias</h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {callouts.map((callout) => (
              <div key={callout.name} className="group relative transition-transform duration-300 transform hover:scale-105 hover:shadow-lg">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1">
                  <img
                    alt={callout.imageAlt}
                    src={callout.imageSrc}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
                  <h3 className="text-sm text-gray-500">
                    {/* Usamos onClick en lugar de href */}
                    <button
                      onClick={() => handleClick(callout.href)} // Llama a la función handleClick con la ruta
                      className="absolute inset-0 w-full h-full cursor-pointer"
                    >
                      {callout.name}
                    </button>
                  </h3>
                  <p className="text-base font-semibold text-gray-900">{callout.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop_1;
