
import { html } from '@polymer/polymer/polymer-element.js';
import { cmsContentTemplate } from '../templates/cms-content-template';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { cmsMediaLib } from '../tools/cms-save-lib.js';
import { IronCheckedElementBehavior } from '@polymer//iron-checked-element-behavior/iron-checked-element-behavior.js'
const ModeloInfo = "W3siYWRkZWRUbyI6IiIsImF1dGhvciI6e30sImRhdGVDcmVhdGVkIjoiIiwiZnJvbURyb3BTaGlwIjoiIiwiZ2FsbGVyeSI6IiIsImdyb3VwIjoiICIsImlkIjoiIiwicmVtb3ZlZCI6IiIsInRpdGxlIjoiIiwidHlwZSI6IiIsInVybCI6IiJ9XQ=="
class cmsImagesContent extends mixinBehaviors(IronCheckedElementBehavior, cmsMediaLib(cmsContentTemplate)) {

    static get _getStyles() {
        return html`
            .langdivsectionnpaddingtop {
                display: block;
                padding-top: 6px;
                flex-basis: 15%;
                text-align: center;
            }
            div[bottom] {
                padding-left: unset;
                padding: 6%;
                padding-top: 39px;
                height: 750px;;
            }
            .flexchildbotomFull{
                box-sizing: border-box;
                background-color: var(--app-item-backgound-color);
                border-radius: 10px;
                padding: 26px;
                cursor: pointer;
                flex: unset;
                -webkit-transition: padding 0.5s ease-out;
                -moz-transition: padding 0.5s ease-out;
                transition: padding 0.5s ease-out;
            } 
            .flexchildbotomFull[hovered]{
                background-color: var(--app-item-backgound-color);
                padding: 35px; 
                transition: padding 0 ease 0.5;
            }
            .recorte{
                border-style: dashed;
                border-radius: 8px;
                border-color: var(--divider-color);
                height: 292px;
                padding: 69px;
                -webkit-transition: background-color 0.5s ease-in, height 0.5s ease-out;
                -moz-transition: background-color 0.5s ease-in, height 0.5s ease-out;
                transition: background-color 0.5s ease-in, height 0.5s ease-out;

            }
            .recorte[hovered]{
                background-color: #7d7d7d;
                height: 278px;
            }
            .recorte section{
                display: flex;
                flex-direction: column;
            }
            .recorte section aside{
                margin-left: auto;
                margin-right: auto;
            }
            iron-icon[icon="editor:space-bar"],
            iron-icon[icon="arrow-downward"],p {
                 color: var(--paper-grey-400);
                -webkit-transition: color 0.5s ease-in;
                -moz-transition: color 0.5s ease-in;
                transition: color 0.5s ease-in;
            }
            iron-icon[hovered][icon="editor:space-bar"],
            iron-icon[hovered][icon="arrow-downward"],p[hovered]{
                color: white
            } 
            iron-icon[icon="editor:space-bar"]{
                width: 95px;
                height: 84px;
                padding: unset;              
            }
            iron-icon[icon="arrow-downward"]{
                max-height: unset;
                height: 107px;
                width: 93px;
            }
            .upper{
                position: relative;
                top: -58px; 
            }
            div[imagearea]{
                flex-basis: auto;
                display: flex;
                flex-direction: row;
                flex-flow: wrap;
                padding: 10px;
                margin-bottom: 10px;
                background-color: #eaeaea;
                border-radius: 8px;
                overflow-y: auto;
                max-height: 200px;
                box-sizing: border-box;
                border: 1px solid var(--divider-color);
            }
            div[imagearea] div{
                box-sizing: border-box;
                flex-basis: auto;
                max-height: 60px;
                padding: 7px;
                margin-right: 8px;
                margin-bottom: 8px;
                border-radius: 4px;
            }
            div[imagearea] nav{
                display: flex;
            }

            div[imagearea] img{
                height: 48px;
            }   
            div[imagearea]::-webkit-scrollbar-track {
                background-color: #fff/*var(--app-scrollbar-color)*/
            }

            div[imagearea]::-webkit-scrollbar {
                width: 5px
            }

            div[imagearea]::-webkit-scrollbar-thumb {
                background-color: var(--divider-color)
            }         
            div[btngroup]{
                margin-bottom: 0px;
            }
            div[btngroup] nav{
                position: relative;
                top: 1px;
                display: flex;
                padding-left: 10px;
                color: var(--secondary-text-color);

            }
            div[btngroup] article{
                border-top-left-radius: 8px;
                border-top-right-radius: 8px;
                border-left: 1px solid var(--divider-color);
                border-right: 1px solid var(--divider-color);
                border-top-left-radius: 8px;
                text-align: center;
                border-width: thin;
                padding: 3px;
                flex-basis: 112px;
                background-color: var(--app-item-backgound-color);
                margin-right: 4px
            }
            .popout{
                display: none;
                flex-direction: row;
                position: absolute;
                left: 35%;
                border-width: unset!important;
                border-style: unset!important;
                box-shadow: unset!important;
                padding: 18px!important;
                letter-spacing: 2px;
                height: 50px;
                width: 15%;
                border-radius: 15px!important;
                background-color: rgba(198, 218, 252, 0.7686274509803922)!important;
                color: var(--app-backgound-color)!important;
            }
            h3{
                margin-block-start: -10px;  
            }
            h4{
                margin-block-start: -17.67px;  
            }
            h3, h4{
                color: var(--app-content-section-span-color);   
            }
            div[pop]{
                display: flex;
            }
            paper-button.nopadding{
                padding: unset; 
            } 
            .loaded{
                box-shadow: 1px 2px 3px var(--google-grey-700);
                background-color: var(--divider-color);
            }
            div[imagearea] div[title="uploaded"]{
                box-shadow: unset;
                background-color: var(--app-scrollbar-color);
            } 
            div[imagearea] input[title="uploaded"]{
                display: none
            }
            div[imagearea]  div[title="inBD"]{                
                box-shadow: 1px 1px 1px;
                background-color: var(--paper-green-200);  
            }
            div[imagearea] input[title="inBD"]{
                display: block;              
            }

            div[pop][title="uploading..."]{
                font-variant: all-petite-caps;
            }
            div[pop] h3[title="loading..."]{
                margin-block-start: -4px;
                display: block
            }
            div[pop] h4[title="loading..."]{
                display: none
            }
            div[pop] h3[title="uploading..."]{
                font-variant: all-petite-caps;
                margin-block-start: 4px;
                box-sizing: border-box;
                display: block;
                position: relative;
                top: -16px;
                background-color: transparent;
                border-radius: 7px;
                padding-left: 4px;
                padding-right: 4px;
                color: green;
            }
            div[pop] h4[title="uploading..."]{
                color: var(--paper-orange-a400);
                text-shadow: 1px 1px 1px var(--app-primary-color);
                margin-block-start: -17px;
                margin-inline-start: 4px;
                display: block;
            }
            .spanleft, .spanright  {
                display: none;
                font-size: 1.2em;
                font-variant: proportional-nums;
                flex-basis: 50%;
                font-weight: 700;
            }
            .spanright{
                color: var(--google-blue-500);
            }
            .spanleft{
                olor: var(--app-backgound-color);
                text-shadow: 2px 2px 2px var(--app-primary-color);
            }            
            div[pop] span[title="uploading..."]{
                display: block!important;
            }
            .counter{
                flex-basis: 60%;
                display: flex;
                flex-direction: row;
                padding-left: 20px;
            }
            .collorindex{
                position: relative;
                top: -22px;
                width: 100%;
                height: 20px;
            }
            .collorindex ul {
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                margin-block-start: 1px;
                width: 280px;
                float: right;
            }
            .collorindex ul li {
                flex-basis: 85px;
                font-size: 30px;
                margin-left: 10px;
            }
            .collorindex ul li span {
                position: relative;
                top: -6px;
                font-size: 11px!important;
                color: var(--paper-grey-600);
            }
            .inDB{
                color: var(--paper-green-200);
            }
            .uploaded{
                color: var(--google-blue-100);
            }
            .toupload{
                color: var(--divider-color);
            }
            `
    }
    static get _getLangButton() {
        return html``
    }
    static get _getXbutton() {
        return html` 
        <paper-button class="exex" on-click="_addTitle">
            x
        </paper-button> 
         `
    }
    static get _getLangAnchor() {
        return html`   
                <section class="langdivsectionnpaddingtop" nova$="[[_nova(event, pagelang)]]">  
                    <paper-button langbtn aria-label="langbutton" on-click="_openFiles">
                        browse pc
                    </paper-button>
                    <input hidden="true" type="file" id="imagefiles">
                </section>   
                <section class="langdivsectionnpaddingtop" nova$="[[_nova(event, pagelang)]]">                    
                    <a href="[[rootPath]][[str]]" >
                        <paper-button langbtn aria-label="langbutton">
                           from url
                        </paper-button>
                    </a>
                </section>   
                <section class="langdivsectionnpaddingtop" nova$="[[_nova(event, pagelang)]]">                    
                    <a href="[[rootPath]][[str]]" >
                        <paper-button langbtn aria-label="langbutton">
                           from FaceBoock
                        </paper-button>
                    </a>
                </section>   
                <section class="langdivsectionnpaddingtop" nova$="[[_nova(event, pagelang)]]">                    
                    <a href="[[rootPath]][[str]]" >
                        <paper-button langbtn aria-label="langbutton">
                           from dropShiping
                        </paper-button>
                    </a>
                </section>  `
    }
    static get _getContentItems() {
        return html`
        <div container>
            <div bottom>
                <div class="collorindex">
                    <ul>
                        <li class="inDB">
                            <span>
                                in storage 
                            </span>
                         </li>
                        <li class="uploaded">
                            <span>
                                uploaded
                            </span>
                        </li>
                        <li class="toupload"> 
                            <span>
                                to upload 
                            </span>
                        </li>
                    </ul>
                </div> 
                <nav>                
                    <div btngroup>
                        <nav>
                            <article>
                                <span>
                                    <paper-button on-click class="nopadding">
                                        remove
                                    </paper-button>        
                                </span>   
                            </article>
                            <article>
                                <span>
                                    <paper-button on-click="_upload" class="nopadding">
                                        upload
                                    </paper-button>                                    
                                </span>   
                            </article>
                            <article>
                                <span>
                                    <paper-button on-click="_cancel" class="nopadding">
                                        cancel
                                    </paper-button>                                    
                                </span>   
                            </article>
                        </nav>
                    </div> 

                    <div class="popout" title="[[popMsg]]" pop$="[[pop]]">
                        <div> 
                            <h3 title="[[popMsg]]"> 
                                    [[popMsg]]
                            </h3> 
                            <h4 title="[[popMsg]]"> 
                                    wait please
                            </h4>
                        </div> 
                        <div class="counter"> 
                            <span title="[[popMsg]]" class="spanleft">[[num]]</span>
                            <span title="[[popMsg]]" class="spanright"> [[totalCount]] </span>
                        </div> 
                    </div> 

                    <div imagearea>
                        <dom-repeat id="model"  repeat items="[[IMAGES]]" as="image">
                            <template>
                                <nav>
                                    <input title="[[image.uploaded]]" type="checkbox" on-click="_checkValidity">
                                    <div title="[[image.uploaded]]" class="loaded">
                                        <img src=[[image.localSource]] on-click="_addTitle"></img>
                                    </div>
                                </nav>
                            </template>
                        </dom-repeat>
                    </div>

                </nav>
                <div class="flexchildbotomFull" hovered$="[[hovered]]" on-mouseover="_hovered" on-mouseout="_unhovered" on-dragenter="_hovered"><!---->
                    <article class="recorte"  hovered$="[[hovered]]" on-dragover="_dropover" on-drop="_droped">
                        <section>
                            <aside>
                                <iron-icon icon="arrow-downward" hovered$="[[hovered]]">
                                </iron-icon>
                            </aside>
                            <aside class="upper">
                                <iron-icon icon="editor:space-bar" hovered$="[[hovered]]">
                                </iron-icon>
                            </aside>
                            <aside class="upper">
                                <p hovered$="[[hovered]]">arraste para aqui</p>
                            <aside>
                        </section>
                    </article>
                </div>
            </div>
        </div>
        `;
    }

