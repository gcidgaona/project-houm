import React, { useState, useCallback, memo } from 'react'
import { Card, Tag } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { COLOURS_TYPE } from '../../constants/pokemonTypes';
import { DetailPokemon } from './DetailPokemon';
import PokemonContext from '../../helpers/context/PokemonContext'
const { Meta } = Card;


const CardPokemon = ({ id, name, sprite, types, data }) => {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const info = { id, name, sprite, types, data }

  const showModal = () => {
    setIsModalVisible(true);
  };

  
  const handleOk = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  return (
    <PokemonContext.Provider value={info}>
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
              {
                isModalVisible ? <DetailPokemon isOpen={isModalVisible}  handleCancel={handleCancel} handleOk={handleOk}/> : null
              }
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div>
                  <p style={{ textTransform: 'capitalize' }}>
                    {name}
                  </p>
                </div>
                <div style={{ marginLeft: 3 }}>
                  <p style={{ fontSize: '.8rem' }} className="color-sub-text">#{id}</p>
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
    </PokemonContext.Provider>
  )
}

export default memo(CardPokemon)

