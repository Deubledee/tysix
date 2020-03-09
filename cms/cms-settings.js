import { cmsTopPageTemplate } from './templates/cms-top-page-template';
import { html } from '@polymer/polymer/polymer-element.js';

class cmsSettings extends cmsTopPageTemplate {
    static get topTitle() {
        return html`
      <a href="[[_getStr2(page)]][[_queryContent2(index, page)]]">  
          <paper-button  aria-label="Go back page">                   
          [[_getPage2(page)]]
          </paper-button>               
      </a> 
        `
    }
    static get viewPages() {
        return html`
      <article name="projects">       
          <cms-projects id="projects" route="{{route}}" user="[[user]]">
          </cms-projects>
      </article>
      <article name="templates">       
          <cms-templates id="templates" route="{{route}}" user="[[user]]">
          </cms-templates>            
      </article>
      <article name="tools">       
          <cms-tools id="tools" route="{{route}}" user="[[user]]">
          </cms-tools>            
      </article>`
    }
    static get is() { return 'cms-settings'; }

    static get properties() {
        return {
            route: {
                type: Object,
                notify: true
            },
            user: {
                type: Object,
                notify: true
            },
            lang: {
                type: String,
                notify: true
            },
            langs: {
                type: Object,
                value: {}
            },
            translator: {
                type: Object,
                notify: true,
                value: function () {
                    return MyAppGlobals[window.cms]// MyAppGlobals.translator
                }
            },
            queryContent: {
                type: String,
                notify: true
            },
            returnPath: {
                type: String,
                notify: true
            },
            contentto: {
                type: Object,
                notify: true,
                value: {}
            },
            page: {
                type: String,
                reflectToAttribute: true,
                observer: '_pageChanged'
            },
            add: {
                type: Boolean,
                notify: true
            },
            add: {
                type: Boolean,
                value: false
            },
            breadcrumbs: {
                type: Array,
                notify: true,
                value: []
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
        this.translator.target('cms-image-viewer', 'setLangObject', (this._setLObj).bind(this))
        this.translator.target('cms-image-viewer', 'changeLang', (this._setLang).bind(this), false)
        this.translator.shoot('cms-image-viewer', 'setLangObject')
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
        this.set('breadcrumbs', [])
        if (this.breadcrumbs.length > 0) {
            this.setBreadcrumbs(this.route, this.routeData)
        }
    }
    __changeLang() {
        this.lang = this.translator.lang
        this.translator.changeLang.call(this)
        this.setBreadcrumbs(this.route, this.routeData)
    }
    _routePageChanged(route, routeData) {
        if (route.prefix === '/settings') {
            if (this.breadcrumbs.length > 0) {
                this.setBreadcrumbs(this.route, this.routeData)
            }
            if (!!routeData && !!routeData.page) {
                if (['projects', 'templates', 'tools'].indexOf(routeData.page) !== -1) {
                    this.page = routeData.page;
                }
                else {
                    // console.log('view404', routeData.page, query);
                }
            }
        }
    }


    setBreadcrumbs(route, routeData) {
        if (typeof this.time === 'number') clearTimeout(this.time)
        this.time = setTimeout(() => {
            if (route.path === '/') {
                let arr2 = []
                arr2.push('cmshome')
                this.set('breadcrumbs', arr2)
            }
            if (!!routeData.page) {
                if (['projects', 'templates', 'tools'].indexOf(routeData.page) !== -1) {
                    let arr2 = []
                    arr2.push('cmshome')
                    this.set('breadcrumbs', arr2)
                }
            }
        }, 120);
    }
    _getStr2(item) {
        let str = ''
        str = (item === '/settings') ? `${item}/` : `${item}`
        return str
    }
    _queryContent2(index) {
        let str
        if (index > 1) {
            if (!!this.query && !!this.query.type) {
                str = `${location.search}`
            } else {
                str = `?reset=false&update=${this.query.gallery}`
            }
        }
        return str
    }
    _getPage2(item) {
        let word
        if (item === 'cmshome') {
            word = item.split('')
            word[0] = word[0].toUpperCase()
            word = word.join('')
            this.translator.changeItemTitleLang.call(this, word.toString(), 'word')
        } else {
            word = item.split('/')
            word.shift()
            word = word.pop()
            word = word.split('')
            word[0] = word[0].toUpperCase()
            word = word.join('')
            this.translator.changeItemTitleLang.call(this, word.toString(), 'word')/**/
        }
        return this.word
    }
    _pageChanged(page) {
        if (page !== undefined) {
            if (page === 'projects') {
                import('./settings/cms-projects')
                return;
            }
            if (page === 'templates') {
                import('./settings/cms-templates')
                return;
            }
            if (page === 'tools') {
                import('./settings/cms-tools')
                return;
            }
        }
    }
}
customElements.define(cmsSettings.is, cmsSettings);
