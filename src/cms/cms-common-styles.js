import '@polymer/polymer/polymer-element.js';
//import '@polymer/iron-flex-layout/iron-flex-layout.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="cms-common-styles">
  <template>
    <style>
      /*:host {
        display: block;
      }*/

      html{
        --content-color-default: #8098ad;
        --content-color-button: color: #7a8c94;
        --content-color-section: color: #616161;
      }

      nav {
        color:  var(--content-color-default, #8098ad);
        display: flex;
        flex-flow: wrap;
        flex-direction: row;
        padding: 10px;
        padding-left: 21px;
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

      nav[bottom] div {
        box-sizing: border-box;
        display: flex;
        flex-flow: wrap;
        flex-grow: 1;;
        background: #ffffff;
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
        flex-basis: 80%;
        padding: 12px;
        border-right: 1px solid;
      }

      div[side] {
        flex-basis: 20%;
        padding: 12px;
      }
                   
      div[rightimages]{
        overflow-y: auto
     }

      section {
        display: flex;
        flex-flow: row;
        font-weight: bold;
        padding: 4px;
        height: 50px;
      }

      section div[left] {
        cursor: pointer;
        margin-right: auto;
        margin-left: auto;
        flex-basis: 46px;
        max-height: 42px;
        width: 86%;
        height: 7px;
        background: transparent
      }

      section div[right] {
         display: flex;
         flex-flow: column;
         flex-basis: 110px;
         color: var(--content-color-section);
         opacity: 1;
         max-height: 50px;
         word-break: break-word;
         text-align: center;
         background-color: #fff;
         box-shadow: 0px -1px 1px #d0c9c9;
      }

      section div[rightImages] {
       /* box-shadow: 3px 3px 8px #b6b6b6;*/
        height: 334px;
        color: var(--content-color-section: color);
        opacity: 1;
        width: 98%;
        overflow: hidden;
      }
      

      section paper-button {
        color:var(--content-color-button, #7a8c94);
      }
             
      section[bottom] {
        display: flex;
        flex-flow: column;
        font-weight: bold;
        height: auto !important;
        margin-bottom: 46px;
        max-height: 359px;
        flex-basis: 24%;
        background-color: #d8e6ed;
        box-shadow: 1px 1px 1px grey;
        margin-right: 1px;
        padding: 0;
      }

      section[bottom2] {
          max-height: 359px;
          flex-basis: 100%
      }

      section[bottom3] {
          display: block;  
          max-width: 92%;    
      }    
    

      section[bottom3] {
          display: block; 
          flex-basis: 92%;      
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
        max-height: 10px
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
        max-width: 20px;
        letter-spacing: 2px;
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
