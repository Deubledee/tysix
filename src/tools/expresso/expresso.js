import { Setter } from '../cms-element-set.js';
export { expresso }
class expresso extends Setter {
    constructor() {
        super()
        this.set = new Object()
        this.bindSet = new Object()
    }
    /* data bind methods. example bellow */

    setBinder(BID, par, callback) {
        let parameter = par instanceof Array ? par : [par]
        if (!this.bindSet[BID]) {
            this.bindSet[BID] = { call: [callback], par: parameter }
        } else {
            this.bindSet[BID].par = this.bindSet[BID].par.concat(parameter)
        }
    }

    bindWith(BID, bindPar, value) {
        this.bindSet[BID].call[0](bindPar, value)
    }

    bindData(bindPar, value) {
        for (let BID in this.bindSet) {
            if (this.bindSet[BID].par.indexOf(bindPar) !== -1) {
                this.bindSet[BID].call[0](bindPar, value)
            }
        }
    }

    /* translation methods */
    //dont mind the names, i know they are of context
    target(Evt, method, callback, TitleLang) {
        if (Evt === undefined) return
        this.Evt = Evt
        if (!!TitleLang && (typeof TitleLang === 'boolean') === false) {
            console.info('Booleans only please', TitleLang + ' not Boolean', Evt, method)
            return
        }
        if (this.Evt in this.set === false) {
            this.set[this.Evt] = { arr: Object(), set: false }
            this.set[this.Evt].arr[method] = { methods: new Array(), TitleLang: TitleLang }
            this.set[this.Evt].assets = this.getAssets(this.Evt)
        }
        if (method in this.set[this.Evt].arr === false) {
            this.set[this.Evt].arr[method] = { methods: new Array(), TitleLang: TitleLang }
        }
        this.set[this.Evt].arr[method].methods.push(callback)
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
            this.set[this.Evt].arr[method].methods.forEach((func) => {
                this.set[this.Evt].assets.then((querySnapshot) => {
                    func(this[method], querySnapshot)
                }).catch(function (error) {
                    console.error("Error reteaving assets: ", error);
                })
            })
        }
        if (method === 'changeLang') {
            this.set[this.Evt].arr[method].methods.forEach((func) => {
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
/* data binder Example:

    var binder = new expresso()

    //in pop-input\\
    ready(){
        binder.setBinder('cmPopInputPageContent', (bindCallback).bind(this))
            ||
        //this.BID may be set by parent element
          ex: this.children[index].BID = 'childname' + index\\
        binder.setBinder(this.BID, (bindCallback).bind(this))
    }

    //standart for all. needs to be 'bind'ed \\
    bindCallback(par, value) {
        this[par] = value
    }

    //in cms-page-content\\
    sendWarningToPop(warning){
        bindWith('cmPopInputPageContent', 'warningMsg', warning)
    }

    //in cms-controler\\
    routeAll(){
        bindData('route', this.route)
    }
*/