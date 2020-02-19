import { css, html } from 'lit-element';
import { component } from 'haunted-lit-element';
import { useState } from 'haunted';

function MyApp({ counter = 0 }) {
  const [count, setCount] = useState(counter);

  return html`
    <div id="count">${count}</div>
      <button type="button" @click=${() => setCount(count + 1)}>
	Increment
      </button>
  `;
}

const properties = {
  counter: {
    type: Number,
    // reflect only works without "useState", this function
    // does not update the same pointer of the property.
    reflect: true
  }
};
const styles = css`p {color:red}`;
const options = { properties, styles };

customElements.define('my-app', component(MyApp, options));
