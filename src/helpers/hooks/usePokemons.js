import {useCallback, useEffect, useState} from 'react'
import axios from "axios";
import { API_URL } from '../../constants/api'

let offset = 0

const usePokemons = () => {

  const [pokemons, setPokemons] = useState([])
  const [loadingPokemons, setLoadingPokemons] = useState(false)

  const getPokemons = useCallback(async () => {
    setLoadingPokemons(true)
    return await axios.get(`${API_URL}pokemon?limit=10&offset=${offset}`).then((response) => {
        return response.data.results
    });
  }, [])
  const getPokemon = useCallback((url) => {
    axios.get(url).then((response) => {
        const { sprites, types, id, name, ...restData } = response.data
        let infoPokemon = {
            id,
            name,
            sprites,
            types,
            restData
        }
        if(pokemons.findIndex(pokemon => pokemon.name === name) === -1){
          setPokemons(pokemons => [...pokemons, infoPokemon])
        }
    });
    setLoadingPokemons(false)
  },[])
  
  const getInfoPokemons = useCallback(async () =>{
    let getResultPokemons = await getPokemons()
    getResultPokemons.map(pokemon => getPokemon(pokemon.url))
    offset+=10
  }, [getPokemon, getPokemons])

  
  useEffect(() => {
    getInfoPokemons()
  }, [])

  return {loadingPokemons, pokemons, getPokemons, getInfoPokemons}
}

export default usePokemons