    static get is() { return 'cms-images-content'; }
    static get properties() {
        return {
            user: {
                type: Object
            },
            inputVal: {
                type: Array,
                notify: true,
                value: []
            },
            textarea: {
                type: Boolean,
                value: true,
                notify: true
            },
            textareaVal: {
                type: String,
                notify: true,
                value: ''
            },
            imageArr: {
                type: Array,
                notify: true,
                value: []
            },
            itemsIn: {
                type: Boolean,
                value: false
            },
            translator: {
                type: Object,
                notify: true,
                value: function () {
                    return MyAppGlobals[window.cms]//MyAppGlobals.translator
                }
            },
            lang: {
                type: String,
                notify: true,
                value: ''
            },
            langs: {
                type: Object,
                value: {}
            },
            addLangResponse: {
                type: Object,
                notify: true,
                value: {},
                observer: '_setAddLangValue'
            },
            itemlang: {
                type: Object,
                notify: true,
                value: function () { return { 'addTitle': '' } }
            },
            hidebottom: {
                type: Boolean,
                value: false,
                reflectToAttribute: true,
            },
            content: {
                type: Array,
                notify: true,
                value: [],
            },
            tocontent: {
                type: Object,
                notify: true,
                value: {},
            },
            Model: {
                type: Object,
                value: {
                }
            },
            IMAGES: {
                type: Array,
                notify: true,
                value: []
            },
            hovered: {
                type: Boolean,
                value: false,
                notify: true,
                reflectToAttribute: true,
            },
            pop: {
                type: Boolean,
                value: false,
                notify: true,
                reflectToAttribute: true,
            },
            popMsg: {
                type: String,
                notify: true,
                value: 'loading...'
            },
            toUpload: {
                type: Array,
                value: []
            },
            uploadedItems: {
                type: Array,
                value: []
            },
            totalCount: {
                type: String,
                notify: true,
                value: '0'
            },
            uploaded: {
                type: Boolean,
                value: false,
                reflectToAttribute: true,
            },
            fromCheckBox: Boolean,
            num: {
                type: Number,
                value: 0
            },
            imgSrc: String,
            langStr: String,
            time: Number
        }
    }
    static get observers() {
        return [
            '_routePageChanged(routeData, query)'
        ];
    }
    ready() {
        super.ready();
        this.translator.target('cms-page-list-type-content', 'setLangObject', (this._setLObj).bind(this))
        this.translator.target('cms-page-list-type-content', 'changeLang', (this._setLang).bind(this), false)
        this.translator.shoot('cms-page-list-type-content', 'setLangObject')
        window.addEventListener('reset', (this._reset).bind(this))
    }
    _setLObj(res, querySnapshot) {
        if ('data' in querySnapshot) {
            let langs = querySnapshot.data()
            res.call(this, langs);
        }
    }
    _setLang(res, lang) {
        this.lang = lang
        res.call(this);
    }
    __changeLang() {
        this.lang = this.translator.lang
        this.translator.changeLang.call(this)
    }
    _routePageChanged(routeData, query) {
        if (!!routeData.page) {
            let arr = []
            if (!!query.add) {
                this.add = (query.add === 'true')
            }
            this.closestr = `media/view-images?gallery=${this.query.gallery}&update=${this.query.gallery}&reset=false`
            if (routeData.page === 'add-images') {
                if (this.add === true) {
                    localStorage[`images-${this.query.gallery}-new-content-info`] = atob(ModeloInfo)
                    this._getPageInfo(`images-${this.query.gallery}-new-content-`)
                    this.closestr = `media/view-images${location.search}`
                }

            }
            if (routeData.page === 'edit-images') {
                if (!!this.added) {
                    this.inform = []
                    this._getPageInfo(`images-new-content-`)
                }
                if (!!query.content) {
                    if (!!localStorage[`images-${query.content}-info`]) {
                        this._getPageInfo(`images-${query.content}-`)
                        if (this.add === false) {
                            this.set('inputVal', [])
                            this.set('str', `media/view-images/add-images${location.search}`)
                        }
                    }
                }
            }
        } /**/
    }
    /***** */
    _openFiles() {
        this.$.imagefiles.click()
        this.$.imagefiles.onchange = evt => {
            this.handleFiles(evt.srcElement.files)
        }
    }

