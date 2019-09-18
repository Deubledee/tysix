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
                box-sizing: border-box;
                color: var(--app-backgound-color);
                background-color: #3f4756;
                border-bottom: 1px solid var(--app-topnav-icon-color);
                border-top: 1px solid var(--app-third-color);
                text-align: center;
                height: 73px;
                width: 175px;;
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
                padding-left: 5%
            }
            div[arow], div[bottom] {
                box-sizing: border-box;
                @apply --layout-horizontal;
            }
          div[arow]{
                height: 28px;
                background: var(--paper-cyan-700)
            }    /* border-radius: 4px;  background: var(--paper-blue-grey-500)*/        
            h4{
                margin-block-start: 0.33em;
            }
           /* div[arow][hidebottom]{
                display: none;
            }  */
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
            .center-menu,  .center-menu-especial{
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
                min-height: 600px;
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
            .flexchildbotom,flexchildbotom,
            .flexchildbotomFull{
                font-weight: 700;
                margin-right: 1px;
                padding: 0;
                @apply --layout-vertical;
                @apply --layout-flex-2;
            }
            .flexchildbotom{
                width: 84%;
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
                flex-basis: 80px;
            }
            .flexchildbotomFullExtra{
                flex-basis: 130px;
            }
            .noFlex{
                flex-basis: 1px 
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
                width: 1048px;
            }

            .navside {
                background-color: #3f4756;
                height: 893px;
            }
            .navsidecontent {

               @apply --layout-vertical;
                @apply --layout-self-stretch;
                @apply --layout-flex;
                flex-direction: column;
                max-width: 180px;
                color: var(--app-backgound-color);
                background-color: #3f4756;
            }
            .navsidecontent div {
                @apply --layout-horizontal;
                cursor: pointer;
                margin-bottom: 6px
            }
            .navsidecontent aside {
                @apply --layout-flex;
            }

            .navsidecontent div[left] aside {
                box-shadow: 1px 1px 1px
            }

            .center-menu, 
            .collumn-left-menu, 
            div[rightSide],
             .center-menu-especial , 
             .row-menu-especial{
                padding: 8px
            }
            .center-menu, .center-menu-especial {
                color: var(--app-published-color);
                font-weight: 700;
                height: 20px;
            }
            .center-menu-especial {
                height: 20px;
                width: 104px;
            }
            .flexleft {
                color: var(--google-blue-700);    
                flex-basis: 220px;
                display: flex;
                flex-flow: nowrap;
                flex-direction: row;
            }
            .center {
                max-height: 42px;
                @apply --layout-flex;
                color: var(--app-backgound-color);
                text-align: center;
            }            
            .row-menu, .row-menu-especial {
                color: var(--paper-blue-600);
                font-weight: 700;
                flex-grow: 0;
                flex-basis: 35px
            }       
            .row-menu aside,.row-menu-especial aside {
                padding-top: 16px;
                text-align: center;
            }           
            .row-menu-especial {
                width: 104px;
            }
           /* .title{
                background-color: #e0f7fa; 
            }*/
            .collumn-left-menu{
                width: 146px;   
                color: var(--paper-blue-600);
                font-weight: 700;
                height: 18px;
            }
           .info{
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
           
            .saveButton{
                color: var(--google-blue-300);
                font-weight: bold;
                font-size: 11px;
                font-style: italic;
                max-width: 126px;
                width: 110px;
                letter-spacing: 2px;
                height: 60px;
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
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis           
            }
            article[centerListItem] span, article[centerImageItem] span {
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
                font-size: 0.7em;
                border-bottom: 1px solid var(--light-theme-divider-color);
            }
            article[centerListItem] paper-icon-button {
                height: 3.6em;
                top: -5px;
            }
            .centerImage{
                display: block;
                margin-top: auto;
                margin-bottom: auto;
                box-shadow: unset;
            }          
            paper-button[langbtn]{
                padding: 0px;
                padding-top: 1px;
                height: 18px;
                border-top-left-radius: 11px;
                border-top-right-radius: 11px;
                min-width: 29px;
            }
            paper-button.exex{
                position: relative;
                top: -5px;
                right: -1px;
                border-radius: 31%;
                padding: 2px;
                min-width: 15px;
                max-height: 10px;
                height: 13px;
                color: gray;
                cursor: pointer;
                font-size: 8px;
                background-color: aliceblue;
            }
            paper-button.strech {
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
                width: 100%;        
            }
            .center{
                margin-left: auto;
                margin-right: auto; 
            }
            .subcat{
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
            paper-icon-button{
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