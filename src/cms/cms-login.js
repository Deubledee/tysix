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
import { dataBaseworker } from './dataBaseWorker.js';
class cmsLogin extends PolymerElement {
     static get template() {
          return html`
     <custom-style>
          <style is="custom-style">
                    main {
                         position: fixed;
                         top: 149px;
                         width: 77%;
                         height: 0px;
                         padding: 5px;
                         padding-left: 40%;
                    }
                    main[closed] {
                         display: none;
                    }
                    .slot {
                         display: block;
                    }
                    .slot [closed]{
                         display: none;
                    }
                    div[login] {
                         width: 260px;
                         background-color: var(--google-grey-100);
                         box-sizing: border-box;
                         box-shadow: 4px 3px 4px var(--light-theme-disabled-color);
                         padding: 33px;
                         border-radius: 6px;
                    }
                    nav {
                         display: flex;
                         flex-flow: column;
                         box-sizing: border-box;
                         padding: 13px;
                        /* background-color: #ececec;*/
                         margin-bottom: 5px;
                    }
                    nav span {
                         text-align: center;
                         letter-spacing: 2px;
                         font-style: italic;
                    }
                    nav span[one] {
                         font-style: normal;
                         margin-bottom: 15px;
                         font-size: x-large;
                         font-weight: 500;
                         color: black;
                         text-shadow: 1px 2px 4px grey;
                    }
                    nav span[tow] {
                         font-size: large;
                         font-weight: 500;
                         color: var(--google-blue-100);
                         text-shadow: 1px 2px 4px grey;
                    }
                    nav span[three] {
                         margin-top: 25px;
                         font-size: large;
                         font-weight: 500;
                         color: #f2f2f2;
                         text-shadow: 1px 2px 4px var(--paper-blue-grey-900)
                    }
                    nav span[four] {
                         font-size: small;
                         font-weight: 600;
                         color: var(--paper-blue-grey-900);
                         text-shadow: 2px 2px 4px var(--google-grey-500);
                    }  
                    nav div[square]{
                         background-color: #000000;
                         margin-left: auto;
                         margin-right: auto;
                         box-sizing: content-box;
                         padding: 2px;
                         border-bottom-right-radius: 13px;
                         border-bottom-left-radius: 13px;
                         border-top-left-radius: 13px;
                    }                        
                    paper-button.diferent{
                         margin-top: 15px;
                         color: black;
                         border-radius: 25px;
                         background-color: var(--paper-blue-100);e;
                         --paper-button: {
                              width: 185px
                         }
                    }
          </style>
     </custom-style>  
     <main closed$="[[!closed]]">      
          <div login>      
               <nav>
                    <span one> Wellcome </span>
                    <div square>
                         <span tow> T6  </span>
                    </div>
               </nav>
               <paper-input always-float-label label="email" value="{{email}}"></paper-input>
               <paper-input always-float-label label="password" type="password" value="{{pwd}}"></paper-input>
               <paper-button class="diferent" on-click="setValues">
                    login
               </paper-button>
               <nav>
                    <span three> Developed by </span>     
                    <span four> Deubledee </span>              
               </nav>
          <div>
     </main>  
     <slot name="app" class="slot" closed$="[[closed]]"></slot>`
     }

     static get is() { return 'cms-login'; }

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
                    value: true,
                    reflectToAttribute: true,
               },
               user: {
                    type: Object,
                    notify: true
               },
               email: {
                    type: String,
               },
               pwd: {
                    type: String,
               },
               type: {
                    type: String,
               },
               types: {
                    type: Array,
                    value: [
                         { label: 'Login types' },
                         { id: 'google', name: 'google' },
                         { id: 'facebook', name: 'facebook', notAtive: false },
                         { id: 'github', name: 'github', notAtive: false },
                         { id: 'wave-shaper', name: 'Video', notAtive: false }]
               }
          }
     }

     ready() {
          super.ready();
          this.DBW.authStateChanged((user, err) => {
               if (user !== 0) {
                    this.closed = !this.closed
                    this._userAccepted(user)
               } else {
                    console.log(err)
               }
          })
          window.addEventListener('user-changed', (event) => {
               let user = firebase.auth().currentUser
               let string = `http://localhost:3000/update?obj=${JSON.stringify(event.detail)}&uid=${user.uid}`
               console.log(event.detail, string)
               fsd(string, items => {
                    console.log('update sucssessfull', JSON.parse(items))
                    let content = JSON.parse(items)
                    if (content.accepted === 'admin') {
                         window.dispatchEvent(new CustomEvent('user-updated', {
                              detail: this
                                   .removeSensitiveData(JSON.parse(items))
                         }))

                    } else {
                         window.dispatchEvent(new CustomEvent('app-error', {
                              detail: content.error
                         }));
                    }
               }, 'POST')
          })
          window.addEventListener('ask-for-users', (event) => {
               let user = firebase.auth().currentUser
               let string = `http://localhost:3000/admin?uid=${user.uid}`
               if (user != null) {
                    console.log()
               }
               fsd(string, items => {
                    let content = JSON.parse(items)
                    if (content.accepted === 'admin') {
                         window.dispatchEvent(new CustomEvent('user-list', {
                              detail: this.removeSensitiveData(content.data)
                         }));
                    } else {
                         window.dispatchEvent(new CustomEvent('app-error', {
                              detail: content.error
                         }));
                    }

               }, 'POST')
          })
     }

     _userAccepted(user) {
          // let cb = this._pageLoaded.bind(this, Boolean(oldPage));
          import('./cms-controler.js').then(() => {
               this.user = user
               this.firstElementChild.user = user
          });
     }

     removeSensitiveData(categories) {
          let finalString = [], obj = {}
          for (let par in categories) {
               if (par.toString() !== 'passwordHash' && par.toString() !== 'passwordSalt' && par.toString() !== 'metadata' && par.toString() !== 'providerData' && par.toString() !== 'tokensValidAfterTime')
                    obj[par.toString()] = categories[par]
          }
          finalString.push(obj);
          return finalString
     }

     showPage(event) {
          if (event.srcElement.parentElement.parentElement.parentElement.children[1].hasAttribute('open') === false) {
               event.srcElement.parentElement.parentElement.parentElement.children[1].style.display = "block"
               event.srcElement.parentElement.parentElement.parentElement.children[1].setAttribute("open", true)
          } else {
               event.srcElement.parentElement.parentElement.parentElement.children[1].style.display = "none"
               event.srcElement.parentElement.parentElement.parentElement.children[1].removeAttribute("open")
          }

     }

     setValues() {
          let obj = {
               'email': this.email,
               'pwd': this.pwd
          }
          this.DBW.loginFire(obj)
          this.email = ''
          this.pwd = ''
     }
}

customElements.define(cmsLogin.is, cmsLogin);
