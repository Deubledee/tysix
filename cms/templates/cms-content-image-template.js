import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js'
import '@polymer/paper-input/paper-input.js';
import { dataBaseworker } from '../tools/dataBaseWorker.js';
import '@polymer/paper-spinner/paper-spinner.js';
import '../media/cms-image';
export class cmsContentImageTemplate extends PolymerElement {
    static get template() {
        return html` 
        <style>       
        main {
            display: block;
            max-width: 1200px;
            margin-left: auto;
            margin-right: auto;
            height: 0px;
        }

        .mainish {
            display: block;        
            @apply --images-mainish-class
        }

        shop-image {
            cursor: pointer;
            max-height: 200px;
            margin: 32px 0 16px;;        
            @apply --images-shop-image
        }

        shop-image::before {
            content: "";
            display: block;
            padding-top: 100%;
        } 

        nav[images] {
          /*  -webkit-flex: 1 1;
            flex: 1 1;
            -webkit-flex-basis: 33%;
            flex-basis: 16%;
            margin-top: 1px;
            margin-bottom: 0px;
            margin-right: 4px; */
            @apply --images-nav-images;
        }

        div[frame] {
            display: block;
            flex-basis: 197px;
            padding: 6px;
            border-radius: 4px;
            background-color: #3f4756
            @apply --images-frame
        }

        div[frame2] {
            margin-left: auto;
            margin-right: auto;
            min-width: 250px;
            max-width: 600px;
            min-height: 284px;
            max-height: 373px;
        ￼    overflow: unset;
            @apply --images-frame2-div;
        }

        div[images] {
            padding: 10px;
            margin-left: auto;
            margin-right: auto;
            margin-top: 20px;
            background-color: #ececec;
            margin-bottom: 2px;
            width: 23%;
            display: block;   
            @apply --images-div-images
        }

        div[images][open] {
            display: none
        }

        article[images] {
            height: 900px;
            overflow: auto;
            margin-top: 18px;
            background-color: #fff;  
            @apply --images-article-images
        }

        article[images][toggle] {
            flex-flow: column;   
            @apply --images-article-images
        }

        /* scrollbar */
        article[images]::-webkit-scrollbar-track {
            background: #dddddd;
          }
      
        article[images]::-webkit-scrollbar {
        width: 7.5px;
        }
    
        article[images]::-webkit-scrollbar-thumb {
            background-color: #8098ad;
            background-color: blue;
        }
        /*scrollbar\*/

        paper-icon-button {
            height: 30px;
        }

        .grid {
            @apply --layout-horizontal;
            @apply --layout-wrap;
            @apply --layout-justified;
            margin: 0 10px 32px 10px;
            padding: 0;
            list-style: none;
        }

        nav[central]{
            display: none;   
            @apply --images-nav-central
        }

        nav[central][show]{
            display: inline-flex;
            flex-flow: row
        }

        div[central]{
            display: block;
            @apply --images-div-central
        }

        div[central][toggle]{
            display: none
        }
        /** */

        nav[middle]{
            display: none;
            @apply --images-nav-middle
        }

        nav[middle][show]{
            display: inline-flex;
            flex-flow: row
        }

        nav[top]{
            display: none;
            @apply --images-nav-top
        }

        nav[top][show]{
            display: inline-flex;
            flex-flow: row
        }

        div[top]{
            display: block;
            @apply --images-div-top;
        }

        div[top][toggle]{
            display: none
        }

        .title2{
            text-align: center;
            word-break: break-word;
            margin-left: auto;
            margin-right: auto;
            width: 150px;
            background-color: #e4e4e4;
            color: black;
            border-radius: 4px;
            box-shadow: 2px 2px 2px grey;
            @apply --images-title2;
        }

        paper-icon-button[central]{
            color: #000;
            @apply --images-paper-icon-button-central;
        }

        paper-icon-button{
            color: #94352b;
            @apply --images-paper-icon-button;
        }

        paper-spinner{
            position: absolute;
            top: 51px;
            left: 46%;
        }
        
        h1 {
            color: #fff;
            text-shadow: 1px 1px 1px #000;
        } 

    </style>
    <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}" query-params="{{query}}" active="{{active}}">
    </app-route>
    <paper-spinner id="spinner1" active>       
    </paper-spinner>
    <h1>[[loading]]</h1>
        <main>
            <nav>
           <h1> A D D </h1>
            </nav>  
            <article>  
                <dom-repeat id="repeat" items="[[contents]]" as="image">
                    <template>
                    [[killSpinner(contents, index)]]
                        ${this._getElement}
                    </template>
                </dom-repeat>
            </article>
        </main>    
        `
    }

    static get getElement() {
        return html`
        <cms-image src="[[image.url]]" alt="[[image.title]]" on-click="setImage">
        </cms-image>`
    }

    static get is() { return 'cms-content-image-template'; }

    static get properties() {
        return {
            DBW: {
                type: Object,
                value: function () {
                    return new dataBaseworker()
                },
                notify: true
            },
            loading: {
                type: String
            },
            contents: {
                type: Array,
                notify: true,
                observer: '_log'
            }
        }
    }

    static get observers() {
        return [
            '_routePageChanged(routeData, query)'
        ];
    }

    ready() {
        super.ready()
    }

    _log(data) {
        console.log(data)
    }

    killSpinner(contents, index) {
        if (contents.length === index + 1) {
            this.$.spinner1.active = false
            this.loading = ''
        }
    }
}
customElements.define(cmsContentImageTemplate.is, cmsContentImageTemplate);