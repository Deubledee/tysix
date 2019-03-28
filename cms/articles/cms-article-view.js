
import './cms-article';
import { cmsContentImageTemplate } from '../templates/cms-content-image-template';
class cmsArticleView extends cmsContentImageTemplate {

    static get getElement() {
        return html`
    <cms-image src="[[image.url]]" alt="[[image.title]]" on-click="setImage">
    </cms-image>`
    }
    static get is() { return 'cms-article-view'; }


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
customElements.define(cmsArticleView.is, cmsArticleView);