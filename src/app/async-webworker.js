import { css, html } from 'lit-element';
import { component } from 'haunted-lit-element';
import { asyncReplace } from 'lit-html/directives/async-replace.js';

const streamify = async function*(event, element) {
  while (true) {
    yield await oncePromise(element, event);
  }
};

const oncePromise = (emitter, event) => {
  return new Promise(resolve => {
    const handler = (...args) => {
      emitter.removeEventListener(event, handler);
      resolve(...args);
    };

    emitter.addEventListener(event, handler);
  });
};

const getPath = async function*(stream, path) {
  for await (var event of stream) {
    yield event[path];
  }
};

const blob = new Blob([`
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

(async function() {
  for await (const item of fibonacci()) {
    postMessage(item);
  }
})()
`]);

const blobURL = window.URL.createObjectURL(blob);

const worker = new Worker(blobURL);

const AsyncWebworker = () => {
  const stream = streamify('message', worker);
  const streamData = getPath(stream, 'data');

  return html`
    <h1>Web worker stream: ${asyncReplace(streamData)}</h1>
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

customElements.define('async-webworker', component(AsyncWebworker, options));
