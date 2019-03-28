import { cmsItemImageTemplate } from '../templates/cms-item-image-template';
class cmsArticle extends cmsItemImageTemplate {
    static get is() { return 'cms-article'; }
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

    }
    _fromAray(data) {

    }
    getImage(data) {

    }
    setImage(data) {

    }
    setImages(data) {
        this.content[0].image = data.url;
    }
    cancelImages() {

    }
}
customElements.define(cmsArticle.is, cmsArticle);