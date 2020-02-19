import { css, html } from 'lit-element';
import { component } from 'haunted-lit-element';
import { useState, useMemo } from 'haunted';

const isValid = (password) => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}/.test(password);

const getValidState = (password) =>  isValid(password) ? 'VALID 👍' : 'INVALID 👎';

const getStrength = (password) => {
  if (isValid(password)) {
    return html`<div>Strength: <progress value=${password.length-3} max="5"></progress></div>`;
  }

  return '';
};

const PasswordChecker = ({ password }) => {
  const isValidStr = useMemo(() => getValidState(password), [password]);
  const cachedStrength = useMemo(() => getStrength(password), [password]);

  return html`
      <span>Your password is <strong>${isValidStr}</strong></span>
      ${cachedStrength}
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

customElements.define('password-checker', component(PasswordChecker, options));
