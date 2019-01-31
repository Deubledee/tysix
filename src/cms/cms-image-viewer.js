import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import { scroll } from '@polymer/app-layout/helpers/helpers.js';
import { dataBaseworker } from './dataBaseWorker.js';
import './cms-galleries.js';
import './cms-images.js';
class cmsImageViewer extends PolymerElement {
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
          border-radius: 4px;
          height: 710px;
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
      
        paper-button {
          font-weight: 600;
          background-color: var(--google-grey-300);
          border-radius: 4px;
          border: 1px dashed #c9c9c9;
        }

        nav[controler] {
          position: relative;
          top: -6px;
          margin-bottom: 50px;
          height: 166px;
          color: #8098ad;
          display: flex;
          flex-flow: column;
          padding: 10px;
          padding-left: 21px;
          max-width: 1300px;
          margin-left: auto;
          margin-right: auto;
          height: 73px;
        }

        .hidde {
          display: none!important
        }

        nav[controler] div {
          display: block;
          border-radius: 4px;
        }

        div[controler] {  
          background-color: #dbdbdb; 
          margin-top: 18px;
          color: #8098ad;
        }

        section {
          cursor: pointer;
          color: #f0f0f0;
          font-size: 35px;
          text-align: center;
          display: block;
          padding: 1px;
          height: 58px;
          width: 190px;
          border-radius: 10px;          
          text-shadow: 1px 1px 1px var(--primary-text-color);
        }

        section[title] {
          width: 140px;
        }

        section[title2] {
          /*margin-right: auto;*/
          margin-left: 32.5%;
          display: flex;
          width: 190px;
          flex-basis: 34px;
          cursor: pointer;
          color: #787676;
          font-weight: 600;
          font-size: 55px;
          text-align: center;
          border-radius: 10px;
          /* background-color: #e1e2d8; */
          text-shadow: 3px 3px 2px #ababab;
        }

        paper-icon-button-light{
          color: #929696;
          margin-left: 8px;
          margin-right: 7px;
        }

        cms-galleries {
          display: none
        }
        
        cms-galleries[closed] {
          display: block;
        }

        paper-tabs {
          font-size: 17px;
          font-weight: bold;
        }

        app-toolbar {
          height: 36px;
        }
        cms-images {
          display: none;
          position: absolute;
          top: -561px;
          left: -33px;
          /* width: max-content; */
          width: 900px;          
          height: 600px;
          background-color: aliceblue;
        }
      </style>
      <main mainOpend$="[[openMain]]">
          <nav id="controler" controler>
            <div>
              <section title2>
                <paper-icon-button-light>
                  <iron-icon icon="image:photo-library" aria-label="galleries"></iron-icon>
                </paper-icon-button-light>
                <div> Galleries </div>
              </section>
            </div>
            <div controler>
              <app-toolbar>
                  <paper-tabs no-bar >
                    <paper-tab on-click="createGallerie">
                          Add
                      <paper-icon-button-light>
                        <iron-icon icon="image:loupe" aria-label="Go back"></iron-icon>
                      </paper-icon-button-light>
                    </paper-tab>
                  </paper-tabs>
              </app-toolbar> 
            </div>  
          </nav> 
        <cms-galleries id="galleries"
            closed$="[[open]]"
            sett=[[sett]]
            images="{{images}}"
            setter="{{clear}}"
            clear="{{clear}}"
            confirm="{{confirm}}"
            reset="[[reset]]">
        </cms-galleries>
        <cms-gallerie-form id="gallForm"
          setter={{reset}}>
        </cms-gallerie-form> 
        <cms-image-form id="imgForm" setter={{setter}} gallerie="[[gallerie.gallerie]]">
        </cms-image-form> 
      </main>
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

  static get is() { return 'cms-image-viewer'; }

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
        observer: 'runAddMethod'
      },
      gallerie: {
        type: String,
        notify: true
      },
      closeHead: {
        type: Boolean,
        value: false,
        notify: true,
        observer: 'clearHead',
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
    this.$.images.form = true
    this.$.images.del = true
    this.addEventListener('add-image', this.addImage)
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

  addImage(event) {
    this.$.imgForm.imageArray = event.detail.imageArray
    this.$.imgForm.gallerie = event.detail.gallerie
    this.$.imgForm.closed = true
  }

  runAddMethod(image) {
    if ('url' in image) {
      this.addMethod(image)
      this.image = {}
    }
  }

  settAndFormKiller(data) {
    if (data === true) {
      this.$.images.killSett = data
    }
  }

  error(data) {
    console.error('error from cms-image-viewer', data)
  }
  createGallerie() {
    this.$.gallForm.closed = true
  }

  clearHead(data) {
    if (data === true) {
      this.$.controler.classList.toggle('hidde')
    }
  }

  cancel(event) {
    if (event === true) {
      this.open = !this.open
      this.evet = !this.evet
      this.show = !this.show
      this.openMain = !this.openMain
      this.$.images.killSettAndForm = this.killSettAndForm = !this.killSettAndForm
    }
  }
}
customElements.define(cmsImageViewer.is, cmsImageViewer);