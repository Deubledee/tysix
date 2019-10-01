import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js'
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
import { dataBaseworker } from '../dataBaseWorker.js';

class cmsGallerieForm extends PolymerElement {
    static get template() {
        return html`

    <style>      
        main[closed] {
            z-index: 123;
            position: fixed;
            top: 194px;
            left: 26%;
            display: flex;
            flex-flow: column;
            box-sizing: border-box;
            height: 284px;
            width: 755px;
            visibility: visible;
            transition-property: height, visibility;
            transition-duration: 2s, 2s;
            padding: 52px;
        }
      
        main {
            display: none;
            background-color: aliceblue;
            width: 755px;
            height: 0px;
            padding: 5px;
            visibility: collapse;
        }
      
        img {
          width: 190px
        }
      
        nav {
          display: flex;
          flex-flow: row
        }
      
        div[images] {
          box-sizing: border-box;
          padding: 13px;
          margin-top: 34px;
          background-color: #ececec;
          margin-bottom: 2px;
          width: 100px;
          height: 60px;
          margin-right: 5px;
        }
      
        paper-button {
          background-color: var(--google-blue-100)
        }

    </style>
    <main closed$="[[closed]]">
        <paper-input always-float-label label="Gallerie Name" value="{{pageName}}"></paper-input>
        <nav>
            <div images>
                <paper-button raised="true" on-click="clean">
                    cancel
                </paper-button>
            </div>
            <div images>
                <paper-button raised="true" on-click="setValues">
                    Save
                </paper-button>
            </div>
        <nav>
    </main>
`
    }
    static get is() { return 'cms-gallerie-form'; }

    static get properties() {
        return {
            DBW: {
                type: Object,
                value: function () {
                    return new dataBaseworker()
                },
            },
            closed: {
                type: Boolean,
                notify: true,
                value: false,
                reflectToAttribute: true,
            },
            setter: {
                type: String,
                notify: true,
                value: 'false'
            },
            pageName: {
                type: String,
            }
        }
    }

    ready() {
        super.ready();
    }

    setValues() {
        if (this.pageName.length > 1) {
            let parsed = {
                gallerie: this.pageName + '_images',
                content: { content: [{ url: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#CCC" d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>'), title: '' }], gallerie: this.pageName }
            }
            this.DBW.setImageGalleries((msg, gallerie) => {
                console.log(msg, gallerie)
                this.clean('true')
            }, parsed)
        }
    }

    clean(setterValue) {
        let setter
        if (setterValue instanceof MouseEvent === true) {
            setter = 'true'
        } else {
            setter = setterValue
        }
        this.closed = false
        this.setter = setter
        /* this.pageName = ''*/
    }
}

customElements.define(cmsGallerieForm.is, cmsGallerieForm);