    handleFiles(files) {
        let arr = this.IMAGES
        let time
        this.pop = true
        this.itemsIn = true
        console.log(this.IMAGES, arr)
        let count = parseInt(this.query.count)
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            let imageType = /image.*/;
            if (!file.type.match(imageType)) { continue; }
            let reader = new FileReader();
            let obj = JSON.parse(atob(ModeloInfo))
            obj[0].gallery = this.query.gallery
            obj[0].title = file.name
            obj[0].lastModifiedDate = file.lastModifiedDate
            obj[0].type = file.type
            obj[0].id = `image${count++}`
            obj[0].file = file
            obj[0].addedTo = 'N/Ad'
            reader.onload = (evt) => {
                if (typeof time === 'number')
                    clearTimeout(time)
                obj[0].localSource = evt.target.result
                arr.push(obj[0])
                this.IMAGES = []
                console.log(this.IMAGES, arr)
                time = setTimeout(() => {
                    this.set('IMAGES', arr)
                    console.log(this.IMAGES, arr)
                    this.pop = false
                    clearTimeout(time)
                }, 500);
            }

            reader.readAsDataURL(file);
        }
    }
    _addTitle(evt) {
        this.tgglelang = !this.tgglelang
        if (!!evt.model) {
            this.set('index', evt.model.__data.index)
            if (!!this.itemlang, evt.model.__data.image.title) {
                this.itemlang = {}
                this.itemlang = { addTitle: evt.model.__data.image.title }
            }
        }

    }
    _setAddLangValue(data) {
        if (typeof this.time === 'number') clearTimeout(this.time)
        if (!!this.IMAGES && !!this.IMAGES[this.index] && !!data && ('undefined' in data) === false) {
            if (data.addTitle !== undefined) {
                this.time = setTimeout(() => {
                    this.IMAGES[this.index].title = data.addTitle
                }, 500)
            }
        }
    }
    _hovered(evt) {
        evt.preventDefault()
        this.hovered = true
    }
    _unhovered(evt) {
        evt.preventDefault()
        this.hovered = false
    }
    _dropover(evt) {
        evt.preventDefault()
    }
    _droped(evt) {
        evt.preventDefault()
        this.handleFiles(evt.dataTransfer.files)
    }
    _cancel() {
        this.IMAGES = []
        this.uploadedItems = []
    }
    onSave() {
        let data = new Date()
        if (this.uploadedItems.length > 0) {
            this.IMAGES = this._setInfo(this.removeInStorage(this.IMAGES), data)
            this.setGalleryImages()
        }
    }
    _setInfo(IMAGs, data) {
        let objrr = IMAGs
        // if(IMAGs)
        let IMAGES = objrr.map(image => {
            let obj = image
            obj.author.id = this.user.uid
            obj.author.name = this.user.displayName
            obj.removed = false
            obj.dateCreated = data.toLocaleString().replace(',', '')
            let length = obj.addedTo.split(' ').length
            if (length === 0) {
                obj.addedTo = 'N/A'
            }
            return obj
        })
        return IMAGES
    }
    removeInStorage() {
        let temparr = this.IMAGES
        temparr = temparr.filter(item => { if (item.uploaded !== 'inBD') return item })
        temparr = temparr.map(image => {
            delete image.localSource
            delete image.file
            return image
        })
        return temparr
    }
    _reset() {
        this._cancel()
    }
}
customElements.define(cmsImagesContent.is, cmsImagesContent);