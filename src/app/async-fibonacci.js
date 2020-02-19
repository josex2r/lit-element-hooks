import { css, html } from 'lit-element';
import { component } from 'haunted-lit-element';
import { asyncReplace } from 'lit-html/directives/async-replace.js';

const wait = (delay) => new Promise(res => setTimeout(res, delay));

async function *fibonacci() {
  let pre = 0;
  let cur = 1;
  while (true) {
    [ pre, cur ] = [cur, pre + cur];
    yield cur;
    await wait(100)
  }
}

const AsyncFibonacci = () => {
  return html`
    <h1>Fibonacci: ${asyncReplace(fibonacci())}</h1>
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

customElements.define('async-fibonacci', component(AsyncFibonacci, options));
