import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js'
import '@polymer/iron-icons/editor-icons.js';
import './cms-page-form.js';

class cmsArticlesViewer extends PolymerElement {
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
        transition-duration: 1.5s, 2s;
      }
      
      section div[left] {
        flex-basis: 164px;
        color: #448cff;
      }
      section div[right] {
        flex-basis: 60%;
        color: #616161;
      }
      main {
        word-break: break-all;
        padding: 4px;
        position: absolute;
        left: -65px;
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
      nav div {
        flex-basis: 120px;
        flex-grow: 1      
      }
      nav paper-icon-button {
        flex-basis: 120px;      
      }

    </style>
  </custom-style>
</head>
<body>   
    <main >
        <nav> 
            <div>
              <h1>
                  articles
              </h1>
            </div>
            <div add on-click="add">
              <paper-icon-button-light>
                <paper-button title="add">
                <h2>Add</h2>
                </paper-button>
              </paper-icon-button-light>
            </div>
        </nav>     
        <dom-repeat items="[[categories]]" as="category" initial-count="4">
          <template>
            <article>
              <nav>
                  <div>
                    <span>  {{_getPagename(category)}} </span>
                  </div>
                  <div on-click="showPage">
                  <paper-icon-button icon="editor:mode-edit" aria-label="mode-edit"></paper-icon-button>
                  </div>  
                  <paper-button on-click="edit">
                    change
                  </paper-button>                  
              </nav> 
              <nav bottom>       
                <section>
                  <div left> Page type </div>
                  <div right> [[category.page]]  </div>                                   
                </section>  
              </nav>
            </article>
          </template>
        </dom-repeat>
        <cms-page-form closed="[[closed]]" categories="{{categories}}">
        </cms-page-form>
      </main>  
</body>
`
    }
    static get is() { return 'cms-articles-viewer'; }

    static get properties() {
        return {
            categories: {
                type: Array,
                notify: true
            },

            closed: {
                type: Boolean,
                notify: true,
            },
        }
    }

    _getPagename(cats) {
        // console.log(cats)
        return cats.name
    }

    add(event) {
        this.closed = !this.closed
    }

    edit(event) {
        // console.log(event, event.model.children[1].children[1], event.model.__data)
    }

    showName(cats, name) {
        return cats[name]
    }

    showPage(event) {
        console.log(event.srcElement.parentElement.parentElement.parentElement.children[1])
        if (event.srcElement.parentElement.parentElement.parentElement.children[1].hasAttribute('open') === false) {
            event.srcElement.parentElement.parentElement.parentElement.children[1].style.opacity = "1"
            event.srcElement.parentElement.parentElement.parentElement.children[1].style.height = "435px"
            event.srcElement.parentElement.parentElement.parentElement.children[1].style.display = "0px"
            event.srcElement.parentElement.parentElement.parentElement.children[1].setAttribute("open", true)
        } else {
            event.srcElement.parentElement.parentElement.parentElement.children[1].style.height = "0px"
            event.srcElement.parentElement.parentElement.parentElement.children[1].style.opacity = "0"
            event.srcElement.parentElement.parentElement.parentElement.children[1].removeAttribute("open")
        }

    }

    handleResponse(res) {

        //  console.log(res)
    }

}

customElements.define(cmsArticlesViewer.is, cmsArticlesViewer);
