import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js'
import './cms-user-form.js';
import '../shop-image.js';
import { scroll } from '@polymer/app-layout/helpers/helpers.js';
class cmsUserViewer extends PolymerElement {
  static get template() {
    return html`
    <custom-style>
    <style is="custom-style">

      html {
        --app-drawer-width: 350px;
      }

      body {
        margin: 0;
        font-family: 'Roboto', 'Noto', sans-serif;
        background-color: #eee;
      }

      article {
        box-sizing: border-box;
        /*box-shadow: 4px 4px 4px #909090;*/
        margin-bottom: 10px;
        padding: 12px;
      } 

      section {
        display: flex;
        flex-flow: row;        
        font-weight: bold;
        padding: 4px;
        height: 50px;
      }

      nav[bottom] {
        display: flow-root;
        height: 0px;
        opacity: 0;
        transition-property: height, opacity;
        transition-duration: 1s, 2s;
      }
      
      section div[left] {
        flex-basis: 164px;
        color: #448cff;
      }

      section div[right] {
        flex-basis: 60%;
        color: #616161;
      }

      section div[rightImage] {
        flex-basis: 52%;
        color: #616161;
      }

      section img {
        width: 65px;
      }

      main {
        word-break: break-all;
        padding: 4px;
        position: absolute;
        left: -42px;
        top: 52px;
        width: 100%;
      }
      section paper-button{
        color: #7a8c94;
        margin-left: 50px;
      }
      nav {
        color: #8098ad;
        display: flex;
        flex-flow: row;
        padding: 10px;
        padding-left: 21px;
      }       

      nav[top] {
        position: relative;
        top: 33px;
        margin-bottom: 60px;
        height: 166px;
        background-color: var(--primary-background-color);
        box-shadow: 4px 4px 7px #989898;
      }   
      nav div {
        flex-basis: 120px;
        flex-grow: 1      
      }
      nav div[add] {
        font-size: 35px;     
      }
      nav paper-icon-button {
        flex-basis: 120px;      
      }

      section[title] {
        cursor: pointer;
        color: #f0f0f0;
        font-size: 35px;
        text-align: center;
        display: block;
        padding: 1px;
        height: 58px;
        width: 140px;
        border-radius: 10px;
        background-color: #e1e2d8;
        text-shadow: 1px 1px 1px var(--primary-text-color);
      }
      iron-icon {
        color: #929696;
      }
    </style>
  </custom-style>
    <main>
        <nav top> 
          <div>
            <section title>
              <paper-icon-button-light>
                <iron-icon icon="social:person-outline" aria-label="Go back"></iron-icon>
              </paper-icon-button-light>
                  Users
            </section>
          </div>
          <div add>
            <section title on-click="add">
              <paper-icon-button-light>
                <iron-icon icon="social:person-add" aria-label="Go back"></iron-icon>
              </paper-icon-button-light>
              Add
            </section>
          </div>
        </nav>  
        <dom-repeat items="[[categories]]" as="category" initial-count="4">
        <template>
          <article>
            <nav value="[[index]]">
              <div>
                <span>  {{_getPagename(category)}} </span>
              </div>
              <div on-click="showPage">
                <paper-icon-button icon="editor:drag-handle" aria-label="open"></paper-icon-button>
              </div>                                   
              <div on-click="edit">
                <paper-icon-button icon="editor:mode-edit" aria-label="mode-edit"></paper-icon-button>
              </div>                                    
              <div on-click="delete">
                <paper-icon-button icon="av:not-interested" aria-label="mode-delete"></paper-icon-button>
              </div>          
            </nav> 
            <nav bottom>                        
              <section>
                  <div left> uid </div> <div right> [[category.uid]]  </div>           
              </section> 
              <section>   
                  <div left> emailVerified </div> <div right> [[category.emailVerified]]  </div>  
              </section> 
              <section>  
                  <div left> displayName </div> <div right> [[category.displayName]]  </div>   
              </section> 
              <section> 
                  <div left> photoURL </div> <div rightImage> [[category.photoURL]]  </div> 
              </section>                
              <section> 
                  <shop-image src="[[photoURL]]" alt="[[photoURL]]"></shop-image>
              </section> 
              <section>  
                  <div left> phoneNumber </div> <div right> [[category.phoneNumber]]  </div>   
              </section> 
              <section> 
                  <div left> disabled </div> <div right> [[category.disabled]]  </div>    
              </section>    
            </nav>
          </article>
        </template>
      </dom-repeat>
        <cms-user-form closed="{{closed}}" user="[[user]]" request="{{request}}" setter="{{setter}}">
        </cms-user-form>
      </main> 
`
  }
  static get is() { return 'cms-user-viewer'; }

