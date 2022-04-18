import React, {useContext} from 'react'
import { Carousel, Space, Statistic, Row, Col, Tooltip } from 'antd';
import { StatisticTitle } from './StatisticTitle';
import PokemonContext from '../../helpers/context/PokemonContext';

export const InfoModal = ({ detail, textDetail, textGen, baseEvolve, evolveToName, secondEvolveToName, habitatName }) => {

  const {name, sprite, data} = useContext(PokemonContext)

  return (
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
        <Space style={{ display: 'flex', justifyContent: 'center' }}>
          <div>
            <h1 style={{ textTransform: 'capitalize', fontSize: 19 }} className="color-title">{name}</h1>
          </div>
          <div>
            <h1 style={{ textTransform: 'capitalize', fontSize: 19 }} className="color-title">/</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h1 style={{ fontSize: 15 }} className='color-sub-text'>
              {textGen}
            </h1>
          </div>
        </Space>
        <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
          <p className='color-sub-text' style={{ fontSize: '1rem' }}>
            {textDetail}
          </p>
        </div>
        <Row gutter={24}>
          <Col span={6} >
            <Statistic title={<StatisticTitle title="Altura" />} value={data.height / 10} precision={2} suffix="m" valueStyle={{ textTransform: 'capitalize', fontSize: 17, display: 'flex', justifyContent: 'center' }} />
          </Col>
          <Col span={6}>
            <Statistic title={<StatisticTitle title="Peso" />} value={data.weight / 10} precision={2} suffix="kg" valueStyle={{ textTransform: 'capitalize', fontSize: 17, display: 'flex', justifyContent: 'center' }} />
          </Col>
          <Col span={6}>
            <Statistic title={<StatisticTitle title="Ratio Captura" />} value={detail.capture_rate} suffix="%" valueStyle={{ textTransform: 'capitalize', fontSize: 17, display: 'flex', justifyContent: 'center' }} />
          </Col>
          <Col span={6}>
            <Statistic title={<StatisticTitle title="Habitat" />} value={habitatName} valueStyle={{ textTransform: 'capitalize', fontSize: 15, display: 'flex', justifyContent: 'center' }} />
          </Col>
        </Row>
        <div style={{ marginTop: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'center', fontSize: 10, marginBottom: 12 }}>
            <h1 className='color-title'>Evoluciones</h1>
          </div>
          <Space size={70} wrap style={{ display: 'flex', justifyContent: 'center' }}>
            <div>
              <Tooltip placement="top" title={baseEvolve}>
                <img alt="pokemon" src={`https://img.pokemondb.net/artwork/large/${baseEvolve}.jpg`} width="70px" />
              </Tooltip>

            </div>
            {
              evolveToName &&
              <div>
                <Tooltip placement="top" title={evolveToName}>
                  <img alt="pokemon" src={`https://img.pokemondb.net/artwork/large/${evolveToName}.jpg`} width="70px" />
                </Tooltip>
              </div>
            }
            {
              secondEvolveToName &&
              <div>
                <Tooltip placement="top" title={secondEvolveToName}>
                  <img alt="pokemon" src={`https://img.pokemondb.net/artwork/large/${secondEvolveToName}.jpg`} width="70px" />
                </Tooltip>
              </div>
            }
          </Space>
        </div>
      </div>
    </div>
  )
}

const contentStyle = {
  display: 'flex',
  justifyContent: 'center',
  height: 170
};