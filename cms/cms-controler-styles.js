import '@polymer/polymer/polymer-element.js';
import { dataBaseworker } from './dataBaseWorker.js'
import './cms-confirm.js';
const __DEV = true
const _DBW = new dataBaseworker();
_DBW.getElementAssets('cms-controler', __DEV).then((querySnapshot) => {
  let style = querySnapshot.data()
  let data = style.styles
  damm(data)
}).catch(function (error) {
  console.error("Error reteaving assets: ", error);
});
const $_documentContainer = document.createElement('template');
function damm(data) {
  $_documentContainer.innerHTML = `
      <dom-module id="cms-controler-styles">
        <template>
          <style>
            ${data}
          </style>
        </template>
      </dom-module>`;
  return document.head.appendChild($_documentContainer.content);
}
