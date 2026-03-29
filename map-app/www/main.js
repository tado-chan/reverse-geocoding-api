(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["main"],{

/***/ 4114
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppRoutingModule: () => (/* binding */ AppRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ 4487);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 4205);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2481);
var _staticBlock;



const routes = [{
  path: 'map-test',
  loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_ionic_core_components_p-CBzELu-H_js"), __webpack_require__.e("common"), __webpack_require__.e("src_app_pages_map-test_map-test_page_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/map-test/map-test.page */ 2609)).then(m => m.MapTestPage)
}, {
  path: '',
  redirectTo: 'map-test',
  pathMatch: 'full'
}];
class AppRoutingModule {
  static #_ = _staticBlock = () => (this.ɵfac = function AppRoutingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || AppRoutingModule)();
  }, this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
    type: AppRoutingModule
  }), this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__.RouterModule.forRoot(routes, {
      preloadingStrategy: _angular_router__WEBPACK_IMPORTED_MODULE_0__.PreloadAllModules
    }), _angular_router__WEBPACK_IMPORTED_MODULE_0__.RouterModule]
  }));
}
_staticBlock();
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](AppRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__.RouterModule]
  });
})();

/***/ },

/***/ 92
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppComponent: () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2481);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ 1507);
var _staticBlock;


class AppComponent {
  constructor() {}
  static #_ = _staticBlock = () => (this.ɵfac = function AppComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || AppComponent)();
  }, this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: AppComponent,
    selectors: [["app-root"]],
    standalone: false,
    decls: 2,
    vars: 0,
    template: function AppComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ion-app");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "ion-router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }
    },
    dependencies: [_ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonApp, _ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonRouterOutlet],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  }));
}
_staticBlock();

/***/ },

/***/ 635
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppModule: () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ 2190);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 5422);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 3855);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ 1507);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 4059);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ 92);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app-routing.module */ 4114);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 4205);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 2481);
var _staticBlock;








class AppModule {
  static #_ = _staticBlock = () => (this.ɵfac = function AppModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || AppModule)();
  }, this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineNgModule"]({
    type: AppModule,
    bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__.AppComponent]
  }), this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjector"]({
    providers: [{
      provide: _angular_router__WEBPACK_IMPORTED_MODULE_1__.RouteReuseStrategy,
      useClass: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonicRouteStrategy
    }],
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__.BrowserModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClientModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonicModule.forRoot(), _app_routing_module__WEBPACK_IMPORTED_MODULE_6__.AppRoutingModule]
  }));
}
_staticBlock();
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetNgModuleScope"](AppModule, {
    declarations: [_app_component__WEBPACK_IMPORTED_MODULE_5__.AppComponent],
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__.BrowserModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClientModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonicModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_6__.AppRoutingModule]
  });
})();

/***/ },

/***/ 4429
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ 2190);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app/app.module */ 635);


_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_1__.AppModule).catch(err => console.log(err));

/***/ },

