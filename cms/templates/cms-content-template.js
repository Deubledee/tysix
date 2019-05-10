import '@polymer/app-layout/app-scroll-effects/app-scroll-effects';
import '@polymer/iron-icons/editor-icons';
import { microTask } from '@polymer/polymer/lib/utils/async';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce';
import { html, PolymerElement } from '@polymer/polymer/polymer-element';
import '../elements/cms-content-image';
import '../elements/cms-content-item';
import '../styles/cms-comon-style_v3';
export class cmsContentTemplate extends PolymerElement {
    static get template() {
        return html`<style include="cms-comon-style_v3">
        :host {
            position: relative;
        }
        </style>
        <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}" query-params="{{query}}" active="{{active}}">
        </app-route>
        <main id="main">
            <div>
                ${this._getAnchor}
                <paper-button id="saveButton" class="diferent" on-click="save" aria-label="mode-save">
                    [[Save]]
                </paper-button>
            </div>
            <div class="flex">
                <nav class="navbottom" id="bottom">
                    ${this._getContentItems}
                </nav>
                <nav class="navside">
                    ${this._getSideInfo}
                </nav>
            </div>
        </main>
        `;
    }
    static get _getAnchor() {
        return html`
        <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
            <a>
                <paper-icon-button icon="arrow-back" aria-label="Go back">
                </paper-icon-button>
            </a>
        </iron-selector>`
    }
    static get _getContentItems() {
        return html`
        <div container>
            <div bottom>
            
                <!--dom-repeat item="[[]]" as="">
                    <template-->
                        <cms-content-item itemLabel="[[item.inputLabel]]" itemText="{{item.itemText}}" inputElement="[[inputElement]]">
                        </cms-content-item>
                    <!--/template>
                </dom-repeat-->    
                    
                <!--dom-repeat item="[[]]" as="">
                    <template--->
                        <cms-content-item itemLabel="[[item.textareaLabel]]" itemText="{{item.itemText}}" inputElement="[[inputElement]]">
                        </cms-content-item>
                    <!--/template>
                </dom-repeat-->    
                            
                <cms-content-image itemLabel itemText images="[[]]" _deleteImg="[[deleteImg]]" lang="[[lang]]">
                </cms-content-image>    

            </div>
        </div>`
    }
    static get _getSideInfo() {
        return html`
        <dom-repeat repeat items="[[inform]]" as="cat">
            <template>
                <div class="flexsidecenter">
                    <aside>
                        <span>
                            [[info]]
                        </span>
                    </aside>
                </div>
                <div class="navsideleft">
                    <aside>
                        <span>
                            [[publishedby]]
                        </span>
                    </aside>
                    <aside>
                        <span>
                            [[publiShed]]
                        </span>
                    </aside>
                    <aside>
                        <span>
                            [[datepublished]]
                        </span>
                    </aside>
                </div>
                <div class="navsideright">
                    <aside>
                        <span>
                            [[ _getPublishedBy(cat.publishedBy)]]
                        </span>
                    </aside>
                    <aside published$="[[cat.published]]">
                        <span>
                            [[cat.published]]
                        </span>
                    </aside>
                    <aside>
                        <span>
                            [[cat.datePublished]]
                        </span>
                    </aside>
                </div>
                <div class="navsideleft">
                    <aside>
                        <span>
                            [[author]]
                        </span>
                    </aside>
                    <aside>
                        <span>
                            [[datecreated]]
                        </span>
                    </aside>
                </div>
                <div class="navsideright">
                    <aside>
                        <span>
                            [[cat.author]]
                        </span>
                    </aside>
                    <aside>
                        <span>
                            [[cat.dateAdded]]
                        </span>
                    </aside>
                </div>
                <div class="flexsidecenter">
                    <aside>
                        <span>
                            [[lastmodified]]
                        </span>
                    </aside>
                </div>
                <div class="navsideleft">
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
                                <aside>
                                    <span>
                                        [[createdAt.author]]
                                    </span>
                                </aside>
                                <aside>
                                    <span>
                                        [[createdAt.date]]
                                    </span>
                                </aside>
                            </section>
                        </template>
                    </dom-repeat>
                </div>
            </template>
        </dom-repeat>`
    }
    static get is() { return 'cms-content-template'; }
    static get properties() {
        return {
            user: {
                type: Object,
                notify: true
            },
            size: {
                type: Boolean,
                value: true,
                notify: true
            }
        };
    }
    ready() {
        super.ready();
    }
    _getObjArr(content) {
        let obj,
            arr = []
        for (let par in content[0]) {
            obj = Object()
            obj[par] = content[0][par]
            arr.push(obj)
        }
        return arr
    }
    reset() {
        this._reset()
        this._resetHtml()
    }
    _resetHtml() {
        this._changeSectionDebouncer = Debouncer.debounce(this._changeSectionDebouncer, microTask, () => {
            window.dispatchEvent(new CustomEvent('reset-html', {
                bubbles: true, composed: true
            }));
        });
    }
}
customElements.define(cmsContentTemplate.is, cmsContentTemplate);