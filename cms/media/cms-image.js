
import { Debouncer } from '@polymer/polymer/lib/utils/debounce';
import { microTask } from '@polymer/polymer/lib/utils/async';
import { cmsItemImageTemplate } from '../templates/cms-item-image-template';
class cmsImage extends cmsItemImageTemplate {

    static get is() { return 'cms-image'; }

    static get properties() {
        return {
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
        if (data instanceof Array === true && data.length >= 1) {
            let t = new Date();
            for (let i = 0; i < data.length; i++) {
                obj2 = data[i];
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
        let arr = this._fromAray(data.image);
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
    _deleteImg(data) {
        console.log(data)
    }
    _openConfirm(event) {
        let index = event.srcElement.parentElement.parentElement.getAttribute('value')
        this._changeSectionDebouncer = Debouncer.debounce(this._changeSectionDebouncer, microTask, () => {
            this.dispatchEvent(new CustomEvent('confirm', {
                bubbles: true, composed: true,
                detail: { name: this.content[index].title, method: (this._deleteImg).bind(this), argument: index, headderMsgKind: 'delete', type: 'image' }
            }));
        });
    }
}
customElements.define(cmsImage.is, cmsImage);