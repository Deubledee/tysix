import '@polymer/polymer/polymer-element';
import './cms-common-styles_v2';
const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `
<dom-module id="cms-comon-style_v3">
    <template>
        <style>
            /*:host {
        display: var(--app-block);
      }*/

            html {
                --content-color-default: #8098ad;
                --content-color-button: color: #7a8c94;
                --content-color-section: color: #616161;
            }

            a {
                color: inherit;
                text-decoration: none;
            }

            nav[top]{
                color: var(--paper-blue-800);
            }

            .flexright,
            .navside div {
                word-break: break-word;
            }

            .flexleft,
            .flexright,
            .flexsidecenter {
                text-align: center;
            }

            .flex {
                @apply --layout-horizontal;
            }

            .flexH,  div[container] {
                @apply --layout-vertical;
            }

            div[bottom] {
                box-sizing: border-box;
                @apply --layout-horizontal;
                @apply --layout-wrap;
            }

            .flexsidecenter {
                -webkit-flex: unset;
                flex: unset;
                webkit-flex-basis: var(--layout-flex_-_-webkit-flex-basis, 0);
                flex-basis: unset;
            }

            .scroll{
                overflow-y: auto;
            }

            div[table] {
                height: var(--app-listtype-div-height);
                flex-direction: var(--app-flexcolumn);
                margin-top: 8px;
            }

            div[table]::-webkit-scrollbar-track {
                background-color: var(--app-scrollbar-color)
            }

            div[table]::-webkit-scrollbar {
                width: 5px
            }

            div[table]::-webkit-scrollbar-thumb {
                background-color: var(--app-primary-text-color)
            }

            div[content] {
                display: var(--app-none)
            }

            .flexchildbotom, .flexchildbotomFull{
                font-weight: 700;
                margin-right: 1px;
                padding: 0;
                @apply --layout-vertical;
                @apply --layout-flex-2;
            }
            .flexchildbotom{
                flex-basis: 30%;
                margin-bottom: 50px
            } 
            .childbotom{
                flex-basis: 100%;
                max-width: 75%
            }
            .flexchildbotomFull{
                flex-basis: 100%;
            }
            .noFlex{
                flex-basis: 1px 
            }
            .navbottom,
            .navside {
                box-sizing: border-box;
                padding: 8px
            }

            .flexchildbotom3 {
                display: block;
                margin-top: 40px;
                @apply --layout-self-stretch;
                @apply --layout-flex-3;
            }

            .flexleft,
            .flexright {
                cursor: pointer;
                max-height: 42px;
                @apply --layout-flex;
            }

            .flexright {
                color: var(--paper-grey-700);
                max-height: 50px;
                background-color: #fff;
                @apply --layout-flex;
            }

            .navbottom {
                max-width: 82%;
                @apply --layout-flex;
                height: auto;
              /*  border-right: 1px solid #cac8c8;*/
                transition-property: height, opacity;
                transition-duration: .5s, 1s
            }

            .navside {
                @apply --layout-vertical;
                @apply --layout-self-stretch;
                @apply --layout-flex;
                flex-direction: column;
                height: 340px;
                max-width: 340px;
                border-left: 1px solid;
            }

            .navside div {
                @apply --layout-horizontal;
                cursor: pointer;
                height: 30px;
            }

            .navside aside {
                @apply --layout-flex;
            }

            .navside div[left] aside {
                box-shadow: 1px 1px 1px
            }

            .flexsidecenter {
                color: #7087b4;
                font-weight: 700;
                width: 100%;
            }

            .flexleft {
                color: var(--google-blue-700)
            }

            .navsideleft {
                color: var(--paper-blue-600);
                font-weight: 700;
                flex-grow: 0;
                flex-basis: 35px
            }

            .navsideright,
            div[rightSide] {
                color: var(--content-color-section)
            }

            div[rightSide] {
                flex-flow: column;
                flex-basis: 25%;
                max-height: 161px;
                overflow-y: auto
            }

            div[rightSide] section {
                @apply --layout-horizontal;
                margin-bottom: 36px
            }

            div[rightCenter] aside {
                flex-basis: 34%
            }

            div[rightSide]::-webkit-scrollbar-track {
                background: #ddd
            }

            div[rightSide]::-webkit-scrollbar {
                width: 7.5px
            }

            div[rightSide]::-webkit-scrollbar-thumb {
                background-color: var(--content-color-default, #8098ad)
            }

            aside[published=NP] {
                color: var(--app-not-published-color)
            }

            aside[published="P"] {
                color: var(--app-published-color)
            }

            .spanpadding {
                padding: 4px;
                font-size: 15px;
                font-weight: bold;
            }

            section div[rightImages] {
                height: 334px;
                color: var(--content-color-section);
                opacity: 1;
                width: 98%;
                overflow: hidden
            }

            section[bottom] {
                display: flex;
                flex-flow: column;
                font-weight: bold;
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
                left: 47%;
                ;
            }

            div[hidde] {
                display: none;
            }
            /*
            paper-button {
                max-height: 50px;
                min-width: 98px;
            }*/

            cms-image-viewer {
                display: none;
            }

            .diferent {
                display: none !important
            }

            #saveButton {
                background-color: var(--paper-light-green-a100);                
                color: var(--app-published-color);
                font-weight: bold;
                max-width: 20px;
                letter-spacing: 2px;
            }
            #cancelButton {
                background-color: var(--paper-light-green-a100);                
                color: var(--app-published-color);
                font-weight: bold;
                max-width: 20px;
                letter-spacing: 2px;
            }

            .contenth4{
                margin-block-start: 3.33em;
            }

            .padding {
                padding: var(--app-default-padding);
                word-break: break-all;
            }

            .padding,
            article,
            article[centerListItem], article[centerImageItem] {
                box-sizing: var(--app-default-box-sizing)
            }
        
            article[centerListItem], article[centerImageItem]{
                @apply --layout-horizontal;
            }
        
            
            article[centerImageItem], article[centerImageItem]{
                display: var(--app-flex)
            }        
                
            article[centerListItem],
            section[title2],
            article[centerImageItem] {
                text-align: var(--app-default-text-align)
            }

            article[centerImageItem]  {
                letter-spacing: var(--app-content-letter-spacing, 1px);
                font-size: 10px;
                box-sizing: border-box;

            }

            article[centerListItem] div, article[centerImageItem] div{
                @apply --layout-flex;
                box-shadow: 1px 1px 2px var(--paper-blue-300);
                height: auto;
                overflow: hidden;
            }

            article[centerListItem] span, article[centerImageItem] span {
                word-break: break-word
            }
            .centerImage{
                display: block;
                margin-top: auto;
                margin-bottom: auto;
                box-shadow: unset;
            }
            paper-button {
                text-decoration: var(--app-none);
                color: inherit;
                height: 50px;
                word-break: break-word;
                text-overflow: ellipsis;
                font-size: 0.95em;
            }

            .padding {
                padding: var(--app-default-padding);
                word-break: break-word;
            }

            .nopad{
                padding: 0 
            }

          /*  .paddingSmall {
                word-break: break-word;
                font-size: 0.95em;
            }*/

            .paddingSmall h3 {
                margin-block-start: 7px;
            }

            shop-image {
                height: 41px;
                top: 5px;
            }
            div[published] {
                font-size: small;
            }
            div[published="NP"] {
                color: var(--app-not-published-color)
            }

            div[published="P"] {
                color: var(--app-published-color)
            }

            .added {
                color: #00ff7f
            }

        </style>
    </template>
</dom-module>`;
document.head.appendChild($_documentContainer.content);