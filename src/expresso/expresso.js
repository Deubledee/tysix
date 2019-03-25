function expresso() {
    var set = new Object()
    function send(method, callback) {
        if (method in set === false) {
            set[method] = { method: method, arr: new Array(), set: false }
        }
        set[method].arr.push(callback)

        if (set[method].set === false) {
            window.addEventListener(method, function getto() {
                next(method)
            })
            set[method].set = true
        }
    }

    function next() {
        let func, arg = event.detail || event, method = arguments[0] || {}, arg2 = arguments[1] || {}
        if (set[method].arr.length > 1) {
            func = set[method].arr[0]
            set[method].arr.reverse().pop()
            set[method].arr.reverse()
        } else if (set[method].arr.length === 1) {
            func = set[method].arr[0]
            set[method].arr = []
        }
        if (func instanceof Function === true) {
            func(arg, arg2, next)
        }

    }

    function trigger(method, callback) {
        try {
            window.dispatchEvent(new CustomEvent(method, { detail: callback }))
        }
        catch (err) {
            console.error(err)
        }
    }

    return { send: send, trigger: trigger }
}

/*  var eventHandler = expresso()

     eventHandler.send('getto', (req, res, next) => {
          console.log(event, '3')
          next('getto', 'alo')
      })
     eventHandler.send('getto', (req, res, next) => {
          console.log(event, '2')
          next('getto', res)
      })
     eventHandler.send('getto', (req, res, next) => {
          console.log(res, '1')
      })
  
     eventHandler.trigger('getto', 'callback' || 12 || [] || {} || ()) // sets in event.detail Object
  
   /*  CustomEvent {isTrusted: false, detail: null, type: "getto", target: Window, currentTarget: Window, …} "3"
     CustomEvent {isTrusted: false, detail: null, type: "getto", target: Window, currentTarget: Window, …} "2"
     alo 1*/

export { expresso };