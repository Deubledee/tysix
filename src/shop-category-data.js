import { PolymerElement } from '@polymer/polymer/polymer-element';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce';
import { timeOut } from '@polymer/polymer/lib/utils/async';


var db = {}
db = firebase.firestore();
var categories = []
var lang = navigator.language.split('-')[0]
function getLang(data) {
  let obj = { name: 'pages', query: data }
  categories = []
  getDocList(obj).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      categories.push(doc.data()[obj.query])
    });
  });
}
getLang(lang)
function getDocList(table) {
  var categoriesRef = db.collection(table.name);
  return categoriesRef.get()
  /* .then((querySnapshot) => {
   querySnapshot.forEach((doc) => {
     categories.push(doc.data()[table.query])
   });
 });*/
}
function getDoc(table) {
  var categoriesRef = db.collection(table.name).doc(table.doc);
  return categoriesRef.get()
  /* .then((querySnapshot) => {
   querySnapshot.forEach((doc) => {
     categories.push(doc.data()[table.query])
   });
 });*/
}
//setTimeout(() => {

/*
let obj = { name: 'pages', query: lang }
getDocList(obj)
*/
//}, 10)


class ShopCategoryData extends PolymerElement {

  static get is() { return 'shop-category-data'; }
  static get properties() {
    return {

      categoryName: String,

      itemName: String,
      categories: {
        type: Array,
        notify: true,
        value: categories
      },
      firebase: {
        type: Object,
        value: firebase
      },
      lang: {
        type: String,
        value: lang
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
    let cats = this.categories
    this.categories = ''
    setTimeout(() => {
      this.categories = cats
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

  getLang(data) {
    getLang(data)
  }

  handleResponse(data) {
    var sfDocRef = db.collection("usres").doc();
    // Uncomment to initialize the doc.
    // sfDocRef.set({ population: 0 });
    return db.runTransaction(function (transaction) {
      // This code may get re-run multiple times if there are conflicts.
      return transaction.get(sfDocRef).then(function (sfDoc) {
        if (!sfDoc.exists) {
          throw "Document does not exist!";
        }

        var newPopulation = sfDoc.data()
      });
    }).then(function () {
      console.log("Transaction successfully committed!");
    }).catch(function (error) {
      console.log("Transaction failed: ", error);
    });
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
        let obj = { name: 'articles', doc: categoryObj.id }
        getDoc(obj).then((querySnapshot) => {
          this.set('category.items', querySnapshot.data()[this.lang]);
        });
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
