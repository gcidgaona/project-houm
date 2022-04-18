import React, { useEffect, useState, useMemo } from 'react'
import { Space, Tag } from 'antd'
import { CardPokemon } from './components/CardPokemon'
import { SearchBar } from './components/SearchBar'
import axios from 'axios'
import SearchContext from '../helpers/context/SearchContext'
import { TYPES_POKEMONS, COLOURS_TYPE } from '../constants/pokemonTypes'

export const Pokedex = () => {
    
    let offset = 0
    const [pokemons, setPokemons] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [typesFilter, setTypesFilter] = useState([])
    const handleSetSearchText = (text) => {
        setSearchText(text)
      }

    const filterPokemons = useMemo(() => {
        const pokemonTextFilter = (entry) =>
            searchText.length === '' || entry.name.toLowerCase().includes(searchText.toLowerCase())
        const typeFilter = (entry) => {
            if(typesFilter.length === 0){
                return true
            }
            if(typesFilter.length === 1){
                let getNameTypes = entry.types.map(item => item.type.name)
                return getNameTypes.includes(typesFilter[0])
            }
            if(typesFilter.length > 1){
                let getNameTypes = entry.types.map(item => item.type.name)
                let isIncluded = true
                typesFilter.forEach(type => {
                    if(!getNameTypes.includes(type)){
                        isIncluded = false
                    }
                })
                return isIncluded
            }
        }

        const reducer = (accumulator, entry) => {
            if (pokemonTextFilter(entry) && typeFilter(entry))
              accumulator.push(entry)
            return accumulator
          }
    
        return pokemons.reduce(reducer, [])
    }, [searchText, pokemons, typesFilter])

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
            const { sprites, types, id, name, ...restData } = response.data
            let infoPokemon = {
                id,
                name,
                sprites,
                types,
                restData
            }
            setPokemons(pokemons => [...pokemons, infoPokemon])
        });
        setLoading(false)
      }
    
    const handleAddTypesFilter = (type) => {
        if(typesFilter.includes(type)){
            let deleteType = typesFilter.filter(actualType => actualType !== type)
            setTypesFilter(deleteType)
        }else{
            setTypesFilter(types => [...types, type])
        }
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
        <div >
            <div className='sticky-search-bar' style={{backgroundColor: 'white', marginBottom: '2rem', height: '20vh', display: 'flex', flexDirection: 'column',justifyContent: 'center', alignItems: 'center' }}>
                    <SearchBar />
                    <Space direction="horizontal" size={4} wrap style={{display: 'flex', justifyContent: 'center' ,marginTop: 10, paddingLeft: 12, paddingRight: 12}}>
                        {
                            TYPES_POKEMONS.map(type => <Tag className='tag-type' onClick={() => handleAddTypesFilter(type)} color={typesFilter.includes(type) ? COLOURS_TYPE[type] : null} style={{ textTransform: 'capitalize' }}>{type}</Tag>)
                        }
                    </Space>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
                <Space direction="horizontal" size={120} wrap style={{ display: 'flex', justifyContent: 'center' }}>
                    {
                        filterPokemons
                        .sort((a, b) => a.id > b.id ? 1 : -1)
                        .map(pokemon => <CardPokemon key={pokemon.id} data={pokemon.restData} id={pokemon.id} name={pokemon.name}  sprite={pokemon.sprites} types={pokemon.types} />)
                    }
                </Space>
            </div>
        </div>
    </SearchContext.Provider>

    )
}
