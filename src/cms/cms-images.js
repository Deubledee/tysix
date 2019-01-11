import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js'
import '@polymer/paper-input/paper-input.js';
import { dataBaseworker } from './dataBaseWorker.js';
class cmsImages extends PolymerElement {
    static get template() {
        return html` 
        <style>
        shop-image {
            margin: 32px 0 16px;
        }
    
        shop-image::before {
            content: "";
            display: block;
            padding-top: 100%;
        } 

        nav[images] {
            -webkit-flex: 1 1;
            flex: 1 1;
            -webkit-flex-basis: 33%;
            flex-basis: 16%;
            margin-top: 1px;
            margin-bottom: 0px;        
          }
        
          div[frame] {
            display: block;
            flex-basis: 197px;
            padding: 6px;
            border-radius: 4px;
            background-color: #3f4756
          }
  
        div[frame2] {
          min-height: 373px;
          max-height: 773px;
          }
        
          shop-image {
            cursor: pointer;
            max-height: 600px;
          }
        
          div[images] {
            padding: 10px;
            margin-left: auto;
            margin-right: auto;
            margin-top: 20px;
            background-color: #ececec;
            margin-bottom: 2px;
            width: 23%;
            display: block
          }
  
          div[images][open] {
            display: none
          }
  
          article[images] {
            overflow: auto;
            height: auto;
            margin-top: 18px;
            flex-flow: wrap;
          }
  
          article[images][toggle] {
            flex-flow: column
          }

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
            display: none
          }
  
          nav[central][show]{
            display: block
          }
  
          div[central]{
            display: block
          }
  
          div[central][toggle]{
            display: none
          }
          .title2{
            margin-left: auto;
            margin-right: auto;
            width: 150px;
            background-color: #e4e4e4;
            color: black;
            border-radius: 4px;
            box-shadow: 2px 2px 2px grey;
          }
          paper-icon-button[central]{
            color: #000;
          }
          paper-icon-button{
            color: #94352b;
          }
        </style>
        <nav central show$="[[show]]">
            <div central toggle$="[[!toggle]]">
                <paper-icon-button central  on-click="toggleView" title="align column" icon="image:dehaze" aria-label="toggle-view"></paper-icon-button>        
            </div>
            <div central toggle$="[[toggle]]">
                <paper-icon-button central on-click="toggleView" title="align row" icon="image:grid-on" aria-label="toggle-view"></paper-icon-button>
            </div>
        </nav>  
        <article images toggle$="[[!toggle]]"  class="grid" id="images">  
            <dom-repeat items="[[images]]" as="image">
                <template>
                <nav images>
                    <!--dom-repeat items="[[count]]" as="image">
                    <template-->
                        <div frame2>
                        <div class="title2">[[image.title]]</div>
                        <dom-if if="[[!sett]]">
                        <template>
                            <paper-icon-button on-click="deleteImg" icon="av:not-interested" aria-label="mode-delete"></paper-icon-button>
                        </template> 
                        </dom-if> 
                        <shop-image src="[[image.url]]" alt="[[image.title]]" on-click="setImage"></shop-image>                      
                        </div>
                    <!--/template>
                    </dom-repeat-->
                </nav>
                </template>
            </dom-repeat>
        </article>
        <dom-if if="[[sett]]">
          <template>
            <div images>
              <paper-button on-click="cancel">
                cancel
              </paper-button>
            </div>
          </template> 
        </dom-if> 
        `
    }

    static get is() { return 'cms-images'; }

    static get properties() {
        return {
            DBW: {
                type: Object,
                value: function () {
                    return new dataBaseworker()
                },
                notify: true
            },
            cancel: {
                type: Object
            },
            sett: {
                type: Boolean,
                value: true
            },
            images: {
                type: Array,
                notify: true,
                observer: 'open'
            },
            show: {
                type: Boolean,
                notify: true,
                value: false,
                reflectToAttribute: true
            },
            toggle: {
                type: Boolean,
                notify: true,
                value: true,
                reflectToAttribute: true
            },
        }
    }

    ready() {
        super.ready()
    }

    open() {
        this.show = true
    }

    setImage(event) {
        if (this.sett === true) {
            this.image = event.model.__data.image
            this.cancel()
        }
    }

    toggleView() {
        this.toggle = !this.toggle
    }
}
customElements.define(cmsImages.is, cmsImages);