(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "7mip":
/*!******************************************************************************!*\
  !*** ./src/app/module/sticky/modules/user-shop/user-shop-request.payload.ts ***!
  \******************************************************************************/
/*! exports provided: UserShopRequestPayload */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserShopRequestPayload", function() { return UserShopRequestPayload; });
/* harmony import */ var _common_http_request_payload_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/http/request-payload.model */ "FMWu");

class UserShopRequestPayload extends _common_http_request_payload_model__WEBPACK_IMPORTED_MODULE_0__["RequestPayload"] {
}


/***/ }),

/***/ "rF8k":
/*!**********************************************************************!*\
  !*** ./src/app/module/sticky/modules/user-shop/user-shop.service.ts ***!
  \**********************************************************************/
/*! exports provided: UserShopService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserShopService", function() { return UserShopService; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _common_http_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/http/http.service */ "ivkc");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");



class UserShopService extends _common_http_http_service__WEBPACK_IMPORTED_MODULE_1__["HttpService"] {
    constructor() {
        super();
        this.url = this.origin + 'user-shop';
    }
    // public insertShop(body: BaseResponse, isSpinner?: boolean): Observable<any> {
    //     return this.intercept(this.httpClient.post<any>(`${this.url}/insert-shop`,
    //         JSON.stringify(body), { observe: 'response', headers: this.getHeaders() }), isSpinner)
    //         .pipe(map(r => r.body));
    // }
    deleteShopFromUser(request, isSpinner) {
        return this.intercept(this.httpClient.delete(`${this.url}/delete-user-shop`, { observe: 'response', headers: this.getHeaders(), params: this.toParams(request) }), isSpinner)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(r => r.body));
    }
}
UserShopService.ɵfac = function UserShopService_Factory(t) { return new (t || UserShopService)(); };
UserShopService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: UserShopService, factory: UserShopService.ɵfac, providedIn: 'root' });


/***/ })

}]);
//# sourceMappingURL=common-es2015.js.map