import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LeafletMouseEvent } from 'leaflet';
import { useMaluku } from '@/lib/documents/malukuDoc';
import { renderToString } from 'react-dom/server';
import Loader from './Loader';

function Map() {
  const { data: geodata, isLoading } = useMaluku();

  function getColor(number: number) {
    switch (number) {
      case 0:
        return '#2CA25F';
      case 1:
        return '#FDB863';
      default:
        return '#F44336';
    }
  }

  function getMapStyle(feature: any) {
    return {
      color: getColor(feature.offenseCount),
      weight: 1,
    };
  }

  function highlightFeature(event: LeafletMouseEvent) {
    event.target.setStyle({
      color: '#9C27B0',
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      event.target.bringToFront();
    }
  }
  function resetHighlight(event: LeafletMouseEvent) {
    event.target.setStyle(getMapStyle(event.target.feature));
  }

  function onEachFeature(feature: any, layer: L.Layer) {
    const {
      properties: { provinsi, kota },
      offenseCount,
    } = feature;

    layer.bindPopup(
      renderToString(
        <table style={{ width: '100%' }}>
          <tbody>
            <tr style={{ borderBottom: '1px solid #EEEEEE' }}>
              <td
                style={{
                  padding: '.5rem .2rem .5rem 1rem',
                  fontWeight: 'bold',
                }}
              >
                Kota
              </td>
              <td>:</td>
              <td style={{ padding: '.5rem 1rem .5rem .2rem' }}>{kota}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #EEEEEE' }}>
              <td
                style={{
                  padding: '.5rem .2rem .5rem 1rem',
                  fontWeight: 'bold',
                }}
              >
                Provinsi
              </td>
              <td>:</td>
              <td style={{ padding: '.5rem 1rem .5rem .2rem' }}>{provinsi}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #EEEEEE' }}>
              <td
                style={{
                  padding: '.5rem .2rem .5rem 1rem',
                  fontWeight: 'bold',
                }}
              >
                Pelanggaran
              </td>
              <td>:</td>
              <td style={{ padding: '.5rem 1rem .5rem .2rem' }}>
                {offenseCount}
              </td>
            </tr>
          </tbody>
        </table>,
      ),
    );

    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
    });
  }

  return isLoading || !geodata ? (
    <Loader />
  ) : (
    <MapContainer
      center={[-3.277757, 128.203195]}
      zoom={6}
      scrollWheelZoom={false}
      style={{ width: '100%', height: '40rem' }}
    >
      {/* <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      /> */}
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
      />

      <GeoJSON
        data={geodata}
        onEachFeature={onEachFeature}
        style={getMapStyle}
      ></GeoJSON>
    </MapContainer>
  );
}

export default Map;
