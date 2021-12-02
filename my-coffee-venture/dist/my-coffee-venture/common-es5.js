(function () {
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"], {
    /***/
    "7mip":
    /*!******************************************************************************!*\
      !*** ./src/app/module/sticky/modules/user-shop/user-shop-request.payload.ts ***!
      \******************************************************************************/

    /*! exports provided: UserShopRequestPayload */

    /***/
    function mip(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "UserShopRequestPayload", function () {
        return UserShopRequestPayload;
      });
      /* harmony import */


      var _common_http_request_payload_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../common/http/request-payload.model */
      "FMWu");

      var UserShopRequestPayload = /*#__PURE__*/function (_common_http_request_) {
        _inherits(UserShopRequestPayload, _common_http_request_);

        var _super = _createSuper(UserShopRequestPayload);

        function UserShopRequestPayload() {
          _classCallCheck(this, UserShopRequestPayload);

          return _super.apply(this, arguments);
        }

        return UserShopRequestPayload;
      }(_common_http_request_payload_model__WEBPACK_IMPORTED_MODULE_0__["RequestPayload"]);
      /***/

    },

    /***/
    "rF8k":
    /*!**********************************************************************!*\
      !*** ./src/app/module/sticky/modules/user-shop/user-shop.service.ts ***!
      \**********************************************************************/

    /*! exports provided: UserShopService */

    /***/
    function rF8k(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "UserShopService", function () {
        return UserShopService;
      });
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! rxjs/operators */
      "kU1M");
      /* harmony import */


      var _common_http_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../common/http/http.service */
      "ivkc");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");

      var UserShopService = /*#__PURE__*/function (_common_http_http_ser) {
        _inherits(UserShopService, _common_http_http_ser);

        var _super2 = _createSuper(UserShopService);

        function UserShopService() {
          var _this;

          _classCallCheck(this, UserShopService);

          _this = _super2.call(this);
          _this.url = _this.origin + 'user-shop';
          return _this;
        } // public insertShop(body: BaseResponse, isSpinner?: boolean): Observable<any> {
        //     return this.intercept(this.httpClient.post<any>(`${this.url}/insert-shop`,
        //         JSON.stringify(body), { observe: 'response', headers: this.getHeaders() }), isSpinner)
        //         .pipe(map(r => r.body));
        // }


        _createClass(UserShopService, [{
          key: "deleteShopFromUser",
          value: function deleteShopFromUser(request, isSpinner) {
            return this.intercept(this.httpClient["delete"]("".concat(this.url, "/delete-user-shop"), {
              observe: 'response',
              headers: this.getHeaders(),
              params: this.toParams(request)
            }), isSpinner).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (r) {
              return r.body;
            }));
          }
        }]);

        return UserShopService;
      }(_common_http_http_service__WEBPACK_IMPORTED_MODULE_1__["HttpService"]);

      UserShopService.ɵfac = function UserShopService_Factory(t) {
        return new (t || UserShopService)();
      };

      UserShopService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
        token: UserShopService,
        factory: UserShopService.ɵfac,
        providedIn: 'root'
      });
      /***/
    }
  }]);
})();
//# sourceMappingURL=common-es5.js.map