/***/ 6120
/*!****************************************************************************************************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/ lazy ^\.\/.*\.entry\.js$ include: \.entry\.js$ exclude: \.system\.entry\.js$ referencedExports: ,  namespace object ***!
  \****************************************************************************************************************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var map = {
	"./ion-accordion_2.entry.js": [
		7518,
		[
			"common",
			"node_modules_ionic_core_dist_esm_ion-accordion_2_entry_js"
		]
	],
	"./ion-action-sheet.entry.js": [
		1981,
		[
			"common",
			"node_modules_ionic_core_dist_esm_ion-action-sheet_entry_js"
		]
	],
	"./ion-alert.entry.js": [
		1603,
		[
			"common",
			"node_modules_ionic_core_dist_esm_ion-alert_entry_js"
		]
	],
	"./ion-app_8.entry.js": [
		2273,
		[
			"common",
			"node_modules_ionic_core_dist_esm_ion-app_8_entry_js"
		]
	],
	"./ion-avatar_3.entry.js": [
		9642,
		[
			"node_modules_ionic_core_dist_esm_ion-avatar_3_entry_js"
		]
	],
	"./ion-back-button.entry.js": [
		2095,
		[
			"common",
			"node_modules_ionic_core_dist_esm_ion-back-button_entry_js"
		]
	],
	"./ion-backdrop.entry.js": [
		2335,
		[
			"node_modules_ionic_core_dist_esm_ion-backdrop_entry_js"
		]
	],
	"./ion-breadcrumb_2.entry.js": [
		8221,
		[
			"common",
			"node_modules_ionic_core_dist_esm_ion-breadcrumb_2_entry_js"
		]
	],
	"./ion-button_2.entry.js": [
		7184,
		[
			"node_modules_ionic_core_dist_esm_ion-button_2_entry_js"
		]
	],
	"./ion-card_5.entry.js": [
		8759,
		[
			"node_modules_ionic_core_dist_esm_ion-card_5_entry_js"
		]
	],
	"./ion-checkbox.entry.js": [
		4248,
		[
			"node_modules_ionic_core_dist_esm_ion-checkbox_entry_js"
		]
	],
	"./ion-chip.entry.js": [
		9863,
		[
			"node_modules_ionic_core_dist_esm_ion-chip_entry_js"
		]
	],
	"./ion-col_3.entry.js": [
		1769,
		[
			"node_modules_ionic_core_dist_esm_ion-col_3_entry_js"
		]
	],
	"./ion-datetime-button.entry.js": [
		2569,
		[
			"default-node_modules_ionic_core_dist_esm_data-B9iGR5YO_js",
			"node_modules_ionic_core_dist_esm_ion-datetime-button_entry_js"
		]
	],
	"./ion-datetime_3.entry.js": [
		6534,
		[
			"default-node_modules_ionic_core_dist_esm_data-B9iGR5YO_js",
			"common",
			"node_modules_ionic_core_dist_esm_ion-datetime_3_entry_js"
		]
	],
	"./ion-fab_3.entry.js": [
		5458,
		[
			"common",
			"node_modules_ionic_core_dist_esm_ion-fab_3_entry_js"
		]
	],
	"./ion-img.entry.js": [
		654,
		[
			"node_modules_ionic_core_dist_esm_ion-img_entry_js"
		]
	],
	"./ion-infinite-scroll_2.entry.js": [
		6034,
		[
			"common",
			"node_modules_ionic_core_dist_esm_ion-infinite-scroll_2_entry_js"
		]
	],
	"./ion-input-otp.entry.js": [
		381,
		[
			"common",
			"node_modules_ionic_core_dist_esm_ion-input-otp_entry_js"
		]
	],
	"./ion-input-password-toggle.entry.js": [
		5196,
		[
			"common",
			"node_modules_ionic_core_dist_esm_ion-input-password-toggle_entry_js"
		]
	],
	"./ion-input.entry.js": [
		761,
		[
			"default-node_modules_ionic_core_dist_esm_input_utils-Bxa_DQ7-_js-node_modules_ionic_core_dist-66891c",
			"common",
			"node_modules_ionic_core_dist_esm_ion-input_entry_js"
		]
	],
	"./ion-item-option_3.entry.js": [
		6492,
		[
			"common",
			"node_modules_ionic_core_dist_esm_ion-item-option_3_entry_js"
		]
	],
	"./ion-item_8.entry.js": [
		9557,
		[
			"common",
			"node_modules_ionic_core_dist_esm_ion-item_8_entry_js"
		]
	],
	"./ion-loading.entry.js": [
		8353,
		[
			"common",
			"node_modules_ionic_core_dist_esm_ion-loading_entry_js"
		]
	],
	"./ion-menu_3.entry.js": [
		1024,
		[
			"common",
			"node_modules_ionic_core_dist_esm_ion-menu_3_entry_js"
		]
	],
	"./ion-modal.entry.js": [
		9160,
		[
			"common",
			"node_modules_ionic_core_dist_esm_ion-modal_entry_js"
		]
	],
	"./ion-nav_2.entry.js": [
		393,
		[
			"node_modules_ionic_core_dist_esm_ion-nav_2_entry_js"
		]
	],
	"./ion-picker-column-option.entry.js": [
		8442,
		[
			"node_modules_ionic_core_dist_esm_ion-picker-column-option_entry_js"
		]
	],
	"./ion-picker-column.entry.js": [
		3110,
		[
			"common",
			"node_modules_ionic_core_dist_esm_ion-picker-column_entry_js"
		]
	],
	"./ion-picker.entry.js": [
		5575,
		[
			"node_modules_ionic_core_dist_esm_ion-picker_entry_js"
		]
	],
	"./ion-popover.entry.js": [
		6772,
		[
			"common",
			"node_modules_ionic_core_dist_esm_ion-popover_entry_js"
		]
	],
	"./ion-progress-bar.entry.js": [
		4810,
		[
			"node_modules_ionic_core_dist_esm_ion-progress-bar_entry_js"
		]
	],
	"./ion-radio_2.entry.js": [
		4639,
		[
			"common",
			"node_modules_ionic_core_dist_esm_ion-radio_2_entry_js"
		]
	],
	"./ion-range.entry.js": [
		628,
		[
			"common",
			"node_modules_ionic_core_dist_esm_ion-range_entry_js"
		]
	],
	"./ion-refresher_2.entry.js": [
		852,
		[
			"common",
			"node_modules_ionic_core_dist_esm_ion-refresher_2_entry_js"
		]
	],
	"./ion-reorder_2.entry.js": [
		1479,
		[
			"common",
			"node_modules_ionic_core_dist_esm_ion-reorder_2_entry_js"
		]
	],
	"./ion-ripple-effect.entry.js": [
		4065,
		[
			"node_modules_ionic_core_dist_esm_ion-ripple-effect_entry_js"
		]
	],
	"./ion-route_4.entry.js": [
		7971,
		[
			"node_modules_ionic_core_dist_esm_ion-route_4_entry_js"
		]
	],
	"./ion-searchbar.entry.js": [
		3184,
		[
			"common",
			"node_modules_ionic_core_dist_esm_ion-searchbar_entry_js"
		]
	],
	"./ion-segment-content.entry.js": [
		4312,
		[
			"node_modules_ionic_core_dist_esm_ion-segment-content_entry_js"
		]
	],
	"./ion-segment-view.entry.js": [
		4540,
		[
			"common",
			"node_modules_ionic_core_dist_esm_ion-segment-view_entry_js"
		]
	],
	"./ion-segment_2.entry.js": [
		469,
		[
			"common",
			"node_modules_ionic_core_dist_esm_ion-segment_2_entry_js"
		]
	],
	"./ion-select-modal.entry.js": [
		7101,
		[
			"node_modules_ionic_core_dist_esm_ion-select-modal_entry_js"
		]
	],
	"./ion-select_3.entry.js": [
		8471,
		[
			"common",
			"node_modules_ionic_core_dist_esm_ion-select_3_entry_js"
		]
	],
	"./ion-spinner.entry.js": [
		388,
		[
			"common",
			"node_modules_ionic_core_dist_esm_ion-spinner_entry_js"
		]
	],
	"./ion-split-pane.entry.js": [
		2392,
		[
			"node_modules_ionic_core_dist_esm_ion-split-pane_entry_js"
		]
	],
	"./ion-tab-bar_2.entry.js": [
		6059,
		[
			"common",
			"node_modules_ionic_core_dist_esm_ion-tab-bar_2_entry_js"
		]
	],
	"./ion-tab_2.entry.js": [
		5427,
		[
			"node_modules_ionic_core_dist_esm_ion-tab_2_entry_js"
		]
	],
	"./ion-text.entry.js": [
		198,
		[
			"node_modules_ionic_core_dist_esm_ion-text_entry_js"
		]
	],
	"./ion-textarea.entry.js": [
		1735,
		[
			"default-node_modules_ionic_core_dist_esm_input_utils-Bxa_DQ7-_js-node_modules_ionic_core_dist-66891c",
			"node_modules_ionic_core_dist_esm_ion-textarea_entry_js"
		]
	],
	"./ion-toast.entry.js": [
		7510,
		[
			"common",
			"node_modules_ionic_core_dist_esm_ion-toast_entry_js"
		]
	],
	"./ion-toggle.entry.js": [
		5297,
		[
			"common",
			"node_modules_ionic_core_dist_esm_ion-toggle_entry_js"
		]
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(() => {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
});
	}

	var ids = map[req], id = ids[0];
	return Promise.all(ids[1].map(__webpack_require__.e)).then(() => (__webpack_require__(id)));
}
webpackAsyncContext.keys = () => (Object.keys(map));
webpackAsyncContext.id = 6120;
module.exports = webpackAsyncContext;

/***/ }

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4429)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map