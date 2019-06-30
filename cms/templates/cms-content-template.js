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
        return html`       
        ${this._getStyles}
        <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}" query-params="{{query}}" active="{{active}}">
        </app-route>
        <main id="main">
            <nav top>
                ${this._getAnchor}
                <paper-button id="saveButton" class="diferent" on-click="save" aria-label="mode-save">
                    [[Save]]
                </paper-button>
            </nav>
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
    static get _getStyles() {
        return html` 
        <style include="cms-comon-style_v3">
        :host {
            position: relative;
        }
        .navbottom{
            margin-top: 48px;  
        }
        </style>`
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
                <div class="center-menu">
                    <aside>
                        <span>
                            [[info]]
                        </span>
                    </aside>
                </div>
                <div class="row-menu">
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
                <div class="center-menu">
                    <aside class="asideBackgrc">
                        <span>
                            [[ _getPublishedBy(cat.publishedBy)]]
                        </span>
                    </aside>
                    <aside class="asideBackgrc" published$="[[cat.published]]">
                        <span>
                            [[cat.published]]
                        </span>
                    </aside>
                    <aside class="asideBackgrc">
                        <span>
                            [[cat.datePublished]]
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
                            [[datecreated]]
                        </span>
                    </aside>
                </div>
                <div class="center-menu">
                    <aside class="asideBackgrc">
                        <span>
                            [[cat.author]]
                        </span>
                    </aside>
                    <aside class="asideBackgrc">
                        <span>
                            [[cat.dateAdded]]
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
    save() {
        let data = new Date()
        this.content.info[0].lastModified.push({
            uid: this.user.uid,
            author: this.user.displayName,
            date: data.toLocaleString().replace(',', '')
        });
        if (this.add === true) {
            this.saveAdded(data)
        }
        if (this.add === false) {
            this.saveChanged(data)
        }
    }
    saveAdded(data) {
        this.content.info[0].author = this.user.displayName;
        this.content.info[0].dateAdded = data.toLocaleString().replace(',', '');
        this.content.info[0].uid = this.user.uid;
        this.content.id = this.content.items[0].categoryName.split(' ').join('_');
        this.translator._DBW.setPages((done, err) => {
            if (done !== 'error') {
                window.onbeforeunload = function () { };
                this.editing = 0;
                this.temp = '';
                this.$.saveButton.classList.add('diferent');
                this.$.anchor.classList.remove('diferent');
                setTimeout(() => {
                    this.__reset();
                }, 500)
            }
            else {
                console.log(err);
            }
        }, this.content, this.translator.__DEV);
    }
    saveChanged() {
        this.translator._DBW.changePages((msg, err) => {
            if (msg !== 'error') {
                window.onbeforeunload = function () { };
                this.editing = 0;
                this.temp = '';
                this.$.saveButton.classList.add('diferent');
                this.$.anchor.classList.remove('diferent');
                setTimeout(() => {
                    this.__reset();
                }, 500)
            }
            else {
                console.log(err);
            }
        }, this.content, this.translator.__DEV);
    }
    __reset() {
        this._debounceEvent = Debouncer.debounce(this._debounceEvent, microTask, () => {
            window.dispatchEvent(new CustomEvent('reset-list-type', {
                bubbles: true, composed: true
            }));
            window.dispatchEvent(new CustomEvent('reset', {
                bubbles: true, composed: true
            }));
            this.$.anchor.click()
        });
    }
}
customElements.define(cmsContentTemplate.is, cmsContentTemplate);