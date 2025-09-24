import { useEffect, useState } from "react"

export const useFetch = (url, options = {}) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)
    

    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await fetch(url, options)
            const data = await response.json()
            if (!response.ok) throw new Error("Error en el fetch")
            setData(data)
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [url])
    return {
        fetchData,
        loading,
        error,
        data,
        
    }
}