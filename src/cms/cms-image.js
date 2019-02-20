import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js'
import '@polymer/iron-icons/editor-icons.js';
import '@polymer/paper-spinner/paper-spinner.js';
import '@polymer/paper-input/paper-input.js';
import './cms-common-styles.js';

class cmsImage extends PolymerElement {
    static get template() {
        return html`  
        <style include="cms-common-styles">
                :host {
                    position: relative;
                }

                .rightImages {
                    display: flex;
                    padding: 24px;
                    box-sizing: border-box;
                    overflow-y: auto;
                }

                div[image] div{
                    text-align: center;
                    box-sizing: border-box;
                    padding: 11px;
                    background: #ffffff;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                div[image] nav {
                    display: flex!important;
                    flex-flow: column;
                    padding-left: 0;
                }

                article[headder] {
                    flex-direction: row;
                    flex-basis: 24px;
                    margin-bottom: 14px;
                    font-size: 1em;
                    box-shadow: 0px 1px 1px grey;
                }

                article[body] {
                    flex-direction: row;
                    flex-basis: 38px;
                    font-size: 1em;
                    box-shadow: 0px 1px 1px grey;
                }

                article[body] div {
                    flex-direction: row;
                    flex-basis: 28px;
                    font-size: 1em
                }

                article[body] div[image1]{
                    padding: 8px;
                    flex-flow: column;  
                } 

                nav[image2]{
                    flex-basis: 88%;
                }

                nav[image2] article {
                    display: flex;
                } 

                nav[image2] span {
                    position: relative;
                    top: -7px;
                }

                paper-button {
                    height: 30px;
                    top: -9px;
                }

                article[headder] div {
                    background-color: #d8e6ed;
                }

                shop-image {
                    height: 21px;
                }
        </style>
                <app-location route="{{route}}">
                </app-location>
        
                <app-route route="{{route}}" pattern="/:page/:article" data="{{routeData}}" tail="{{subroute}}" query-params="[[query]]">
                </app-route>
                <main>
                    <div left>
                        <paper-button>
                            images
                        </paper-button>
                        <paper-icon-button id="add"icon="image:loupe" aria-label="mode-edit">
                        </paper-icon-button> 
                        <paper-button id="cancel" class="diferent" aria-label="mode-cancel">
                            cancel
                        </paper-button>            
                    </div>                                
                    <div aria-label="images">
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
                                    <dom-if if="[[galleryView()]]">
                                        <template>
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
                                        </template>                                        
                                    </dom-if>
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
                                                <shop-image aria-label="image" src="[[image.url]]" 
                                                    alt="[[image.title]]">
                                                </shop-image>                                                
                                            </div>
                                            <div>
                                                <span> 
                                                    [[image.title]]   
                                                </span>   
                                            </div>
                                            <dom-if if="[[galleryView()]]">
                                                <template>
                                                    <div>
                                                        <span> 
                                                            [[image.author]]
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <span>
                                                            [[image.dateAdded]]  
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <span> 
                                                            [[image.gallery]]  
                                                        </span>
                                                    </div>
                                                </template>                                        
                                            </dom-if>
                                            <div>
                                                <span> 
                                                    [[image.url]]  
                                                </span>
                                            </div>
                                            <div>
                                                <paper-button>
                                                    <paper-icon-button on-click="deleteImg" icon="av:not-interested" aria-label="delete">
                                                    </paper-icon-button> 
                                                </paper-button>
                                            </div>
                                        </article>   
                                    </template>                            
                                </dom-repeat>                         
                            </nav>
                        </div>                         
                    </div>
                <main> `

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
        }
    }
    galleryView() {
        console.log(this.route, this.routeData, this.subroute, this.query)
        return false
    }
    addImage() {
        let template = html`<cms-gallery-viewer></cms-gallery-viewer>`
        if (this.children[1].childElementCount < 2) {
            this.children[1].prepend(template.content.children[0])
            this.children[1].children[0].addMethod = (this.setImage).bind(this)
        } else {
            this.children[1].removeChild(this.children[1].children[0])
        }
    }

    _fromAray(image) {
        console.log(image)
        let url, arr = [], obj2
        if (image.length >= 1) {
            for (let i = 0; i < image.image.length; i++) {
                url = image.image[i].url
                obj2 = { url: url, title: image.title }
                arr.push(obj2)
            }
        } else {
            url = ''
            obj2 = { url: url, title: '' }
            arr.push(obj2)
            // this.imageElement.set('del', false)
        }
        return arr
    }

    getImage(image) {
        if ('image' in image) {
            let arr
            if (image.image instanceof Array === true) {
                arr = this._fromAray(image)
            }
            return arr
        }
    }

    setImage(data) {
        if ('url' in data) {
            let img = new Image(), arr = []
            img.src = data.url
            if (img.naturalHeight < 600) {
                if (this.content[0].image instanceof Array === true) {
                    arr = this.content[0].image
                } else {
                    arr.push(this.content[0].image)
                }
                arr.push(data.url)
                this.content[0].image = arr
                this.notifyPath('content[0].image')
            }

            if (img.naturalHeight >= 600) {
                if (this.content[0].largeImage instanceof Array === true) {
                    arr = this.content[0].largeImage
                } else {
                    arr.push(this.content[0].largeImage)
                }
                arr.push(data.url)
                this.content[0].largeImage = arr
                this.notifyPath('content[0].largeImage')
            }
            //  this.imageElement.set('del', true)
            //  this.imageElement.set('images', this.getImage(this.content[0]))
            this.addingcancel = this.adding
            this.adding = !this.adding
            this.$.saveButton.classList.remove('diferent')
            this.editing = this.editing + 1
        }
    }

    setImages(data) {
        this.content[0].image = data.url
    }

    del(index) {
        if (this.content[0].image instanceof Array === true) {
            if (index > 0) {
                this.content[0].image.splice(index, index)
            } else {
                this.content[0].image.splice(0, 1)
            }
        } else {
            this.content[0].image = ''
        }
        // this.imageElement.set('images', this.getImage(this.content[0]))
    }

    deleteImg(data) {
        if (data !== undefined) {
            this.del(data.model.__data.index)
            this.cancelButton.classList.remove('diferent')
            this.$.saveButton.classList.remove('diferent')
            this.editing = this.editing + 1
            this.remove = undefined
        }
    }

    cancelImages() {
        //   this.imageElement.set('images', this.tempArray)
        //   this.imageElement.set('del', true)
        this.cancelState()
        if (this.addingcancel === false) {
            this.adding = !this.adding
        }
    }
}
customElements.define(cmsImage.is, cmsImage);