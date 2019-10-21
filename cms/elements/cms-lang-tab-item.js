
import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '../styles/cms-comon-style_v3';
export class cmsLangTabItem extends PolymerElement {
    static get template() {
        return html`
        <style include="cms-comon-style_v3">
        .langdivsectionnpaddingtop {
            display: flex;
            flex-direction: row-reverse;
            position: relative;
            top: 0px;
            height: 30px;
            padding-top: 6px;
            flex-basis: 7%;
            box-shadow: 0px -1px 2px var(--dark-theme-secondary-color);
            border-bottom: unset;
            border-top-right-radius: 8px;
            border-top-left-radius: 8px;
            color: var(--disabled-text-color);
            font-weight: 600;
            background-color: var(--app-backgound-color);
            transition: height 0.5s ease-out, top 0.5s ease-out, background-color 0.5s ease-out;
        }    
  
        section[sharp]{
            position: relative;
            height: 20px;
            top: 10px;
            background-color: var(--paper-grey-200);
            transition: height 0.5s ease-in, top 0.5s ease-in, background-color 0.5s ease-in;
        }

        section[class="langdivsectionnpaddingtop"] a{
            height: 16px;
            width: 54px;  
        }
        </style>
        <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}" query-params="{{query}}" active="{{active}}">
        </app-route>
        <main>
            <section class="langdivsectionnpaddingtop" sharp$="[[sharp]]">
                <slot name="button">                   
                </slot>
                <a href="[[rootPath]][[str]][[pagelang]]" >
                    <paper-button langbtn aria-label="langbutton">
                        [[pagelang]]
                    </paper-button>
                </a>
            </section>
        </main>
            `
    }
    static get is() {
        return 'cms-lang-tab-item';
    }
    static get properties() {
        return {
            sharp: {
                type: Boolean,
                value: false,
                notify: true,
                reflectToAttribute: true,
            },
            pagelang: {
                type: String,
                value: '',
                notify: true,
            },
            str: {
                type: String,
                value: '',
                notify: true,
            }
        }

    }
    static get observers() {
        return [
            '_routePageChanged(query)'
        ];
    }
    ready() {
        super.ready();
    }
    _routePageChanged(query) {
        if (typeof this.time === 'number') clearTimeout(this.time)
        this.sharp = false
        this.time = setTimeout(() => {
            if (query.lang === this.pagelang) {
                this.sharp = true
            } else {
                this.sharp = false
            }
        }, 250);
    }
}
customElements.define(cmsLangTabItem.is, cmsLangTabItem);