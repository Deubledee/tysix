import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js'
import '@polymer/paper-input/paper-input.js';
import { dataBaseworker } from './dataBaseWorker.js';
import '@polymer/paper-spinner/paper-spinner.js';
import '../shop-image.js';
class cmsImages extends PolymerElement {
    static get template() {
        return html` 
        <style>

        main {
            display: none;
            max-width: 1200px;
            margin-left: auto;
            margin-right: auto;
            height: 0px;
        }

        .mainish {
            display: block;        
            @apply --images-mainish-class
        }

        shop-image {
            cursor: pointer;
            max-height: 300px;
            margin: 32px 0 16px;;        
            @apply --images-shop-image
        }

        shop-image::before {
            content: "";
            display: block;
            padding-top: 100%;
        } 

        nav[images] {
            -webkit-flex: 1 1;
            flex: 1 1;
            -webkit-flex-basis: 33%;
            flex-basis: 16%;
            margin-top: 1px;
            margin-bottom: 0px;
            margin-right: 4px; 
            @apply --images-nav-images;
        }

        div[frame] {
            display: block;
            flex-basis: 197px;
            padding: 6px;
            border-radius: 4px;
            background-color: #3f4756
            @apply --images-frame
        }

        div[frame2] {
            min-height: 373px;
            max-height: 344px;
        ￼    overflow: unset;
            @apply --images-frame2-div;
        }

        div[images] {
            padding: 10px;
            margin-left: auto;
            margin-right: auto;
            margin-top: 20px;
            background-color: #ececec;
            margin-bottom: 2px;
            width: 23%;
            display: block;   
            @apply --images-div-images
        }

        div[images][open] {
            display: none
        }

        article[images] {
            height: auto;
            min-height: 375px;
            height: 600px;
            overflow: auto;
            margin-top: 18px;
            flex-flow: wrap;
        }

        article[images][toggle] {
            flex-flow: column;   
            @apply --images-article-images
        }

        paper-icon-button {
            height: 30px;
        }

        .grid {
            @apply --layout-horizontal;
            @apply --layout-wrap;
            @apply --layout-justified;
            margin: 0 10px 32px 10px;
            padding: 0;
            list-style: none;
        }

        nav[central]{
            display: none;   
            @apply --images-nav-central
        }

        nav[central][show]{
            display: inline-flex;
            flex-flow: row
        }

        div[central]{
            display: block;
            @apply --images-div-central
        }

        div[central][toggle]{
            display: none
        }
        /** */

        nav[middle]{
            display: none;
            @apply --images-nav-middle
        }

        nav[middle][show]{
            display: inline-flex;
            flex-flow: row
        }

        nav[top]{
            display: none;
            @apply --images-nav-top
        }

        nav[top][show]{
            display: inline-flex;
            flex-flow: row
        }

        div[top]{
            display: block;
            @apply --images-div-top;
        }

        div[top][toggle]{
            display: none
        }

        .title2{
            text-align: center;
            word-break: break-word;
            margin-left: auto;
            margin-right: auto;
            width: 150px;
            background-color: #e4e4e4;
            color: black;
            border-radius: 4px;
            box-shadow: 2px 2px 2px grey;
            @apply --images-title2;
        }

        paper-icon-button[central]{
            color: #000;
            @apply --images-paper-icon-button-central;
        }

        paper-icon-button{
            color: #94352b;
            @apply --images-paper-icon-button;
        }

        paper-spinner{
            position: absolute;
            top: 51px;
            left: 46%;
        }
        
        h1 {
            color: #fff;
            text-shadow: 1px 1px 1px #000;
        } 

    </style>
    <paper-spinner id="spinner1" active>
       
    </paper-spinner>
    <h1>[[loading]]</h1>
        <main id="main" class="mainish">   
            <dom-if if="[[sett]]">
                <template>
                    <nav top show$="[[sett]]">
                        <nav middle show$="[[showTop]]">
                            <div top toggle$="[[!toggle]]">
                                <paper-icon-button central  on-click="toggleView" title="align column" icon="image:dehaze" aria-label="toggle-view"></paper-icon-button>        
                            </div>
                            <div top toggle$="[[toggle]]">
                                <paper-icon-button central on-click="toggleView" title="align row" icon="image:grid-on" aria-label="toggle-view"></paper-icon-button>
                            </div>
                        </nav>
                        <div top>
                            <paper-icon-button central on-click="close" title="close" icon="image:crop-free" aria-label="toggle-view"></paper-icon-button>  
                        </div>
                    </nav>
                </template> 
            </dom-if>  
            <dom-if if="[[form]]">
                <template>
                    <nav central show$="[[show]]">
                        <div central toggle$="[[!toggle]]">
                            <paper-icon-button central  on-click="toggleView" title="align column" icon="image:dehaze" aria-label="toggle-view"></paper-icon-button>    
                        </div>
                        <div central toggle$="[[toggle]]">
                            <paper-icon-button central on-click="toggleView" title="align row" icon="image:grid-on" aria-label="toggle-view"></paper-icon-button>
                        </div>
                        <div central toggle$="[[!toggle]]">
                            <paper-icon-button central on-click="clearImages" title="clear mages" icon="image:crop-free" aria-label="toggle-view"></paper-icon-button>
                        </div>
                        <div central toggle$="[[toggle]]">
                            <paper-icon-button central on-click="clearImages" title="clear mages" icon="image:crop-free" aria-label="toggle-view"></paper-icon-button>
                        </div>
                    </nav>  
                </template> 
            </dom-if> 
            <article images toggle$="[[!toggle]]"  class="grid" id="images">  
                <dom-repeat id="repeat" items="[[contents]]" as="image">
                    <template>
                    [[killSpinner(contents, index)]]
                        <nav images>
                            <div frame2>
                                <div class="title2">[[image.title]]</div>
                                    <dom-if if="[[del]]">
                                        <template>
                                            <paper-icon-button on-click="deleteImg" icon="av:not-interested" aria-label="mode-delete"></paper-icon-button>
                                        </template> 
                                    </dom-if> 
                                <shop-image src="[[image.url]]" alt="[[image.title]]" on-click="setImage"></shop-image>                      
                            </div>
                        </nav>
                    </template>
                </dom-repeat>
            </article>
        </main>    
        `
    }

