import { useEffect, useState } from "react"
import axios from "axios";

function useFetch(url) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

  // "https://v2.jokeapi.dev/joke/any"
  useEffect(()=> {
    setIsLoading(true)
    axios.get(url).then((response)=>{
        //
        setData(response.data)
    }).catch((err) => {
        setError(err)
    }).finally(() => {
        setIsLoading(false)
    })
  }, [url])

  const refetch = () => {
    axios.get(url).then((response)=>{
        //
        setData(response.data)
    }).catch((err) => {
        setError(err)
    }).finally(() => {
        setIsLoading(false)
    })
  }

  return {
    data,
    isLoading,
    error,
    refetch
  }
}

export default useFetch