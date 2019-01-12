import { PolymerElement } from '@polymer/polymer/polymer-element';
import { dataBaseworker } from './cms/dataBaseWorker.js';

class ShopCategoryData extends PolymerElement {
  static get is() { return 'shop-category-data'; }
  static get properties() {
    return {
      DBW: {
        type: Object,
        value: function () {
          return new dataBaseworker()
        },
      },
      categoryName: String,
      itemName: String,
      categories: {
        type: Array,
        notify: true,
        value: []
      },
      firebase: {
        type: Object,
        value: firebase
      },
      lang: {
        type: String,
        notify: true,
        value: function () {
          return navigator.language.split('-')[0]
        }
      },
      db: {
        type: Object
      },
      docRef: {
        type: Array,
        value: []
      },
      category: {
        type: Object,
        computed: '_computeCategory(categoryName)',
        notify: true
      },

      item: {
        type: Object,
        computed: '_computeItem(category.items, itemName)',
        notify: true
      },

      failure: {
        type: Boolean,
        notify: true,
        readOnly: true
      }

    }
  }

  ready() {
    super.ready();
    this.DBW.getPagesEqualTo(done => {
      this.categories = done.categories
      this.lang = done.lang
    }, 'lang', this.lang)

    window.addEventListener('category-added', (evt) => {
      let bool
      for (let i = 0, item = ''; item = this.categories[i]; i++) {
        if (evt.detail.name === item.name) {
          bool = true
          break;
        } else {
          bool = false
        }
      }
      if (bool === false) {
        let temp = this.categories
        this.categories = [{}]
        temp.push(evt.detail)
        bool = true
        setTimeout(() => {
          this.categories = temp
        }, 1000)
      }
    })
  }

  log(data) {
    console.log(data)

  }

  getLang(data) {
    getLang(data)
  }

  _getCategoryObject(categoryName) {
    if (this.categories !== undefined) {
      for (let i = 0, c; c = this.categories[i]; ++i) {
        if (c.name === categoryName) {
          return c;
        }
      }
    }
  }

  _computeCategory(categoryName) {
    if (this.categories.length > 0) {
      let categoryObj = this._getCategoryObject(categoryName);
      if (categoryObj !== undefined) {
        let obj = { name: 'articles', doc: categoryObj.name }
        this.DBW.getArticle((msg, content) => {
          if (msg !== "error") {
            this.set('category.items', content);
            console.log(this.category)
          }
        }, categoryObj);
      }
      return categoryObj;
    }
  }

  _computeItem(items, itemName) {
    if (!items || !itemName) {
      return;
    }
    for (let i = 0, item; item = items[i]; ++i) {
      if (item.name === itemName) {
        return item;
      }
    }
  }

  refresh() {
    if (this.categoryName) {
      // Try at most 3 times to get the items.
      // this._fetchItems(this._getCategoryObject(this.categoryName), 3);
      this._computeCategory(this.categoryName)
    }
  }

}

customElements.define(ShopCategoryData.is, ShopCategoryData);