    static get is() { return 'cms-images'; }

    static get properties() {
        return {
            DBW: {
                type: Object,
                value: function () {
                    return new dataBaseworker()
                },
                notify: true
            },
            cancel: {
                type: Boolean,
                notify: true
            },
            killSett: {
                type: Boolean,
                notify: true,
                observer: 'settAndFormKiller'
            },
            loading: {
                type: String
            },
            openMain: {
                type: Boolean,
                notify: true,
                value: true,
                //observer: 'mainToggle'
            },
            confirm: {
                type: Boolean,
                notify: true,
                value: false,
                observer: 'clearImages'
            },
            setButton: {
                type: Boolean,
                notify: true,
                value: false
            },
            sett: {
                type: Boolean,
                notify: true,
                value: true
            },
            image: {
                type: Object,
                notify: true,
                value: {}
            },
            images: {
                type: Array,
                notify: true,
                observer: 'open'
            },
            clear: {
                type: Boolean,
                value: false,
                notify: true,
                //observer: 'clearImages'
            },
            remove: {
                type: Object,
                notify: true
            },
            del: {
                type: Boolean,
                notify: true,
                value: false
            },
            form: {
                type: Boolean,
                notify: true,
                value: false
            },
            show: {
                type: Boolean,
                notify: true,
                value: false,
                reflectToAttribute: true
            },
            showTop: {
                type: Boolean,
                notify: true,
                value: false
            },
            toggle: {
                type: Boolean,
                notify: true,
                value: true,
                reflectToAttribute: true
            },
            contents: {
                type: Array,
                notify: true,
            },
        }
    }

    ready() {
        super.ready()
    }

    mainToggle(openMain) {
        /*  if (openMain === false) {
              this.openMain = true
              this.$.main.classList.toggle('mainish')
          }*/
    }

    log(data) {
        console.log(data)
    }

    settAndFormKiller(data) {
        this.sett = !data
        this.form = true
        this.del = false
        this.setButton = true
        console.log(this.form)

    }

    killSpinner(contents, index) {
        if (contents.length === index + 1) {
            this.$.spinner1.active = false
            this.loading = ''
        }
    }

    clearImages() {
        this.images = []
        this.contents = []
        this.show = false
        this.clear = !this.clear
        this.showTop = false
        this.$.spinner1.active = true
    }

    open(data) {
        if (data instanceof Array === true && data.length > 0) {
            this.loading = `loading ${data.length} images... Please Waitt!!`
            if (this.form === true) {
                this.show = true
            } else {
                this.show = false
                this.showTop = true
            }
            this.contents = []
            setTimeout(() => {
                this.contents = data
                console.log(this.data)
            }, 60)
        }
    }

    close() {
        this.clearImages()
        this.cancel = true
    }

    deleteImg(data) {
        let contents = this.contents
        this.contents = []
        this.set('remove', data.model.__data.image)
        let start = data.model.__data.index
        let end = data.model.__data.index > 0 ? data.model.__data.index : data.model.__data.index + 1
        contents.splice(start, end)
        this.contents = contents
    }

    setImage(event) {
        this.image = event.model.__data.image
        if (this.sett === true || this.setButton === true) {
            this.image = event.model.__data.image
        }
    }

    toggleView() {
        this.toggle = !this.toggle
    }
}
customElements.define(cmsImages.is, cmsImages);