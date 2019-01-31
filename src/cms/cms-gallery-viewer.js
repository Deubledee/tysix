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
          position: relative;
          text-align: center;
          z-index: 122;
        }

        main {
          display: none;
          width: 101%;
          background-color: #f2f2f2;;
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
        cms-images {
          display: none;
          position: absolute;
          left: -33px;
          /* width: max-content; */
          width: 900px;          
          height: 600px;
          background-color: aliceblue;
        }
      </style>
      <main mainOpend$="[[openMain]]">
        <cms-galleries id="galleries"
            closed$="[[open]]"
            sett=[[sett]]
            images="{{images}}"
            setter="{{clear}}"
            clear="{{clear}}"
            confirm="{{confirm}}"
            reset="[[reset]]">
        </cms-galleries>
        <cms-images id="images"
            image="{{image}}"
            cancel="{{evet}}"
            sett="[[sett]]"
            clear="{{clear}}"
            confirm="{{confirm}}"
            openMain="{{doNotOpenMain}}">
        </cms-images>
    `;
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
            addMethod: {
                type: Object
            },
            confirm: {
                type: Boolean,
                notify: true,
                value: false
            },
            openGallerieForm: {
                type: Boolean,
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
                //observer: 'runAddMethod'
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

    opensie(data) {
        if (data instanceof Array === true) {
            this.$.images.style.display = 'block'
            this.$.images.style.height = '600px'
            this.$.images.settAndFormKiller(true)
            setTimeout(() => {
                this.$.images.images = data
            }, 200)
        }
        if (data === false) {
            this.$.images.style.display = 'none'
            this.$.images.style.height = '0px'
            this.clear = !this.clear
        }
        /*setTimeout(() => {
        }, 200)*/
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