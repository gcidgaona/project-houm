import React, { useEffect, useState, useCallback } from 'react'
import { Space } from 'antd'
import { CardPokemon } from './components/CardPokemon'
import { SearchBar } from './components/SearchBar'
import axios from 'axios'
export const Pokedex = () => {

    let offset = 0
    const [pokemons, setPokemons] = useState([])
    const [loading, setLoading] = useState(false)

    const handleScroll = (e) => {
        if(window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight){
            getPokemons()
        }
    }

    const getPokemons = () => {
        setLoading(true)
        axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`).then((response) => {
            // console.log('RESPONSE API', response.data.results);
            setPokemons(pokemons => [...pokemons, ...response.data.results])
            offset+=10
            setLoading(false)
        });
    }
    
    
    useEffect(() => {
        getPokemons()
        window.addEventListener("scroll", handleScroll)
    }, [])

    return (
        <div style={{ backgroundColor: 'red', padding: '2rem' }}>
            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
                <SearchBar />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'green' }}>
                <Space direction="horizontal" size={120} wrap style={{ display: 'flex', justifyContent: 'center' }}>
                    {
                        pokemons.map((pokemon, index) => <CardPokemon key={pokemon.name} name={pokemon.name} url={pokemon.url} />)
                    }
                </Space>
            </div>
        </div>
    )
}
