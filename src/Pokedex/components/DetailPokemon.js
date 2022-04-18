import React, { useState, useEffect, useCallback, useContext } from 'react'
import { Modal } from 'antd';
import axios from 'axios'
import WithLoading from '../../helpers/hoc/withLoading'
import { InfoModal } from './InfoModal';
import PokemonContext from '../../helpers/context/PokemonContext';

const InfoWithLoading = WithLoading(InfoModal);

export const DetailPokemon = (({ isOpen, handleCancel,  handleOk}) => {

  const {name, sprite, data} = useContext(PokemonContext)

  const [detail, setDetail] = useState({})
  const [textDetail, setTextDetail] = useState('')
  const [textGen, setTextGen] = useState('')
  const [baseEvolve, setBaseEvolve] = useState('')
  const [evolveToName, setEvolveToName] = useState('')
  const [secondEvolveToName, setSecondEvolveToName] = useState('')
  const [habitatName, setHabitatName] = useState('')
  const [loading, setLoading] = useState(false)

  const getEvolutionChain = (url) => {
     axios.get(url)
      .then((response) => response.data)
      .then(({chain}) => {
        setBaseEvolve(chain.species.name)
        let evolveTo = chain.evolves_to[0].species.name
        setEvolveToName(evolveTo)
        let secondEvolve = chain.evolves_to[0].evolves_to[0] ? chain.evolves_to[0].evolves_to[0].species.name : ''
        if(secondEvolve !== '') setSecondEvolveToName(secondEvolve)
      });
  }
  const getMoreDetailPokemon = useCallback( async () => {
    setLoading(true)
    return await axios.get(data.species.url).then((response) => {
        const {flavor_text_entries: text, genera, habitat, evolution_chain} = response.data
        let textDescriptionFiltered = text.find(text => text.language.name === 'es').flavor_text
        let textGenFiltered = genera.find(gen => gen.language.name === 'es').genus
        getEvolutionChain(evolution_chain.url)
        setHabitatName(habitat.name)
        setTextGen(textGenFiltered)
        setTextDetail(textDescriptionFiltered)
        setDetail(response.data)
        setLoading(false)
    });
  }, [data.species.url])

  useEffect(() => {
    getMoreDetailPokemon()
  }, [getMoreDetailPokemon])
  
  
  return (
    <Modal visible={isOpen} cancelButtonProps={{ style: { display: 'none' } }} onCancel={handleCancel} onOk={handleOk} style={{ top: 20 }}>
      <InfoWithLoading 
        isLoading={loading}
        detail={detail}
        textDetail={textDetail}
        textGen={textGen}
        baseEvolve={baseEvolve}
        evolveToName={evolveToName}
        secondEvolveToName={secondEvolveToName}
        habitatName={habitatName}
    />
    </Modal>
  )
})
