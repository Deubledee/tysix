import '@polymer/polymer/polymer-element';
import './cms-common-styles_v2';
const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `
<dom-module id="cms-common-top-styles">
  <template>
    <style>
    .divtop /*,.navtop*/ {
        position: var(--app-default-position)
    }

    .divtop,
    main {
        left: var(--app-default-min-padding)
    }

    .divtop,
    .padding,
    article,
    article[centerListItem], article[centerImageItem] {
        box-sizing: var(--app-default-box-sizing)
    }

    article[centerListItem], article[centerImageItem]{
        @apply --layout-horizontal;
    }

    article[centerListItem],
    nav,
    section , 
    article[centerImageItem]{
        display: var(--app-flex)
    }

    article[centerListItem],
    section[title2],
     article[centerImageItem] {
        text-align: var(--app-default-text-align)
    }

    nav[center],
    paper-tabs,
    section {
        font-weight: var(--app-default-font-weight)
    }
    main {
        height: var(--app-default-height)
    }

    article {
        margin-bottom: var(--app-content-article-margin-bottom);

       /* padding: var(--app-tollbar-default-font-size);
        max-width: var(--app-default-max-width);
        margin-left: 5%*/
    }

    article[centerListItem] {
        word-break: keep-all;
        border-radius: 4px;
        font-size: 0.7em;
        border-bottom: 1px solid var(--light-theme-divider-color);
    }

    article[centerImageItem]  {
        letter-spacing: var(--app-content-letter-spacing, 1px);
        font-size: var(--app-content-font-size, x-small);
    }
    article[centerListItem] paper-icon-button{
        height: 3.6em;
        top: -5px;
    }
    article[centerListItem] div, article[centerImageItem] div {
        @apply --layout-flex;
       /* background-color: var(--app-item-backgound-color);
       /* overflow-y: hidden;
        box-shadow: 1px 1px 4px;*/
    }
    article[centerListItem] span, article[centerImageItem]span  {
        word-break: var(--app-default-text-word-break)
    }

    .padding {
        padding: var(--app-default-padding);
        word-break: break-all;
    }

    .nopad{
        padding: 0 
    }

    .paddingSmall {
        padding: var(--app-default-padding);
        word-break: break-all;
    }
    .paddingSmall h3 {
        margin-block-start: 7px;
    }
    shop-image {
        height: var(--app-content-nav-padding-left);
    }

    .NP {
        color: var(--app-not-published-color)
    }

    .P {
        color: var(--app-published-color)
    }

    paper-button,
    section a {
        text-decoration: var(--app-none);
        color: inherit
    }

    nav {
        padding: var(--app-default-padding, 10px);
        padding-left: var(--app-content-nav-padding-left)
    }

    .navtop {
        flex-direction: var(--app-flexrow);
        flex-wrap: wrap;
        height: 800px;
        padding: 103px;
        max-width: 100%;
    }    
    .topLabel{
        background: #3f4756;
        background: -moz-linear-gradient(top, #3f4756 4%,#686969 58%, #8d9099 85%,#bfc0c4 100%);
        background: -webkit-linear-gradient(top, #3f4756 4%,#686969 58%, #8d9099 85%,#bfc0c4 100%);
        background: linear-gradient(to bottom, #3f4756 4%,#686969 58%, #8d9099 85%,#bfc0c4 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#3f4756', endColorstr='#bfc0c4',GradientType=0 );
        /* position: inherit; */
        padding-left: 31px;
    }
    .topLabel a{
        text-decoration: none;
        font-weight: 500;
        color: var(--app-scrollbar-color);;
    }
    .navtop section {
        padding: unset;
        height: 0px;
        flex-basis: 30%;
    }
    .navtop iron-icon {
        color: black;
        margin-left: 10px;
        /*height: var(--app-tollbar-default-font-size)*/
    }

    section {
        flex-flow: var(--app-flexrow);
        padding: var(--app-content-section-padding);
        height: var(--app-content-section-height);
       /* margin-left: var(--app-content-section-margin-left)*/
    }

    .diferent,
    .hidden {
        display: var(--app-none)
    }

    .title2 {
        flex-basis: var(--app-content-section-title-flex-basis);
        cursor: var(--app-default-cursor);
        color: var(--app-content-title-text-color);
        font-size: var(--app-content-section-title-font-size);
        height: var(--app-content-section-title-height);
        width: var(--app-content-section-title-width)
    }

    paper-icon-button-light {
        color: var(--paper-blue-800);
        margin-left: var(--app-content-button-light-marginleft)
    }

    paper-button{
        height: var(--app-content-button-height)
    }

    article[centerListItem] paper-button{
        height: auto;
        max-height: 35px;
    }

    paper-button[front] {
        background-color: #ffffff;
        color: var(--google-blue-700);
    }

    .button {
        color: var(--app-backgound-color);
        text-shadow: 1px 2px 2px black;
        min-width: var(--app-content-paper-button-minwidth);
        width: 279px;
        font-size: 35px;
        background-color: var(--app-item-backgound-color);
        box-shadow: 1px 2px 3px var(--disabled-text-color);
        height: 137px;
    }

    paper-tabs {
        font-size: var(--app-content-paper-tabs-font-size);
        padding-top: var(--app-content-paper-tabs-padding-top)
    }

    nav[center] {
        flex-flow: var(--app-flexcolumn);
        letter-spacing: var(--app-content-navcenter-letter-spacing)
    }

   cms-page-viewer, cms-gallery-viewer, cms-articles-viewer {
        top: var(--app-content-page-viewertop);
    }
    shop-image.bigger{
        height: var(--app-content-article-height)
    }
    .navpages {
        display: var(--app-listitem);
    }
    .strech{
        width: 75%
    }
    /* wide screen */
      @media (min-width: 1280px) {        
        .navtop {
            padding-left: 15%;
        }
      }
    </style>
  </template>
</dom-module>`;
document.head.appendChild($_documentContainer.content);