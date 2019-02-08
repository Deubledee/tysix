import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js'
import '@polymer/paper-input/paper-input.js';
import { dataBaseworker } from './dataBaseWorker.js';
import './cms-gallerie-form.js';
import './cms-gallerie-item.js';
class cmsGalleries extends PolymerElement {
    static get template() {
        return html` 
        <style>        
            nav[galleries] {
               /* overflow-y: auto;
                background-color: #ebecec;*/
                margin-bottom: 25px;
                display: flex;
                flex-flow: column;
                margin-top: 20px;
               /* height: 185px;*/
                visibility: visible;
                transition-property: height, visibility;
                transition-delay: 0s, 0s;
                transition-duration: 2s, 2s;
            }

            div[galleries] {  
                padding: 10px;
                margin-bottom: 2px;
               /* height: 179px;*/
                }

            .grid {
                @apply --layout-horizontal;
                @apply --layout-wrap;
                @apply --layout-justified;
                margin: 0 10px 32px 10px;
                padding: 0;
                list-style: none;
            }       
            cms-gallerie-item {
                -webkit-flex: 1 1;
                flex: 1 1;
                -webkit-flex-basis: 19%;
                flex-basis: 19%;
            }
        </style>
        <nav galleries>
            <div galleries class="grid" >             
                <dom-repeat items="[[galleries]]" as="gallerie">
                    <template>
                        <cms-gallerie-item gallerie="[[gallerie]]" sett="{{sett}}" setg="{{settg}}" setter="{{reset}}" confirm="{{confirm}}"> </cms-gallerie-item>
                    </template>
                </dom-repeat>
            </div>
        </nav> 
        `
    }

    static get is() { return 'cms-galleries'; }

    static get properties() {
        return {
            DBW: {
                type: Object,
                value: function () {
                    return new dataBaseworker()
                },
                notify: true
            },
            images: {
                type: Array,
                notify: true,
            },
            setter: {
                type: String,
                notify: true,
                value: 'false'
            },
            confirm: {
                type: Boolean,
                value: true
            },
            reset: {
                type: String,
                observer: 'getImageGalleries',
                value: 'false'
            },
            settg: {
                type: Object,
                notify: true,
                value: {},
                observer: 'setg'
            },
            sett: {
                type: Boolean,
                value: true
            },
            galleries: {
                type: Array,
                notify: true
            },
        }
    }

    ready() {
        super.ready()
        this.getImageGalleries(true)
    }

    log(data) {
        console.log(data)
    }

    eventFunction(event) {
        this.reset = 'false'
        this.set('galleries', event)
    }

    getImageGalleries(data) {
        if (data === true || data === 'true') {
            this.DBW.getImageGalleries((done) => {
                this.eventFunction(done)
                this.reset = !this.reset
            })
        }
    }

    setg(event) {
        if (event.content) {
            this.settg = {}
            this.images = event.content
            this.show = true
        } else {
            this.images = {}
        }
    }
}
customElements.define(cmsGalleries.is, cmsGalleries);