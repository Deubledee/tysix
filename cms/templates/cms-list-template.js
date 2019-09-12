import '@polymer/iron-icons/editor-icons';
import { microTask } from '@polymer/polymer/lib/utils/async';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce';
import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '../elements/cms-content-image';
import '../elements/cms-content-item';
import '../elements/cms-content-text';
import '../styles/cms-comon-style_v3';
export class cmsListTemplate extends PolymerElement {
    static get template() {
        return html`
        <style include="cms-comon-style_v3">
        :host {
            position: relative;
        }       
            ${this._getStyles}
        </style>
        <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}" query-params="{{query}}" active="{{active}}">
        </app-route>
        <main id="main">
            <nav top>
                <iron-selector selected="[[page]]" attr-for-selected="id" class="drawer-list" role="navigation">                    
                    <div langdiv>
                        ${this._getLangAnchor} 
                    </div> 
                </iron-selector>        
                <div path> 
                    ${this._getPath} 
                </div>
                <div save> 
                    <paper-button id="saveButton" class="diferent" on-click="onSave" aria-label="mode-save">
                        [[Save]]
                    </paper-button>
                </div>  
            </nav>           
                <div class="flex">
                    <nav class="navbottom" id="bottom">                    
                        ${this._getContentItems}
                    </nav>
                    <nav class="navside">
                        [[infoState]]
                        ${this._getSideInfo}
                    </nav>
                </div> 
        </main>
        `;
    }
    static get _getStyles() {
        return html` 
        nav[top]{
            display: flex;
            flex-direction: column;
        }
        div[saveandaddlang]:{
            flex-basis: 100px
        }
        .navbottom{
            margin-top: 48px;  
        }
        paper-button[langbtn]{  
            background-color: var(--paper-blue-50);
        }
        div[goback]{
            height: 38px;
            display: flex;
            padding-left: 10px;
        }
        div[path]{
            display: flex;
            flex-direction: row;
            position: relative;
          /*  top: -14px; */ 
            font-style: italic;    
            padding-left: 42px;      
        }
        div[path] h3 {
            margin-block-start: 21px;
            margin-block-end: 7px;
        }
        div[path] h4 {
            margin-block-start: 8px;
            margin-block-end: 25.33px;
            color: var(--paper-blue-a100); 
        }
        .path{
            flex-basis: 81px
        }
        div[save]{
            position: relative;
            top: 20px;
            padding-left: 10px;            
        }
        div[langdiv]{
            display: flex;
            flex-direction: row;
        }
        .langdivsectionflexbasis{
            flex-basis: 143px;
            text-align: center;
        }
        .langdivsectionnpaddingtop {
            padding-top: 6px;
        }
        div[addlang]{
            display: none
        }
        .anchorish{
            cursor: pointer; 
        }
        div[bottom]{
            flex-direction: column;
            padding-left: 10%;
        }
        `
    }
    static get _getLangAnchor() {
        return html` 
            <section class="langdivsectionflexbasis">
                <a id="adlang">
                    <paper-icon-button icon="av:library-add" aria-label="lang">
                    </paper-icon-button>
                    Add lang
                </a>  
            </section>    
            <dom-repeat repeat items="[[pageLangs]]" as="pagelang">
                <template>
                    <section class="langdivsectionnpaddingtop">
                        <a href="[[rootPath]][[str]]&lang=[[pagelang]]">
                            <paper-button langbtn aria-label="lang">
                                [[pagelang]]
                            </paper-button>
                        </a>
                    </section>
                </template>
            </dom-repeat> 
        `
    }
    static get _getPath() {
        return html`   
         <div class="path"> 
            <h3>[[query.content]] </h3>
        </div>`
    }

    static get _getContentItems() {
        return html`
                <div container >
                    <div bottom hidebottom$="[[hidebottom]]">
                        <dom-repeat repeat items="[[inputVal]]" as="item">
                            <template>
                                <section class="flexchildbotomFull">
                                    <cms-content-item
                                        item="[[item]]"
                                        save-button="[[saveButton]]"
                                        res="{{inputResponse}}">
                                    </cms-content-item>
                                </section>
                            </template>
                        </dom-repeat>
                        <dom-repeat repeat items="[[textareaVal]]" as="item">
                            <template>
                                <section class="flexchildbotomFullExtra">
                                    <cms-content-text
                                        item="[[item]]"
                                        save-button="[[saveButton]]"
                                        res="{{textAreaResponse}}">
                                    </cms-content-text>
                                </section>
                            </template>
                        </dom-repeat>
                        <section class="flexchildbotom">
                            <cms-content-image id="image"
                                item-label="[[imageLabel]]"
                                images="[[imageArr]]"
                                _deleteImg="[[deleteImg]]"  
                    </cms-content-image>
                </section>

                    </div>
            </div >
                `;
    }
    static get _getSideInfo() {
        return html`
                < dom - repeat repeat items = "[[inform]]" as="cat" >
                    <template>
                        <div class="center-menu">
                            <aside class="info">
                                <span>
                                    [[info]]
                        </span>
                            </aside>
                        </div>
                        <div class="center-menu">
                            <aside>
                                <span>
                                    [[lastmodified]]
                        </span>
                            </aside>
                        </div>
                        <div class="row-menu">
                            <aside>
                                <span>
                                    [[author]]
                        </span>
                            </aside>
                            <aside>
                                <span>
                                    [[date]]
                        </span>
                            </aside>
                        </div>
                        <div rightSide>
                            <dom-repeat repeat items="[[cat.lastModified]]" as="createdAt">
                                <template>
                                    <section>
                                        <aside class="asideBackgrc">
                                            <span>
                                                [[createdAt.author]]
                                    </span>
                                        </aside>
                                        <aside class="asideBackgrc">
                                            <span>
                                                [[createdAt.date]]
                                    </span>
                                        </aside>
                                    </section>
                                </template>
                            </dom-repeat>
                        </div>
                    </template>
        </dom - repeat > `
    }
    static get is() { return 'cms-list-template'; }
    static get properties() {
        return {
            user: {
                type: Object,
                notify: true
            },
            infoState: {
                type: String,
                value: 'No info available..',
                notify: true
            },
            itemlang: {
                type: Array,
                notify: true,
                value: function () { return [{ 'addlang': '' }] }
            },
            addlang: {
                type: Boolean,
                value: false,
                notify: true,
                reflectToAttribute: true,
            },
        }
    }
    ready() {
        super.ready();
    }
    __reset() {
        this._debounceEvent = Debouncer.debounce(this._debounceEvent, microTask, () => {
            window.dispatchEvent(new CustomEvent('reset-list-type', {}));

        });
    }
}
customElements.define(cmsListTemplate.is, cmsListTemplate);