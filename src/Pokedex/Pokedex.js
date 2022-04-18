import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { Space, Tag, Popover } from 'antd'
import { SearchBar } from './components/SearchBar'
import { FilterOutlined } from '@ant-design/icons';
import SearchContext from '../helpers/context/SearchContext'
import { TYPES_POKEMONS, COLOURS_TYPE } from '../constants/pokemonTypes'
import usePokemons from '../helpers/hooks/usePokemons'
import { PokemonsList } from './components/PokemonsList';

export const Pokedex = () => {

    const { pokemons, getPokemons, getInfoPokemons } = usePokemons()
    const [searchText, setSearchText] = useState('')
    const [typesFilter, setTypesFilter] = useState([])

    const handleSetSearchText = (text) => {
        setSearchText(text)
    }


    const filterPokemons = useMemo(() => {
        const pokemonTextFilter = (entry) =>
            searchText.length === '' || entry.name.toLowerCase().includes(searchText.toLowerCase())
        const typeFilter = (entry) => {
            if (typesFilter.length === 0) {
                return true
            }
            if (typesFilter.length === 1) {
                let getNameTypes = entry.types.map(item => item.type.name)
                return getNameTypes.includes(typesFilter[0])
            }
            if (typesFilter.length > 1) {
                let getNameTypes = entry.types.map(item => item.type.name)
                let isIncluded = true
                typesFilter.forEach(type => {
                    if (!getNameTypes.includes(type)) {
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

    const scrollToTop = () => {
        window.scrollTo(0, 0)
    }
    useEffect(() => {
        scrollToTop()
    }, [searchText, typesFilter])

    const handleScroll = useCallback((e) => {
        if (window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight) {
            getInfoPokemons()
        }
    }, [getInfoPokemons])

    const handleAddTypesFilter = (type) => {
        if (typesFilter.includes(type)) {
            let deleteType = typesFilter.filter(actualType => actualType !== type)
            setTypesFilter(deleteType)
        } else {
            setTypesFilter(types => [...types, type])
        }
    }

    const typesPopOver = () => {
        return (
            <Space direction="vertical" size={12}>
                {
                    TYPES_POKEMONS.map(type => <Tag key={type} className='tag-type' onClick={() => handleAddTypesFilter(type)} color={typesFilter.includes(type) ? COLOURS_TYPE[type] : null} style={{ textTransform: 'capitalize' }}>{type}</Tag>)
                }
            </Space>
        )
    }

    useEffect(() => {
        getPokemons()
    }, [getPokemons])

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
    }, [handleScroll])


    return (
        <SearchContext.Provider value={handleSetSearchText}>
            <div >
                <div className='sticky-search-bar' style={{ backgroundColor: 'white', marginBottom: '2rem', height: '20vh', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <SearchBar />
                    <Popover placement="bottom" title="Select Type" content={typesPopOver} trigger="click">
                        <FilterOutlined style={{ fontSize: 20, marginLeft: 15, color: typesFilter.length > 0 ? '#FF452B' : null }} />
                    </Popover>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
                    <PokemonsList pokemons={filterPokemons} />
                </div>
            </div>
        </SearchContext.Provider>

    )
}
