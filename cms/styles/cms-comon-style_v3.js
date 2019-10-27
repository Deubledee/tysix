import '@polymer/polymer/polymer-element';
import './cms-common-styles_v2';
const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `
<dom-module id="cms-comon-style_v3">
    <template>
        <style>
    
            html {
                --content-color-default: #8098ad;
                --content-color-button: color: #7a8c94;
                --content-color-section: color: #616161;
            }
            
            @font-face {
                font-family: DeliciousRoman;
                src: url(http://www.font-face.com/fonts/delicious/Delicious-Roman.otf);
                font-weight:400;
            }

            a {
                color: inherit;
                text-decoration: none;
            }

            nav[top] {
                box-sizing: border-box;
                color: var(--paper-blue-grey-400);
                text-align: center;
                text-transform: capitalize;
                padding-left: 32px;
            }

            .flexright,
            .navsidecontent div {
                word-break: break-word;
            }

            .flex {
                @apply --layout-horizontal;
                height: 1525px;
            }

            div[container] {
                @apply --layout-vertical;
            }

            div[arow],
            div[bottom] {
                box-sizing: border-box;
                @apply --layout-horizontal;
            }

            div[arow] {
                height: 49px;
                padding-top: 10px;
                border-bottom: 1px solid var(--divider-color)
            }

            h4 {
                margin-block-start: 0.33em;
            }

            .center-menu,
            .center-menu-especial {
                -webkit-flex: unset;
                flex: unset;
                webkit-flex-basis: var(--layout-flex_-_-webkit-flex-basis, 0);
                flex-basis: unset;
                font-size: initial;
            }

            .scroll {
                overflow-y: auto;
            }

            div[table] {
                flex-direction: var(--app-flexcolumn);
                margin-top: 8px;
                padding: 8px;
                height: 600px;
                overflow: auto;
            }

            div[table]::-webkit-scrollbar-track {
                background-color: transparent
            }

            div[table]::-webkit-scrollbar {
                width: 5px
            }

            div[table]::-webkit-scrollbar-thumb {
                background-color: transparent
            }

            div[content] {
                display: var(--app-none)
            }
            
            .flexchildbotomFull {
                font-weight: 700;
                margin-right: 1px;
                padding: 0;
                @apply --layout-vertical;
                @apply --layout-flex-2;
            }

            .flexchildbotom{
                flex-basis: auto;
                flex: 1;
            }

            .flexchildbotomShort {
                flex-basis: 30%;
                margin-bottom: 5px;
                max-width: 75%;
                height: 100px;
            }

            .childbotom {
                flex-basis: 100%;
                max-width: 75%
            }

            .flexchildbotomFull {
                flex-basis: 80px;
                width: 155px;
            }

            .flexchildbotomFullExtra {
                flex-basis: 130px;
                font-weight: 700;
            }

            .navbottom,
            .navsidecontent {
                box-sizing: border-box;
                /*height: 604px;*/
            }

            .flexchildbotom3 {
                @apply --layout-self-stretch;
                @apply --layout-flex-3;
                height: 328px;
                border-radius: 4px;
                color: var(--app-content-section-span-color);
            }

            .flexleft,
            .flexright {
                cursor: pointer;
                max-height: 42px;
            }

            .flexright {
                color: var(--paper-grey-700);
                max-height: 50px;
                max-width: 20%;
            }

            .navbottom {
                flex: 1;
            }

            .navsidecontent {
                @apply --layout-horizontal;
                border-bottom: 1px solid var(--paper-blue-grey-200);
                height: 54px;
                margin-inline-start: 70px;
                margin-inline-end: 70px;
            }

            .navsidecontent div {
                cursor: pointer;
            }

          /*  .center-menu,
            .collumn-left-menu,
            div[rightSide],
            .center-menu-especial,
            .row-menu-especial {
                padding: 8px
            }

            .center-menu,
            .center-menu-especial {
                color: var(--app-published-color);
                font-weight: 700;
                height: 20px;
            }

            .center-menu-especial {
                height: 20px;
                width: 104px;
            }*/
            paper-button[id="label"]{
                text-decoration: var(--app-none);
                color: inherit;
                -webkit-justify-content: left;
                justify-content: left;
                float: left;
            }

            .alt{
                display: flex;                
                flex-direction: column;
                min-width: 200px;
            }

            .button-container{
                flex-basis: 30px;
            }

            .flexleft {
                color: var(--paper-blue-a200);
            }

            .center {
                text-align: center;
            }

            .row-menu,
            .row-menu-especial {
                color: var(--paper-blue-600);
                font-weight: 700;
                flex-grow: 0;
                flex-basis: 35px
            }

            .row-menu aside,
            .row-menu-especial aside {
                padding-top: 16px;
                text-align: center;
            }

            .row-menu-especial {
                width: 104px;
            }

            /* .title{
                background-color: #e0f7fa; 
            }*/
            .collumn-left-menu {
                width: 146px;
                color: var(--paper-blue-600);
                font-weight: 700;
                height: 18px;
            }

            .info {
                color: var(--light-theme-disabled-color);
                letter-spacing: 3px;
            }

            .asideBackgrc {
                text-overflow: ellipsis;
                font-size: 12px;
                letter-spacing: 1px;
                box-sizing: border-box;
                /*background-color: var(--app-item-backgound-color);
                border-bottom: 1px solid var(--dark-theme-secondary-color);
                margin-right: 3px;*/
                height: 20px;
                margin-right: 3px;
                border-radius: 3px;
                color: var(--app-content-section-span-color);
            }

            div[published],
            .center-menu aside,
            .center-menu-especial aside,
            .collumn-left-menu aside {
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

            div[published=NP] {
                color: var(--app-not-published-color)
            }

            div[published=P] {
                color: var(--app-published-color)
            }

            div[toarticle=B] {
                color: var(--app-not-published-color)
            }

            div[toarticle=A] {
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

            .saveButton {
                color: var(--google-blue-300);
                font-weight: bold;
                font-size: 11px;
                font-style: italic;
                max-width: 126px;
                width: 110px;
                letter-spacing: 2px;
                height: 60px;
                text-transform: lowercase;
            }

            .contenth4 {
                margin-block-start: -0.67em;
            }

            .padding {
                text-overflow: ellipsis;
                overflow: hidden;
            }

            .padding,
            article,
            article[centerListItem],
            div[centerImageItem] {
                box-sizing: var(--app-default-box-sizing)
            }

            article[centerListItem],
            div[centerImageItem] {
                @apply --layout-horizontal;
                border-bottom: 1px solid var(--app-item-backgound-color);
            }

            div[centerImageItem] {
                display: var(--app-flex)
            }

            article[centerListItem],
            section[title2],
            div[centerImageItem] {
                text-align: var(--app-default-text-align)
            }

            div[centerImageItem] {
                margin-bottom: 4px
            }

            article[centerListItem] div,
            div[centerImageItem] article {
                @apply --layout-flex;
                font-size: 10px;
            }

            article[centerListItem] div {
                height: 30px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis
            }

            article[centerListItem] span,
            div[centerImageItem] span {
                word-break: break-word
            }

            article[centerListItem] paper-button {
                height: auto;
                max-height: 35px;
                text-transform: capitalize;
            }

            article[centerListItem] {
                word-break: keep-all;
                border-radius: 4px;
                font-size: 0.9em;
                border-bottom: 1px solid var(--light-theme-divider-color);
            }

            article[centerListItem] paper-icon-button {
                height: 3.6em;
                top: -5px;
            }

            .centerImage {
                display: block;
                margin-top: auto;
                margin-bottom: auto;
                box-shadow: unset;
            }

            paper-button[langbtn] {
                padding: 0px;
                padding-top: 1px;
                height: 18px;
                border-top-left-radius: 11px;
                border-top-right-radius: 11px;
                min-width: 29px;
                text-transform: capitalize;
            }

            paper-button.exex {
                position: relative;
                background-color: var(--divider-color);
                top: -11px;
                right: 8px;
                border-radius: 31%;
                min-width: 15px;
                max-height: 14px;
                color: var(--secondary-text-color);
                cursor: pointer;
                font-size: 9px;
                padding-top: 7px;
            }

            paper-button.exexsmall {
                top: -5px;
                right: -1px;
                background-color: transparent;            }

            paper-button.strech {
                width: 177px;
                text-align: left;
            }

            .nopad {
                padding: 0
            }

            /*  .paddingSmall {
                word-break: break-word;
                font-size: 0.95em;
            }*/

            .paddingSmall h3 {
                margin-block-start: 7px;
            }

            .plussubcat {
                box-sizing: content-box;
                max-width: 30px;
                height: auto;
                border-right: 1px dashed;
            }

            .plus {
                display: flex;
                width: 100%;
            }

            .subcat {
                flex-grow: 1;
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

            paper-icon-button {
                height: 31px;
            }

            /*
                -                   - 
                    media queries
                -                   -
            */
            /*  @media (min-width: 800px){
                .navbottom{
                    width: 1040px;
                }
            }
        @media (min-width: 1400px){
                .navbottom{
                    width: 1040px; 
                }
            }

            media queries for later
            @media (max-width: 480px){
                .navbottom{
                    background-color: yellow;
                    width: 1040px;
                }
            }
            @media (min-width: 400px){
                .navbottom{
                    background-color: brown;
                    width: 1040px;
                }
            }
            @media (max-width: 800px){
                .navbottom{
                    background-color: grey;
                    width: 1040px;
                }
            }*/
    </style>
    </template>
</dom-module>`;
document.head.appendChild($_documentContainer.content);