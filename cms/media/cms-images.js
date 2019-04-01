import { cmsContentImageTemplate } from '../templates/cms-content-image-template';
import '../media/cms-image';
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
            contents: {
                type: Array,
                notify: true,
            },
        }
    }

    static get observers() {
        return [
            '_routePageChanged(route, routeData, query)'
        ];
    }

    ready() {
        super.ready()
    }

    _routePageChanged(routeData, query) {
        if (routeData === 'view-articles') {
            console.log(JSON.parse(atob(query.content)))
            this.set('contents', JSON.parse(atob(query.content)))
        }
    }
}
customElements.define(cmsImages.is, cmsImages);