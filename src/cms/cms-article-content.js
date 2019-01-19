import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js'
import '@polymer/iron-icons/editor-icons.js';
import { scroll } from '@polymer/app-layout/helpers/helpers.js';
import { dataBaseworker } from './dataBaseWorker.js';
import '@polymer/paper-spinner/paper-spinner.js';
import '@polymer/paper-input/paper-input.js';
import './cms-images.js';

class cmsArticleContent extends PolymerElement {
    static get template() {
        return html`
        <style>
        main {
          display: block;
          word-break: break-all;
          padding: 4px;
          position: relative;
          top: 52px;
          width: 100%;
        }
      
        nav {
          color: #8098ad;
          display: flex;
          flex-flow: row;
          padding: 10px;
          padding-left: 21px;
        }
      
        nav[bottom] {
          box-sizing: border-box;
          display: flow-root;
          padding: 0px;
          height: 0px;
          opacity: 0;
          transition-property: height, opacity;
          transition-duration: 1.5s, 2s;
        }

        nav[bottom][open] {
            opacity: 1;
            height: auto;
          }

        nav paper-icon-button {
          flex-basis: 120px;
          color: rgb(128, 152, 173)
        }
      
        nav div {
          flex-basis: 120px;
          flex-grow: 1
        }
      
        div[bottom] {
          margin-bottom: 75px;
        }
      
        aside[left] {
          position: relative;
          left: 5%;
          float: left;
        }
      
        aside[right] {
          position: relative;
          right: 28%;
          float: right;
        }
      
        nav[bottom] div {
            display: flex;
            flex-flow: wrap;
            padding: 20px;
            flex-basis: unset;
            flex-grow: 1;
            height: auto;
            background: #ffffff;
        }
      
        section {
          display: flex;
          flex-flow: row;
          font-weight: bold;
          padding: 4px;
          height: 50px;
        }
      
        section[bottom] {
          display: flex;
          flex-flow: column;
          font-weight: bold;
          padding: 4px;
          height: auto !important;
          margin-bottom: 100px;
        }
      
        section div[left] {
          display: flex;
          flex-flow: column;
          color: #448cff;
          border-top-left-radius: 21px;
          box-shadow: 0px -2px 4px #95b9ce;
          margin-right: 2px;
          margin-bottom: 2px;
          z-index: 100;
        }
      
        section div[right] {
          display: none;
          flex-basis: 60%;
          color: #616161;
          box-shadow: 0px 2px 3px #9fbdc4;
          border-bottom-right-radius: 17px;
          opacity: 0;;
        }

        section div[rightImages] {
          display: none;
          flex-basis: 60%;
          color: #616161;
          box-shadow: 0px 2px 3px #9fbdc4;
          border-bottom-right-radius: 17px;
          opacity: 0;
        }
      
        section paper-button {
          color: #7a8c94;
        }
      
        section[title] {
          flex-basis: 34px;
          cursor: pointer;
          color: #f0f0f0;
          font-size: 35px;
          text-align: center;
          height: 52px;
          width: 120px;
          border-radius: 10px;
          background-color: #e1e2d8;
          text-shadow: 1px 1px 1px var(--primary-text-color);
        }
      
        paper-spinner {
          left: 47%;
        }
      
        div[hidde] {
          display: none
        }
      
        paper-button {
          min-width: 98px;
        }
      
        cms-image-viewer {
          display: none;
        }
      
        .diferent {
          display: none
        }
      </style>
      <main>
        <nav bottom open$="[[tada]]">
            <paper-button class="diferent" on-click="save" aria-label="mode-save">
                    SAVE
            </paper-button>
            <dom-repeat items="[[content]]" as="art">
                <template>
                    <div bottom>
                        <section bottom>
                            <div left>
                                <paper-button on-click="openSide">
                                    title
                                </paper-button>
                                <paper-button class="diferent" on-click="cancel" aria-label="mode-save">
                                cancel
                                </paper-button>
                            </div>
                            <div right>
                                <div>
                                    <paper-icon-button on-click="edit" icon="editor:mode-edit" aria-label="mode-edit">
                                    </paper-icon-button>
                                </div>
                                <div>
                                    [[art.title]]
                                </div>
                                <paper-input hidden value="[[art.title]]" on-input="inputing" placeholder=>"[[art.title]]"></paper-input>
                            </div>
                        </section>
                        <section bottom>
                            <div left>
                                <paper-button on-click="openSide">
                                    price
                                </paper-button>
                                <paper-button class="diferent" on-click="cancel" aria-label="mode-save">
                                    cancel
                                </paper-button>
                            </div>
                            <div right>
                                <div>
                                    <paper-icon-button on-click="edit" icon="editor:mode-edit" aria-label="mode-edit">
                                    </paper-icon-button>
                                </div>
                                <div>
                                    [[art.price]]
                                </div>
                                <paper-input hidden value="[[art.price]]" on-input="inputing" placeholder=>"[[art.price]]"></paper-input>
                            </div>
                        </section>
                        <section bottom>
                            <div left>
                                <paper-button on-click="openSide">
                                    category
                                </paper-button>
                                <paper-button class="diferent" on-click="cancel" aria-label="mode-save">
                                    cancel
                                </paper-button>
                            </div>
                            <div right>
                                <div>
                                    <paper-icon-button on-click="edit" icon="editor:mode-edit" aria-label="mode-edit">
                                    </paper-icon-button>
                                </div>
                                <div>
                                    [[art.category]]
                                </div>
                                <paper-input hidden value="[[art.category]]" on-input="inputing" placeholder=>"[[art.category]]"></paper-input>
                            </div>
                        </section>
                        <section bottom>
                            <div left>
                                <paper-button on-click="openSide">
                                    type
                                </paper-button>
                                <paper-button class="diferent" on-click="cancel" aria-label="mode-save">
                                    cancel
                                </paper-button>
                            </div>
                            <div right>
                                <div>
                                    <paper-icon-button on-click="edit" icon="editor:mode-edit" aria-label="mode-edit">
                                    </paper-icon-button>
                                </div>
                                <div>
                                    [[type]]
                                </div>
                                <paper-input hidden value="[[type]]" on-input="inputing" placeholder=>"[[type]]"></paper-input>
                            </div> 
                        </section>
                        <section bottom>
                            <div left>
                                <paper-button on-click="openSide">
                                    brand
                                </paper-button>
                                <paper-button class="diferent" on-click="cancel" aria-label="mode-save">
                                    cancel
                                </paper-button>
                            </div>
                            <div right>
                                <div>
                                    <paper-icon-button on-click="edit" icon="editor:mode-edit" aria-label="mode-edit">
                                    </paper-icon-button>
                                </div>
                                <div>
                                    [[art.brand]]
                                </div>
                                <paper-input hidden value="[[art.brand]]" on-input="inputing" placeholder=>"[[art.brand]]"></paper-input>
                            </div>
                        </section>
                        <section bottom>
                            <div left>
                                <paper-button on-click="openSide">
                                    images
                                </paper-button>
                                <paper-button class="diferent" on-click="cancel" aria-label="mode-save">
                                    cancel
                                </paper-button>
                            </div>
                            <div rightImages>
                                <div>
                                    <paper-icon-button on-click="edit" icon="editor:mode-edit" aria-label="mode-edit">
                                    </paper-icon-button>
                                </div>
                                <cms-images images="[[getImage(art)]]" sett="[[sett]]">
                                </cms-images>
                            </div>
                        </section>
                        <section bottom>
                            <div left>
                                <paper-button on-click="openSide">
                                    description
                                </paper-button>
                                <paper-button class="diferent" on-click="save" aria-label="mode-save">
                                    SAVE
                                </paper-button>
                                <paper-button class="diferent" on-click="cancel" aria-label="mode-save">
                                    cancel
                                </paper-button>
                            </div>
                            <div right>
                                <div>
                                    <paper-icon-button on-click="edit" icon="editor:mode-edit" aria-label="mode-edit">
                                    </paper-icon-button>
                                </div>
                                <div>
                                    [[art.description]]
                                </div>
                                <paper-input hidden value="[[art.description]]" on-input="inputing" placeholder=>"[[art.description]]"></paper-input>
                            </div>
                        </section>
                    </div>
                </template>
            </dom-repeat>
        </nav>
      </main>
        `
    }
    static get is() { return 'cms-article-content'; }

