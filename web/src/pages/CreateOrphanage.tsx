// eslint-disable-next-line no-use-before-define
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
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
 // images: File[],
  // previewImages: string[]
}

export default function CreateOrphanage () {
  // const history = useHistory()
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      latitude: 0,
      longitude: 0,
      instructions: '',
      about: '',
      name: '',
      opening_hours: '',
      open_on_weekends: true
    }
  })

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 })

  // const [about, setAbout] = useState('')
  // const [instructions, setInstructions] = useState('')
  // const [name, setName] = useState('')
  // const [opening_hours, setOpening_hours] = useState('')
  const [open_on_weekends, setOpen_on_weekends] = useState(true)

  function handleMapClick (event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng
    setPosition({
      latitude: lat,
      longitude: lng
    })
    setValue('latitude', lat)
    setValue('longitude', lng)
  }

  /* const [images, setImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])

  function handleSelectImages (event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return
    }

    const selectedImages = Array.from(event.target.files)

    setImages(selectedImages)

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image)
    })

    setPreviewImages(selectedImagesPreview)
  }

  async function handleSubmit (event: FormEvent) {
    event.preventDefault()

    const { latitude, longitude } = position

    const data = new FormData()

    data.append('name', name)
    data.append('latitude', String(latitude))
    data.append('longitude', String(longitude))
    data.append('about', about)
    data.append('instructions', instructions)
    data.append('opening_hours', opening_hours)
    data.append('open_on_weekends', String(open_on_weekends))

    images.forEach(image => {
      data.append('images', image)
    })

    await api.post('orphanages', data)

    alert('Cadastro realizado com sucesso')

    history.push('/app')
  }
*/
  const onSubmit = (data: Props) => { return console.log(data) }

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
              />

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
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input
                id="opening_hours"
                name="opening_hours"
                ref={register({ required: true })}
              />
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

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
