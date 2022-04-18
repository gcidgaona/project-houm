import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, Tag, Modal, Carousel, Space, Statistic, Row, Col, Tooltip } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { COLOURS_TYPE } from '../../constants/pokemonTypes';
const { Meta } = Card;

// SECONDARY COLOR = #607D8B



export const CardPokemon = ({ id, name, sprite, types, data }) => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false)

  
  const DetailPokemon = ({ isOpen, name }) => {

    const [detail, setDetail] = useState({})
    const [textDetail, setTextDetail] = useState('')
    const [textGen, setTextGen] = useState('')
    const [baseEvolve, setBaseEvolve] = useState('')
    const [evolveToName, setEvolveToName] = useState('')
    const [secondEvolveToName, setSecondEvolveToName] = useState('')
    const [habitatName, setHabitatName] = useState('')

    const getEvolutionChain = (url) => {
       axios.get(url).then((response) => {
        const { chain } = response.data
        let evolveTo = chain.evolves_to[0].species.name
        let secondEvolve = chain.evolves_to[0].evolves_to[0].species.name || ''
        setBaseEvolve(chain.species.name)
        setEvolveToName(evolveTo)
        if(secondEvolve !== '') setSecondEvolveToName(secondEvolve)
      });
    }
    const getMoreDetailPokemon = async () => {
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
      });
    }
    useEffect(() => {
      getMoreDetailPokemon()
    }, [])
    
    const contentStyle = {
      display: 'flex',
      justifyContent: 'center',
      height: 170
    };

    return (
      <Modal visible={isOpen} cancelButtonProps={{ style: { display: 'none' } }} onCancel={handleCancel} onOk={handleOk} style={{ top: 20 }}>
        <div>
          <div>
            <Carousel effect="fade" autoplay dots={false}>
              <div>
                <div style={contentStyle} >
                  <img
                    className="background-avatar-pokemon"
                    alt="example"
                    src={sprite.front_default}
                    width={130}
                    height={130}
                  />
                </div>
              </div>
              <div>
                <div style={contentStyle}>
                  <img
                    className="background-avatar-pokemon"
                    alt="example"
                    src={sprite.back_default}
                    width={130}
                    height={130}
                  />
                </div>
              </div>
              <div>
                <div style={contentStyle}>
                  <img
                    className="background-avatar-pokemon"
                    alt="example"
                    src={sprite.front_shiny}
                    width={130}
                    height={130}
                  />
                </div>
              </div>
              <div>
                <div style={contentStyle}>
                  <img
                    className="background-avatar-pokemon"
                    alt="example"
                    src={sprite.back_shiny}
                    width={130}
                    height={130}
                  />
                </div>
              </div>
            </Carousel>
          </div>
          <div>
            <Space style={{display: 'flex', justifyContent: 'center'}}>
              <div>
                <h1 style={{textTransform: 'capitalize', fontSize: 19}} className="color-title">{name}</h1>
              </div>
              <div>
                <h1 style={{textTransform: 'capitalize', fontSize: 19}} className="color-title">/</h1>
              </div>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <h1 style={{fontSize: 15}} className='color-sub-text'>
                  {textGen}
                </h1>
              </div>
            </Space>
            <div style={{display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
              <p className='color-sub-text' style={{fontSize: '1rem'}}>
                {textDetail}
              </p>
            </div>
            <Row gutter={24}>
              <Col span={6} >
                <Statistic title={<span style={{display: 'flex', justifyContent: 'center'}} className="color-sub-text"><p>Altura</p></span>} value={data.height / 10} precision={2} suffix="m" valueStyle={{textTransform: 'capitalize', fontSize: 17, display: 'flex', justifyContent: 'center'}}/>
              </Col>
              <Col span={6}>
                <Statistic title={<span style={{display: 'flex', justifyContent: 'center'}} className="color-sub-text"><p>Peso</p></span>} value={data.weight / 10} precision={2} suffix="kg" valueStyle={{textTransform: 'capitalize', fontSize: 17, display: 'flex', justifyContent: 'center'}}/>
              </Col>
              <Col span={6}>
                <Statistic title={<span style={{display: 'flex', justifyContent: 'center'}} className="color-sub-text"><p>Ratio Captura</p></span>} value={detail.capture_rate} suffix="%" valueStyle={{textTransform: 'capitalize', fontSize: 17, display: 'flex', justifyContent: 'center'}}/>
              </Col>
              <Col span={6}>
                <Statistic title={<span style={{display: 'flex', justifyContent: 'center'}} className="color-sub-text"><p>Habitat</p></span>} value={habitatName} valueStyle={{textTransform: 'capitalize', fontSize: 17, display: 'flex', justifyContent: 'center'}}/>
              </Col>
            </Row>
            <div style={{marginTop: 24}}>
              <div style={{display: 'flex', justifyContent: 'center', fontSize: 10, marginBottom: 12}}>
                <h1 className='color-title'>Evoluciones</h1>
              </div>
              <Space size={70} wrap style={{display: 'flex', justifyContent: 'center'}}>
                <div>
                  <Tooltip placement="top" title={baseEvolve}>
                    <img alt="pokemon" src={`https://img.pokemondb.net/artwork/large/${baseEvolve}.jpg`} width="70px"/>
                  </Tooltip>

                </div>
                <div>
                  <Tooltip placement="top" title={evolveToName}>
                    <img alt="pokemon" src={`https://img.pokemondb.net/artwork/large/${evolveToName}.jpg`} width="70px"/>
                  </Tooltip>
                </div>
                <div>
                  <Tooltip placement="top" title={secondEvolveToName}>
                    <img alt="pokemon" src={`https://img.pokemondb.net/artwork/large/${secondEvolveToName}.jpg`} width="70px"/>
                  </Tooltip>
                </div>
              </Space>
            </div>
          </div>
        </div>
      </Modal>
    )
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Card
      style={{ width: 300 }}
      className="shadow-card"
      cover={
        <div className='background-card' style={{ display: 'flex', justifyContent: 'center' }}>
          <div className='background-avatar-pokemon'>
            <img
              alt="example"
              src={sprite.front_default}
              width={150}
              height={150}
            />
          </div>
        </div>
      }
      actions={[
        <EyeOutlined onClick={showModal} />,
      ]}
    >
      <Meta
        title={
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <DetailPokemon isOpen={isModalVisible} name={name} />
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <div>
                <p style={{ textTransform: 'capitalize' }}>
                  {name}
                </p>
              </div>
              <div style={{ marginLeft: 3 }}>
                <p style={{ color: '#607D8B', fontSize: '.8rem' }}>#{id}</p>
              </div>
            </div>
            <div>
              {
                types.map(type => <Tag key={type.type.name + name} color={COLOURS_TYPE[type.type.name]} style={{ textTransform: 'capitalize' }}>{type.type.name}</Tag>)
              }
            </div>
          </div>
        }
      />
    </Card>
  )
}


