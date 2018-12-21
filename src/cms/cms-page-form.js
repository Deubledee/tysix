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

class cmsPageForm extends PolymerElement {
     static get template() {
          return html`
    <custom-style>
    <style is="custom-style">
          main {
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
      
    </style>
  </custom-style>
</head>
<body>   
     <main closed$="[[closed]]">
          <cms-input-sellector options="[[pageTypes]]" value="{{type}}">          
          </cms-input-sellector>
          <paper-input always-float-label label="Page Name" value="{{pageName}}"></paper-input>
          <paper-input always-float-label label="title" value="{{title}}"></paper-input>
          <paper-input always-float-label label="image" value="{{image}}"></paper-input>
          <paper-input always-float-label label="placeholder" value="{{placeholder}}"></paper-input>
          <div>
               <cms-input-sellector options="[[layouts]]" value="{{layout}}">          
               </cms-input-sellector>
          <div>
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
     static get is() { return 'cms-page-form'; }

     static get properties() {
          return {
               closed: {
                    type: Boolean,
                    notify: true,
                    value: false,
                    reflectToAttribute: true,
               },
               request: {
                    type: Array,
                    notify: true
               },
               openViewer: {
                    type: Boolean,
                    notify: true
               },
               categorie: {
                    type: Object,
                    notify: true,
                    observer: 'set'
               },
               setter: {
                    type: Array,
                    notify: true
               },
               pageName: {
                    type: String,
               },
               title: {
                    type: String,
               },
               image: {
                    type: String,
               },
               placeholder: {
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
               },
               pageTypes: {
                    type: Array,
                    value: [
                         { label: 'Page type' },
                         { id: 'agents', name: 'List' },
                         { id: 'compressor', name: 'Blog', notAtive: false },
                         { id: 'delay', name: 'Social', notAtive: false },
                         { id: 'wave-shaper', name: 'Video', notAtive: false }]
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
     set(data) {
          console.log(data)
          this.pageName = data.name || 'N/a'
          this.type = data.title || 'N/a'
          this.title = data.title || 'N/a'
          this.image = data.image || 'N/a'
          this.placeholder = data.placeholder || 'N/a'
     }

     setValues() {
          let obj = {
               'name': this.pageName,
               'page': this.type,
               'title': this.title,
               'image': this.image,
               'placeholder': this.placeholder
          }
          this.clean()
          this.dispatchEvent(new CustomEvent('category-added', { detail: obj, bubbles: true }));
     }

     clean() {
          this.closed = !this.closed
          this.pageName = ''
          this.type = ''
          this.title = ''
          this.image = ''
          this.placeholder = ''
     }
}

customElements.define(cmsPageForm.is, cmsPageForm);
