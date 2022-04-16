import React, { useState, useEffect } from 'react'
import { Card, Tag, Modal } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import axios from 'axios'
const { Meta } = Card;

// SECONDARY COLOR = #607D8B

const COLOURS_TYPE = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

export const CardPokemon = ({ name, url }) => {

  const [sprite, setSprite] = useState('')
  const [types, setTypes] = useState([])
  const [id, setId] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false)

  const DetailPokemon = ({ isOpen, name }) => {
    return (
      <Modal title={
        <span style={{ textTransform: 'capitalize' }}>
          {name}
        </span>
      } visible={isOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    )
  }
  useEffect(() => {
    setLoading(true)
    axios.get(url).then((response) => {
      // console.log('RESPONSE API', response.data);
      const { sprites, types, id } = response.data
      setSprite(sprites.front_default)
      setTypes(types)
      setId(id)
      setLoading(false)
    });
  }, [])

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
      cover={
        <div className='background-card' style={{ display: 'flex', justifyContent: 'center' }}>
          <div className='background-avatar-pokemon'>
            <img
              alt="example"
              src={sprite}
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


