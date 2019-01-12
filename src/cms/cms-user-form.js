import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js'
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import './cms-input-sellector.js';
import './cms-image-viewer.js';
import '../shop-image.js';
class cmsUserForm extends PolymerElement {
    static get template() {
        return html`
        <style>
        /*   main {
                 background-color: aliceblue;
                 position: fixed;
                 top: 149px;
                 width: 77%;
                 height: 0px;
                 padding: 5px;
                 visibility: collapse;
                 transition-property: height, visibility;
                 transition-delay: .5s, 0s;
                 transition-duration: 2s, 1s;
            }*/
      
        main[closed] {
          height: 530px;
          visibility: visible;
          transition-property: height, visibility;
          transition-duration: 2s, .5s;
        }
      
        main {
          display: flex;
          flex-flow: column;
          background-color: aliceblue;
          position: relative;
          top: -46px;
          padding: 5px;
          visibility: collapse;
          transition-property: height, visibility;
          transition-duration: 2s, 1s;
        }
      
        img {
          width: 190px
        }
      
        nav {
          display: flex;
          flex-flow: row
        }
      
        shop-image::before {
          content: "";
          display: block;
          padding-top: 100%;
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
      
        div [button] {
          background-color: var(--google-grey-300)
        }
      
        cms-image-viewer.diferent{                       
            --main-style:{
              position: relative;
              top: -354px;
              margin-left: 0px;
            }
          }
      </style>
        <main closed$="[[closed]]">
          <!--cms-input-sellector options="[[userTypes]]" value="{{type}}">          
        </cms-input-sellector-->
          <paper-input always-float-label label="uid" value="{{uid}}"></paper-input>
          <paper-input always-float-label label="displayName" value="{{displayName}}"></paper-input>
          <paper-input always-float-label label="email" value="{{email}}"></paper-input <div button>
          <div button>
            <paper-button id="art" class="diferent" on-click="file">
              choose image
            </paper-button>          
          </div>
          <shop-image src="[[photoURL]]" alt="[[photoURL]]"></shop-image>
          <paper-input always-float-label label="emailVerified" value="{{emailVerified}}"></paper-input>
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
            <nav>
        </main>
        <cms-image-viewer id="viewer" class="diferent" image="{{image}}"></cms-image-viewer>`
    }
    static get is() { return 'cms-user-form'; }

    static get properties() {
        return {
            closed: {
                type: Boolean,
                notify: true,
                value: false,
                reflectToAttribute: true,
            },
            openViewer: {
                type: Boolean,
                notify: true,
                value: false,
                reflectToAttribute: true,
            },
            setter: {
                type: Boolean,
                notify: true,
                value: false
            },
            user: {
                type: Object,
                notify: true,
                observer: 'setUserData'
            },
            images: {
                type: Array,
                notify: true
            },
            request: {
                type: Array,
                notify: true
            },
            displayName: {
                type: String,
                notify: true
            },
            email: {
                type: String,
                notify: true
            },
            photoURL: {
                type: String,
                notify: true
            },
            uid: {
                type: String,
                notify: true
            },
            emailVerified: {
                type: String,
                notify: true
            }
        }
    }
    ready() {
        super.ready()
        this.$.viewer.open = false
    }

    setUserData(data) {
        // console.log(data)
        this.displayName = data.displayName
        this.email = data.email
        this.photoURL = data.photoURL
        this.emailVerified = data.emailVerified
        this.uid = data.uid
    }

    file() {
        this.$.viewer.open = true
    }

    setValues() {
        let arr = new Array()
        let obj = {
            'displayName': this.displayName,
            'email': this.email,
            'photoURL': this.photoURL,
            'emailVerified': this.emailVerified,
            'uid': this.uid
        }
        arr.push(obj)
        this.request = []
        this.request = arr
        this.clean()
        this.setter = true
    }

    clean() {
        this.closed = !this.closed
        this.displayName = ''
        this.email = ''
        this.photoURL = ''
        this.emailVerified = ''
        this.uid = ''
        this.setter = true
    }
}

customElements.define(cmsUserForm.is, cmsUserForm);
