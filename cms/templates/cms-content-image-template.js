import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-spinner/paper-spinner.js';
import '../articles/cms-article';
import '../media/cms-image';
export class cmsContentImageTemplate extends PolymerElement {
    static get template() {
        return html` 
        <style include="cms-comon-style_v3">
        :host {
            position: var(--app-default-position);
            display: var(--app-block);
        }
        nav {
            display: flex;
            height: 50px;
        }
        </style>
        <app-route  
            route="{{route}}" pattern="/:page" 
            data="{{routeData}}" tail="{{subroute}}" 
            query-params="{{query}}" active="{{active}}">
        </app-route>
            <slot name="spinner"></slot>
        <main class="flex">
        <div class="navbottom">
        ${this._getAnchor}
            <nav top>
                ${this._getContentAnchor}
            </nav>  
            <div table>  
                ${this._slotElement}
            </div>
        </main>    
        `
    }
    static get _slotElement() {
        return html`
            <dom-repeat>
                <template>
                </template>
            </dom-repeat>`
    }
    static get _getAnchor() {
        let template = document.createElement('template')
        template.innerHTML = `              
            <iron-selector selected="[[page]]" attr-for-selected="name" role="navigation">
                <a href="[[rootPath]]content/articles/">
                    <paper-icon-button icon="arrow-back" aria-label="Go back">
                    </paper-icon-button>
                </a>
            </iron-selector>`
        /** uncoment to apply inside the class witch extends 'this' */
        //template.content.children[0].children[0].addEventListener('click', (this._removeThis).bind(this))
        return template
    }
    static get _getContentAnchor() {
        return html`
        <a href="[[rootPath]]content/articles/add-articles?content=W3siYXV0aG9yIjoiIiwiYnJhbmQiOiIiLCJjYXRlZ29yeSI6IiIsImRhdGVBZGRlZCI6IiIsImRlc2NyaXB0aW9uIjoiIiwiaW1hZ2UiOltdLCJsYW5nIjoiIiwibmFtZSI6IiIsInBhZ2UiOiIiLCJwcmljZSI6IiIsInB1Ymxpc2hlZCI6Ik5QIiwicHVibGlzaGVkQnkiOlt7ImF1dGhvciI6IiIsImRhdGUiOiIiLCJ1aWQiOiIifV0sInN0b2NrIjoiIiwidGl0bGUiOiIiLCJ1blB1Ymxpc2hlZEJ5IjpbeyJhdXRob3IiOiIiLCJkYXRlIjoiIiwidWlkIjoiIn1dfV0=&add=true">
            <paper-tab name=" add-category-pages">
                [[articles]] <span class="spanpadding"> articles </span>
                <paper-icon-button-light>
                    <iron-icon icon="av:library-add" aria-label="categories"></iron-icon>
                </paper-icon-button-light>
            </paper-tab>
        </a>
        `
    }
    static get _getSideContent() {
        return html`
            <h1>
                side content
            </h1>
        `
    }
    static get is() { return 'cms-content-image-template'; }

    static get properties() {
        return {
            loading: {
                type: String
            },
            slashed: {
                type: Boolean,
                value: false
            }
        }
    }

    ready() {
        super.ready()
    }

    _slotElement(item, index) {
        if (this.childElementCount === 0) {
            let template = html`*`
            /*   template.content.children[0].setAttribute('slot', 'article' + index)
               let clone = document.importNode(template.content, true)
               this.appendChild(clone)*/
        }
    }

    _getContent() {
        return this.contents
    }
}
customElements.define(cmsContentImageTemplate.is, cmsContentImageTemplate);