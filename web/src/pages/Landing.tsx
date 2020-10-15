// eslint-disable-next-line no-use-before-define
import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowDownRight } from 'react-icons/fi'

import logoImg from '../images/logo.svg'

import '../styles/pages/landing.css'

export default function Lading () {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <img src={logoImg} alt="Happy" />

        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>

        <div className="location">
          <strong>Goiás</strong>
          <span>Aparecida de Goiânia</span>
        </div>

        <Link to="/app" className="enter-app">
          <FiArrowDownRight size={26} color="rgba(0, 0, 0, 0.6)" />
        </Link>

      </div>
    </div>
  )
}
