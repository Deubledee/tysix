import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import { html, PolymerElement } from '@polymer/polymer/polymer-element';
import { html as litHtml, render } from 'lit-html';
import { request } from '../../cms/tools/http-handler';
import '@polymer/app-route/app-location';
import '@polymer/app-route/app-route';

class homePage extends PolymerElement {
    static get is() { return 'home-page'; }

    static get template() {
        return html `
    <!--app-location route="{{route}}"> 
      !!USING DOM-BIND!!
    </app-location-->
    <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}" active="{{active}}" query-params="{{query}}">
    </app-route>
    <slot name="spinner"></slot>
    <slot name="hero"> </slot>
    <slot name="main"> </slot>
    `
    }

    static get properties() {
        return {
            route: {
                type: Object,
            },
            itemsArray: {
                type: Array,
                notify: true
            },
            services: {
                type: Object,
                observer: '_setServices'
            },
            page: {
                type: String,
                //  observer: '_pageChanged'
            },
            whyUs: {
                type: Object,
                observer: '_setWhyUs'
            },
            index: {
                type: Number,
                value: 0
            },
            type: {
                type: String,
                value: 'home'
            },
            lang: {
                type: String
            },
            spinner: {
                type: Object,
                value: function() {
                    return document.querySelector('paper-spinner')
                }
            }
        }
    }
    static get observers() {
        return [
            '_routePageChanged(routeData.page, query.type, query.lang)',
        ];
    }
    _log(data) {
        console.log(data);

    }
    ready() {
        super.ready();
        // this._slotMainAndHero()
        /* this.spinner.active = true
         this.spinner.classList.remove('spniiner-out')*/
    }
    _routePageChanged(page, type, lang) {
        if (this.type === type) {
            if ((!!this.page && this.page !== page) || !this.page || (this.lang !== lang)) {
                this.page = page
                this.lang = lang
                    //    this._getContent()
            }
        }
    }
    _toggleSides(evt) {
        try {
            const carrocelItemTemplate = (data) => litHtml `
          <div class="carousel-container" aria-labelledby="carousel-item">
            <h2 title="${data.articleName}" class="animated fadeInDown">${data.articleName} </h2>
            <p class="animated fadeInUp">${data.description}.</p>
            <a href="" title="${data.type}" class="btn-get-started animated fadeInUp">${data.type}</a>
          </div>`
            if (!!evt)
                if (evt.srcElement.classList.contains("bx-chevron-left")) {
                    if (this.index > 0) {
                        this.index--
                    } else {
                        this.index = (this.itemsArray.length - 1)
                    }
                } else {
                    if (this.index < this.itemsArray.length - 1) {
                        this.index++
                    } else {
                        this.index = 0
                    }
                }
            let str = this.itemsArray[this.index]
            if (this.index <= this.itemsArray.length || this.index >= 0) {
                render(carrocelItemTemplate(str), document.querySelector("#carousel-item"))
                setTimeout(() => {
                    this.spinner.active = false
                    this.spinner.classList.add('spniiner-out')
                }, 500)
            }
        } catch (err) {
            throw err
        }
    }

    _slotMainAndHero() {
        try {
            const mainTemplate = () => litHtml `<!-- ======= Hero Section ======= -->
        <section slot="hero" id="hero" class="d-flex justify-cntent-center align-items-center">
          <div id="heroCarousel" class="container carousel carousel-fade" data-ride="carousel">
           <div id="carousel-item" aria-label="carousel" class="carousel-item active">
           
          </div>
          <a class="carousel-control-prev" aria-label="carousel-control-prev"  role="button" data-slide="prev" @click="${(this._toggleSides).bind(this)}">
            <span class="carousel-control-prev-icon bx bx-chevron-left" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" aria-label="carousel-control-next"  role="button" data-slide="next" @click="${(this._toggleSides).bind(this)}">
            <span class="carousel-control-next-icon bx bx-chevron-right" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
          </div>
        </section><!-- End Hero -->
       <main slot="main" id="main">
          <!-- ======= Services Section ======= -->
          <section class="services" aria-label="services" >
            <div class="container">
              <div class="row" id="services">

              </div>
            </div>
          </section><!-- End Services Section -->

          <!-- ======= Why Us Section ======= -->
          <section class="why-us section-bg" data-aos="fade-up" date-aos-delay="200">
            <div class="container">

              <div class="row" id="why-us">

              </div>

            </div>
          </section><!-- End Why Us Section -->

          <!-- ======= Features Section ======= -->
          <section class="features">
            <div class="container">

              <div class="section-title">
                <h2>Features</h2>
                <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint
                  consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit
                  in iste officiis commodi quidem hic quas.</p>
              </div>

              <div class="row" data-aos="fade-up">
                <div class="col-md-5">
                  <img src="assets/img/features-1.svg" class="img-fluid" alt="">
                </div>
                <div class="col-md-7 pt-4">
                  <h3>Voluptatem dignissimos provident quasi corporis voluptates sit assumenda.</h3>
                  <p class="font-italic">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                    dolore
                    magna aliqua.
                  </p>
                  <ul>
                    <li><i class="icofont-check"></i> Ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
                    <li><i class="icofont-check"></i> Duis aute irure dolor in reprehenderit in voluptate velit.</li>
                  </ul>
                </div>
              </div>

              <div class="row" data-aos="fade-up">
                <div class="col-md-5 order-1 order-md-2">
                  <img src="assets/img/features-2.svg" class="img-fluid" alt="">
                </div>
                <div class="col-md-7 pt-5 order-2 order-md-1">
                  <h3>Corporis temporibus maiores provident</h3>
                  <p class="font-italic">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                    dolore
                    magna aliqua.
                  </p>
                  <p>
                    Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                    voluptate
                    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum
                  </p>
                </div>
              </div>

              <div class="row" data-aos="fade-up">
                <div class="col-md-5">
                  <img src="assets/img/features-3.svg" class="img-fluid" alt="">
                </div>
                <div class="col-md-7 pt-5">
                  <h3>Sunt consequatur ad ut est nulla consectetur reiciendis animi voluptas</h3>
                  <p>Cupiditate placeat cupiditate placeat est ipsam culpa. Delectus quia minima quod. Sunt saepe odit aut
                    quia voluptatem hic voluptas dolor doloremque.</p>
                  <ul>
                    <li><i class="icofont-check"></i> Ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
                    <li><i class="icofont-check"></i> Duis aute irure dolor in reprehenderit in voluptate velit.</li>
                    <li><i class="icofont-check"></i> Facilis ut et voluptatem aperiam. Autem soluta ad fugiat.</li>
                  </ul>
                </div>
              </div>

              <div class="row" data-aos="fade-up">
                <div class="col-md-5 order-1 order-md-2">
                  <img src="assets/img/features-4.svg" class="img-fluid" alt="">
                </div>
                <div class="col-md-7 pt-5 order-2 order-md-1">
                  <h3>Quas et necessitatibus eaque impedit ipsum animi consequatur incidunt in</h3>
                  <p class="font-italic">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                    dolore
                    magna aliqua.
                  </p>
                  <p>
                    Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                    voluptate
                    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum
                  </p>
                </div>
              </div>

            </div>
          </section><!-- End Features Section -->

        </main><!-- End #main -->`
            render(mainTemplate(), this)
        } catch (err) {
            throw err
        }
    }

