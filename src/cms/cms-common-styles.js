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
        width: 100%;
      }
      nav {
        color: #8098ad;
        display: flex;
        flex-flow: row;
        padding: 10px;
        padding-left: 21px;
      }
    
       
      section[bottom]{
        ￼    max-height: 408px;
        }

        section[bottom3] {
            display: block; 
            flex-basis: 92%;      
        }

        [adding] {
            display: none!important
        } 
      nav[bottom] {
        box-sizing: border-box;
        display: flex;
        flex-flow: column;
        padding: 0px;
        height: 0px;
        opacity: 0;
        transition-property: height, opacity;
        transition-duration: .5s, 1s;
      }

      paper-button[chis] {
        max-width: 20px;
        color: aqua;
        background-color: #e5e5e5;
        border-radius: 18px;
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
        flex-grow: 1;;
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
        
      section[bottom2], section[bottom3] {
        display: flex;
        flex-flow: column;
        font-weight: bold;
        padding: 4px;
        height: auto !important;
        margin-bottom: 100px;
      }

      section[bottom] {
        max-height: 359px;
        flex-basis: 30%
      }

    section[bottom2] {
        max-height: 359px;
        flex-basis: 100%
    }

    section[bottom3] {
        display: block;  
        max-width: 92%;    
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
        word-break: break-word;
        text-align: left;
       /* width: 495px;*/
      }

      section div[rightImages] {
       /* box-shadow: 3px 3px 8px #b6b6b6;*/
        height: 334px;
        color: #616161;
        opacity: 1;
        width: 98%;
        overflow: hidden;
      }
    
      section paper-button {
        color: #7a8c94;
      }
    
      section[title] {
        width: 25%;
        flex-basis: 34px;
        cursor: pointer;
        text-align: center;
        height: 52px;
        border-radius: 10px;
        margin-left: auto;
        margin-right: auto;
        color: #787676;
        font-size: 55px;
        text-align: center;
        text-shadow: 3px 3px 2px #ababab;
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
