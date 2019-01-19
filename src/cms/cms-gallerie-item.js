import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js'
import '@polymer/paper-input/paper-input.js';
import { dataBaseworker } from './dataBaseWorker.js';
import './cms-image-form.js';
import './cms-confirm.js';
class cmsGalleriesItem extends PolymerElement {
    static get template() {
        return html` 
        <style>
            .title {
                background-color: #4b5566;
                color: var(--text-primary-color);
                font-weight: bold;
                font-size: 17px;
                cursor: pointer;
                margin-bottom: 5px;
            }

            article[galleries] {
                background-color: #d1d3d3;
                box-sizing: border-box;
                padding: 6px;
                height: 81px;
                margin-left: 6px;
                max-width: 98%;
                border-radius: 3px;
                /* border: 0.5px solid #e2e2e2; */
            }

            div[frame] {
                display: block;
                flex-basis: 197px;
                padding: 6px;
                border-radius: 4px;
                background-color: #3f4756
              }

            div[center] {
                margin-left: auto;
                margin-right: auto;
                color: antiquewhite;
                background-color: #4b5566;
                width: 39px;
                border-radius: 4px;
                height: 26px;     
            }

            div[buttons]{
                padding: 0;
                display: flex;
            }

            nav[bottom]{
                display: none;
                position: fixed;
                top: 0px;
                left: 0px;
            }

            nav[bottom][confirm]{
                display: block;
            }

            paper-icon-button {
                height: 30px;
            }

            paper-dialog.diferent {
                left: 170.5px;
                width: 79.5%;
                height: 200px;
            }

            paper-dialog.diferent h3 {
                letter-spacing: 2px;
                color: #ff4700;
                background-color: #454748;
                margin-left: auto;
                margin-right: auto;
                max-width: 14em;
                min-width: 8em;
                border-radius: 5px;
            }

            paper-dialog.diferent h2 {
                color: #f2f2f2;
                text-shadow: 1px 1px 1px #161616;
                text-align: center;
                background-color: #e2dfdc;
                margin-left: auto;
                margin-right: auto;
                width: 17%;
                border-radius: 5px;
            }
            
        </style>
        <article galleries>
            <div frame>
                <div class="title" on-click="settg" title="view gallerie list">[[gallerie.gallerie]]</div>
                <dom-if if="[[!sett]]">
                    <template>
                    <div buttons>
                        <div center>
                            <paper-icon-button on-click="addImage" title="add to gallerie list" icon="av:playlist-add" aria-label="mode-edit"></paper-icon-button>
                        </div> 
                        <div center>
                            <paper-icon-button on-click="openConfirm" icon="av:not-interested" aria-label="mode-delete"></paper-icon-button>
                        </div>
                    </div>
                    </template> 
                </dom-if>  
            </div>
        </article> 
        <cms-image-form id="imgForm" setter={{setter}} gallerie="[[gallerie.gallerie]]">
        </cms-image-form>
        <cms-confirm id="confirm" bottom2 open="{{confirm}}" type="gallery"> 
        </cms-confirm>
        `
    }

    static get is() { return 'cms-gallerie-item'; }

    static get properties() {
        return {
            DBW: {
                type: Object,
                value: function () {
                    return new dataBaseworker()
                },
                notify: true
            },
            openMain: {
                type: Boolean,
                notify: true,
                value: true,
            },
            setter: {
                type: String,
                notify: true,
                value: 'false'
            },
            confirm: {
                type: Boolean,
                notify: true,
                value: false
            },
            sett: {
                type: Boolean,
                value: true
            },
            setg: {
                type: Object,
                notify: true
            },
            gallerie: {
                type: Array,
                notify: true
            },
        }
    }

    ready() {
        super.ready()
    }

    settg() {
        this.setg = this.gallerie
    }

    addImage(event) {
        this.$.imgForm.imageArray = this.gallerie.content
        this.$.imgForm.gallerie = this.gallerie.gallerie
        this.$.imgForm.closed = true
    }

    deleteGallerie(data) {
        this.setter = true
        this.DBW.deleteGallerie((done, err) => {
            if (done !== 'error') {
                this.setter = true
            } else {
                console.error(err)
            }
        }, data)
    }

    openConfirm(event) {
        if (this.confirm === false) {
            this.$.confirm.openConfirm({ name: this.gallerie.gallerie })
            this.$.confirm.method = (this.deleteGallerie).bind(this)
            this.confirm = true
        }
    }
}
customElements.define(cmsGalleriesItem.is, cmsGalleriesItem);