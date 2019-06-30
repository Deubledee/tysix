import { dataBaseworker } from '/cms/tools/dataBaseWorker.js';
export { Setter }
class Setter {
    constructor() {
        this.__DEV = true
        this._DBW = new dataBaseworker()
        this.template = document.createElement('template')
    }
    getAssets(elem) {
        return this._DBW.getElementAssets(elem, this.__DEV)
    }
    clone(parent) {
        var clone = document.importNode(this.template.content, true);
        parent.appendChild(clone)
    }
    changeLang() {
        if (this.langs[this.lang]) {
            let obj = this.langs[this.lang];
            for (let par in obj) {
                this.set(par, obj[par]);
            }
        }
    }
    changeItemTitleLang(item, title) {
        if (this.langs[this.lang]) {
            let obj = this.langs[this.lang];
            this.set(title, obj[item]);
        }
    }
    setChildrenLang(data) {
        if (this.childElementCount > 0) {
            for (let i = 0; i < this.childElementCount; i++) {
                this.children[i].children[0].lang = data
            }
        }
    }
    setLangObject(langs) {
        for (let par in langs) {
            if (par !== 'styles') {
                this.langs[par] = langs[par].pop();
            }
        }
        this.__changeLang();
    }
}