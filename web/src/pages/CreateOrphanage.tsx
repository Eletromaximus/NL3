// eslint-disable-next-line no-use-before-define
import React, { ChangeEvent, useState } from 'react'
import { Map, Marker, TileLayer } from 'react-leaflet'
import { LeafletMouseEvent } from 'leaflet'
import { FiPlus } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import '../styles/pages/create-orphanage.css'

import Sidebar from '../components/Sidebar'
import mapIcon from '../utils/mapIcon'
import api from '../services/api'

interface Props {
  latitude: number,
  longitude: number,
  instructions: string,
  about: string,
  name: string,
  opening_hours: string,
  open_on_weekends: boolean,
  images: File[],
}

export default function CreateOrphanage () {
  const history = useHistory()
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 })
  const [open_on_weekends, setOpen_on_weekends] = useState(true)
  const [name, setName] = useState('')
  const { register, handleSubmit, setValue, errors } = useForm({
    defaultValues: {
      latitude: 0,
      longitude: 0,
      instructions: '',
      about: '',
      name: '',
      opening_hours: '',
      open_on_weekends: true,
      images: []
    }
  })

  function handleMapClick (event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng
    setPosition({
      latitude: lat,
      longitude: lng
    })
  }

  const [images, setImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])

  function handleSelectImages (event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return
    }

    const selectedImages = Array.from(event.target.files)

    setImages(selectedImages)
    setValue('images', selectedImages)

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image)
    })

    setPreviewImages(selectedImagesPreview)
  }

  const onSubmit = async (data: Props) => {
    const { latitude, longitude } = position

    if (latitude !== 0 && longitude !== 0) {
      const Form = new FormData()

      Form.append('name', data.name)
      Form.append('latitude', String(latitude))
      Form.append('longitude', String(longitude))
      Form.append('about', data.about)
      Form.append('instructions', data.instructions)
      Form.append('opening_hours', data.opening_hours)
      Form.append('open_on_weekends', String(open_on_weekends))

      images.forEach(image => {
        Form.append('images', image)
      })

      await api.post('orphanages', Form)

      alert('Cadastro realizado com sucesso')

      history.push('/app')
    } else {
      alert(' Indique no mapa a localização do orfanato ')
    }
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit(onSubmit)} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-16.6302977, -49.327215]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              { position.latitude !== 0 && (
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[position.latitude, position.longitude]}
                />)
              }

            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                name="name"
                ref={register({ required: true })}
                value={name}
                onChange={event => setName(event.target.value)}
              />
              {errors.name?.type === 'required' && (<p> Por favor, coloque o nome do orfanato </p>)}

            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea
                id="about"
                name="about"
                maxLength={300}
                ref={register({ required: true })}
              />
            </div>
            {errors.about?.type === 'required' && <p> Por favor, descreva algo relevante sobre orfanato </p> }

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map(image => {
                  return (
                    <img key={image} src={image} alt={name}/>
                  )
                })}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              {errors.images && <p> Por favor, insira alguma(s) fotos do orfanato </p> }

              <input multiple ref={register({ required: true })} onChange={handleSelectImages} type="file" id="image[]"/>
            </div>

          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                name="instructions"
                id="instructions"
                ref={register({ required: true })}
              />
              {errors.instructions?.type === 'required' && <p> Detalhe os procedimentos e os contatos do orfanato </p> }
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input
                id="opening_hours"
                name="opening_hours"
                ref={register({ required: true })}
              />
              {errors.opening_hours?.type === 'required' && <p> Por favor, descreva algo relevante sobre orfanato </p> }
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={open_on_weekends ? 'active' : ''}
                  onClick={() => {
                    setValue('open_on_weekends', true)
                    setOpen_on_weekends(true)
                  }}
                >
                    Sim
                </button>
                <button
                  type="button"
                  className={!open_on_weekends ? 'active' : ''}
                  onClick={() => {
                    setValue('open_on_weekends', false)
                    setOpen_on_weekends(false)
                  }}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  )
}
