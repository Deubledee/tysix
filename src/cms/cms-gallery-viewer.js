import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import { scroll } from '@polymer/app-layout/helpers/helpers.js';
import { dataBaseworker } from './dataBaseWorker.js';
import './cms-galleries.js';
import './cms-images.js';
class cmsGalleryViewer extends PolymerElement {
    static get template() {
        return html`
        <style>
        :host {
            text-align: center;
            z-index: 122;
            position: absolute;
            min-height: 400px;
            width: 100%;
            left: -6px;
            padding: 5px;
            background-color: rgba(63, 71, 86, 0.62);
            border-radius: 2px
        } 

        main {
          display: none;
          border-radius: 4px;;
          visibility: visible;
          transition-property: height, visibility;
          transition-delay: .5s, .5s;
          transition-duration: 1s, .5s;
          @apply --main-style;
        }
      
        main[mainOpend] {
          display: block
        }

        @media (max-width: 767px) {
          :host {
            margin: 0 12px;
          }
        }

        cms-galleries {
          display: none
        }
        
        cms-galleries[closed] {
          display: block;
        }

        cms-images.images  {
            display: none; 
            left: -33px;
            width: 98%;
            --images-article-images: {
                background-color: #f2f2f2;
                height: 512px;
                overflow: auto;
                padding-top: 12px
            };
            --images-paper-icon-button-central: {
                color: #fff;
            }
        }
        
      </style>
      <main mainOpend$="[[openMain]]">
        <cms-galleries id="galleries"
            closed$="[[open]]"
            sett
            images="{{images}}"
            setter="{{clear}}"
            clear="{{clear}}"
            confirm="{{confirm}}"
            reset="[[reset]]">
        </cms-galleries>
        <cms-images class="images" id="images"
            image="{{image}}"
            cancel="{{evet}}"
            sett="[[sett]]"
            clear="{{clear}}"
            confirm="{{confirm}}"
            openMain="{{doNotOpenMain}}">
        </cms-images>`
    }

    static get is() { return 'cms-gallery-viewer'; }

    static get properties() {
        return {
            DBW: {
                type: Object,
                value: function () {
                    return new dataBaseworker()
                },
                notify: true
            },
            galleries: {
                type: Array,
                notify: true
            },
            mainOpend: {
                type: Boolean,
                notify: true,
                value: true,
                reflectToAttribute: true,
            },
            doNotOpenMain: {
                type: Boolean,
                notify: true,
                value: false
            },
            openMain: {
                type: Boolean,
                notify: true,
                value: true
            },
            images: {
                type: Array,
                notify: true,
                observer: 'opensie'
            },
            confirm: {
                type: Boolean,
                notify: true,
                value: false
            },
            reset: {
                type: Boolean,
                notify: true
            },
            clear: {
                type: Boolean,
                value: false,
                notify: true,
                observer: 'opensie'

            },
            show: {
                type: Boolean,
                notify: true,
                value: false,
                observer: 'showButtons'
            },
            evet: {
                type: Boolean,
                value: false,
                notify: true,
                observer: 'cancel'
            },
            image: {
                type: Object,
                notify: true,
                observer: 'addMethod'
            },
            gallerie: {
                type: String,
                notify: true
            },
            killFormAndSet: {
                type: Boolean,
                notify: true,
                value: false,
                observer: 'settAndFormKiller'
            },
            form: {
                type: Boolean,
                notify: true,
                value: true
            },
            sett: {
                type: Boolean,
                notify: true,
                value: false,
            },
            open: {
                type: Boolean,
                notify: true,
                value: true
            },
            closed: {
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

    log(msg, data) {
        console.log(msg, data)
    }

    showButtons(data) {
        this.$.images.form = false
        this.$.images.sett = data
    }

    addMethod(data) {
        /**overriden by parent*/
        console.log(data)
    }

    opensie(data) {
        if (data instanceof Array === true) {
            this.$.images.style.display = 'block'
            this.$.images.style.height = '600px'
            this.$.images.settAndFormKiller(true)
            this.$.images.set('sett', true)
            this.set('activeData', data)
            setTimeout(() => {
                this.$.images.set('images', data)
            }, 200)
        }
        if (data === false) {
            this.$.images.style.display = 'none'
            this.$.images.style.height = '0px'
            this.clear = !this.clear
        }
    }

    settAndFormKiller(data) {
        if (data === true) {
            this.$.images.settAndFormKiller(data)
        }
    }

    error(data) {
        console.error('error from cms-image-viewer', data)
    }

    cancel(event) {
        if (event === true) {
            /* this.open = !this.open
             this.evet = !this.evet
             this.show = !this.show
             this.openMain = !this.openMain*/
            this.$.images.killSettAndForm = this.killSettAndForm = !this.killSettAndForm
        }
    }
}
customElements.define(cmsGalleryViewer.is, cmsGalleryViewer);