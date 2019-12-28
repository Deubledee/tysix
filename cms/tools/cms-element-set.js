import { dataBaseworker } from './dataBaseWorker';
export { Setter }
const DBW = new dataBaseworker()
const __DEV = true
class Setter {
    constructor() {
        this.template = document.createElement('template')
    }
    getAssets(elem) {
        return DBW.getElementAssets(elem, __DEV)
    }
    authStateChanged() {
        return new Promise((resolve, reject) => {
            DBW.authStateChanged((user, err) => {
                if (user !== 0) {
                    resolve(user)
                }
            })
        })
    }
    loginFire(obj) {
        return DBW.loginFire(obj);
    }

    logoutFire(obj) {
        return DBW.logoutFire(obj);
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
    setLangObject(langs) {
        for (let par in langs) {
            if (par !== 'styles' && langs[par].length > 0) {
                this.langs[par] = langs[par].pop();
            }
        }
        this.__changeLang();
    }
}