    _setServices(data) {
            try {
                var styleArray = [`bx bxl-dribbble`, `bx bx-file`, `bx bx-tachometer`, `bx bx-world`]
                const carrocelItemTemplate = (services, styles) => litHtml `${services.map((service, idx) => {
        return litHtml`<div aria-labelledby="services" class="col-md-6 col-lg-3 d-flex align-items-stretch" data-aos="fade-up">
                      <div class="icon-box icon-box-pink">
                        <div class="icon"><i class="${styles[idx]}"></i></div>
                        <h4 class="title"><a href="">${service.articleName}</a></h4>
                        <p class="description">${service.description}</p>
                      </div>
                    </div>`
      })}`
      render(carrocelItemTemplate(data, styleArray), document.querySelector("#services"))
    } catch (err) {
      throw err
    }
  }

  _setWhyUs(data) {
    try {
      const styles = ["bx-fingerprint", "bx-gift"]
      const carrocelItemTemplate = (us) => litHtml`
                <div class="col-lg-6 video-box">
                  <img src="assets/img/why-us.jpg" class="img-fluid" alt="">
                  <a href="${us.image}"} class="venobox play-btn mb-4" data-vbtype="video"
                    data-autoplay="true"></a>
                </div>

                <div class="col-lg-6 d-flex flex-column justify-content-center p-5">
                  ${us.content.map((item, idx) => litHtml`<div class="icon-box">
                    <div class="icon"><i class="bx ${styles[idx]}"></i></div>
                    <h4 class="title"><a href="">${item.articleName}</a></h4>
                    <p class="description">${item.description}</p>
                  </div>`)}
                </div>`
      render(carrocelItemTemplate(data), document.querySelector("#why-us"))
    } catch (err) {
      throw err
    }
  }

  _getContent() {
    if (this.type === this.query.type) {
      try {
        const graphQlUrl = `http://127.0.0.1:3000/api/app`,
          method = 'POST',
          carrocelQ = `getArticleData(removed: false, Published: "NP", category: "${this.page}/carrocel", lang: "${this.lang}") {
                      description
                      type
                      articleName
                    }
                    pageDataIamges(id: "${this.page}") {
                      url
                    }`,
          servicesQ = `getArticleData(Published: "NP", removed: false, lang: "${this.lang}", category: "${this.page}/services") {
                    articleName                  
                    description                  
                  }`,
          whyUsQ = `getSubCatecoryImages(id: "${this.page}", path: "${this.page}/why us") {
                    url
                  }
                  getArticleData(Published: "NP", removed: false, lang: "pt", category: "${this.page}/why us") {
                    articleName
                    description
                  }`
        /////////////////////////////////////////carrocel query\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
        request(graphQlUrl, method, carrocelQ)
          .then(res => res.json())
          .then(res => {
            //console.log(res)
            let url = res.data.pageDataIamges.length > 0 ? res.data.pageDataIamges[0].url : ""
            this.itemsArray = res.data.getArticleData
            this._toggleSides()
            afterNextRender(this, () => {
              document.querySelector('style').innerHTML +=
                ` #hero:: after {
            background: linear - gradient(to right, rgba(30, 67, 86, 0.8), rgba(30, 67, 86, 0.6)), url("${url}") center top no - repeat fixed;
          }`
            })
            //console.log(this.itemsArray)
          })
        /////////////////////////////////////////services query\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
        request(graphQlUrl, method, servicesQ)
          .then(res => res.json())
          .then(res => {
            this.set('services', res.data.getArticleData)
          })
        ////////////////////////////////////////why us query\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
        request(graphQlUrl, method, whyUsQ)
          .then(res => res.json())
          .then(res => {
            let obj = { image: '', content: {} }
            obj.image = res.data.getSubCatecoryImages.url
            obj.content = res.data.getArticleData
            this.set('whyUs', obj)
          })/* */
      } catch (err) {
        throw err
      }
    } else {
      throw 'types do not match: ' + this.type + ' ' + this.query.type
    }
  }
}
customElements.define(homePage.is, homePage);