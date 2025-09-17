import React, { useState, useEffect } from "react"



export const CarruselRing = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const API_URL = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const fetchDataCollares = async () => {
            try {
                setLoading(true)
                const response = await fetch(`${API_URL}/ring_types`)

                if (!response.ok) {
                    throw new Error(`error: ${response.status}`)
                }

                const result = await response.json()

                console.log(result)
                setData(result)
                


            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchDataCollares()
    }, [])


    return (

        <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Nuestros Collares</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((ring) => (
          <div key={ring.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Imagen */}
            
            {/* Contenido */}
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{ring.name}</h3>
              <p className="text-gray-600 mb-3">{ring.description}</p>
              <p className="text-xl font-bold text-green-600">${ring.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    )
}