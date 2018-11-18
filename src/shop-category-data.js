import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import { timeOut } from '@polymer/polymer/lib/utils/async.js';
import '@polymer/iron-ajax/iron-ajax.js';

class ShopCategoryData extends PolymerElement {

  static get is() { return 'shop-category-data'; }
  static get properties() {
    return {

      categoryName: String,

      itemName: String,

      categories: {
        type: Array,
        notify: true,
        //observer: 'log'
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
    this.fsd()
  }

  fsd() {
    let url = 'data/categories.json', json = [], str = ''
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onLoad.bind(this))
    xhr.addEventListener('error', onError);
    xhr.open('GET', url);
    xhr.send();
    function onLoad(e) {
      json.push(JSON.parse(e.target.responseText))
      str = json[0]
      this.categories = str
      // console.log(str, this.categories)
    }
    function onError(e) {
      console.log(e)
    }
  }

  log(data) {
    console.log(data)

  }
  handleResponse(data) {
    this.log(data)
  }

  _getCategoryObject(categoryName) {
    console.log(categoryName, this.categories)
    if (this.categories !== undefined) {
      for (let i = 0, c; c = this.categories[i]; ++i) {
        if (c.name === categoryName) {
          return c;
        }
      }
    }
  }
  _computeCategory(categoryName) {
    // Fetch the items of the category. Note that the fetch is asynchronous,
    // which means `category.items` may not be set initially (but that path
    // will be notified when the fetch completes).
    let categoryObj = this._getCategoryObject(categoryName);
    this._fetchItems(categoryObj, 1);
    return categoryObj;
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

  _fetchItems(category, attempts) {
    this._setFailure(false);
    // Only fetch the items of a category if it has not been previously set.
    if (!category || category.items) {
      return;
    }
    this._getResource({
      url: 'data/' + category.name + '.json',
      onLoad(e) {
        this.set('category.items', JSON.parse(e.target.responseText));
      },
      onError(e) {
        this._setFailure(true);
      }
    }, attempts);
  }

  _getResource(rq, attempts) {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('load', rq.onLoad.bind(this));
    xhr.addEventListener('error', (e) => {
      // Flaky connections might fail fetching resources
      if (attempts > 1) {
        this._getResourceDebouncer = Debouncer.debounce(this._getResourceDebouncer,
          timeOut.after(200), this._getResource.bind(this, rq, attempts - 1));
      } else {
        rq.onError.call(this, e);
      }
    });

    xhr.open('GET', rq.url);
    xhr.send();
  }

  refresh() {
    if (this.categoryName) {
      // Try at most 3 times to get the items.
      this._fetchItems(this._getCategoryObject(this.categoryName), 3);
    }
  }

}

customElements.define(ShopCategoryData.is, ShopCategoryData);
