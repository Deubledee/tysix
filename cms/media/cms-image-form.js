import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js'
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
import { dataBaseworker } from '../tools/dataBaseWorker.js/index.js';
import '../tools/cms-upload.js/index.js'
class cmsImageForm extends PolymerElement {
    static get template() {
        return html`

    <style>      
        main {
            position: absolute;
            left: -1%;
            top: 63%;
            border-radius: 4px;
            box-shadow: 4px 4px 9px grey;
            z-index: 3;
            display: flex;
            flex-flow: column;
            box-sizing: border-box;
            height: 459px;
            visibility: visible;
            transition-property: height, visibility;
            transition-duration: 2s, .5s;
            padding: 52px;
        }
      
        img {
          width: 190px
        }
      
        nav {
          display: flex;
          margin-bottom: 68px;
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
    <main>
        <nav>
            <div images>
                <paper-button on-click="clean">
                    cancel
                </paper-button>
            </div>
            <div images>
                <paper-button on-click="setValues">
                    Save
                </paper-button>
            </div>
        </nav>
        <input id="input" type="file" required multiple accept="image/png, image/jpeg"></input>
    </main>
`
    }
    static get is() { return 'cms-image-form'; }

    static get properties() {
        return {
            DBW: {
                type: Object,
                value: function () {
                    return new dataBaseworker()
                },
            },
            files: {
                type: Array,
            },
            pageName: {
                type: String,
            },
            gallerie: {
                type: String,
                notify: true
            }
        }
    }

    ready() {
        super.ready();
    }

    setValues() {
        // if (this.$.upload.imageArray.length > 1) {
        console.log(this.$.input)

        /*  let content = this.$.upload.imageArray, finalArr = new Array()
          content.map(item => {
              console.log(item)
              let target = 'http://localhost:3000/data'
              target = target + '/' + this.gallerie + '/' + item.name
              let name = item.name.split('.')[0]
              finalArr.push({ url: target, title: name })
          })
          let parsed = {
              gallerie: this.gallerie + '_images',
              content: finalArr
          }
          console.log(parsed)
          this.DBW.writeImageContent((msg, gallerie) => {
              if (msg !== 'error') {
                  console.log(msg, gallerie)
                  this.clean('true')
              } else {
                  console.log(msg, this.pageName)
              }
          }, parsed)*/
        // }
    }

    clean(setterValue) {
        let setter
        if (setterValue instanceof MouseEvent === true) {
            setter = 'true'
        } else {
            setter = setterValue
        }
        this.pageName = ''
        this.pageLabel = ''
        this.closed = false
        this.setter = setter
    }
}

customElements.define(cmsImageForm.is, cmsImageForm);