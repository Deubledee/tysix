import { cmsDropdownMenuTemplate } from '../templates/cms-dropdown-menu-template';

export class cmsDropdownMenu extends cmsDropdownMenuTemplate {
    static get is() {
        return 'cms-dropdown-menu';
    }
    static get properties() {
        return {
            lang: {
                type: String,
                notify: true,
            },
            langs: {
                type: Object,
                value: {}
            },
            items: {
                type: Array,
                notify: true,
                observer: '__setValues'
            },
            translator: {
                type: Object,
                notify: true,
                value: function () {
                    return MyAppGlobals[window.cms]
                }
            }
        };
    }
    _log(data) {
        console.log(data)
    }
    ready() {
        super.ready();
        this.translator.target('cms-content-item', 'setLangObject', (this._setLObj).bind(this))
        this.translator.target('cms-content-item', 'changeLang', (this._setLang).bind(this), true)
        this.translator.shoot('cms-content-item', 'setLangObject')
    }
    _setLObj(res, querySnapshot) {
        if ('data' in querySnapshot) {
            let langs = querySnapshot.data()
            res.call(this, langs);
        }
    }
    _setLang(res, lang) {
        this.lang = lang
        res.call(this, this.itemLabel, 'title');
        res.call(this, 'cancel', 'cancel');
    }
    __changeLang() {
        this.lang = this.translator.lang
        this.translator.changeItemTitleLang.call(this, this.itemLabel, 'title');
        this.translator.changeItemTitleLang.call(this, 'cancel', 'cancel');
    }
}
customElements.define(cmsDropdownMenu.is, cmsDropdownMenu);