  static get properties() {
    return {
      categories: {
        type: Array,
        notify: true
      },
      user: {
        type: Object,
        notify: true
      },
      type: {
        type: String,
        notify: true
      },
      setter: {
        type: Boolean,
        notify: true,
        observer: 'resetCollor'
      },
      request: {
        type: Array,
        observer: 'requestHandler'
      },
      render: {
        type: Boolean,
        notify: true,
        value: false,
        reflectToAttribute: true,
      },
      closed: {
        type: Boolean,
        notify: true,
      },
    }
  }

  ready() {
    super.ready()
    this.show()
    window.addEventListener('user-created', event => {
      console.log(event)
    })
    window.addEventListener('user-updated', event => {
      this.updatUsers(event.detail)
      scroll({ top: 0, behavior: 'silent' });
    })
    window.addEventListener('user-list', event => {
      this.categories = [{}]
      this.categories = event.detail
      scroll({ top: 0, behavior: 'silent' });
    })
  }

  resetCollor(data) {
    if (data === true) {
      this.lastChosen[0].style.color = "rgb(128, 152, 173)"
      this.lastChosen = []
      this.setter = false
    }
  }

  setLastChosen(elem) {
    let arr = new Array()
    arr.push(elem)
    this.lastChosen = arr
    elem.style.color = "var(--google-blue-700)"
  }

  _getPagename(cats) {
    return cats.email
  }

  show() {
    window.dispatchEvent(new CustomEvent('ask-for-users'));
  }

  edit(event) {
    this.type = "update"
    let index = event.srcElement.parentElement.parentElement.value
    this.user = {}
    this.user = this.categories[index]
    this.closed = !this.closed
    this.setLastChosen(event.srcElement)
    // console.log(index)
  }

  requestHandler(event) {
    if (event.length > 0) {
      //console.log('just shit on your soup', event.pop())
      window.dispatchEvent(new CustomEvent('user-changed', { detail: event.pop() }));
    }
  }

  showName(cats, name) {
    return cats[name]
  }

  updatUsers(data) {
    //console.log(data)
    let temp = new Array()
    for (let i = 0, user; user = this.categories[i]; i++) {
      if (user.uid === data.uid) {
        temp.push(data)
      } else {
        temp.push(user)
      }
    }
    this.categories = []
    this.categories = temp
  }

  showPage(event) {
    if (event.srcElement.parentElement.parentElement.parentElement.children[1].hasAttribute('open') === false) {
      event.srcElement.parentElement.parentElement.parentElement.children[1].style.opacity = "1"
      event.srcElement.parentElement.parentElement.parentElement.children[1].style.height = "515px"
      event.srcElement.parentElement.parentElement.parentElement.children[1].style.display = "0px"
      event.srcElement.parentElement.parentElement.parentElement.children[1].setAttribute("open", true)
      this.setLastChosen(event.srcElement)
    } else {
      event.srcElement.parentElement.parentElement.parentElement.children[1].style.height = "0px"
      event.srcElement.parentElement.parentElement.parentElement.children[1].style.opacity = "0"
      event.srcElement.parentElement.parentElement.parentElement.children[1].removeAttribute("open")
      this.resetCollor(true)
    }
  }

  showCats(categories) {
    let finalString = []
    for (let par in categories) {
      finalString.push({ name: par, par: categories[par] });
    }
    // this.categories = finalString
    return finalString
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

  handleResponse(res) {
    //  console.log(res)
  }

}

customElements.define(cmsUserViewer.is, cmsUserViewer);
