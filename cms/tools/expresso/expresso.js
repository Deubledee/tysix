import { Setter } from '../cms-element-set';
export class expresso extends Setter {
    constructor() {
        super()
        this.set = new Object()
    }
    shoot(evt, method, lang) {
        this.method = method
        this.lang = (lang === undefined || lang === '') ? this.lang : lang
        if (evt === undefined) {
            for (let par in this.set) {
                this.Evt = par
                this.trigger(this.Evt)
            }
        } else {
            this.Evt = evt
            this.trigger(this.Evt)
        }
    }
    trigger() {
        let method = this.method
        this.Evt = arguments[0] || this.Evt
        if (method === 'setLangObject') {
            this.set[this.Evt].arr[method].methods.map((func) => {
                this.set[this.Evt].assets.then((querySnapshot) => {
                    func(this[method], querySnapshot)
                }).catch(function (error) {
                    console.error("Error reteaving assets: ", error);
                })
            })
        }
        if (method === 'changeLang') {
            this.set[this.Evt].arr[method].methods.map((func) => {
                if (this.set[this.Evt].arr[method].TitleLang === false) {
                    func(this[method], this.lang)
                } else {
                    func(this['changeItemTitleLang'], this.lang)
                }
            })
        }
        return 0
    }
    target(Evt, method, callback, TitleLang) {
        this.Evt = Evt
        if (this.Evt in this.set === false && this.Evt !== undefined) {
            this.set[this.Evt] = { arr: Object(), set: false }
            this.set[this.Evt].arr[method] = { methods: new Array(), TitleLang: TitleLang }
            this.set[this.Evt].assets = this.getAssets(this.Evt)
            this.set[this.Evt].arr[method].count = 0
            this.set[this.Evt].set = true
        }
        if (method in this.set[this.Evt].arr === false) {
            this.set[this.Evt].arr[method] = { methods: new Array(), TitleLang: TitleLang }
            this.set[this.Evt].arr[method].count = 0
        }
        this.set[this.Evt].arr[method].methods.push(callback)
        this.set[this.Evt].arr[method].count++
    }

}
window.MyAppGlobals.translator = new expresso();
/*var eventHandler = new expresso()
var obj = {
    lang: '',
    langs: {}
}
eventHandler.trigger('cms-page-list-type-content', 'setLangObject')
eventHandler.shoot('cms-page-list-type-content', 'setLangObject', (res, langs, next, index) => {
    res.call(obj, langs);
    next('cms-page-list-type-content', 'setLangObject')
})

eventHandler.shoot('cms-page-list-type-content', 'setLangObject', (res, langs, next, index) => {
    res.call(obj, langs);
    next('cms-page-list-type-content', 'setLangObject')
})


eventHandler.trigger('cms-elements', 'setLangObject')
eventHandler.shoot('cms-elements', 'setLangObject', (res, langs, next, index) => {
    res.call(obj, langs);
    next('cms-elements', 'setLangObject')
})

eventHandler.shoot('cms-elements', 'setLangObject', (res, langs, next, index) => {
    res.call(obj, langs);
    next('cms-elements', 'setLangObject')
})

obj.lang = 'pt'
eventHandler.trigger('cms-page-list-type-content', 'changeLang')
eventHandler.shoot('cms-page-list-type-content', 'changeLang', (res, next, index) => {
    res.call(obj);
    next('cms-page-list-type-content', 'changeLang')
})
// sets in event.detail Object


// event allways available :)
/*  CustomEvent {isTrusted: false, detail: null, type: "getto", target: Window, currentTarget: Window, …} "3"
  CustomEvent {isTrusted: false, detail: null, type: "getto", target: Window, currentTarget: Window, …} "2"
  alo 1*/

