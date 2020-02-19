
import { css, html } from 'lit-element';
import { component } from 'haunted-lit-element';
import { useState } from 'haunted';
import { until } from 'lit-html/directives/until.js';

const VALID_UNITS = ['C', 'F'];
const GEOCODER_KEY = '460639f5150140d098b337d93cefb8a5';
const WEATHER_KEY = '845e19fd682309946e6a00a4936273cd';

const getRndTemp = (min = -10, max = 40) => Math.floor(Math.random() * (+max - min)) + min;

const getCityCoords = (city) =>
  fetch(`https://api.opencagedata.com/geocode/v1/json?key=${GEOCODER_KEY}&q=${city},es&pretty=1&no_annotations=1`)
    .then(res => res.json())
    .then(data => data.results[0].geometry);

const getCoordsTemperature = (lat, lng) =>
  fetch(`https://cors-anywhere.herokuapp.com/https://samples.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${WEATHER_KEY}`)
    .then(res => res.json())
    .then(data => data.main.temp);

const getCityTemperature = (city) =>
  getCityCoords(city)
  .then(({ lat, lng }) => getCoordsTemperature(lat, lng));

const NextWeather = ({ temperature = 10, unit = 'C', city = 'Madrid' }) => {
  const [prevUnit, changeUnit] = useState(unit);
  const [temp, changeTemperature] = useState(temperature);

  if (!VALID_UNITS.includes(unit)) {
     unit = prevUnit;
  } else {
    changeUnit(unit)
  }

  return html`
      <h1>${until(getCityTemperature(city), temp)}º ${unit}</h1>
      <h3>Ahora, en ${city}.</h3>
      <button @click=${() => changeTemperature(getRndTemp())}>Actualizar</button>
  `;
}

const properties = {
  temperature: {type: Number},
  unit: {type: String},
  city: {type: String}
};
const styles = css`
  :host {
    display: block;
    padding: 15px;
    border: 1px solid white;
    background: #ccc;
  }
`;
const options = { properties, styles };

customElements.define('next-weather', component(NextWeather, options));
