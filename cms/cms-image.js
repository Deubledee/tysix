import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects';
import '@polymer/iron-icons/editor-icons';
import '@polymer/paper-spinner/paper-spinner';
import '@polymer/paper-input/paper-input';
import './cms-common-styles';
import '../src/shop-image';
class cmsImage extends PolymerElement {
    static get template() {
        return html`  
        <style include="cms-common-styles">
                :host {
                    position: var(--app-default-position);
                }

                .rightImages {
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
                }
        </style>
                <app-location route="{{route}}">
                </app-location>
        
                <app-route route="{{route}}" pattern="/:page/:article" data="{{routeData}}" tail="{{subroute}}" query-params="[[query]]">
                </app-route>
                <main>
                    <div image class="rightImages">                            
                        <nav image2>
                            <article headder>                                                  
                                <div>
                                    <span> 
                                        image   
                                    </span>
                                </div>                                                   
                                <div>
                                    <span> 
                                        title   
                                    </span>
                                </div>
                                <div>
                                    <span>
                                        author 
                                    </span> 
                                </div>
                                <div>
                                    <span>
                                        date_created  
                                    </span>
                                </div>
                                <div>
                                    <span> 
                                        gallery  
                                    </span>
                                </div>
                                <div>
                                    <span> 
                                        url  
                                    </span>
                                </div>
                                <div>
                                    <span> 
                                        delete 
                                    </span>
                                </div>
                            </article>  

                            <dom-repeat repeat items="[[content]]" as="image">
                                <template>
                                    <article body>
                                        <div image1>
                                            <shop-image title="[[image.title]]" aria-label="image" src="[[image.url]]" 
                                                alt="[[image.title]]">
                                            </shop-image>                                                
                                        </div>
                                        <div>
                                            <paper-input hidden value="[[image.url]]">
                                            </paper-input>
                                            <span title="[[image.title]]"> 
                                                [[image.title]]   
                                            </span> 

                                        </div>
                                        <div>
                                            <span title="[[image.author]]"> 
                                                [[image.author]]
                                            </span>

                                        </div>
                                        <div>
                                            <span title="[[image.dateAdded]]">
                                                [[image.dateAdded]]  
                                            </span>

                                        </div>
                                        <div>
                                            <span title="[[image.gallery]]"> 
                                                [[image.gallery]]  
                                            </span>

                                        </div>
                                        <div>
                                            <span title="[[image.url]]"> 
                                                [[image.url]]  
                                            </span>  
                                        </div>
                                        <div>
                                            <paper-button title="delete">
                                                <paper-icon-button on-click="deleteImg" icon="av:not-interested" aria-label="delete">
                                                </paper-icon-button> 
                                            </paper-button>
                                        </div>
                                    </article>   
                                </template>                            
                            </dom-repeat>                         
                        </nav>                        
                    </div>
                <main> `;
    }
    static get is() { return 'cms-image'; }
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
customElements.define(cmsImage.is, cmsImage);