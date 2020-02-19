import { css, html } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';
import { component } from 'haunted-lit-element';
import { useState } from 'haunted';

const inputStyles = {
  padding: '5px',
  background: '#777',
  color: 'white',
  border: 'none',
  borderBottom: '1px solid white',
  marginBottom: '15px',
  fontSize: '20px',
};

const AppPasswordChecker = () => {
  const [password, changePassword] = useState('foo3D');

  return html`
      <input @input=${(e) => changePassword(e.target.value)} value=${password} style=${styleMap(inputStyles)} />
      <password-checker password=${password}></password-checker>
      <password-checker-slot password=${password}></password-checker-slot>
  `;
}

const properties = {};
const styles = css`
  :host {
    display: block;
    padding: 15px;
    border: 1px solid white;
    background: #ccc;
  }
`;
const options = { properties, styles };

customElements.define('app-password-checker', component(AppPasswordChecker, options));
