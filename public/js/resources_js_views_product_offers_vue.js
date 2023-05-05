(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_product_offers_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/tables/product_offers_table.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/tables/product_offers_table.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "product_offers_table",
  props: ['product_offers'],
  methods: {
    convert_date: function convert_date(dateString) {
      // return new Promise ((resolve, reject) => {
      var date = new Date(Date.parse(dateString));
      var months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
      return "".concat(date.getDate(), " ").concat(months[date.getMonth()], " (").concat(date.getFullYear() % 1000, "\u0433.)");
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/product_offers.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/product_offers.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_tables_product_offers_table__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/tables/product_offers_table */ "./resources/js/components/tables/product_offers_table.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "product_offers",
  components: {
    product_offers_table: _components_tables_product_offers_table__WEBPACK_IMPORTED_MODULE_0__.default
  },
  metaInfo: function metaInfo() {
    return {
      title: this.$title('Product Offers')
    };
  },
  data: function data() {
    return {
      page: +this.$route.query.page || 1,
      res: {},
      loading: true,
      class_name: "product_offers",
      code: ''
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.$store.dispatch('fetch_product_offers').then(function (res) {
      _this.res = res;
      _this.loading = false;
    });
    MicroModal.init();
  },
  computed: {
    product_offers: function product_offers() {
      return this.$store.getters.product_offers;
    },
    pageSize: function pageSize() {
      return this.res.meta.per_page;
    },
    pageCount: function pageCount() {
      return this.res.meta.last_page;
    }
  },
  methods: {
    deliver: function deliver(code) {
      this.$store.dispatch('deliver_product_offer', code);
    },
    pageChangeHandler: function pageChangeHandler(page) {
      var _this2 = this;

      this.loading = true;
      this.$router.push("".concat(this.$route.path, "?page=").concat(page));
      this.$store.dispatch("fetch_".concat(this.class_name), page).then(function () {
        _this2.loading = false;
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/components/tables/product_offers_table.vue":
/*!*****************************************************************!*\
  !*** ./resources/js/components/tables/product_offers_table.vue ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _product_offers_table_vue_vue_type_template_id_8da12a36_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./product_offers_table.vue?vue&type=template&id=8da12a36&scoped=true& */ "./resources/js/components/tables/product_offers_table.vue?vue&type=template&id=8da12a36&scoped=true&");
/* harmony import */ var _product_offers_table_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./product_offers_table.vue?vue&type=script&lang=js& */ "./resources/js/components/tables/product_offers_table.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _product_offers_table_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _product_offers_table_vue_vue_type_template_id_8da12a36_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _product_offers_table_vue_vue_type_template_id_8da12a36_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "8da12a36",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/tables/product_offers_table.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/product_offers.vue":
/*!***********************************************!*\
  !*** ./resources/js/views/product_offers.vue ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _product_offers_vue_vue_type_template_id_29847bb4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./product_offers.vue?vue&type=template&id=29847bb4&scoped=true& */ "./resources/js/views/product_offers.vue?vue&type=template&id=29847bb4&scoped=true&");
/* harmony import */ var _product_offers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./product_offers.vue?vue&type=script&lang=js& */ "./resources/js/views/product_offers.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _product_offers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _product_offers_vue_vue_type_template_id_29847bb4_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _product_offers_vue_vue_type_template_id_29847bb4_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "29847bb4",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/product_offers.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/tables/product_offers_table.vue?vue&type=script&lang=js&":
/*!******************************************************************************************!*\
  !*** ./resources/js/components/tables/product_offers_table.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_product_offers_table_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./product_offers_table.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/tables/product_offers_table.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_product_offers_table_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/views/product_offers.vue?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./resources/js/views/product_offers.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_product_offers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./product_offers.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/product_offers.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_product_offers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/components/tables/product_offers_table.vue?vue&type=template&id=8da12a36&scoped=true&":
/*!************************************************************************************************************!*\
  !*** ./resources/js/components/tables/product_offers_table.vue?vue&type=template&id=8da12a36&scoped=true& ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_product_offers_table_vue_vue_type_template_id_8da12a36_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_product_offers_table_vue_vue_type_template_id_8da12a36_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_product_offers_table_vue_vue_type_template_id_8da12a36_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./product_offers_table.vue?vue&type=template&id=8da12a36&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/tables/product_offers_table.vue?vue&type=template&id=8da12a36&scoped=true&");


/***/ }),

/***/ "./resources/js/views/product_offers.vue?vue&type=template&id=29847bb4&scoped=true&":
/*!******************************************************************************************!*\
  !*** ./resources/js/views/product_offers.vue?vue&type=template&id=29847bb4&scoped=true& ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_product_offers_vue_vue_type_template_id_29847bb4_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_product_offers_vue_vue_type_template_id_29847bb4_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_product_offers_vue_vue_type_template_id_29847bb4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./product_offers.vue?vue&type=template&id=29847bb4&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/product_offers.vue?vue&type=template&id=29847bb4&scoped=true&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/tables/product_offers_table.vue?vue&type=template&id=8da12a36&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/tables/product_offers_table.vue?vue&type=template&id=8da12a36&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("table", { staticClass: "striped" }, [
    _vm._m(0),
    _vm._v(" "),
    _c(
      "tbody",
      _vm._l(_vm.product_offers, function(product_offer) {
        return _c("tr", { key: product_offer.code }, [
          _c("td", [_vm._v(_vm._s(product_offer.code))]),
          _vm._v(" "),
          _c("td", [_vm._v(_vm._s(product_offer.product.title))]),
          _vm._v(" "),
          _c("td", [_vm._v(_vm._s(product_offer.address))]),
          _vm._v(" "),
          _c("td", [_vm._v(_vm._s(_vm.convert_date(product_offer.start_at)))]),
          _vm._v(" "),
          _c("td", { staticStyle: { position: "relative" } }, [
            !product_offer.delivered_at
              ? _c(
                  "button",
                  {
                    directives: [
                      {
                        name: "tooltip",
                        rawName: "v-tooltip.noloc",
                        value: "Доставить (дата-сегодня)",
                        expression: "'Доставить (дата-сегодня)'",
                        modifiers: { noloc: true }
                      }
                    ],
                    staticClass: "btn btn-manage-round",
                    staticStyle: {
                      position: "relative",
                      left: "-17.5px",
                      display: "block",
                      margin: "0 auto"
                    },
                    attrs: { "data-position": "top" },
                    on: {
                      click: function($event) {
                        return _vm.$emit("deliver", product_offer.code)
                      }
                    }
                  },
                  [
                    _c(
                      "i",
                      {
                        staticClass: "small material-icons",
                        staticStyle: { cursor: "pointer" }
                      },
                      [_vm._v("clear_all")]
                    )
                  ]
                )
              : _c("span", [
                  _vm._v(_vm._s(_vm.convert_date(product_offer.delivered_at)))
                ])
          ]),
          _vm._v(" "),
          _c("td", [_vm._v(_vm._s(_vm.convert_date(product_offer.end_at)))]),
          _vm._v(" "),
          _c("td", [
            _c(
              "span",
              {
                directives: [
                  {
                    name: "tooltip",
                    rawName: "v-tooltip.noloc",
                    value: (function() {
                      return (
                        product_offer.product.title +
                        " " +
                        product_offer.product.price +
                        "₽x" +
                        product_offer.count +
                        "=" +
                        product_offer.product.price * product_offer.count +
                        "<br>"
                      )
                    })(),
                    expression:
                      "(function(){return product_offer.product.title + ` ${product_offer.product.price}₽x${product_offer.count}=${product_offer.product.price*product_offer.count}` + '<br>'}())",
                    modifiers: { noloc: true }
                  }
                ],
                staticStyle: {
                  padding: "1px 5px",
                  "border-radius": "5px",
                  border: "1px solid orangered"
                },
                attrs: { "data-position": "top" }
              },
              [
                _vm._v(
                  "\n          " +
                    _vm._s(product_offer.count * product_offer.product.price) +
                    "\n        "
                )
              ]
            )
          ])
        ])
      }),
      0
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th", [_vm._v("Код")]),
        _vm._v(" "),
        _c("th", [_vm._v("Товар")]),
        _vm._v(" "),
        _c("th", [_vm._v("Адрес")]),
        _vm._v(" "),
        _c("th", [_vm._v("Доставить от")]),
        _vm._v(" "),
        _c("th", [_vm._v("Дата доставки")]),
        _vm._v(" "),
        _c("th", [_vm._v("Доставить до")]),
        _vm._v(" "),
        _c("th", [_vm._v("Сумма")]),
        _vm._v(" "),
        _c("th"),
        _vm._v(" "),
        _c("th")
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/product_offers.vue?vue&type=template&id=29847bb4&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/product_offers.vue?vue&type=template&id=29847bb4&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _vm.loading
        ? _c("Loader")
        : !_vm.product_offers.length
        ? _c("p", { staticClass: "center" }, [
            _vm._v("\n    " + _vm._s(_vm._f("localize")("NoRecords")) + "\n  ")
          ])
        : _c(
            "div",
            [
              _c("product_offers_table", {
                attrs: { product_offers: _vm.product_offers },
                on: { deliver: _vm.deliver }
              }),
              _vm._v(" "),
              _vm.res.meta.last_page !== 1
                ? _c("Paginate", {
                    attrs: {
                      "page-count": _vm.pageCount,
                      "margin-pages": 2,
                      "click-handler": _vm.pageChangeHandler,
                      "prev-text": "&laquo;",
                      "next-text": "&raquo;",
                      "container-class": "pagination",
                      "page-class": "waves-effect",
                      "active-class": "active_pagination"
                    },
                    model: {
                      value: _vm.page,
                      callback: function($$v) {
                        _vm.page = $$v
                      },
                      expression: "page"
                    }
                  })
                : _vm._e()
            ],
            1
          )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);