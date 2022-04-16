import React, { useEffect, useState, useMemo } from 'react'
import { Space } from 'antd'
import { CardPokemon } from './components/CardPokemon'
import { SearchBar } from './components/SearchBar'
import axios from 'axios'
import SearchContext from '../helpers/context/SearchContext'
export const Pokedex = () => {

    let offset = 0
    const [pokemons, setPokemons] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchText, setSearchText] = useState('')

    const handleSetSearchText = (text) => {
        setSearchText(text)
      }

    const filterPokemons = useMemo(() => {
        if(!searchText){
            return pokemons
        }
        return pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(searchText.toLowerCase()))

    }, [searchText, pokemons])

    const handleScroll = (e) => {
        if(window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight){
            getInfoPokemons()
        }
    }

    const getInfoPokemons = async () =>{
        let getResultPokemons = await getPokemons()
        console.log('GET RESUL POKEMONS', getResultPokemons);
        getResultPokemons.map(pokemon => getPokemon(pokemon.url))
        offset+=10
    }

    const getPokemons = async () => {
        setLoading(true)
        return await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`).then((response) => {
            return response.data.results
        });
    }
    
    const getPokemon = (url) => {
        axios.get(url).then((response) => {
            const { sprites, types, id, name } = response.data
            let infoPokemon = {
                id,
                name,
                sprites,
                types
            }
            setPokemons(pokemons => [...pokemons, infoPokemon])
        });
        setLoading(false)
      }
      
      useEffect(() => {
          getInfoPokemons()
      }, [])
      
    useEffect(() => {
        getPokemons()
        window.addEventListener("scroll", handleScroll)
    }, [])


    return (
    <SearchContext.Provider value={handleSetSearchText}>

        <div style={{padding: '2rem' }}>
            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', height: 70 }} className="sticky-search-bar">
                <SearchBar />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Space direction="horizontal" size={120} wrap style={{ display: 'flex', justifyContent: 'center' }}>
                    {
                        filterPokemons
                        .sort((a, b) => a.id > b.id ? 1 : -1)
                        .map(pokemon => <CardPokemon key={pokemon.id} id={pokemon.id} name={pokemon.name}  sprite={pokemon.sprites.front_default} types={pokemon.types} />)
                    }
                </Space>
            </div>
        </div>
    </SearchContext.Provider>

    )
}
