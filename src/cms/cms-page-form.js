import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js'
import { scroll } from '@polymer/app-layout/helpers/helpers.js';
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
import { dataBaseworker } from './dataBaseWorker.js';
class cmsPageForm extends PolymerElement {
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
               height: 584px;
               visibility: visible;
               transition-property: height, visibility;
               /*transition-delay: .5s, 0s;*/
               transition-duration: 2s, .5s;
          }
          main {
               display: flex;
               flex-flow: column;
              /* overflow: auto;*/
               background-color: aliceblue;
               position: absolute;
               top: 196px;
               width: 99%;
               /* width: 77%; */
               height: 0px;
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
             div [button]{
               background-color: var(--google-grey-300)
             }
             cms-image-viewer.diferent{
               --main-style:{
                 position: relative;
                 margin-left: 0px;
               }
             }
             </style>
     <main closed$="[[closed]]">
          <cms-input-sellector id="sellector1"  options="[[pageTypes]]" value="{{type}}">          
          </cms-input-sellector>          
          <paper-input always-float-label label="Page Name" value="{{pageName}}"></paper-input>
          <paper-input always-float-label label="title" value="{{title}}"></paper-input>
          <paper-input always-float-label label="Language" placeholder="Ex: pt, en, es, fr" value="{{lang}}"></paper-input>
          <div button>
               <paper-button id="art" class="diferent" on-click="file">          
                    choose image
               </paper-button>
          </div>   
          <shop-image src="[[image.url]]" alt="[[image.title]]"></shop-image>  
          <!--paper-input always-float-label label="image" value="{{image}}"></paper-input-->          
          <div>
               <cms-input-sellector options="[[layouts]]" value="{{layout}}">          
               </cms-input-sellector>
          <div>
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
     <cms-image-viewer id="viewer" class="diferent" image="{{image}}"></cms-image-viewer>
`
     }
     static get is() { return 'cms-page-form'; }

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
               close: {
                    type: Boolean,
                    notify: true,
                    value: false,
                    observer: 'file'
               },
               request: {
                    type: Array,
                    notify: true
               },
               openViewer: {
                    type: Boolean,
                    notify: true,
                    value: false
               },
               categorie: {
                    type: Object,
                    notify: true,
                    observer: 'reset'
               },
               setter: {
                    type: String,
                    notify: true,
                    value: 'false'
               },
               pageName: {
                    type: String,
               },
               edit: {
                    type: Boolean,
                    value: false
               },
               title: {
                    type: String,
               },
               image: {
                    type: Object,
               },
               iD: {
                    type: String,
               },
               layout: {
                    type: String,
               },
               layouts: {
                    type: Array,
                    value: [
                         { label: 'Layouts' },
                         { id: 'agents', name: 'Standart' },
                         { id: 'compressor', name: 'Blog', notAtive: false },
                         { id: 'delay', name: 'Social', notAtive: false },
                         { id: 'wave-shaper', name: 'Video', notAtive: false }]
               },
               type: {
                    type: String,
                    notify: true,
               },
               pageTypes: {
                    type: Array,
                    value: [
                         { label: 'Page type' },
                         { id: 'agents', name: '---' },
                         { id: 'agents2', name: 'list' },
                         { id: 'compressor', name: 'Blog', notAtive: false },
                         { id: 'delay', name: 'Social', notAtive: false },
                         { id: 'wave-shaper', name: 'Video', notAtive: false }]
               }
          }
     }

     ready() {
          super.ready()
          this.$.viewer.open = false
     }

     createURL(items) {
          let arr = new Array()
          let parsed = JSON.parse(items)
          for (let i = 0; i < parsed.length; i++) {
               arr.push({ url: 'http://localhost:3000/data/images/' + parsed[i], title: parsed[i] })
          }
          this.images = arr
          // this.openViewer = !this.openViewer
     }

     file() {
          //this.openViewer = true
          this.$.viewer.open = true
          scroll({ top: 500, behavior: 'smooth' });
          scroll({ bottom: 520, behavior: 'smooth' });
     }

     reset(data) {
          this.pageName = data.name || 'N/a'
          this.lang = data.lang || 'N/a'
          this.type = data.page || '---'
          this.title = data.title || 'N/a'
          this.image = { url: data.image, title: data.title } || 'N/a'
          this.placeholder = data.placeholder || 'N/a'
          console.log(this.type)
     }

     setValues() {
          let thiso = this
          let parsed = {
               'lang': this.lang,
               'name': this.pageName.toLocaleLowerCase().split(' ').join('_'),
               'page': this.type,
               'title': this.title,
               'image': this.image.url,
               'placeholder': this.pageName
               // 'id': this.iD.toLocaleLowerCase().split(' ').join('_')
          }
          if (this.edit === false) {
               this.DBW.setPages((done, err) => {
                    if (done !== 'error') {
                         thiso.clean('newPage')
                    } else {
                         console.log(err)
                    }
               }, parsed)
          }
          if (this.edit === true) {
               this.DBW.writePageContent((done, err) => {
                    if (done !== 'error') {
                         thiso.clean('newPage')
                    } else {
                         console.log(err)
                         thiso.clean('true')
                    }
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
          if (this.pageName === 'N/a' || setterValue === 'newPage') {
               this.reset({})
               setter = false
          }
          scroll({ top: 0, behavior: 'smooth' });
          this.closed = false
          this.setter = setter
     }
}

customElements.define(cmsPageForm.is, cmsPageForm);
