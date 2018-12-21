import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';

class cmsImageViwer extends PolymerElement {
    static get template() {
        return html`
    <style>

      :host {
        @apply --layout-vertical;
        @apply --layout-center-justified;
        text-align: center;
      }
      main {
        display: flex;
        flex-flow: column;        
        background-color: aliceblue;
        position: fixed;
        top: 44px;
        width: 77%;
        height: 0px;
        padding: 5px;
        visibility: collapse;
        transition-property: height, visibility;
        transition-duration: 2s, 1s;
      }

      main[closed] {
        height: 76%;
        visibility: visible;
        transition-property: height, visibility;
        transition-duration: 2s, .5s;
      }
      shop-image {
        margin: 32px 0 16px;
      }

      shop-image::before {
        content: "";
        display: block;
        padding-top: 100%;
      }

      .title {
        color: var(--app-primary-color);
        font-weight: bold;
      }

      .price {
        color: var(--app-secondary-color);
      }

      @media (max-width: 767px) {
        :host {
          margin: 0 12px;
        }
      }
      nav {
        display: flex;
        flex-flow: row;
        margin-top: 20px;
        margin-bottom: 124px
      }
      div[frame] {
        display: block;
        flex-basis: 197px;
        padding: 18px;
      }
      shop-image {
          cursor: pointer
      }
      section {
        display: block;
        padding: 10px;
        box-shadow: 0px 1px 3px grey;
        margin-left: auto;
        margin-right: auto;
        background-color: #ececec;
        margin-bottom: 2px;
        width: 23%;
      } 
      paper-button {
        background-color: var(--light-theme-divider-color);
      }
      article {
        overflow: auto;
        box-shadow: 6px 6px 8px #aea9a9;
        border-radius: 3px;
        border: 0.5px solid #e2e2e2;
      }
    </style>
    <main closed$="[[closed]]">
        <section>
            <paper-button on-click="cancel">
                    cancel
            </paper-button>
        </section>
        <article>
            <dom-repeat items="[[fourCounted]]" as="count"> 
                <template>
                    <nav>  
                        <dom-repeat items="[[count]]" as="image">  
                            <template>    
                                <div frame>
                                    <shop-image src="[[image.url]]" alt="[[image.title]]" on-click="setImage"></shop-image>
                                    <div class="title">[[image.title]]</div>  
                                </div>
                            </template>   
                        </dom-repeat>                  
                    </nav>     
                </template>   
            </dom-repeat>     
        </article>    
    </main> `;
    }

    static get is() { return 'cms-image-viwer'; }

    static get properties() {
        return {
            images: {
                type: Array,
                observer: 'countFour',
            },
            fourCounted: {
                type: Array,
                notify: true,
            },
            image: {
                type: String,
                notify: true
            },
            closed: {
                type: Boolean,
                notify: true,
                value: false,
                reflectToAttribute: true,
            },
        }
    }

    cancel() {
        this.closed = !this.closed
    }

    setImage(event) {
        this.image = event.model.__data.image.url
        this.cancel()
        console.log(event.model.__data.image.url)
    }

    countFour(images) {
        let full = images, arrTemp1 = new Array(), arrTemp2 = new Array()
        set(full, this)
        function set(full, thiss) {
            for (let i = 0; i < 4; i++) {
                if (full.reverse().pop() !== undefined) {
                    arrTemp1.push(full.reverse().pop())
                }
            }
            arrTemp2.push(arrTemp1)
            arrTemp1 = []
            if (full.length > 0) {
                set(full, thiss)
            } else {
                thiss.fourCounted = arrTemp2
            }
        }
    }

}
customElements.define(cmsImageViwer.is, cmsImageViwer);
