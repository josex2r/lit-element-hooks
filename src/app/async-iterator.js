import { css, html } from 'lit-element';
import { component } from 'haunted-lit-element';
import { asyncReplace } from 'lit-html/directives/async-replace.js';

const wait = (delay) => new Promise(res => setTimeout(res, delay));

async function *counter(index = 0) {
  while(true) {
    await wait(1000)
    yield index;
    index++;
  }
}

const AsyncIterator = () => {
  return html`
    <h1>Counter: ${asyncReplace(counter())}</h1>
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

customElements.define('async-iterator', component(AsyncIterator, options));
