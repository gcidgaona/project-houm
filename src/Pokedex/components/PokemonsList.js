import React, {memo} from 'react'
import { Space, BackTop } from 'antd'
import CardPokemon from './CardPokemon'

export const PokemonsList = memo(({pokemons}) => {
  return (
    <div>
      <Space direction="horizontal" size={120} wrap style={{ display: 'flex', justifyContent: 'center' }}>
      {
          pokemons
          .sort((a, b) => a.id > b.id ? 1 : -1)
          .map(pokemon => <CardPokemon key={pokemon.id} data={pokemon.restData} id={pokemon.id} name={pokemon.name}  sprite={pokemon.sprites} types={pokemon.types} />)
      }
      </Space>
      <BackTop>
        <div style={style.backToTop}>UP</div>
      </BackTop>
    </div>
  )
})

const style = {
  backToTop: {
    height: 40,
    width: 40,
    lineHeight: '40px',
    borderRadius: 100,
    backgroundColor: '#263238',
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
  }
};