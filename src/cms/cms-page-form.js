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
          <cms-input-sellector options="[[types]]" value="{{type}}">          
          </cms-input-sellector>
          <paper-input always-float-label label="Page Name" value="{{pageName}}"></paper-input>
          <paper-input always-float-label label="title" value="{{title}}"></paper-input>
          <paper-input always-float-label label="iamge" value="{{image}}"></paper-input>
          <paper-input always-float-label label="placeholder" value="{{placeholder}}"></paper-input>
          <div>
               <cms-input-sellector options="[[layouts]]" value="{{layout}}">          
               </cms-input-sellector>
               <div>
               </div>
          <div>
          <paper-button on-click="setValues">
               Save
          </paper-button>
     </main>  
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
               categories: {
                    type: Array,
                    notify: true
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
               types: {
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

     showPage(event) {
          if (event.srcElement.parentElement.parentElement.parentElement.children[1].hasAttribute('open') === false) {
               event.srcElement.parentElement.parentElement.parentElement.children[1].style.display = "block"
               event.srcElement.parentElement.parentElement.parentElement.children[1].setAttribute("open", true)
          } else {
               event.srcElement.parentElement.parentElement.parentElement.children[1].style.display = "none"
               event.srcElement.parentElement.parentElement.parentElement.children[1].removeAttribute("open")
          }

     }

     showCats(categories) {
          let finalString = []
          for (let par in categories) {
               finalString.push({ name: par, par: categories[par] });
          }
          return finalString
     }

     setValues() {
          let obj = {
               'name': this.pageName,
               'page': this.type,
               'title': this.title,
               'image': this.image,
               'placeholder': this.placeholder
          }
          let temp = this.categories
          temp.push(obj)
          this.setter = temp
          this.closed = !this.closed
          this.pageName = ''
          this.type = ''
          this.title = ''
          this.image = ''
          this.placeholder = ''
          console.log(this.categories, 'in cms')
     }

}

customElements.define(cmsPageForm.is, cmsPageForm);
