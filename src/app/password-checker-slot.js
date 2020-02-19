import { css, html } from 'lit-element';
import { component } from 'haunted-lit-element';

const isValid = (password) => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}/.test(password);

const PasswordCheckerSlot = ({ password }) => {
  let slotName = 'invalid';
  let slotValue = 'Invalid password (default)';

  if (!password) {
    slotName = 'empty';
    slotValue = 'Empty password (default)';
  } else if (isValid(password)) {
    slotName = 'valid';
    slotValue = 'Valid password (default)';
  }

  return html`
    <div>Resultado: <slot name=${slotName}>${slotValue}</slot></div>
  `;
}

const properties = {
  password: {
    type: String
  }
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

customElements.define('password-checker-slot', component(PasswordCheckerSlot, options));
