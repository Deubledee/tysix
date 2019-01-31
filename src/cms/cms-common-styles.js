import '@polymer/polymer/polymer-element.js';
//import '@polymer/iron-flex-layout/iron-flex-layout.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="cms-common-styles">
  <template>
    <style>
      /*:host {
        display: block;
      }*/
      main {
        display: block;
        word-break: break-all;
        padding: 4px;
        position: relative;
        top: 52px;
        width: 100%;
      }
      nav {
        color: #8098ad;
        display: flex;
        flex-flow: row;
        padding: 10px;
        padding-left: 21px;
      }
    
      nav[bottom] {
        box-sizing: border-box;
        display: flow-root;
        padding: 0px;
        height: 0px;
        opacity: 0;
        transition-property: height, opacity;
        transition-duration: .5s, 1s;
      }

      nav[bottom][open] {
          opacity: 1;
          height: auto;
        }

      nav paper-icon-button {
        flex-basis: 120px;
        color: rgb(128, 152, 173)
      }
    
      nav div {
        flex-basis: 120px;
        flex-grow: 1
      }
    
      div[bottom] {
        margin-bottom: 75px;
      }
    
      nav[bottom] div {
        display: flex;
        flex-flow: wrap;
        padding: 20px;
        flex-basis: unset;
        flex-grow: 1;
        height: auto;
        background: #ffffff;
      }
    
      section {
        display: flex;
        flex-flow: row;
        font-weight: bold;
        padding: 4px;
        height: 50px;
      }
    
      section[bottom] {
        display: flex;
        flex-flow: column;
        font-weight: bold;
        padding: 4px;
        height: auto !important;
        margin-bottom: 100px;
      }
        
      section[bottom2] {
        display: flex;
        flex-flow: column;
        font-weight: bold;
        padding: 4px;
        height: auto !important;
        margin-bottom: 100px;
      }

      div[rightimages]{
        overflow-y: auto
     }

    cms-images.overHidd {
         max-height: 470px;
        --images-shop-image: {
            max-height: 186px;
        }

            --images-frame2-div: {
                overflow-y: hidden;
            }

            --images-title2: {
                width: 217px;
            }
        }
      section div[left] {
        display: flex;
        flex-flow: column;
        color: #448cff;
        margin-right: 2px;
        margin-bottom: 2px;
        z-index: 100;
        max-height: 50px;
      }
    
      section div[right] {
        display: flex;
        flex-basis: 60%;
        color: #616161;
        opacity: 1;
        max-height: 50px;
       /* width: 495px;*/
      }

      section div[rightImages] {
        flex-basis: 60%;
        color: #616161;
        opacity: 1;
      }
    
      section paper-button {
        color: #7a8c94;
      }
    
      section[title] {
        flex-basis: 34px;
        cursor: pointer;
        color: #f0f0f0;
        font-size: 35px;
        text-align: center;
        height: 52px;
        width: 120px;
        border-radius: 10px;
        background-color: #e1e2d8;
        text-shadow: 1px 1px 1px var(--primary-text-color);
      }
    
      paper-spinner {
        left: 47%;
      }
    
      div[hidde] {
        display: none
      }
    
      paper-button {
        min-width: 98px;
      }
    
      cms-image-viewer {
        display: none;
      }
    
      .diferent {
        display: none!important
      }

      #saveButton {
        background-color: #ffafaad1;
        color: #485ba9;
        font-weight: bold;
        letter-spacing: 2px;
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
