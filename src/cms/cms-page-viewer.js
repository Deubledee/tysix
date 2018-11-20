import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
class cmsPageViewer extends PolymerElement {
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

      app-toolbar {
        background-color: #4285f4;
        color: #fff;
      }

      app-drawer-layout:not([narrow]) [drawer-toggle] {
        display: none;
      }

      app-drawer {
        --app-drawer-content-container: {
          background-color: #B0BEC5;
        }
      }

      article {
        box-sizing: border-box;
        box-shadow: 4px 4px 4px #909090;
        margin-bottom: 10px;
        padding: 12px;
      } 

      section {
        display: flex;
        flex-flow: row;        
        font-weight: bold;
        padding: 4px;
      }
      section div {
       
      }
      section div[left] {
        width: 15%;
        color: #448cff;
      }
      section div[right] {
        width: 60%;
        color: #616161;
      }
      main {
        word-break: break-all;
        padding: 4px;
        padding-left: 7px;
      }
      section paper-button{
        color: #7a8c94;
        margin-left: 50px;
      }
      nav {
        color: #8098ad;
        display: flex;
        flex-flow: row;
        box-shadow: 2px 2px 4px #909090;
        padding: 10px;
        padding-left: 21px;
      }    
      nav div {
        flex-basis: 120px;      
      }
    </style>
  </custom-style>
</head>
<body>   
    <main>
        <nav> 
            <div>
              <h1>
                  pages
              </h1>
            </div>
            <div>
              <paper-icon-button-light on-click="add">
                <button title="add">
                  <iron-icon icon="add"></iron-icon>
                </button>
              </paper-icon-button-light>
            </div>
        </nav>     
        <dom-repeat items="[[categories]]" as="category" initial-count="4">
          <template>
            <article>
              <dom-repeat items="[[showCats(category)]]" as="cats" initial-count="4">
                <template>             
                    <section> 
                      <div left> [[cats.name]] </div>
                      <div right> [[cats.par]]  </div>                  
                      <paper-button on-click="edit">
                        change
                      </paper-button>                
                    </section>                  
                </template>
              </dom-repeat>
            </article>
          </template>
        </dom-repeat>
      </main>  
</body>
`
  }
  static get is() { return 'cms-page-viewer'; }

  static get properties() {
    return {
      categories: {
        type: Array,
        notify: true,
      }
    }
  }

  add(event){
    console.log(event)
  }

  edit(event){
    console.log(event, event.model.children[1].children[1], event.model.__data)
  }  

  showName(cats, name) {
    return cats[name]
  }

  showCats(categories) {
    let finalString = []
    for (let par in categories) {
      finalString.push({ name: par, par: categories[par] });
    }
    return finalString
  }

  handleResponse(res) {

    console.log(res)
  }

}

customElements.define(cmsPageViewer.is, cmsPageViewer);
