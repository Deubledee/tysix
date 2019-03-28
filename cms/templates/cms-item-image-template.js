import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects';
import '@polymer/iron-icons/editor-icons';
import '@polymer/paper-spinner/paper-spinner';
import '@polymer/paper-input/paper-input';
import '../styles/cms-comon-style_v3';
import '../../src/shop-image';
export class cmsItemImageTemplate extends PolymerElement {
    static get template() {
        return html`  
        <style include="cms-comon-style_v3">
                :host {
                    position: var(--app-default-position);
                }

            /*    .rightImages {
                    display: var(--app-flex);
                    padding: var(--app-images-padding);
                    box-sizing: var(--app-default-box-sizing);
                }

                div[image] div{
                    flex-basis: var(--app-images-div-flex-basis);
                    text-align: var(--app-default-text-align);
                    box-sizing: var(--app-default-box-sizing);
                    padding: var(--app-images-div-padding);
                    background: var(--app-secondary-text-color);
                    white-space: var(--app-images-div-white-space);
                    overflow: var(--app-images-div-overflow);
                    text-overflow: var(--app-images-div-text-overflow);
                }

                div[image] nav {
                    display: flex!important;
                    flex-flow: var(--app-flexcolumn);
                    padding-left: var(--app-images-divnav-padding-left);
                    height: var(--app-images-divnav-height);
                    overflow-y: var(--app-images-divnav-overflow-y);
                }

                article[headder] {
                    flex-direction: var(--app-flexrow);
                    flex-basis: var(--app-images-padding);
                    margin-bottom: var(--app-images-article-margin-bottom:);
                    font-size: var(--app-images-article-font-size);
                    box-shadow: var(--app-box-shadow);
                }

                article[body] {
                    flex-basis: 38px;
                    flex-direction: var(--app-flexrow);
                    font-size: var(--app-images-article-font-size);
                    box-shadow: var(--app-box-shadow);
                }

                article[body] div[image1]{
                    padding: var(--app-default-padding);
                    flex-flow: var(--app-flexcolumn);  
                } 

                nav[image2]{
                    flex-basis: var(--app-images-nav-flex-basis);
                }

                nav[image2] article {
                    display: var(--app-flex);
                } 

                nav[image2] span {
                    position: var(--app-default-position);
                    top: var(--app-images-nav-top);
                }

                paper-button {
                    height: var(--app-content-divtop-padding-top);
                    top: var(--app-images-button-top);
                }

                article[headder] div {
                    background-color: var(--app-tabs-color);
                }

                shop-image {
                    height: var(--app-content-nav-padding-left);
                }*/
        </style>
                <app-location route="{{route}}">
                </app-location>
        
                <app-route route="{{route}}" pattern="/:page/:article" data="{{routeData}}" tail="{{subroute}}" query-params="[[query]]">
                </app-route>
                <main class="flexH">
                    <div bottom>    
                        ${this._getMenu}  
                    </div>
                    <div table>                       
                        <dom-repeat repeat items="[[content]]" as="item">
                            <template>
                                <slot name="item[[index]]"></slot>  
                                [[_slottItem(item, index)]]
                            </template>                            
                        </dom-repeat> 
                    </div> 
                <main> `;
    }
    static get _getMenu() {
        return html`                           
            <section class="flexchildbotom">
                <div class="flexleft">   
                    <h4>  image   </h4>     
                </div>  
            </section>

            <section class="flexchildbotom">
                <div class="flexleft">   
                    <h4> 
                    title    </h4>     
                </div>  
            </section>
            <section class="flexchildbotom">
                <div class="flexleft">   
                    <h4> 
                    author    </h4>     
                </div>  
            </section>
            <section class="flexchildbotom">
                <div class="flexleft">   
                    <h4> 
                    date_created    </h4>     
                </div>  
            </section>
            <section class="flexchildbotom">
                <div class="flexleft">  
                    <h4> 
                    gallery     </h4>     
                </div>  
            </section>
            <section class="flexchildbotom">
                <div class="flexleft">  
                    <h4> 
                    url      </h4>     
                </div>  
            </section>
            <section class="flexchildbotom">
                <div class="flexleft">  
                    <h4> 
                    delete      </h4>     
                </div>  
            </section>`
    }

