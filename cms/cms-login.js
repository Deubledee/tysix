import { PolymerElement, html } from '@polymer/polymer';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/paper-button/paper-button';
import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-icons/iron-icons';
import '@polymer/paper-listbox/paper-listbox';
import '@polymer/paper-item/paper-item';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu';
import './tools/cms-input-sellector';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce';
import { microTask } from '@polymer/polymer/lib/utils/async';
import { reuest } from './tools/http-handler';

class cmsLogin extends PolymerElement {
    static get template() {
        return html`
     <custom-style>
          <style is="custom-style">
               main {
                    display: block;
                    position: fixed;
                    width: 100%;
                    padding: 5px;
               }
          
               main[closed] {
                    display: none;
               }
          
               paper-button.diferent {
                    margin-top: 15px;
                    color: black;
                    border-radius: 25px;
                    background-color: var(--paper-blue-100);          
                    --paper-button: {
                    width: 185px
                    }
               }
          
               nav {
                    display: flex;
                    flex-flow: column;
                    box-sizing: border-box;
                    padding: 13px;
                    margin-bottom: 5px;
               }
          
               nav span {
                    text-align: center;
                    letter-spacing: 2px;
                    font-style: italic;
               }
          
               .login {
                    width: 30%;
                    margin-left: auto;
                    margin-right: auto;
               }
          
               .spanone {
                    font-style: normal;
                    margin-bottom: 15px;
                    font-size: 99px;
                    font-weight: 500;
                    color: #78daeb;
                    text-shadow: 4px 4px 7px grey;
               }
          
               .spantow {
                    font-weight: 500;
                    color: var(--google-blue-100);
                    text-shadow: 1px 2px 4px grey;
               }
          
               .spanthree {
                    margin-top: 25px;
                    font-weight: 500;
                    color: #f2f2f2;
                    text-shadow: 1px 2px 4px var(--paper-blue-grey-900)
               }
          
               .spanfour {
                    font-size: small;
                    font-weight: 600;
                    color: var(--paper-blue-grey-900);
                    text-shadow: 2px 2px 4px var(--google-grey-500);
               }
          
               .divsquare {
                    background-color: #f2f2f2;
                    margin-left: auto;
                    margin-right: auto;
                    box-sizing: border-box;
                    padding: 2px;
                    border-bottom-right-radius: 13px;
                    border-bottom-left-radius: 13px;
                    border-top-left-radius: 13px;
                    height: 132px;
                    width: 122px;
                    font-size: 97px;
                    box-shadow: 4px 4px 4px grey
               }
          </style>
     </custom-style> 
     <app-location route="{{route}}">
     </app-location>
     <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}">
     </app-route> 
     <main closed$="[[!closed]]">   
          <dom-if if="[[notLogedIn]]">
               <template>    
                    <nav>
                         <span class="spanone"> Wellcome </span>
                         <div class="divsquare">
                              <span class="spantow"> T6  </span>
                         </div>
                    </nav>
                    <nav class="login">
                    <paper-input always-float-label label="email" value="{{email}}"></paper-input>
                    <paper-input always-float-label label="password" type="password" value="{{pwd}}"></paper-input>
                    <paper-button class="diferent" on-click="setValues">
                         login
                    </paper-button>
                    </nav>
                    <nav>
                         <span class="spanthree"> Developed by </span>     
                         <span class="spanfour"> Deubledee </span>              
                    </nav>
               </template>
          </dom-if>
     </main>
     <slot name="controler" class="slot" closed$="[[closed]]"></slot>
     `;
    }
    static get is() { return 'cms-login'; }
    static get properties() {
        return {
            translator: {
                type: Object,
                notify: true,
                value: function () {
                    return MyAppGlobals.translator
                }
            },
            closed: {
                type: Boolean,
                notify: true,
                value: true,
                reflectToAttribute: true,
            },
            notLogedIn: {
                type: Boolean,
                value: false
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
                    { id: 'wave-shaper', name: 'Video', notAtive: false }
                ]
            }
        };
    }
    ready() {
        super.ready();
        this.translator._DBW.authStateChanged((user, err) => {
            if (user !== 0) {
                this.closed = !this.closed;
                this._userAccepted(user);
            }
            else {
                this.set('notLogedIn', true);
                console.log(err);
            }
        });
        window.addEventListener('update-user', (event) => {
            let string = `http://localhost:3000/update?obj=${JSON.stringify(event.detail)}&uid=${this._getUid()}`;
            console.log(event.detail, string);
            reuest(string, (items) => {
                console.log('update sucssessfull', JSON.parse(items));
                let content = JSON.parse(items);
                if (content.accepted === 'admin') {
                    window.dispatchEvent(new CustomEvent('user-updated', {
                        detail: this
                            .removeSensitiveData(JSON.parse(items))
                    }));
                }
                else {
                    window.dispatchEvent(new CustomEvent('app-error', {
                        detail: content.error
                    }));
                }
            }, 'POST', '');
        });
        window.addEventListener('ask-for-users', ((event) => {
            let string = `http://localhost:3000/admin?uid=${this._getUid()}`;
            if (this._getProperty('user') !== null) {
                console.log();
            }
            reuest(string, (items) => {
                console.log(items)
                let content = JSON.parse(items);
                //  if (content.accepted === 'admin') {
                window.dispatchEvent(new CustomEvent('user-list', {
                    detail: content
                }));
            }, 'POST', '');
        }).bind(this));
    }
    _getUid() {
        let user = this._getProperty('user');
        return user.uid;
    }
    setValues() {
        let obj = {
            'email': this.email,
            'pwd': this.pwd
        };
        this.translator._DBW.loginFire(obj);
        this.email = '';
        this.pwd = '';
    };
    _userAccepted(user) {
        this._changeSectionDebouncer = Debouncer.debounce(this._changeSectionDebouncer, microTask, () => {
            if (['admin', 'dev', 'manager', 'advUser'].indexOf(user.role) > -1) {
                import('./cms-controler').then(() => {
                    this.set('user', user);
                    this.children[0].set('user', user);
                });
            }
        });
    }
    removeSensitiveData(categories) {
        let finalString = [], obj = {};
        for (let par in categories) {
            if (['passwordHash', 'passwordSalt', 'metadata',
                'providerData', 'tokensValidAfterTime'].
                indexOf(par.toString()) === -1) {
                obj[par.toString()] = categories[par];
            }
            finalString.push(obj);
        }
        return finalString;
    }
}
customElements.define(cmsLogin.is, cmsLogin);