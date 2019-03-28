import '@polymer/polymer/polymer-element';
const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `
<dom-module id="cms-common-styles">
  <template>
    <style>
      /*:host {
        display: var(--app-block);
      }*/

      html{
        --content-color-default: #8098ad;
        --content-color-button: color: #7a8c94;
        --content-color-section: color: #616161;
      }
    /*  
      a {
        color: inherit;
        text-decoration: none;
      }  */

     /* nav {
        color:  var(--content-color-default, #8098ad);
        display: flex;
        flex-flow: wrap;
        flex-direction: row;
        padding: 10px;
        padding-left: 21px;
      }*/
/*
      nav[bottom] {
        max-width: 75%;
        flex-basis: 75%;
        box-sizing: border-box;
        padding: 8px;
        height:  auto;
        transition-property: height, opacity;
        transition-duration: .5s, 1s;
      }

      nav[bottom] div {
        box-sizing: border-box;
        display:  flex;
        flex-flow: wrap;
        flex-direction:  row;
       /* background:  #fff;*/
        max-width: 100%;
      }

      nav[bottom][open] {
          opacity: 1;
          height:  auto;;
        }

      nav paper-icon-button {
        flex-basis: 120px;
        color: rgb(128, 152, 173)
      }
    
      nav div {
        flex-grow: 1
      }
    
    div[conatainer]{
        display:  flex;
        flex-direction:  row;
      }

      div[bottom] {
        max-width:  98px;
        padding: 18px;
        box-sizing: border-box;
        border-right: 1px solid #cac8c8;
        margin-bottom: 4px;
      }
                   
      div[rightimages]{
        overflow-y: auto;
     }


      section div[left] {
        cursor:  pointer;
        margin-right:  auto;
        margin-left:  auto;
        flex-basis: 46px;
        max-height: 42px;
        width: 86%;
        height: 7px;
     /*  background: transparent*/
      }

      section div[right] {
         display:  flex;
         flex-flow: column;
         flex-basis: 110px;
         color: var(--content-color-section);
         opacity: 1;
         max-height: 50px;
         word-break:  break-word;
         text-align: center;
       /*  background-color:  #fff;
         box-shadow: var(--content-div-box-shadow);*/
      }
*/
     
      section {
        display: flex;
        flex-flow: row;
        font-weight:  bold;
        padding: 4px;
        height: 90px;
      } 
      nav[side] {
        box-sizing: border-box;
        flex-grow: 1;
        flex-basis: var(--content-navside-flex-basis);
        flex-direction: column;
        background: #fff;
        height: 340px;
        padding: 8px;
        max-width: 340px;
      }
      nav[side] div {
        display: flex;
        flex-grow: 0;
        flex-basis: 35px;
        cursor:  pointer;
        margin-right: auto;
        margin-left: auto;
        max-height: 50px;
        width:  86%;
        height: 7px;
        word-break:  break-word;
        text-align: center;
      }

      nav[side] aside{
        flex-basis: 86%;
      }

      nav[side] div[center]{
        color: #7087b4;
        font-weight:   bold;
        width: 100%;
        flex-basis: 40%;
        text-align: left;
      }

      nav[side] div[rightCenter] aside{
        flex-basis: 34%;
      }

      nav[side] div[left] {
        flex-basis:  24px;
     /*   background: #d8e6ed;*/
      }

      nav[side] div[right] {
        color: var(--content-color-section);
        /*background-color:  #fff;*/
      }

      nav[side] div[rightSide] {
        color: var(--content-color-section);
       /* background-color:  #fff;*/
        flex-flow: column;
        flex-basis: 25%;
        max-height: 161px;
        overflow-y:  auto;
      }

      /* scrollbar */
      nav[side] div[rightSide]::-webkit-scrollbar-track {
          background: #dddddd;
        }
    
        nav[side] div[rightSide]::-webkit-scrollbar {
          width: 7.5px;
        }
  
      nav[side] div[rightSide]::-webkit-scrollbar-thumb {
          background-color: var(--content-color-default, #8098ad);
      }
      /*scrollbar\*/
      
      nav[side] div[rightSide] section {;
        flex-flow:  row;
        margin-bottom: 36px;
      }

      aside[published=NP] {
        color: var(--app-not-published-color)
      }
      
      aside[published="P"] {
          color: var(--app-published-color)
      }
    
      section div[rightImages] {
        height: 334px;
        color: var(--content-color-section: color);
        opacity: 1;
        width: 98%;
        overflow: hidden
      }
      
      section paper-button {
        color: var(--content-color-button, #7a8c94);
      }
             
      section[bottom] {
        display:  flex;
        flex-flow: column;
        font-weight:   bold;
        margin-bottom: 46px;
        flex-basis: 24%;
       /* background-color: #d8e6ed;;
        box-shadow: 1px 1px 1px grey;*/
        margin-right: 1px;
        padding: 0;
      }

      section[bottom2] {
          max-height: 359px;
          flex-basis: 100%;
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
      /*  text-shadow: 3px 3px 2px #ababab;*/
      }
    
      paper-spinner {
        left: 47%;;
      }
    
      div[hidde] {
        display: none;
      }
    
      paper-button {
        max-height: 50px;
        min-width: 98px;
      }
    
      cms-image-viewer {
        display: none;
      }
    
      .diferent {
        display:  none!important
      }

      #saveButton {
        background-color: #ffafaad1;
        color: #485ba9;
        font-weight:   bold;
        max-width: 20px;
        letter-spacing: 2px;
      }
    </style>
  </template>
</dom-module>`;
document.head.appendChild($_documentContainer.content);