    _slottItem(item, index) {
        let template = html`
        <article centerlistitem>
            <div class="padding">
                <shop-image title="[[item.title]]" aria-label="image" src="[[item.url]]" 
                    alt="[[item.title]]">
                </shop-image>                                                
            </div>
            <div>
                <paper-input hidden value="[[item.url]]">
                </paper-input>
                <span title="[[item.title]]"> 
                    [[item.title]]   
                </span> 

            </div>
            <div>
                <span title="[[item.author]]"> 
                    [[item.author]]
                </span>

            </div>
            <div>
                <span title="[[item.dateAdded]]">
                    [[item.dateAdded]]  
                </span>

            </div>
            <div>
                <span title="[[item.gallery]]"> 
                    [[item.gallery]]  
                </span>

            </div>
            <div>
                <span title="[[item.url]]"> 
                    [[item.url]]  
                </span>  
            </div>
            <div>
                <paper-button title="delete">
                    <paper-icon-button on-click="deleteImg" icon="av:not-interested" aria-label="delete">
                    </paper-icon-button> 
                </paper-button>
            </div>
        </article> `

        template.content.children[0].
            children[0].innerHTML = `
            <span> 
                ${this._getPagename(data)}
            </span>`;
        var clone = document.importNode(template.content, true);
        this.appendChild(clone);
        this.children[index].setAttribute('slot', `item${index}`);
        this.children[index].set('page', content);
    }

    static get is() { return 'cms-item-image-template'; }
    static get properties() {
        return {
            images: {
                type: Object,
                notify: true
            },
            content: {
                type: Array,
                notify: true,
                computed: 'getImage(images)'
            }
        };
    }
    galleryView() {
        return false;
    }
    addImage() {
        if (this.childElementCount === 1) {
            this.children[1].children[0].addMethod = (this.setImage).bind(this);
        }
        else {
            this.children[1].removeChild(this.children[1].children[0]);
        }
    }
    _fromAray(data) {
        let url, arr = [], obj2;
        if (data.image.length >= 1) {
            let t = new Date();
            for (let i = 0; i < data.image.length; i++) {
                obj2 = data.image[i];
                arr.push(obj2);
            }
        }
        else {
            url = '';
            obj2 = { url: url, title: '' };
            arr.push(obj2);
        }
        return arr;
    }
    getImage(data) {
        let arr = this._fromAray(data);
        return arr;
    }
    setImage(data) {
        if ('url' in data) {
            let img = new Image(), arr = [];
            img.src = data.url;
            if (img.naturalHeight < 600) {
                if (this.content[0].image instanceof Array === true) {
                    arr = this.content[0].image;
                }
                else {
                    arr.push(this.content[0].image);
                }
                arr.push(data.url);
                this.content[0].image = arr;
                this.notifyPath('content[0].image');
            }
            if (img.naturalHeight >= 600) {
                if (this.content[0].largeImage instanceof Array === true) {
                    arr = this.content[0].largeImage;
                }
                else {
                    arr.push(this.content[0].largeImage);
                }
                arr.push(data.url);
                this.content[0].largeImage = arr;
                this.notifyPath('content[0].largeImage');
            }
            this.addingcancel = this.adding;
            this.adding = !this.adding;
            this.$.saveButton.classList.remove('diferent');
            this.editing = this.editing + 1;
        }
    }
    setImages(data) {
        this.content[0].image = data.url;
    }
    cancelImages() {
        this.cancelState();
        if (this.addingcancel === false) {
            this.adding = !this.adding;
        }
    }
}
customElements.define(cmsItemImageTemplate.is, cmsItemImageTemplate);