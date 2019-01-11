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
          position: relative;
          bottom: 672px;
          height: 0px;
          visibility: collapse;
          transition-property: height, visibility;
          transition-delay: .5s, .5s;
          transition-duration: 2s, 1s;
          @apply --main-style;
        }
      
        main[closed] {
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
          margin-left: 8px;
          margin-right: 7px;
        }

      </style>
      <main closed$="[[closed]]">  
        <dom-if if="[[!sett]]">
          <template>
            <nav controler>
              <div>
                <section title2>
                  <paper-icon-button-light>
                    <iron-icon icon="image:photo-library" aria-label="galleries"></iron-icon>
                  </paper-icon-button-light>
                  <div> Galleries </div>
                </section>
              </div>
              <div add>
                <section title on-click="createGallerie">
                  <paper-icon-button-light>
                    <iron-icon icon="image:loupe" aria-label="Go back"></iron-icon>
                  </paper-icon-button-light>
                  Add
                </section>
              </div> 
            </nav>
          </template> 
        </dom-if>          
        <cms-galleries id="galleries" sett={{open}} images="{{images}}"> </cms-galleries>  
        <cms-images images="{{images}}" cancel="[[cancel>]]" sett={{open}}></cms-images> 
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
      images: {
        type: Array,
        notify: true,
      },
      openGallerieForm: {
        type: Boolean,
        value: false
      },
      fourCounted: {
        type: Array,
        notify: true,
      },
      event: {
        type: Object
      },
      image: {
        type: Object,
        notify: true
      },
      gallerie: {
        type: String,
        notify: true
      },
      sett: {
        type: Boolean,
        observer: 'setOpen',
        value: true
      },
      open: {
        type: Boolean,
        notify: true,
        value: false,
        reflectToAttribute: true
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
  }

  createGallerie() {
    this.$.galleries.openform(true)
  }

  setOpen(data) {
    this.open = data
  }

  cancel() {
    scroll({ top: 200, behavior: 'smooth' });
    scroll({ bottom: 220, behavior: 'smooth' });
    this.closed = !this.closed
    this.images = []
    this.galleries = []
    this.$.images.style.height = "56px"
  }
}
customElements.define(cmsImageViewer.is, cmsImageViewer);