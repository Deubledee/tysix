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
          @apply --layout-vertical;
          @apply --layout-center-justified;
          text-align: center;
        }

        main {
          display: none;
          position: relative;
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
          top: 33px;
          margin-bottom: 50px;
          height: 166px;
          background-color: var(--primary-background-color);
          box-shadow: 4px 4px 7px #989898;
          color: #8098ad;
          display: flex;
          flex-flow: row;
          padding: 10px;
          padding-left: 21px;
        }

        .hidde {
          display: none!important
        }

        nav[controler] div {
          flex-basis: 120px;
          flex-grow: 1      
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
          background-color: #e1e2d8;
          text-shadow: 1px 1px 1px var(--primary-text-color);
        }

        section[title] {
          width: 140px;
        }

        section[title2] {
          display: flex;
          width: 190px;
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
          display: block
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
            <div>
              <section title on-click="createGallerie">
                <paper-icon-button-light>
                  <iron-icon icon="image:loupe" aria-label="Go back"></iron-icon>
                </paper-icon-button-light>
                Add
              </section>
            </div> 
          </nav>
        <cms-gallerie-form id="gallForm"
          setter={{reset}}>
        </cms-gallerie-form>   

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
            images="[[images]]"
            image="{{image}}"
            cancel="{{evet}}"
            sett="[[sett]]"
            clear="{{clear}}"
            confirm="{{confirm}}"
            openMain="{{openMain}}">
        </cms-images> 
      </main>
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
      openMain: {
        type: Boolean,
        notify: true,
        value: true
      },
      images: {
        type: Array,
        notify: true,
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
        notify: true
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
        notify: true
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
        reflectToAttribute: true,
        // observer: 'getImageGalleries',
      },
    }
  }

  ready() {
    super.ready()
    this.$.images.form = true
  }

  log(msg, data) {
    console.log(msg, data)
  }

  showButtons(data) {
    this.$.images.form = false
    this.$.images.sett = data
  }

  settAndFormKiller(data) {
    if (data === true) {
      this.$.images.killSettAndForm = data
      this.log('settAndFormKiller', data)
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

  setOpen(data) {
    //this.open = data
    scroll({ top: 0, behavior: 'silent' });
  }

  cancel(event) {
    if (event === true) {
      scroll({ top: 200, behavior: 'smooth' });
      scroll({ bottom: 220, behavior: 'smooth' });
      this.open = !this.open
      this.evet = !this.evet
      this.show = !this.show
      this.openMain = !this.openMain
      this.$.images.killSettAndForm = this.killSettAndForm = !this.killSettAndForm
    }
  }
}
customElements.define(cmsImageViewer.is, cmsImageViewer);