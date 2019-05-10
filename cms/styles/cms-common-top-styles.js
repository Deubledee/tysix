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
    }

    article[centerImageItem]  {
        letter-spacing: var(--app-content-letter-spacing, 1px);
        font-size: var(--app-content-font-size, x-small);
    }
    
    article[centerListItem] div, article[centerImageItem] div {
        @apply --layout-flex;
        box-shadow: 1px 1px 3px var(--paper-blue-300);
        height: var(--app-content-article-height);
        overflow-y: hidden;
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
        color: var(--app-primary-text-color);
        flex-flow: var(--app-flexrow);
        padding: var(--app-default-padding, 10px);
        padding-left: var(--app-content-nav-padding-left)
    }

    .navtop {
        flex-direction: var(--app-flexcolumn);
       /* left: var(--app-content-nav-topleft);
        top: var(--app-content-navtop-top);*/
        height: var(--app-content-nav-top-height, 26px);
    }

    .navtop section {
        font-size: var(--app-tollbar-default-font-size)
    }

    .navtop iron-icon {
        height: var(--app-tollbar-default-font-size)
    }

    .divtop {
      /*  top: var(--app-content-divtop-top);*/
        background-color: var(--app-secondary-color);
      /*  height: var(--app-content-divtop-height);
        padding-top: var(--app-content-divtop-padding-top);*/
        border-bottom: var(--app-content-divtop-border-bottom)
    }

    section {
        flex-flow: var(--app-flexrow);
        padding: var(--app-content-section-padding);
        height: var(--app-content-section-height);
        margin-left: var(--app-content-section-margin-left)
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
        color: var(--app-topnav-icon-color);
        margin-left: var(--app-content-button-light-marginleft)
    }

    paper-button{
        height: var(--app-content-button-height)
    }

    paper-button[front] {
        height: var(--app-content-button-height, 40px);
        border-bottom: unset;
        top: unset;
    }

    paper-button[front] {
        background-color: var(--app-backgound-color)
    }

    .button {
        min-width: var(--app-content-paper-button-minwidth);
        border-left: var(--app-content-button-border);
       /* border-bottom: var(--app-content-button-border);*/
        background-color: var(--app-content-paper-button-background-color);
        border-top: var(--app-content-button-border);
        border-right: var(--app-content-button-border);
        margin-right: var(--app-content-paper-button-margin-right);
        height: 30px;
        border-radius: 0;
        top: -1px;
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
       /* left: var(--app-content-page-viewerleft)*/
    }
    shop-image.bigger{
        height: var(--app-content-article-height)
    }
    .navpages {
        display: var(--app-listitem);
       /* padding-left: var(--app-default-min-padding)*/
    }
    .strech{
        width: 75%
    }
    </style>
  </template>
</dom-module>`;
document.head.appendChild($_documentContainer.content);