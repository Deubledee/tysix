import { cmsContentImageTemplate } from '../templates/cms-content-image-template';
class cmsImages extends cmsContentImageTemplate {
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
                value: true
            },
            closeMethod: {
                type: Object,
                notify: true
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
                value: false
            },
            image: {
                type: Object,
                notify: true,
                value: {}
            },
            images: {
                type: Array,
                notify: true,
                value: [],
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
                value: true
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

    log(data) {
        console.log(data)
    }

    closeMethod(data) {
        console.log(data)
    }

    settAndFormKiller(data) {
        this.sett = !data
        this.form = true
        this.del = true
        this.setButton = true
    }

    killSpinner(contents, index) {
        if (contents.length === index + 1) {
            this.$.spinner1.active = false
            this.loading = ''
        }
    }

    clearImages() {
        if (this.$.spinner1.active === false) {
            this.images = []
            this.contents = []
            this.set('show', false)
            this.clear = !this.clear
            this.showTop = false
            this.$.spinner1.active = true
            this.$.main.classList.remove('mainish')
            this.closeMethod(false)
        }
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
            this.$.main.classList.add('mainish')
            this.contents = []
            setTimeout(() => {
                this.contents = data
            }, 60)
        }
    }

    close() {
        this.clearImages()
        this.cancel = true
    }

    deleteImg(data) {
        console.log(data.model.__data.image)
        /* let contents = this.contents
         this.contents = []
         this.set('remove', data.model.__data.image)
         let start = data.model.__data.index
         let end = data.model.__data.index > 0 ? data.model.__data.index : data.model.__data.index + 1
         contents.splice(start, end)
         this.contents = contents*/
    }

    setImage(event) {
        this.image = event.model.__data.image
        event.srcElement.style.filter = 'drop-shadow(8px 8px 10px gray)'
        if (this.sett === true || this.setButton === true) {
            this.set('image', event.model.__data.image)
        }
    }

    toggleView() {
        this.toggle = !this.toggle
    }
}
customElements.define(cmsImages.is, cmsImages);