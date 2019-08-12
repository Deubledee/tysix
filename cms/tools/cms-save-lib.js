import { PolymerElement } from '@polymer/polymer/polymer-element';
export class cmsSaveLib extends PolymerElement {
    static get is() { return 'cms-save-lib'; }
    ready() {
        super.ready();
    }
    saveAdded() {
        return new Promise((resolve, reject) => {
            this.translator._DBW.setPages((msg, err) => {
                if (msg !== 'error') {
                    resolve(msg)
                }
                else {
                    reject(err)
                }
            }, { name: this.info.__page, create: this.content }, this.translator.__DEV);/* */
        })
    }
    saveChanged() {
        return new Promise((resolve, reject) => {
            this.translator._DBW.changePages((msg, err) => {
                if (msg !== 'error') {
                    resolve(msg)
                }
                else {
                    console.log(err);
                    reject(err)
                }
            }, { name: this.info.__page, update: this.content }, this.translator.__DEV);/* */
        })
    }
    saveAddedData(type) {
        return new Promise((resolve, reject) => {
            this.translator._DBW.setPageData((done, err) => {
                if (done !== 'error') {
                    resolve(done)
                }
                else {
                    console.log(err);
                    reject(err)
                }
            }, { name: this.__info.page, dataType: type, data: this.__info.content }, this.translator.__DEV);
        })
    }
    saveChangedData(type) {
        return new Promise((resolve, reject) => {
            this.translator._DBW.changePageData((done, err) => {
                if (done !== 'error') {
                    resolve(true)
                }
                else {
                    console.log(err);
                    reject(err)
                }
            }, { name: this.__info.page, dataType: type, doc: this.__info.id, data: this.__info.content }, this.translator.__DEV);
        })
    }
    saveAddedSubcatData() {
        return new Promise((resolve, reject) => {
            this.translator._DBW.saveAddedSubcatData((done, err) => {
                if (done !== 'error') {
                    resolve(done)
                }
                else {
                    reject(err)
                }
            }, { page: this.__info.page, subcat: this.__info.subcat, create: this.content }, this.translator.__DEV); /* */
        })
    }
    saveChangedSubcatData() {
        return new Promise((resolve, reject) => {
            this.translator._DBW.saveAddedSubcatData((done, err) => {
                if (done !== 'error') {
                    resolve(done)
                }
                else {
                    reject(err)
                }
            }, { page: this.__info.page, subcat: this.__info.subcat, update: this.content, data: this.__info.content }, this.translator.__DEV); /* */
        })
    }
}
customElements.define(cmsSaveLib.is, cmsSaveLib);