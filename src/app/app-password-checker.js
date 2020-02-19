import { css, html } from 'lit-element';
import { component } from 'haunted-lit-element';
import { useState } from 'haunted';

const AppPasswordChecker = () => {
  const [password, changePassword] = useState('foo3D');

  return html`
      <input @input=${(e) => changePassword(e.target.value)} value=${password} />
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
