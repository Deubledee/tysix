import { PolymerElement } from '@polymer/polymer/polymer-element';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce';
import { timeOut } from '@polymer/polymer/lib/utils/async';

/*
function fsd(urlo, call) {
  let url = urlo, json = [], str = ''
  let xhr = new XMLHttpRequest();
  xhr.addEventListener('load', onLoad.bind(this))
  xhr.addEventListener('error', onError);
  xhr.open('GET', url);
  xhr.send();
  function onLoad(e) {
    json.push(JSON.parse(e.target.responseText))
    str = json[0]
    call(str)
    // console.log(str, this.categories)
  }
  function onError(e) {
    console.log(e)
  }
}

function getFirebaseContent(url) {
  fsd(url, config => {
    firebase.initializeApp(config.pop());
  })
}*/

var db = {}
var categories = []

function getDb(table) {
  db.collection(table.name).get().then(function (querySnapshot) {
    // console.log(querySnapshot)
    querySnapshot.forEach((doc) => {
      categories.push(doc.data())
      // console.log(doc.id, " => ", doc.data());
    });
  });
}

//setTimeout(() => {
db = firebase.firestore();
let obj = { name: 'pages' }
getDb(obj)

//}, 10)


class ShopCategoryData extends PolymerElement {

  static get is() { return 'shop-category-data'; }
  static get properties() {
    return {

      categoryName: String,

      itemName: String,
      categories: {
        type: Array,
        notify: true
        // observer: 'log'
      },
      firebase: {
        type: Object,
        value: firebase
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

  fillDbDocs(table) {
    db.collection(table.name).doc(table.docName).set(table.doc)
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  }

  ready() {
    super.ready();
    setTimeout(() => {
      this.categories = categories
    }, 1000)
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

  handleResponse(data) {
    var sfDocRef = db.collection("cities").doc("SF");

    // Uncomment to initialize the doc.
    // sfDocRef.set({ population: 0 });

    return db.runTransaction(function (transaction) {
      // This code may get re-run multiple times if there are conflicts.
      return transaction.get(sfDocRef).then(function (sfDoc) {
        if (!sfDoc.exists) {
          throw "Document does not exist!";
        }

        var newPopulation = sfDoc.data().population + 1;
        transaction.update(sfDocRef, { population: newPopulation });
      });
    }).then(function () {
      console.log("Transaction successfully committed!");
    }).catch(function (error) {
      console.log("Transaction failed: ", error);
    });
  }

  _getCategoryObject(categoryName) {
    console.log(categoryName, 'set')
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
        obj = JSON.parse(e.target.responseText)

        let table = {
          name: "articles",
          docName: category.name,
          doc: { 'conteudo': obj }
        }

        // this.fillDbDocs(table) 
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
