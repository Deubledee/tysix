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
                background-color: var(--app-backgound-color);
                height: 22px;
            }
            .flexright,
            .navside div {
                word-break: break-word;
            }
            .flex {
                @apply --layout-horizontal;
                height: 1525px;
            }
            .flexH,  div[container] {
                @apply --layout-vertical;
            }
            div[arow], div[bottom] {
                box-sizing: border-box;
                @apply --layout-horizontal;
                @apply --layout-wrap;
                border-radius: 4px;
            }
            div[arow]{
                height: 60px;
                padding-top: 27px;
            }            
            h4{
                margin-block-start: 0.33em;
            }
            div[arow][hidebottom]{
                display: none;
            }  
            div[bottom][hidebottom]{
                border: none;
                height: 0px;
                background-color: unset;
            }             
            div[bottom][noborder]{
                border: none;
                height: auto;
                margin-bottom: 30px;
            }
            .center-menu {
                -webkit-flex: unset;
                flex: unset;
                webkit-flex-basis: var(--layout-flex_-_-webkit-flex-basis, 0);
                flex-basis: unset;
                font-size: initial;
            }

            .scroll{
                overflow-y: auto;
            }

            div[table] {
                min-height: 100px;
                max-height: 600px;
                flex-direction: var(--app-flexcolumn);
                margin-top: 8px;
                padding: 8px;
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

            .flexchildbotomShort,
            .flexchildbotom,
            .flexchildbotomFull{
                font-weight: 700;
                margin-right: 1px;
                padding: 0;
                @apply --layout-vertical;
                @apply --layout-flex-2;
            }
            .flexchildbotom{
                flex-basis: 30%;
                max-width: 75%;
            }

            .flexchildbotomFull, 
            .flexchildbotom {
                margin-bottom: 5px;
                height: 310px;
            }

            .flexchildbotomShort{
                flex-basis: 30%;
                margin-bottom: 5px;
                max-width: 75%;
                height: 100px;
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
                height: auto;
            }
            .flexchildbotom3 {
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
                @apply --layout-flex;
            }
            .navbottom {
                max-width: 82%;
                @apply --layout-flex;
                padding: 8px;
            }
            .navside {
                @apply --layout-vertical;
                @apply --layout-self-stretch;
                @apply --layout-flex;
                flex-direction: column;
                max-width: 342px;
            }
            .navside div {
                @apply --layout-horizontal;
                cursor: pointer;
                margin-bottom: 6px
            }
            .navside aside {
                @apply --layout-flex;
            }

            .navside div[left] aside {
                box-shadow: 1px 1px 1px
            }

            .center-menu, 
            .collumn-left-menu, 
            div[rightSide] {
                padding: 8px
            }
            .center-menu {
                color: var(--app-published-color);
                font-weight: 700;
                height: 20px;
            }
            .flexleft {
                color: var(--google-blue-700);
            }
            .center {
                max-height: 42px;
                @apply --layout-flex;
                color: var(--google-blue-700);
                text-align: center;
            }            
            .row-menu {
                color: var(--paper-blue-600);
                font-weight: 700;
                flex-grow: 0;
                flex-basis: 35px
            }       
            .row-menu aside{
                padding-top: 16px;
                text-align: center;
            }
           /* .title{
                background-color: #e0f7fa; 
            }*/
            .collumn-left-menu{
                width: 50%;   
                color: var(--paper-blue-600);
                font-weight: 700;
                height: 18px;
            }
           
            .asideBackgrc {
                text-overflow: ellipsis;
                font-size: 12px;
                letter-spacing: 1px;
                box-sizing: border-box;
                background-color: #dedede;
                border: 1px solid #fff;
                height: 20px;
                color: var(--app-content-section-span-color);
            }
            div[published],
            .center-menu aside,
             .collumn-left-menu aside{                
                text-align: center;
            }

            div[rightSide] {
                flex-flow: column;
                flex-basis: 25%;
                max-height: 161px;
                overflow-y: auto
            }

            div[rightSide] section {
                @apply --layout-horizontal;
                text-align: center;
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
           
            #saveButton,
            #cancelButton {
                background-color: var(--paper-light-green-a100);                
                color: var(--app-published-color);
                font-weight: bold;
                max-width: 90px;
                letter-spacing: 2px;
            }

            .contenth4{
                margin-block-start: -0.67em;
            }

            .padding {
                padding: 4px;
                text-overflow: ellipsis;
                overflow: hidden;
            }

            .padding,
            article,
            article[centerListItem], article[centerImageItem] {
                box-sizing: var(--app-default-box-sizing)

            }
        
            article[centerListItem], article[centerImageItem]{
                @apply --layout-horizontal;
            }
            article[centerListItem], 
            article[centerImageItem]{
                background-color: var(--app-item-backgound-color);
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
                height: 37px;
                margin-bottom: 4px
            }

            article[centerListItem] div, article[centerImageItem] div {
                @apply --layout-flex;
                font-size: 10px;
            }
            article[centerListItem] div{
                height: 30px;                
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
            paper-button{
                height: var(--app-content-button-height);
                text-decoration: var(--app-none);
                color: inherit;
            }

            paper-button.strech {
                top: -12px;
                height: 23px;
                width: 177px;
                text-align: left;             
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
            .plussubcat{
                box-sizing: content-box;
                max-width: 30px;
                height: auto;
                border-right: 1px dashed;
            }
            .plus{
                display: flex;             
            }
            .center{
                margin-left: auto;
                margin-right: auto; 
               /* box-shadow: 1px 1px 2px var(--paper-blue-200)
                border-bottom: 1px dashed var(--paper-light-blue-a100);*/
            }
            .subcat{
                flex-grow: 1;
                width: 640px;
            }
            shop-image {
                height: 30px;
            }
            div[published] {
                font-size: small;
                width: 45%
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