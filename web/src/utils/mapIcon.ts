import Leaflet from 'leaflet'

import markLocal from '../images/markLocal.svg'

const mapIcon = Leaflet.icon({
  iconUrl: markLocal,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
})

export default mapIcon