    static get properties() {
        return {
            content: {
                type: Array,
                value: [],
                notify: true
            },
            type: {
                type: String,
                value: [],
                notify: true
            },
            tada: {
                type: Boolean,
                value: false,
                notify: true,
            },
            sett: {
                type: Boolean,
                value: false,
                notify: true
            },
            canceled: {
                type: Boolean,
                value: false
            },
            temp: {
                type: String,
                value: '',
            },
        }
    }

    ready() {
        super.ready();
    }

    log(data) {
        console.log('log from cms-article-content', data)
    }

    error(data) {
        console.error('error from cms-article-content', data)
    }

    save() { }

    getImage(image) {
        let url = image.image instanceof Array === true ? image.image.pop() : image.image
        let url2 = image.largeImage instanceof Array === true ? image.largeImage.pop() : image.largeImage
        let obj1 = { url: url, title: image.title }
        let obj2 = { url: url2, title: image.title }
        let arr = []
        arr.push(obj1)
        arr.push(obj2)
        return arr
    }

    edit(event) {
        let elem = event.srcElement.parentElement.parentElement.children[2]
        let color = event.srcElement.computedStyleMap().get('color').toString()
        if (color === "rgb(128, 152, 173)") {
            event.srcElement.style.color = "var(--google-blue-700)"
        } else {
            event.srcElement.style.color = "rgb(128, 152, 173)"
        }
        elem.hidden = !elem.hidden
    }

