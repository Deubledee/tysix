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
import './cms-image-viwer.js';
import '../shop-image.js';
//import { object } from 'firebase-functions/lib/providers/storage';

class cmsUserForm extends PolymerElement {
    static get template() {
        return html`
    <custom-style>
    <style is="custom-style">
          main {
            display: flex;
            flex-flow: column;
            overflow: auto;
            background-color: aliceblue;
            position: fixed;
            top: 149px;
            width: 77%;
            height: 0px;
            padding: 5px;
            visibility: collapse;
            transition-property: height, visibility;
            transition-duration: 2s, 1s;
          }

          main[closed] {
            height: 530px;
            visibility: visible;
            transition-property: height, visibility;
            transition-duration: 2s, .5s;
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
    </style>
  </custom-style>
</head>
<body>   
     <main closed$="[[closed]]">
        <!--cms-input-sellector options="[[userTypes]]" value="{{type}}">          
        </cms-input-sellector-->
        <paper-input always-float-label label="uid" value="{{uid}}"></paper-input>
        <paper-input always-float-label label="displayName" value="{{displayName}}"></paper-input>
        <paper-input always-float-label label="email" value="{{email}}"></paper-input>

        <paper-button id="art" class="diferent" on-click="file">
            choose image
        </paper-button>
        <shop-image src="[[photoURL]]" alt="[[photoURL]]"></shop-image>       
        <paper-input always-float-label label="emailVerified" value="{{emailVerified}}"></paper-input>
        <!--div>
            <cms-input-sellector options="[[active]]" value="{{layout}}">          
            </cms-input-sellector>
        <div-->
        <nav>
            <paper-button on-click="clean">
                cancel
            </paper-button>

            <paper-button on-click="setValues">
                Save
            </paper-button>
        <nav>
     </main>  
     <cms-image-viwer closed="{{openViewer}}" images="[[images]]" image="{{photoURL}}"></cms-image-viwer>
</body>
`
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
                notify: true
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


    createURL(items) {
        let arr = new Array()
        let parsed = JSON.parse(items)
        // console.log(parsed)
        for (let i = 0; i < parsed.length; i++) {
            arr.push({ url: 'http://localhost:3000/data/images/' + parsed[i], title: parsed[i] })
        }
        this.images = arr
        this.openViewer = !this.openViewer
    }

    file() {
        fsd("http://localhost:3000/imagedir", items => {
            // console.log(items)
            this.createURL(items)
        })
    }

    setUserData(data) {
        // console.log(data)
        this.displayName = data.displayName
        this.email = data.email
        this.photoURL = data.photoURL
        this.emailVerified = data.emailVerified
        this.uid = data.uid
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
    }

    clean() {
        this.closed = !this.closed
        this.displayName = ''
        this.email = ''
        this.photoURL = ''
        this.emailVerified = ''
        this.uid = ''
    }
}

customElements.define(cmsUserForm.is, cmsUserForm);
