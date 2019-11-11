import '@polymer/polymer/polymer-element';
import './cms-common-styles_v2';
const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `
<dom-module id="cms-common-top-styles">
  <template>
    <style>
    .divtop {
        position: var(--app-default-position);
        height: 25px;
        margin-block-end: 4px;
        border-bottom: 1px solid var(--google-grey-300);
        padding-top: 2px;
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
        font-size: 0.9em;
        border-bottom: 1px solid var(--light-theme-divider-color);
    }

    article[centerImageItem]  {
        letter-spacing: var(--app-content-letter-spacing, 1px);
        font-size: var(--app-content-font-size, x-small);
    }
    article[centerListItem] paper-icon-button{
        height: 2.6em;
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

    .NP, .B {
        color: var(--app-not-published-color);

    }

    .P, .A{
        color: var(--app-published-color)
    }

    paper-button,
    section a {
        text-decoration: var(--app-none);
        color: inherit
    }
    .navtop {
        display: flex;
        flex-direction: var(--app-flexrow);
        flex-wrap: wrap;
        height: 800px;
        max-width: 100%;
        padding: 10%;
        background-color: var(--app-secondary-text-color);
    }    
    .topLabel{
        padding-left: 31px;
    }
    .topLabel a{
        text-decoration: none;
        font-weight: 500;
        color: var(--app-content-section-span-color);
    }
    .navtop section {
        padding: unset;
        height: 0px;
        flex-basis: 30%;
    }
    .navtop iron-icon {
        color: var(--google-blue-300);
        margin-left: 10px;
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
        height: var(--paper-font-title_-_font-size);
        text-transform: capitalize;
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
        color: var(--app-content-section-span-color);
        width: 279px;
        font-size: 35px;
        background-color: var(--app-backgound-color);
        height: 137px;
        border: 1px solid var(--dark-theme-secondary-color);
        border-radius: 15px;
    }

    paper-tabs {
        font-size: var(--app-content-paper-tabs-font-size);
      /*  padding-top: var(--app-content-paper-tabs-padding-top)*/
    }

    nav[center] {
        flex-flow: var(--app-flexcolumn);
        letter-spacing: var(--app-content-navcenter-letter-spacing)
    }

   /*cms-page-viewer, cms-gallery-viewer, cms-articles-viewer {
        top: var(--app-content-page-viewertop);
    }*/
    shop-image.bigger{
        height: var(--app-content-article-height)
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