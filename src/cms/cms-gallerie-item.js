import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js'
import '@polymer/paper-input/paper-input.js';
import { dataBaseworker } from './dataBaseWorker.js';
import './cms-image-form.js';
class cmsGalleriesItem extends PolymerElement {
    static get template() {
        return html` 
        <style>
            .title {
                font-weight: bold;
                font-size: 25px;
                cursor: pointer;
                margin-bottom: 5px;
                height: 34px;
                color: black;
            }

            article[galleries] {
               /* background-color: #d1d3d3;*/
                text-shadow: 2px 2px 2px white;
                box-sizing: border-box;
                background-size: cover;
                background-position-x: center;
                /* background-position: center;*/
                padding: 6px;
                height: 108px;
                margin-left: 6px;
                max-width: 223px;
                border-radius: 3px;
                margin-bottom: 30px;
                /* border: 0.5px solid #e2e2e2; */
            }

            div[frame] {
                position: relative;
                top: -7px;
                left: -7px;
                display: block;
                flex-basis: 197px;
                padding: 6px;
                border-radius: 4px;
                height: 97px;
                width: 100%;
                background-color: rgba(0, 0, 0, 0.47);
              }

            div[center] {
                margin-left: 29%;
                margin-top: 20px;
                background-color: #e7b49169;
                width: 37px;
                border-radius: 4px;
                height: 26px;
                color: aqua;     
            }

            div[buttons]{
                padding: 0;
                display: flex;
                width: 154px;
                height: 0px;
                margin-bottom: 30px;
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
            img {
                height: 30px;
            }
        </style>
        <article galleries id="galleries">
            <div frame>
                <div class="title" on-click="settg" title="view gallerie list">[[gallerie.gallerie]] <p><img id="img"> </img></div></p>
                <dom-if if="[[!sett]]">
                    <template>
                    <div buttons>
                        <div center>
                            <paper-icon-button on-click="addImage" title="add to gallerie list" icon="av:playlist-add" aria-label="mode-edit">
                            </paper-icon-button>
                        </div> 
                        <div center>
                            <paper-icon-button on-click="openConfirm" icon="av:not-interested" aria-label="mode-delete">
                            </paper-icon-button>
                        </div>
                    </div>
                    </template> 
                </dom-if>  
            </div>
        </article> 
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
                notify: true,
                observer: 'log'
            },
        }
    }

    ready() {
        super.ready()
    }

    log(data, again) {
        // console.log(data.content[0].url, this.$.galleries.style.backgroundImage)
        if (data.content[0] !== undefined) {
            let thisLoaded = false, img = new Image()
            this.$.galleries.style.backgroundImage = `url(${data.content[0].url})`

            img.onload = (event) => {
                thisLoaded = true
                this.$.img.crossOrigin = "Anonymous";
                this.$.img.src = again === undefined ? data.content[0].url : data.content[again].url
                this.$.galleries.style.backgroundImage = again === undefined ? `url(${data.content[0].url})` : `url(${data.content[again].url})`
            }

            img.onerror = (event) => {
                if (data.content.length > 0) {
                    again = again === undefined ? 0 : again + 1
                    this.log(data, again)
                }
            }
            img.crossOrigin = "Anonymous";
            img.src = again === undefined ? data.content[0].url : data.content[again].url
        }
    }

    settg() {
        this.setg = this.gallerie
    }

    addImage() {
        this.dispatchEvent(new CustomEvent('add-image', {
            bubbles: true, composed: true,
            detail:
                { imageArray: this.gallerie.content, gallerie: this.gallerie.gallerie }
        }))
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
        this.dispatchEvent(new CustomEvent('confirm', {
            bubbles: true, composed: true,
            detail:
                { name: this.gallerie.gallerie, method: (this.deleteGallerie).bind(this) }
        }))
    }
}
customElements.define(cmsGalleriesItem.is, cmsGalleriesItem);