    inputing(event) {
        let par = event.srcElement.parentElement.previousElementSibling.children[0].innerText.toLowerCase()
        let value = event.srcElement.value
        let sabveButton = event.srcElement.parentElement.parentElement.parentElement.previousElementSibling
        let cancelButton = event.srcElement.parentElement.previousElementSibling.children[1]
        let string = "art." + par
        if (this.temp === '' && this.canceled === false) {
            if (event.model.__data.art[par].split('').length > 0) {
                this.temp = event.model.__data.art[par].split('').length === 0 ? null : event.model.__data.art[par]
                sabveButton.classList.toggle('diferent')
                cancelButton.classList.toggle('diferent')
            }
        }

        if (this.canceled === true) {
            if (event.model.__data.art[par].split('').length > 0) {
                this.temp = event.model.__data.art[par].split('').length === 0 ? null : event.model.__data.art[par]
                sabveButton.classList.toggle('diferent')
                this.canceled = false
            }
        }

        event.model.set(string, value)
        console.log(event.model.__data.art[par].length, value.split('').length)
    }

    cancel(event) {
        if (this.canceled !== true) {
            let par = event.srcElement.previousElementSibling.innerText.toLowerCase()
            let sabveButton = event.srcElement.parentElement.parentElement.parentElement.previousElementSibling
            let input = event.srcElement.parentElement.nextElementSibling.children[2]
            let string = "art." + par
            input.value = this.temp
            this.temp = ''
            this.canceled = true
            sabveButton.classList.add('diferent')
            event.model.set(string, input.value)
        }
    }

    openSide(event) {
        let elem = event.srcElement.parentElement.nextElementSibling
        let cancelButton = event.srcElement.parentElement.children[1]
        console.log('cancel', this.temp)
        if (this.temp !== '' || this.canceled === true) {
            this.temp = ''
            cancelButton.classList.add('diferent')
            this.canceled = false
        }
        elem.style.transitionProperty = 'opacity';
        elem.style.transitionDuration = '2s'
        elem.parentElement.style.transitionProperty = 'witdh, height';
        elem.parentElement.style.transitionDuration = '2s';
        if (elem.style.display === 'none' || elem.style.display === '') {
            if (elem.hasAttribute('rightImages') === true) {
                elem.style.display = 'flex'
                elem.style.flexFlow = 'column';
            } else {
                elem.style.display = 'block'
            }
            setTimeout(() => {
                elem.parentElement.style.width = '640px'
                elem.style.opacity = 1
            }, 60)
        } else {
            elem.style.display = 'none'
            elem.style.flexFlow = 'unset';
            elem.style.opacity = 0
            elem.parentElement.style.width = 'auto'
        }
    }

}
customElements.define(cmsArticleContent.is, cmsArticleContent);