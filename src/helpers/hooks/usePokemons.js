import {useEffect, useState} from 'react'
import axios from "axios";
import { API_URL } from '../../constants/api'

const usePokemons = () => {

  let offset = 0

  const [pokemons, setPokemons] = useState([])
  const [loadingPokemons, setLoadingPokemons] = useState(false)


  
  const getInfoPokemons = async () =>{
    let getResultPokemons = await getPokemons()
    getResultPokemons.map(pokemon => getPokemon(pokemon.url))
    offset+=10
  }

  const getPokemons = async () => {
    setLoadingPokemons(true)
    return await axios.get(`${API_URL}pokemon?limit=10&offset=${offset}`).then((response) => {
        return response.data.results
    });
  }
  const getPokemon = (url) => {
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
  }
  
  useEffect(() => {
    getInfoPokemons()
  }, [])

  return {loadingPokemons, pokemons, getPokemons, getInfoPokemons}
}

export default usePokemons