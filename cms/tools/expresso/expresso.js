import { Setter } from '../cms-element-set.js';
export { expresso }
class expresso extends Setter {
    constructor() {
        super()
        this.set = new Object()
    }
    target(Evt, method, callback, TitleLang) {
        this.Evt = Evt
        if ((typeof TitleLang === 'boolean') === false && TitleLang !== undefined) {
            console.info('Booleans only please', TitleLang + ' not Boolean', Evt, method)
            return
        }
        if (this.Evt in this.set === false && this.Evt !== undefined) {
            this.set[this.Evt] = { arr: Object(), set: false }
            this.set[this.Evt].arr[method] = { methods: new Array(), TitleLang: TitleLang }
            this.set[this.Evt].assets = this.getAssets(this.Evt)
            this.set[this.Evt].arr[method].count = 0
        }
        if (method in this.set[this.Evt].arr === false) {
            this.set[this.Evt].arr[method] = { methods: new Array(), TitleLang: TitleLang }
            this.set[this.Evt].arr[method].count = 0
        }
        this.set[this.Evt].arr[method].methods.push(callback)
        this.set[this.Evt].arr[method].count++
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
}