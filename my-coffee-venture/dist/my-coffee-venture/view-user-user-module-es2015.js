(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["view-user-user-module"],{

/***/ "asUO":
/*!************************************************************!*\
  !*** ./src/app/view/user/user-view/user-view.component.ts ***!
  \************************************************************/
/*! exports provided: UserViewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserViewComponent", function() { return UserViewComponent; });
/* harmony import */ var src_app_module_sticky_modules_journal_journal_request_payload__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/module/sticky/modules/journal/journal-request.payload */ "e28A");
/* harmony import */ var src_app_module_sticky_modules_review_review_request_payload__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/module/sticky/modules/review/review-request.payload */ "xP/o");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_module_sticky_modules_journal_journal_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/module/sticky/modules/journal/journal.service */ "dD+E");
/* harmony import */ var src_app_module_sticky_modules_review_review_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/module/sticky/modules/review/review.service */ "R1yZ");
/* harmony import */ var _module_sticky_common_notification_notification_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../module/sticky/common/notification/notification.service */ "w6oe");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _module_sticky_modules_user_user_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../../../module/sticky/modules/user/user.service */ "5I3+");
/* harmony import */ var ngx_infinite_scroll__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-infinite-scroll */ "dlKe");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _module_sticky_post_post_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../module/sticky/post/post.component */ "h/6y");
/* harmony import */ var _module_sticky_base_base_waiting_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../module/sticky/base/base-waiting.component */ "vR4d");
/* harmony import */ var _module_sticky_review_review_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../module/sticky/review/review.component */ "IaCn");













function UserViewComponent_div_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "app-post", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const i_r4 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("id", i_r4.id)("status", i_r4.status)("feeling", i_r4.feeling)("createdAt", i_r4.createdAt)("content", i_r4.content)("name", "Testing user")("service", ctx_r0.journalService)("userName", i_r4.name);
} }
function UserViewComponent_app_waiting_19_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "app-waiting");
} }
function UserViewComponent_div_22_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "app-review", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const i_r5 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("id", i_r5.id)("status", i_r5.status)("rating", i_r5.rating)("createdAt", i_r5.createdAt)("content", i_r5.content)("name", "Testing user")("service", ctx_r2.reviewService)("userName", i_r5.userName);
} }
function UserViewComponent_app_waiting_23_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "app-waiting");
} }
class UserViewComponent {
    constructor(cdr, journalService, reviewService, noti, route, userService) {
        this.cdr = cdr;
        this.journalService = journalService;
        this.reviewService = reviewService;
        this.noti = noti;
        this.route = route;
        this.userService = userService;
        this.stopScrolling = false;
        this.stopScrollingReview = false;
        this.formDataAdd = new FormData();
        this.daysSelected = [];
        this.isLoaded = false;
        this.journalAdd = {};
        this.dataSource = {};
        this.dataSourceReview = {};
        this.images = [];
        this.isLoadedReview = false;
        this.request = new src_app_module_sticky_modules_journal_journal_request_payload__WEBPACK_IMPORTED_MODULE_0__["JournalRequestPayload"]();
        this.reviewRequest = new src_app_module_sticky_modules_review_review_request_payload__WEBPACK_IMPORTED_MODULE_1__["ReviewRequestPayload"]();
        this.imageUrl = 'assets/img/cf_bg1.jpg';
    }
    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            // this.id = +params['id']; // (+) converts string 'id' to a number
            this.id = params['id'];
            this.userService.viewUserById(this.id).subscribe(res => {
                this.imageUrl = res.avatarPath ? res.avatarPath : 'assets/img/cf_bg1.jpg';
                this.userName = res.userName;
                this.request.createdBy = this.id;
                this.reviewRequest.createdBy = this.id;
                this.request.status = 1;
                this.reviewRequest.status = 1;
                this.initJournal();
                this.initReview();
            });
        });
    }
    initReview() {
        this.reviewRequest.pageIndex = 0;
        this.reviewRequest.pageSize = 3;
        this.reviewService.getAll(this.reviewRequest).subscribe(res => {
            this.dataSourceReview.items = res;
            this.dataSourceReview.items.forEach(element => {
                let temp = [];
                if (element.imageDirectories && element.imageDirectories.length > 0) {
                    element.imageDirectories.forEach(e => {
                        temp.push(e);
                        // reader.readAsDataURL(new Blob(e.imagePath]));
                    });
                    element.images = temp;
                    if (element.images) {
                        element.image = element.images[0];
                    }
                }
            });
        });
    }
    initJournal() {
        this.request.pageIndex = 0;
        this.request.pageSize = 3;
        this.journalService.getAll(this.request).subscribe(res => {
            this.dataSource.items = res;
            this.dataSource.items.forEach(element => {
                let temp = [];
                if (element.imageDirectories && element.imageDirectories.length > 0) {
                    element.imageDirectories.forEach(e => {
                        temp.push(e);
                        // reader.readAsDataURL(new Blob(e.imagePath]));
                    });
                    element.images = temp;
                    if (element.images) {
                        element.image = element.images[0];
                    }
                }
            });
        });
    }
    onScrollDownReview() {
        if (this.stopScrollingReview == true) {
            this.isLoadedReview = true;
            return;
        }
        this.isLoadedReview = false;
        this.reviewRequest.pageIndex++;
        this.reviewService.getAll(this.reviewRequest).subscribe(res => {
            if (!res || res == [] || res.length == 0) {
                this.stopScrollingReview = true;
                return;
            }
            res.forEach(element => {
                let temp = [];
                if (element.imageDirectories && element.imageDirectories.length > 0) {
                    element.imageDirectories.forEach(e => {
                        temp.push(e);
                        // reader.readAsDataURL(new Blob(e.imagePath]));
                    });
                    element.images = temp;
                }
            });
            this.isLoadedReview = true;
            this.dataSourceReview.items = this.dataSourceReview.items ? this.dataSourceReview.items.concat(res) : res;
        });
    }
    onScrollDown() {
        if (this.stopScrolling == true) {
            this.isLoaded = true;
            return;
        }
        this.isLoaded = false;
        this.request.pageIndex++;
        this.journalService.getAll(this.request).subscribe(res => {
            if (!res || res == [] || res.length == 0) {
                this.stopScrolling = true;
                return;
            }
            res.forEach(element => {
                let temp = [];
                if (element.imageDirectories && element.imageDirectories.length > 0) {
                    element.imageDirectories.forEach(e => {
                        temp.push(e);
                        // reader.readAsDataURL(new Blob(e.imagePath]));
                    });
                    element.images = temp;
                }
            });
            this.isLoaded = true;
            this.dataSource.items = this.dataSource.items ? this.dataSource.items.concat(res) : res;
        });
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
UserViewComponent.ɵfac = function UserViewComponent_Factory(t) { return new (t || UserViewComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_module_sticky_modules_journal_journal_service__WEBPACK_IMPORTED_MODULE_3__["JournalService"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_module_sticky_modules_review_review_service__WEBPACK_IMPORTED_MODULE_4__["ReviewService"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_module_sticky_common_notification_notification_service__WEBPACK_IMPORTED_MODULE_5__["NotificationService"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_module_sticky_modules_user_user_service__WEBPACK_IMPORTED_MODULE_7__["UserService"])); };
UserViewComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: UserViewComponent, selectors: [["app-user-view"]], decls: 25, vars: 6, consts: [[1, "container-fluid"], [1, "d-flex", "align-items-center", "justify-content-center", 2, "flex-direction", "column"], [2, "width", "250px", "height", "250px", "object-fit", "cover", "border-radius", "50%", 3, "src"], [1, "row"], [1, "col-md-2", "col-lg-2", "align-items-center"], ["id", "myTab", "role", "tablist ", 1, "nav", "nav-tabs", "flex-row", "align-items-center", "sticky-top", 2, "top", "5rem", "justify-content", "center"], [1, "nav-item"], ["id", "home-tab ", "data-toggle", "tab", "href", "#journal", "role", "tab ", "aria-controls", "home ", "aria-selected", "true ", 1, "nav-link", "active"], ["id", "profile-tab ", "data-toggle", "tab", "href", "#review", "role", "tab ", "aria-controls", "profile ", "aria-selected", "false ", 1, "nav-link"], [1, "col-md-10", "col-lg-8"], ["id", "myTabContent", 1, "tab-content", "profile-tab", 2, "word-wrap", "break-word"], ["id", "journal", "role", "tabpanel", "aria-labelledby", "home-tab", 1, "tab-pane", "fade", "show", "active"], ["infinite-scroll", "", 2, "width", "100%", "word-wrap", "break-word", 3, "scrolled"], [4, "ngFor", "ngForOf"], [4, "ngIf"], ["id", "review", "role", "tabpanel", "aria-labelledby", "profile-tab", 1, "tab-pane", "fade"], [1, "col-lg-2"], [3, "id", "status", "feeling", "createdAt", "content", "name", "service", "userName"], [3, "id", "status", "rating", "createdAt", "content", "name", "service", "userName"]], template: function UserViewComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](4, "img", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "ul", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "li", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "a", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, "Details");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "li", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "a", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](13, "Reviews");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("scrolled", function UserViewComponent_Template_div_scrolled_17_listener() { return ctx.onScrollDown(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](18, UserViewComponent_div_18_Template, 2, 8, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](19, UserViewComponent_app_waiting_19_Template, 1, 0, "app-waiting", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](20, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](21, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("scrolled", function UserViewComponent_Template_div_scrolled_21_listener() { return ctx.onScrollDownReview(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](22, UserViewComponent_div_22_Template, 2, 8, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](23, UserViewComponent_app_waiting_23_Template, 1, 0, "app-waiting", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](24, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("Viewing ", ctx.userName, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("src", ctx.imageUrl, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.dataSource.items);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isLoaded == false);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.dataSourceReview.items);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isLoaded == false);
    } }, directives: [ngx_infinite_scroll__WEBPACK_IMPORTED_MODULE_8__["InfiniteScrollDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgIf"], _module_sticky_post_post_component__WEBPACK_IMPORTED_MODULE_10__["PostComponent"], _module_sticky_base_base_waiting_component__WEBPACK_IMPORTED_MODULE_11__["BaseWaitingComponent"], _module_sticky_review_review_component__WEBPACK_IMPORTED_MODULE_12__["ReviewItemComponent"]], styles: [".nav-link[_ngcontent-%COMP%] {\n    color: deeppink;\n}\n\n.nav-link.active[_ngcontent-%COMP%] {\n    background-color: white;\n    color: black !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXItdmlldy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksZUFBZTtBQUNuQjs7QUFFQTtJQUNJLHVCQUF1QjtJQUN2Qix1QkFBdUI7QUFDM0IiLCJmaWxlIjoidXNlci12aWV3LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubmF2LWxpbmsge1xuICAgIGNvbG9yOiBkZWVwcGluaztcbn1cblxuLm5hdi1saW5rLmFjdGl2ZSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgY29sb3I6IGJsYWNrICFpbXBvcnRhbnQ7XG59Il19 */"] });


/***/ }),

/***/ "e28A":
/*!**************************************************************************!*\
  !*** ./src/app/module/sticky/modules/journal/journal-request.payload.ts ***!
  \**************************************************************************/
/*! exports provided: JournalRequestPayload */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JournalRequestPayload", function() { return JournalRequestPayload; });
/* harmony import */ var _common_http_request_payload_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/http/request-payload.model */ "FMWu");

class JournalRequestPayload extends _common_http_request_payload_model__WEBPACK_IMPORTED_MODULE_0__["RequestPayload"] {
}


/***/ }),

/***/ "n60B":
/*!******************************************!*\
  !*** ./src/app/view/user/user.module.ts ***!
  \******************************************/
/*! exports provided: UserModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserModule", function() { return UserModule; });
/* harmony import */ var _user_view_user_view_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-view/user-view.component */ "asUO");
/* harmony import */ var src_app_module_sticky_control_input_time_input_time_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/module/sticky/control/input-time/input-time.module */ "xfXw");
/* harmony import */ var _forum_forum_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./forum/forum.component */ "ptjh");
/* harmony import */ var _module_sticky_partials_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../module/sticky/partials.module */ "V0Zc");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _user_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./user-routing.module */ "s0qC");
/* harmony import */ var _user_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./user.component */ "sH1u");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "1kSV");
/* harmony import */ var primeng_dialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! primeng/dialog */ "/RsI");
/* harmony import */ var primeng_inputtextarea__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! primeng/inputtextarea */ "zFJ7");
/* harmony import */ var primeng_togglebutton__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! primeng/togglebutton */ "Y+ZO");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/menu */ "STbY");
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/datepicker */ "iadO");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/core */ "FKr1");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");
/* harmony import */ var primeng_calendar__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! primeng/calendar */ "eO1q");
/* harmony import */ var primeng_table__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! primeng/table */ "rEr+");
/* harmony import */ var primeng_messages__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! primeng/messages */ "dts7");
/* harmony import */ var ngx_infinite_scroll__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ngx-infinite-scroll */ "dlKe");
/* harmony import */ var _shop_saved_shop_saved_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./shop-saved/shop-saved.component */ "ydtZ");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/material/paginator */ "M9IT");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/material/progress-spinner */ "Xa2L");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/material/select */ "d3UM");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/material/tooltip */ "Qu3c");
/* harmony import */ var primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! primeng/confirmdialog */ "Nf9I");
/* harmony import */ var primeng_inputtext__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! primeng/inputtext */ "7kUa");
/* harmony import */ var primeng_tooltip__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! primeng/tooltip */ "xlun");
/* harmony import */ var src_app_module_sticky_review_review_module__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! src/app/module/sticky/review/review.module */ "Ka1L");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! @angular/core */ "fXoL");



































class UserModule {
}
UserModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_34__["ɵɵdefineNgModule"]({ type: UserModule });
UserModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_34__["ɵɵdefineInjector"]({ factory: function UserModule_Factory(t) { return new (t || UserModule)(); }, imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"],
            _user_routing_module__WEBPACK_IMPORTED_MODULE_5__["UserRoutingModule"], src_app_module_sticky_review_review_module__WEBPACK_IMPORTED_MODULE_33__["ReviewModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpClientModule"], src_app_module_sticky_control_input_time_input_time_module__WEBPACK_IMPORTED_MODULE_1__["InputTimeModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ReactiveFormsModule"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_9__["NgbModule"], primeng_dialog__WEBPACK_IMPORTED_MODULE_10__["DialogModule"], primeng_inputtextarea__WEBPACK_IMPORTED_MODULE_11__["InputTextareaModule"], primeng_togglebutton__WEBPACK_IMPORTED_MODULE_12__["ToggleButtonModule"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__["MatIconModule"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_14__["MatMenuModule"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_15__["MatDatepickerModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_16__["MatNativeDateModule"], _angular_material_card__WEBPACK_IMPORTED_MODULE_17__["MatCardModule"], primeng_calendar__WEBPACK_IMPORTED_MODULE_18__["CalendarModule"], ngx_infinite_scroll__WEBPACK_IMPORTED_MODULE_21__["InfiniteScrollModule"], _module_sticky_partials_module__WEBPACK_IMPORTED_MODULE_3__["PartialsModule"], primeng_table__WEBPACK_IMPORTED_MODULE_19__["TableModule"], primeng_messages__WEBPACK_IMPORTED_MODULE_20__["MessagesModule"], _angular_material_button__WEBPACK_IMPORTED_MODULE_23__["MatButtonModule"],
            _angular_material_select__WEBPACK_IMPORTED_MODULE_28__["MatSelectModule"],
            _angular_material_input__WEBPACK_IMPORTED_MODULE_25__["MatInputModule"],
            _angular_material_paginator__WEBPACK_IMPORTED_MODULE_26__["MatPaginatorModule"],
            _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_27__["MatProgressSpinnerModule"],
            _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_29__["MatTooltipModule"],
            _angular_material_dialog__WEBPACK_IMPORTED_MODULE_24__["MatDialogModule"],
            // ng-bootstrap modules
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_9__["NgbDropdownModule"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_9__["NgbTooltipModule"],
            // TranslateModule,
            primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_30__["ConfirmDialogModule"],
            primeng_inputtext__WEBPACK_IMPORTED_MODULE_31__["InputTextModule"],
            primeng_tooltip__WEBPACK_IMPORTED_MODULE_32__["TooltipModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_34__["ɵɵsetNgModuleScope"](UserModule, { declarations: [_user_component__WEBPACK_IMPORTED_MODULE_6__["UserComponent"], _shop_saved_shop_saved_component__WEBPACK_IMPORTED_MODULE_22__["ShopSavedComponent"], _forum_forum_component__WEBPACK_IMPORTED_MODULE_2__["ForumComponent"], _user_view_user_view_component__WEBPACK_IMPORTED_MODULE_0__["UserViewComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"],
        _user_routing_module__WEBPACK_IMPORTED_MODULE_5__["UserRoutingModule"], src_app_module_sticky_review_review_module__WEBPACK_IMPORTED_MODULE_33__["ReviewModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpClientModule"], src_app_module_sticky_control_input_time_input_time_module__WEBPACK_IMPORTED_MODULE_1__["InputTimeModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ReactiveFormsModule"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_9__["NgbModule"], primeng_dialog__WEBPACK_IMPORTED_MODULE_10__["DialogModule"], primeng_inputtextarea__WEBPACK_IMPORTED_MODULE_11__["InputTextareaModule"], primeng_togglebutton__WEBPACK_IMPORTED_MODULE_12__["ToggleButtonModule"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__["MatIconModule"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_14__["MatMenuModule"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_15__["MatDatepickerModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_16__["MatNativeDateModule"], _angular_material_card__WEBPACK_IMPORTED_MODULE_17__["MatCardModule"], primeng_calendar__WEBPACK_IMPORTED_MODULE_18__["CalendarModule"], ngx_infinite_scroll__WEBPACK_IMPORTED_MODULE_21__["InfiniteScrollModule"], _module_sticky_partials_module__WEBPACK_IMPORTED_MODULE_3__["PartialsModule"], primeng_table__WEBPACK_IMPORTED_MODULE_19__["TableModule"], primeng_messages__WEBPACK_IMPORTED_MODULE_20__["MessagesModule"], _angular_material_button__WEBPACK_IMPORTED_MODULE_23__["MatButtonModule"],
        _angular_material_select__WEBPACK_IMPORTED_MODULE_28__["MatSelectModule"],
        _angular_material_input__WEBPACK_IMPORTED_MODULE_25__["MatInputModule"],
        _angular_material_paginator__WEBPACK_IMPORTED_MODULE_26__["MatPaginatorModule"],
        _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_27__["MatProgressSpinnerModule"],
        _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_29__["MatTooltipModule"],
        _angular_material_dialog__WEBPACK_IMPORTED_MODULE_24__["MatDialogModule"],
        // ng-bootstrap modules
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_9__["NgbDropdownModule"],
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_9__["NgbTooltipModule"],
        // TranslateModule,
        primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_30__["ConfirmDialogModule"],
        primeng_inputtext__WEBPACK_IMPORTED_MODULE_31__["InputTextModule"],
        primeng_tooltip__WEBPACK_IMPORTED_MODULE_32__["TooltipModule"]] }); })();


/***/ }),

/***/ "ptjh":
/*!****************************************************!*\
  !*** ./src/app/view/user/forum/forum.component.ts ***!
  \****************************************************/
/*! exports provided: ForumComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForumComponent", function() { return ForumComponent; });
/* harmony import */ var src_app_module_sticky_modules_journal_journal_request_payload__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/module/sticky/modules/journal/journal-request.payload */ "e28A");
/* harmony import */ var src_app_module_sticky_modules_review_review_request_payload__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/module/sticky/modules/review/review-request.payload */ "xP/o");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var src_app_module_sticky_modules_journal_journal_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/module/sticky/modules/journal/journal.service */ "dD+E");
/* harmony import */ var src_app_module_sticky_modules_review_review_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/module/sticky/modules/review/review.service */ "R1yZ");
/* harmony import */ var _module_sticky_common_notification_notification_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../module/sticky/common/notification/notification.service */ "w6oe");
/* harmony import */ var ngx_infinite_scroll__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-infinite-scroll */ "dlKe");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _module_sticky_post_post_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../module/sticky/post/post.component */ "h/6y");
/* harmony import */ var _module_sticky_base_base_waiting_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../module/sticky/base/base-waiting.component */ "vR4d");
/* harmony import */ var _module_sticky_review_review_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../module/sticky/review/review.component */ "IaCn");













function ForumComponent_div_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "app-post", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const i_r4 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("id", i_r4.id)("status", i_r4.status)("feeling", i_r4.feeling)("createdAt", i_r4.createdAt)("content", i_r4.content)("name", "Testing user")("service", ctx_r0.journalService)("userName", i_r4.name);
} }
function ForumComponent_app_waiting_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "app-waiting");
} }
function ForumComponent_div_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "app-review", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const i_r5 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("id", i_r5.id)("status", i_r5.status)("rating", i_r5.rating)("createdAt", i_r5.createdAt)("content", i_r5.content)("name", "Testing user")("service", ctx_r2.reviewService)("userName", i_r5.userName);
} }
function ForumComponent_app_waiting_19_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "app-waiting");
} }
class ForumComponent {
    constructor(cdr, sanitizer, http, journalService, reviewService, noti) {
        this.cdr = cdr;
        this.sanitizer = sanitizer;
        this.http = http;
        this.journalService = journalService;
        this.reviewService = reviewService;
        this.noti = noti;
        this.stopScrolling = false;
        this.stopScrollingReview = false;
        this.formDataAdd = new FormData();
        this.daysSelected = [];
        this.isLoaded = false;
        this.journalAdd = {};
        this.dataSource = {};
        this.dataSourceReview = {};
        this.images = [];
        this.selectedFile = null;
        this.isLoadedReview = false;
        this.request = new src_app_module_sticky_modules_journal_journal_request_payload__WEBPACK_IMPORTED_MODULE_0__["JournalRequestPayload"]();
        this.reviewRequest = new src_app_module_sticky_modules_review_review_request_payload__WEBPACK_IMPORTED_MODULE_1__["ReviewRequestPayload"]();
        this.imageUrl = 'assets/img/cf_bg1.jpg';
    }
    ngOnInit() {
        this.initJournal();
        this.initReview();
    }
    initReview() {
        this.reviewRequest.pageIndex = 0;
        this.reviewRequest.pageSize = 3;
        this.reviewService.getAll(this.reviewRequest).subscribe(res => {
            this.dataSourceReview.items = res;
            this.dataSourceReview.items.forEach(element => {
                let temp = [];
                if (element.imageDirectories && element.imageDirectories.length > 0) {
                    element.imageDirectories.forEach(e => {
                        temp.push(e);
                        // reader.readAsDataURL(new Blob(e.imagePath]));
                    });
                    element.images = temp;
                    if (element.images) {
                        element.image = element.images[0];
                    }
                }
            });
        });
    }
    initJournal() {
        this.request.pageIndex = 0;
        this.request.pageSize = 3;
        this.journalService.getAll(this.request).subscribe(res => {
            this.dataSource.items = res;
            this.dataSource.items.forEach(element => {
                let temp = [];
                if (element.imageDirectories && element.imageDirectories.length > 0) {
                    element.imageDirectories.forEach(e => {
                        temp.push(e);
                        // reader.readAsDataURL(new Blob(e.imagePath]));
                    });
                    element.images = temp;
                    if (element.images) {
                        element.image = element.images[0];
                    }
                }
            });
        });
    }
    onScrollDownReview() {
        if (this.stopScrollingReview == true) {
            this.isLoadedReview = true;
            return;
        }
        this.isLoadedReview = false;
        this.reviewRequest.pageIndex++;
        this.reviewService.getAll(this.reviewRequest).subscribe(res => {
            if (!res || res == [] || res.length == 0) {
                this.stopScrollingReview = true;
                return;
            }
            res.forEach(element => {
                let temp = [];
                if (element.imageDirectories && element.imageDirectories.length > 0) {
                    element.imageDirectories.forEach(e => {
                        temp.push(e);
                        // reader.readAsDataURL(new Blob(e.imagePath]));
                    });
                    element.images = temp;
                }
            });
            this.isLoadedReview = true;
            this.dataSourceReview.items = this.dataSourceReview.items ? this.dataSourceReview.items.concat(res) : res;
        });
    }
    onScrollDown() {
        if (this.stopScrolling == true) {
            this.isLoaded = true;
            return;
        }
        this.isLoaded = false;
        this.request.pageIndex++;
        this.journalService.getAll(this.request).subscribe(res => {
            if (!res || res == [] || res.length == 0) {
                this.stopScrolling = true;
                return;
            }
            res.forEach(element => {
                let temp = [];
                if (element.imageDirectories && element.imageDirectories.length > 0) {
                    element.imageDirectories.forEach(e => {
                        temp.push(e);
                        // reader.readAsDataURL(new Blob(e.imagePath]));
                    });
                    element.images = temp;
                }
            });
            this.isLoaded = true;
            this.dataSource.items = this.dataSource.items ? this.dataSource.items.concat(res) : res;
        });
    }
}
ForumComponent.ɵfac = function ForumComponent_Factory(t) { return new (t || ForumComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["DomSanitizer"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_module_sticky_modules_journal_journal_service__WEBPACK_IMPORTED_MODULE_5__["JournalService"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_module_sticky_modules_review_review_service__WEBPACK_IMPORTED_MODULE_6__["ReviewService"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_module_sticky_common_notification_notification_service__WEBPACK_IMPORTED_MODULE_7__["NotificationService"])); };
ForumComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: ForumComponent, selectors: [["app-forum"]], decls: 21, vars: 4, consts: [[1, "container-fluid"], [1, "row"], [1, "col-md-2", "col-lg-2", "align-items-center"], ["id", "myTab", "role", "tablist ", 1, "nav", "nav-tabs", "flex-row", "align-items-center", "sticky-top", 2, "top", "5rem", "justify-content", "center"], [1, "nav-item"], ["id", "home-tab ", "data-toggle", "tab", "href", "#journal", "role", "tab ", "aria-controls", "home ", "aria-selected", "true ", 1, "nav-link", "active"], ["id", "profile-tab ", "data-toggle", "tab", "href", "#review", "role", "tab ", "aria-controls", "profile ", "aria-selected", "false ", 1, "nav-link"], [1, "col-md-10", "col-lg-8"], ["id", "myTabContent", 1, "tab-content", "profile-tab", 2, "word-wrap", "break-word"], ["id", "journal", "role", "tabpanel", "aria-labelledby", "home-tab", 1, "tab-pane", "fade", "show", "active"], ["infinite-scroll", "", 2, "width", "100%", "word-wrap", "break-word", 3, "scrolled"], [4, "ngFor", "ngForOf"], [4, "ngIf"], ["id", "review", "role", "tabpanel", "aria-labelledby", "profile-tab", 1, "tab-pane", "fade"], [1, "col-lg-2"], [3, "id", "status", "feeling", "createdAt", "content", "name", "service", "userName"], [3, "id", "status", "rating", "createdAt", "content", "name", "service", "userName"]], template: function ForumComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "ul", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "li", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "a", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "Details");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "li", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "a", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9, "Reviews");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("scrolled", function ForumComponent_Template_div_scrolled_13_listener() { return ctx.onScrollDown(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](14, ForumComponent_div_14_Template, 2, 8, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](15, ForumComponent_app_waiting_15_Template, 1, 0, "app-waiting", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("scrolled", function ForumComponent_Template_div_scrolled_17_listener() { return ctx.onScrollDownReview(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](18, ForumComponent_div_18_Template, 2, 8, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](19, ForumComponent_app_waiting_19_Template, 1, 0, "app-waiting", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](20, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.dataSource.items);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isLoaded == false);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.dataSourceReview.items);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isLoaded == false);
    } }, directives: [ngx_infinite_scroll__WEBPACK_IMPORTED_MODULE_8__["InfiniteScrollDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgIf"], _module_sticky_post_post_component__WEBPACK_IMPORTED_MODULE_10__["PostComponent"], _module_sticky_base_base_waiting_component__WEBPACK_IMPORTED_MODULE_11__["BaseWaitingComponent"], _module_sticky_review_review_component__WEBPACK_IMPORTED_MODULE_12__["ReviewItemComponent"]], styles: [".nav-link[_ngcontent-%COMP%] {\n    color: deeppink;\n}\n\n.nav-link.active[_ngcontent-%COMP%] {\n    background-color: white;\n    color: black !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvcnVtLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxlQUFlO0FBQ25COztBQUVBO0lBQ0ksdUJBQXVCO0lBQ3ZCLHVCQUF1QjtBQUMzQiIsImZpbGUiOiJmb3J1bS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm5hdi1saW5rIHtcbiAgICBjb2xvcjogZGVlcHBpbms7XG59XG5cbi5uYXYtbGluay5hY3RpdmUge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgIGNvbG9yOiBibGFjayAhaW1wb3J0YW50O1xufSJdfQ== */"] });


/***/ }),

/***/ "s0qC":
/*!**************************************************!*\
  !*** ./src/app/view/user/user-routing.module.ts ***!
  \**************************************************/
/*! exports provided: UserRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserRoutingModule", function() { return UserRoutingModule; });
/* harmony import */ var _forum_forum_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./forum/forum.component */ "ptjh");
/* harmony import */ var _shop_saved_shop_saved_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shop-saved/shop-saved.component */ "ydtZ");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _user_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./user.component */ "sH1u");
/* harmony import */ var src_app_module_sticky_modules_auth_auth_guard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/module/sticky/modules/auth/auth.guard */ "vza5");
/* harmony import */ var _user_view_user_view_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./user-view/user-view.component */ "asUO");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "fXoL");








const routes = [{
        path: '', component: _user_component__WEBPACK_IMPORTED_MODULE_3__["UserComponent"],
        canActivate: [src_app_module_sticky_modules_auth_auth_guard__WEBPACK_IMPORTED_MODULE_4__["AuthGuard"]]
    }, {
        path: 'saved-shops', component: _shop_saved_shop_saved_component__WEBPACK_IMPORTED_MODULE_1__["ShopSavedComponent"],
        canActivate: [src_app_module_sticky_modules_auth_auth_guard__WEBPACK_IMPORTED_MODULE_4__["AuthGuard"]]
    }, {
        path: 'forum', component: _forum_forum_component__WEBPACK_IMPORTED_MODULE_0__["ForumComponent"],
    },
    { path: 'user-view/:id', component: _user_view_user_view_component__WEBPACK_IMPORTED_MODULE_5__["UserViewComponent"] },
];
class UserRoutingModule {
}
UserRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({ type: UserRoutingModule });
UserRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({ factory: function UserRoutingModule_Factory(t) { return new (t || UserRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](UserRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]] }); })();


/***/ }),

/***/ "sH1u":
/*!*********************************************!*\
  !*** ./src/app/view/user/user.component.ts ***!
  \*********************************************/
/*! exports provided: UserComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserComponent", function() { return UserComponent; });
/* harmony import */ var _module_sticky_modules_journal_journal_request_payload__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../module/sticky/modules/journal/journal-request.payload */ "e28A");
/* harmony import */ var src_app_module_sticky_component_base_list_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/module/sticky/component/base-list.component */ "LqhL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var src_app_module_sticky_common_confirmation_save_confirmation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/module/sticky/common/confirmation/save-confirmation */ "T5lM");
/* harmony import */ var src_app_module_sticky_common_confirmation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/module/sticky/common/confirmation */ "ZRK5");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var src_app_module_sticky_modules_journal_journal_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/module/sticky/modules/journal/journal.service */ "dD+E");
/* harmony import */ var _module_sticky_common_notification_notification_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./../../module/sticky/common/notification/notification.service */ "w6oe");
/* harmony import */ var src_app_module_sticky_modules_auth_auth_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/module/sticky/modules/auth/auth.service */ "8VXs");
/* harmony import */ var src_app_module_sticky_modules_user_user_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/module/sticky/modules/user/user.service */ "5I3+");
/* harmony import */ var _module_sticky_upload_upload_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../module/sticky/upload/upload.component */ "RCHe");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/datepicker */ "iadO");
/* harmony import */ var ngx_infinite_scroll__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ngx-infinite-scroll */ "dlKe");
/* harmony import */ var primeng_dialog__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! primeng/dialog */ "/RsI");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! primeng/api */ "7zfz");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var primeng_togglebutton__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! primeng/togglebutton */ "Y+ZO");
/* harmony import */ var _module_sticky_crud_validate_form_validate_form_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../module/sticky/crud/validate-form/validate-form.component */ "+pS1");
/* harmony import */ var primeng_inputtextarea__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! primeng/inputtextarea */ "zFJ7");
/* harmony import */ var _module_sticky_base_base_waiting_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../module/sticky/base/base-waiting.component */ "vR4d");
/* harmony import */ var primeng_messages__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! primeng/messages */ "dts7");
/* harmony import */ var _module_sticky_post_post_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../../module/sticky/post/post.component */ "h/6y");


























const _c0 = ["calendar"];
const _c1 = ["form"];
function UserComponent_app_waiting_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "app-waiting");
} }
function UserComponent_img_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "img", 36);
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("src", ctx_r1.imageUrl, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsanitizeUrl"]);
} }
function UserComponent_button_8_Template(rf, ctx) { if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function UserComponent_button_8_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r10); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r9.uploadAvatar(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "Update avatar");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} }
function UserComponent_p_messages_31_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "No data to display ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} }
function UserComponent_p_messages_31_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "p-messages", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, UserComponent_p_messages_31_ng_template_1_Template, 2, 0, "ng-template", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} }
function UserComponent_div_33_Template(rf, ctx) { if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "app-post", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("event", function UserComponent_div_33_Template_app_post_event_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r14); const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r13.initData(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const i_r12 = ctx.$implicit;
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("id", i_r12.id)("status", i_r12.status)("feeling", i_r12.feeling)("createdAt", i_r12.createdAt)("content", i_r12.content)("name", "Testing user")("avatar", ctx_r5.postAvatar)("service", ctx_r5.journalService)("userName", i_r12.name);
} }
function UserComponent_app_waiting_34_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "app-waiting");
} }
function UserComponent_ng_template_70_Template(rf, ctx) { if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "button", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function UserComponent_ng_template_70_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r16); const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r15.onBtnAddJournal(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "button", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function UserComponent_ng_template_70_Template_button_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r16); const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r17.onBtnCancelJournal(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpropertyInterpolate1"]("title", "", "SAVE", "(Enter) ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", "Save", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpropertyInterpolate1"]("title", "", "CANCEL", "(Esc) ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"]("Cancel");
} }
const _c2 = function () { return { width: "70%%" }; };
class UserComponent extends src_app_module_sticky_component_base_list_component__WEBPACK_IMPORTED_MODULE_1__["BaseListComponent"] {
    constructor(cdr, sanitizer, http, journalService, noti, authService, userService) {
        super();
        this.cdr = cdr;
        this.sanitizer = sanitizer;
        this.http = http;
        this.journalService = journalService;
        this.noti = noti;
        this.authService = authService;
        this.userService = userService;
        this.input = {};
        this.formDataAdd = new FormData();
        this.formDataAvatar = new FormData();
        this.pipe = new _angular_common__WEBPACK_IMPORTED_MODULE_2__["DatePipe"]('en-US');
        this.daysSelected = [];
        this.formDisplay = false;
        this.isLoaded = false;
        this.avatarLoaded = false;
        this.journalAdd = {};
        this.dataSource = {};
        this.images = [];
        this.selectedFile = null;
        this.request = new _module_sticky_modules_journal_journal_request_payload__WEBPACK_IMPORTED_MODULE_0__["JournalRequestPayload"]();
        this.stopScroll = false;
        this.allItems = false;
        this.pageLoaded = false;
        this.imageUrl = 'assets/img/cf_bg1.jpg';
        this.isSelected = (event) => {
            const date = event.getFullYear() +
                "-" +
                ("00" + (event.getMonth() + 1)).slice(-2) +
                "-" +
                ("00" + event.getDate()).slice(-2);
            return this.daysSelected.find(x => x == date) ? "selected" : null;
        };
    }
    ngOnInit() {
        this.userName = this.authService.getUser();
        this.userService.selectById(this.authService.getUserId()).subscribe(element => {
            if (element.avatarPath) {
                this.postAvatar = element.avatarPath;
                this.imageUrl = this.postAvatar;
            }
            this.pageLoaded = true;
        });
        this.resetCalendar();
        this.initData();
    }
    initData() {
        this.request.pageIndex = 0;
        this.request.pageSize = 3;
        this.journalService.select(this.request).subscribe(res => {
            this.dataSource.items = res;
            if (this.dataSource.items && this.dataSource.items.length > 0) {
                this.dataSource.items.forEach(element => {
                    if (element.length == 0) {
                        this.allItems = true;
                        return;
                    }
                    let temp = [];
                    if (element.imageDirectories && element.imageDirectories.length > 0) {
                        element.imageDirectories.forEach(e => {
                            temp.push(e);
                            // reader.readAsDataURL(new Blob(e.imagePath]));
                        });
                        element.images = temp;
                        if (element.images) {
                            element.image = element.images[0];
                        }
                    }
                    this.cdr.detectChanges();
                });
            }
            this.data = this.dataSource.items;
            this.stopScroll = false;
            this.allItems = false;
        });
    }
    upload(event) {
        this.formDataAdd = event;
    }
    loadAvatar(event) {
        this.formDataAvatar = event;
        this.avatarLoaded = true;
    }
    loadAvatarImage(event) {
        this.imageUrl = event;
        this.cdr.detectChanges();
    }
    renewPage() {
        this.resetCalendar();
        this.initData();
    }
    reset() {
        this.formDataAdd = new FormData();
        this.input = {};
        this.journalStatus = false;
        this.journalContent = "";
        this.formDisplay = false;
        setTimeout(() => {
            this.form.form.markAsPristine();
        }, 0);
    }
    uploadAvatar() {
        this.userService.uploadAvatar(this.formDataAvatar).subscribe(res => {
            this.noti.showSuccess();
            this.avatarLoaded = false;
            this.userService.selectById(this.authService.getUserId()).subscribe(element => {
                if (element.avatarPath) {
                    this.imageUrl = element.avatarPath;
                    this.cdr.detectChanges();
                    // reader.readAsDataURL(new Blob(e.imagePath]));
                }
            });
        });
    }
    onScrollDown() {
        if (this.stopScroll == true || this.allItems == true) {
            this.isLoaded = true;
            return;
        }
        this.isLoaded = false;
        this.request.pageIndex++;
        this.journalService.select(this.request).subscribe(res => {
            if (res.length == 0) {
                this.allItems = true;
                return;
            }
            res.forEach(element => {
                let x = new Date(element.createdAt);
                this.selectNew(x, this.calendar);
                this.isSelected(x);
            });
            res.forEach(element => {
                let temp = [];
                if (element.imageDirectories && element.imageDirectories.length > 0) {
                    element.imageDirectories.forEach(e => {
                        temp.push(e);
                        // reader.readAsDataURL(new Blob(e.imagePath]));
                    });
                    element.images = temp;
                }
            });
            this.isLoaded = true;
            this.dataSource.items =
                this.dataSource.items = this.dataSource.items ? this.dataSource.items.concat(res) : res;
            ;
            this.data = this.dataSource.items;
        });
    }
    resetCalendar() {
        this.journalService.getAllById().subscribe(res => {
            res.forEach(element => {
                let x = new Date(element.createdAt);
                this.selectNew(x, this.calendar);
                this.isSelected(x);
            });
            this.cdr.detectChanges();
        });
    }
    update(value) {
        this.dates = this.dateJournal;
    }
    selectNew(event, calendar) {
        const date = event.getFullYear() +
            "-" +
            ("00" + (event.getMonth() + 1)).slice(-2) +
            "-" +
            ("00" + event.getDate()).slice(-2);
        const index = this.daysSelected.findIndex(x => x == date);
        if (index < 0)
            this.daysSelected.push(date);
        calendar.updateTodaysDate();
    }
    format(event) {
        return event.getFullYear() +
            "-" +
            ("00" + (event.getMonth() + 1)).slice(-2) +
            "-" +
            ("00" + event.getDate()).slice(-2);
    }
    select(event, calendar) {
        const date = this.format(event);
        const index = this.daysSelected.findIndex(x => x == date);
        if (index >= 0) {
            this.data = this.dataSource.items.filter(x => this.format(new Date(x.createdAt)) == date);
            this.stopScroll = true;
            this.cdr.detectChanges();
        }
        else {
            this.data = this.dataSource.items.filter(x => this.format(new Date(x.createdAt)) == date);
            this.stopScroll = true;
            this.cdr.detectChanges();
        }
        // if (index < 0) this.daysSelected.push(date);
        // else this.daysSelected.splice(index, 1);
        calendar.updateTodaysDate();
    }
    handleFileInput(event) {
        if (event.target.files) {
            var reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = (event) => {
                this.imageUrl = event.target.result;
            };
        }
    }
    onFileSelected(event) {
        this.selectedFile = event.target.files[0];
    }
    editJournal(rowData) {
        this.input = {};
        this.input.content = "";
        if (rowData) {
            this.input.name = rowData.name;
            this.input.id = rowData.id;
            this.input.code = rowData.code;
        }
        setTimeout(() => {
            this.form.form.markAsPristine();
        }, 0);
        this.formDisplay = true;
    }
    onBtnSaveJournal() {
        this.journalAdd.content = this.journalContent;
        if (this.journalStatus == true) {
            this.journalAdd.status = 1;
        }
        if (this.journalStatus == false) {
            this.journalAdd.status = 0;
        }
        this.journalAdd.created = new Date();
        this.journalService.insert(this.journalAdd).subscribe(event => {
            this.journalService.uploadJournalImages(event.id, this.formDataAdd).subscribe(res => {
                this.noti.showSuccess();
                this.journalContent = "";
                this.journalStatus = false;
                this.cdr.detectChanges();
                this.initData();
                this.resetCalendar();
            });
        });
    }
    onBtnAddJournal() {
        if (this.form) {
            if (!this.validateForm(this.form, 'journal-edit')) {
                return;
            }
            if (this.form.form.dirty) {
                const save = new src_app_module_sticky_common_confirmation_save_confirmation__WEBPACK_IMPORTED_MODULE_3__["SaveConfirmation"]();
                save.accept = () => {
                    if (this.journalStatus == true) {
                        this.input.status = 1;
                    }
                    if (this.journalStatus == false) {
                        this.input.status = 0;
                    }
                    this.journalService.insert(this.input).subscribe(event => {
                        this.journalService.uploadJournalImages(event.id, this.formDataAdd).subscribe(res => {
                            this.noti.showSuccess();
                            this.journalContent = "";
                            this.journalStatus = false;
                            this.input = {};
                            this.formDisplay = false;
                            setTimeout(() => {
                                this.form.form.markAsPristine();
                            }, 0);
                            this.initData();
                            this.resetCalendar();
                            this.cdr.detectChanges();
                        });
                    });
                };
                this.noti.confirm(save);
            }
            else {
                this.formDisplay = false;
                this.journalStatus = false;
                this.input = {};
                setTimeout(() => {
                    this.form.form.markAsPristine();
                }, 0);
                this.cdr.detectChanges();
            }
        }
        this.cdr.detectChanges();
    }
    /**
     * Pop up form cancel
     */
    onBtnCancelJournal() {
        if (this.form.form.dirty) {
            const cancelConfirmation = new src_app_module_sticky_common_confirmation__WEBPACK_IMPORTED_MODULE_4__["CancelConfirmation"]();
            cancelConfirmation.accept = () => {
                this.formDisplay = false;
                this.journalContent = "";
                this.journalStatus = false;
                this.formDataAdd = new FormData();
                this.input = {};
                setTimeout(() => {
                    this.form.form.markAsPristine();
                }, 0);
                this.cdr.detectChanges();
            };
            this.noti.confirm(cancelConfirmation);
        }
        else {
            this.formDisplay = false;
            this.formDataAdd = new FormData();
            setTimeout(() => {
                this.form.form.markAsPristine();
            }, 0);
            this.cdr.detectChanges();
        }
    }
}
UserComponent.ɵfac = function UserComponent_Factory(t) { return new (t || UserComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__["DomSanitizer"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_module_sticky_modules_journal_journal_service__WEBPACK_IMPORTED_MODULE_8__["JournalService"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_module_sticky_common_notification_notification_service__WEBPACK_IMPORTED_MODULE_9__["NotificationService"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_module_sticky_modules_auth_auth_service__WEBPACK_IMPORTED_MODULE_10__["AuthService"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_module_sticky_modules_user_user_service__WEBPACK_IMPORTED_MODULE_11__["UserService"])); };
UserComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: UserComponent, selectors: [["app-user"]], viewQuery: function UserComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_c0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_c1, 3);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.calendar = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.form = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵInheritDefinitionFeature"]], decls: 71, vars: 29, consts: [[1, "container-fluid", 2, "margin-top", "30px", "width", "100%"], [1, "d-flex", "align-items-center", "justify-content-center", 2, "flex-direction", "column"], [4, "ngIf"], ["style", "width: 250px; height:250px; object-fit: cover; border-radius: 50%;", 3, "src", 4, "ngIf"], [2, "flex-direction", "row"], [3, "onReadImage", "onFileLoad"], ["class", "btn btn-primary", 3, "click", 4, "ngIf"], [1, "row"], [1, "col-md-1"], [1, "col-md-10"], [1, "col-md-4"], [1, "sticky-top", 2, "top", "4rem"], ["id", "all", 1, "btn", "float-right", 2, "background-color", "deeppink", "color", "white", 3, "click"], [3, "click"], [3, "dateClass", "selectedChange"], ["calendar", ""], [1, "col-md-8"], [2, "margin", "0.5rem"], [1, "btn", "btn-primary", 3, "click"], ["severity", "info", 4, "ngIf"], ["infinite-scroll", "", 2, "width", "100%", "word-wrap", "break-word", 3, "scrolled"], [4, "ngFor", "ngForOf"], ["appendTo", "body", 3, "visible", "modal", "baseZIndex", "draggable", "maximizable", "closable", "visibleChange", "onHide"], [1, "fal", "fa-user-edit"], ["autocomplete", "off", "id", "journal-edit"], ["form", "ngForm"], [1, "col-md-12"], [1, "form-row"], [1, "col-md-6"], ["type", "text ", "name", "feeling", 1, "form-control", 3, "ngModel", "placeholder", "ngModelChange"], [1, "form-group"], ["onLabel", "show ", "offLabel", "hide ", "offIcon", "pi pi-times ", "onIcon", "pi pi-check ", "iconPos", "right ", "name", "toggleButton", 3, "ngModel", "ngModelChange"], ["controlName", "content", 3, "form"], ["rows", "5 ", "cols", "30", "pInputTextarea", "", "autoResize", "autoResize", "required", "", "name", "content", 1, "form-control", 3, "placeholder", "ngModel", "ngModelChange"], [3, "preview", "onFileLoad"], ["pTemplate", "footer "], [2, "width", "250px", "height", "250px", "object-fit", "cover", "border-radius", "50%", 3, "src"], ["severity", "info"], ["pTemplate", ""], [1, "p-ml-2"], [3, "id", "status", "feeling", "createdAt", "content", "name", "avatar", "service", "userName", "event"], [1, "btn", "btn-primary", 3, "title", "click"], [1, "btn", "btn-secondary", 2, "float", "right", 3, "title", "click"]], template: function UserComponent_Template(rf, ctx) { if (rf & 1) {
        const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](4, UserComponent_app_waiting_4_Template, 1, 0, "app-waiting", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](5, UserComponent_img_5_Template, 1, 1, "img", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "app-upload", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("onReadImage", function UserComponent_Template_app_upload_onReadImage_7_listener($event) { return ctx.loadAvatarImage($event); })("onFileLoad", function UserComponent_Template_app_upload_onFileLoad_7_listener($event) { return ctx.loadAvatar($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](8, UserComponent_button_8_Template, 2, 0, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](10, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](11, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](14, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](15, "mat-card");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](16, "mat-card-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](17, " My coffee journey ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](18, "button", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function UserComponent_Template_button_click_18_listener() { return ctx.initData(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](19, "All");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](20, "mat-card-subtitle");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](21, "Click highlighted date to view journals");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](22, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function UserComponent_Template_div_click_22_listener($event) { return $event.stopPropagation(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](23, "mat-calendar", 14, 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("selectedChange", function UserComponent_Template_mat_calendar_selectedChange_23_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r18); const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](24); return ctx.select($event, _r3); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](25, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](26, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](27, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](28, "Share your coffee journal now");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](29, "button", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function UserComponent_Template_button_click_29_listener() { return ctx.editJournal(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](30, "Add Journal");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](31, UserComponent_p_messages_31_Template, 2, 0, "p-messages", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](32, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("scrolled", function UserComponent_Template_div_scrolled_32_listener() { return ctx.onScrollDown(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](33, UserComponent_div_33_Template, 2, 9, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](34, UserComponent_app_waiting_34_Template, 1, 0, "app-waiting", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](35, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](36, "p-dialog", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("visibleChange", function UserComponent_Template_p_dialog_visibleChange_36_listener($event) { return ctx.formDisplay = $event; })("onHide", function UserComponent_Template_p_dialog_onHide_36_listener() { return ctx.reset(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](37, "p-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](38, "i", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](39);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](40, "form", 24, 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](42, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](43, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](44, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](45, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](46);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](47, "input", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngModelChange", function UserComponent_Template_input_ngModelChange_47_listener($event) { return ctx.input.feeling = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](48, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](49, "div", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](50, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](51);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](52, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](53, "p-toggleButton", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngModelChange", function UserComponent_Template_p_toggleButton_ngModelChange_53_listener($event) { return ctx.journalStatus = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](54, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](55, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](56, "div", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](57, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](58);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](59, "validate-form", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](60, "textarea", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngModelChange", function UserComponent_Template_textarea_ngModelChange_60_listener($event) { return ctx.input.content = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](61, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](62, "div", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](63, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](64);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](65, "app-upload", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("onFileLoad", function UserComponent_Template_app_upload_onFileLoad_65_listener($event) { return ctx.upload($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](66, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](67, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](68, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](69, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](70, UserComponent_ng_template_70_Template, 4, 4, "ng-template", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](41);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("Welcome to your journey page ", ctx.userName, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.pageLoaded == false);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.pageLoaded == true);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.avatarLoaded == true);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](15);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("dateClass", ctx.isSelected);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ctx.data || ctx.data.length == 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx.data);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.isLoaded == false);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵstyleMap"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction0"](28, _c2));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("visible", ctx.formDisplay)("modal", true)("baseZIndex", 10000)("draggable", true)("maximizable", true)("closable", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", "Add journal ", " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"]("How are you feeling today?");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpropertyInterpolate1"]("placeholder", "", "Tell people how you feel", " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngModel", ctx.input.feeling);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"]("Public/private");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngModel", ctx.journalStatus);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"]("What do you want to share?");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("form", _r7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpropertyInterpolate1"]("placeholder", "", "Your journal goes here", " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngModel", ctx.input.content);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"]("Do you have any photo you want to share?");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("preview", true);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], _module_sticky_upload_upload_component__WEBPACK_IMPORTED_MODULE_12__["UploadComponent"], _angular_material_card__WEBPACK_IMPORTED_MODULE_13__["MatCard"], _angular_material_card__WEBPACK_IMPORTED_MODULE_13__["MatCardTitle"], _angular_material_card__WEBPACK_IMPORTED_MODULE_13__["MatCardSubtitle"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_14__["MatCalendar"], ngx_infinite_scroll__WEBPACK_IMPORTED_MODULE_15__["InfiniteScrollDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgForOf"], primeng_dialog__WEBPACK_IMPORTED_MODULE_16__["Dialog"], primeng_api__WEBPACK_IMPORTED_MODULE_17__["Header"], _angular_forms__WEBPACK_IMPORTED_MODULE_18__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_18__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_18__["NgForm"], _angular_forms__WEBPACK_IMPORTED_MODULE_18__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_18__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_18__["NgModel"], primeng_togglebutton__WEBPACK_IMPORTED_MODULE_19__["ToggleButton"], _module_sticky_crud_validate_form_validate_form_component__WEBPACK_IMPORTED_MODULE_20__["ValidateMessageComponent"], primeng_inputtextarea__WEBPACK_IMPORTED_MODULE_21__["InputTextarea"], _angular_forms__WEBPACK_IMPORTED_MODULE_18__["RequiredValidator"], primeng_api__WEBPACK_IMPORTED_MODULE_17__["PrimeTemplate"], _module_sticky_base_base_waiting_component__WEBPACK_IMPORTED_MODULE_22__["BaseWaitingComponent"], primeng_messages__WEBPACK_IMPORTED_MODULE_23__["Messages"], _module_sticky_post_post_component__WEBPACK_IMPORTED_MODULE_24__["PostComponent"]], styles: ["                        .first {\n                            height: 50vh;\n                            min-height: 200px;\n                            background-size: cover;\n                            background-image: linear-gradient( 45deg, #efefef 25%, rgba(239, 239, 239, 0) 25%, rgba(239, 239, 239, 0) 75%, #efefef 75%, #efefef), linear-gradient( 45deg, #efefef 25%, rgba(239, 239, 239, 0) 25%, rgba(239, 239, 239, 0) 75%, #efefef 75%, #efefef);\n                            background-position: center;\n                        }\n                        \n                        #all:hover {\n                            opacity: 0.5;\n                        }\n                        \n                        .mat-calendar-body-cell-content {\n                            color: inherit;\n                        }\n                        \n                        .mat-calendar-body-cell.selected {\n                            background-color: deeppink!important;\n                            color: white;\n                            border-radius: 50%;\n                        }\n                        \n                        .drop-calendar {\n                            width: 100%;\n                        }\n                        \n                        .p-datepicker table td.p-datepicker-today>span {\n                            background: var(--hue-color-2);\n                            color: #495057;\n                            border-color: transparent;\n                        }\n                        \n                        .p-datepicker table td>span {\n                            width: 2.5rem;\n                            height: 2.5rem;\n                            border-radius: 50%;\n                            transition: box-shadow 0.2s;\n                            border: 1px solid transparent;\n                        }\n                        \n                        .p-datepicker table td.p-datepicker-today>span.p-highlight {\n                            color: #495057;\n                            background: red;\n                        }\n                        \n                        .p-datepicker table td>span.p-highlight {\n                            color: whitesmoke;\n                            background: deeppink;\n                        }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXIuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoid0JBQXdCOzRCQUNJLFlBQVk7NEJBQ1osaUJBQWlCOzRCQUNqQixzQkFBc0I7NEJBQ3RCLHdQQUF3UDs0QkFDeFAsMkJBQTJCO3dCQUMvQjs7d0JBRUE7NEJBQ0ksWUFBWTt3QkFDaEI7O3dCQUVBOzRCQUNJLGNBQWM7d0JBQ2xCOzt3QkFFQTs0QkFDSSxvQ0FBb0M7NEJBQ3BDLFlBQVk7NEJBQ1osa0JBQWtCO3dCQUN0Qjs7d0JBRUE7NEJBQ0ksV0FBVzt3QkFDZjs7d0JBRUE7NEJBQ0ksOEJBQThCOzRCQUM5QixjQUFjOzRCQUNkLHlCQUF5Qjt3QkFDN0I7O3dCQUVBOzRCQUNJLGFBQWE7NEJBQ2IsY0FBYzs0QkFDZCxrQkFBa0I7NEJBQ2xCLDJCQUEyQjs0QkFDM0IsNkJBQTZCO3dCQUNqQzs7d0JBRUE7NEJBQ0ksY0FBYzs0QkFDZCxlQUFlO3dCQUNuQjs7d0JBRUE7NEJBQ0ksaUJBQWlCOzRCQUNqQixvQkFBb0I7d0JBQ3hCIiwiZmlsZSI6InVzZXIuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIiAgICAgICAgICAgICAgICAgICAgICAgIC5maXJzdCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiA1MHZoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbi1oZWlnaHQ6IDIwMHB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KCA0NWRlZywgI2VmZWZlZiAyNSUsIHJnYmEoMjM5LCAyMzksIDIzOSwgMCkgMjUlLCByZ2JhKDIzOSwgMjM5LCAyMzksIDApIDc1JSwgI2VmZWZlZiA3NSUsICNlZmVmZWYpLCBsaW5lYXItZ3JhZGllbnQoIDQ1ZGVnLCAjZWZlZmVmIDI1JSwgcmdiYSgyMzksIDIzOSwgMjM5LCAwKSAyNSUsIHJnYmEoMjM5LCAyMzksIDIzOSwgMCkgNzUlLCAjZWZlZmVmIDc1JSwgI2VmZWZlZik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAjYWxsOmhvdmVyIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLjU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tYXQtY2FsZW5kYXItYm9keS1jZWxsLWNvbnRlbnQge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBpbmhlcml0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAubWF0LWNhbGVuZGFyLWJvZHktY2VsbC5zZWxlY3RlZCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogZGVlcHBpbmshaW1wb3J0YW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kcm9wLWNhbGVuZGFyIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgLnAtZGF0ZXBpY2tlciB0YWJsZSB0ZC5wLWRhdGVwaWNrZXItdG9kYXk+c3BhbiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogdmFyKC0taHVlLWNvbG9yLTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAjNDk1MDU3O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wLWRhdGVwaWNrZXIgdGFibGUgdGQ+c3BhbiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIuNXJlbTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDIuNXJlbTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogYm94LXNoYWRvdyAwLjJzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAucC1kYXRlcGlja2VyIHRhYmxlIHRkLnAtZGF0ZXBpY2tlci10b2RheT5zcGFuLnAtaGlnaGxpZ2h0IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogIzQ5NTA1NztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiByZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wLWRhdGVwaWNrZXIgdGFibGUgdGQ+c3Bhbi5wLWhpZ2hsaWdodCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHdoaXRlc21va2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogZGVlcHBpbms7XG4gICAgICAgICAgICAgICAgICAgICAgICB9Il19 */"], encapsulation: 2 });


/***/ }),

/***/ "ydtZ":
/*!**************************************************************!*\
  !*** ./src/app/view/user/shop-saved/shop-saved.component.ts ***!
  \**************************************************************/
/*! exports provided: ShopSavedComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShopSavedComponent", function() { return ShopSavedComponent; });
/* harmony import */ var _module_sticky_modules_user_shop_user_shop_request_payload__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../../module/sticky/modules/user-shop/user-shop-request.payload */ "7mip");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _module_sticky_modules_user_shop_user_shop_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../../module/sticky/modules/user-shop/user-shop.service */ "rF8k");
/* harmony import */ var _module_sticky_modules_auth_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../../module/sticky/modules/auth/auth.service */ "8VXs");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _module_sticky_common_notification_notification_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../../../module/sticky/common/notification/notification.service */ "w6oe");
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/paginator */ "M9IT");
/* harmony import */ var primeng_table__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! primeng/table */ "rEr+");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! primeng/api */ "7zfz");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/tooltip */ "Qu3c");
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/menu */ "STbY");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/progress-spinner */ "Xa2L");
/* harmony import */ var primeng_messages__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! primeng/messages */ "dts7");

















function ShopSavedComponent_ng_template_7_th_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "th", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const col_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("width", col_r5.width)("ngClass", col_r5.class);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", col_r5.header, " ");
} }
function ShopSavedComponent_ng_template_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, ShopSavedComponent_ng_template_7_th_1_Template, 2, 3, "th", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r0.cols);
} }
function ShopSavedComponent_ng_template_8_span_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", item_r10.name + " ", " ");
} }
const _c0 = function (a1) { return ["/app/shop/shop-item", a1]; };
function ShopSavedComponent_ng_template_8_Template(rf, ctx) { if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "td", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "td", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "a", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "td", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "td", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](9, ShopSavedComponent_ng_template_8_span_9_Template, 2, 1, "span", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "td", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "button", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](13, "more_vert");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "mat-menu", null, 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ShopSavedComponent_ng_template_8_Template_button_click_16_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r12); const rowData_r6 = ctx.$implicit; const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r11.onBtnDeleteClick(rowData_r6.id); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const rowData_r6 = ctx.$implicit;
    const rowIndex_r7 = ctx.rowIndex;
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("title", rowIndex_r7 + 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", rowIndex_r7 + 1, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("title", rowData_r6.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](15, _c0, rowData_r6.id));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", rowData_r6.name, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("title", rowData_r6.address);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate4"](" ", rowData_r6.address, ", ", rowData_r6.street, ", ", rowData_r6.district, ", ", rowData_r6.city, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("title", "Categories");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", rowData_r6.shopCategory);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("matMenuTriggerFor", _r9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("title", "X\u00F3a");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"]("DELETE");
} }
function ShopSavedComponent_mat_spinner_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "mat-spinner");
} }
function ShopSavedComponent_p_messages_11_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "No data to display");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function ShopSavedComponent_p_messages_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "p-messages", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, ShopSavedComponent_p_messages_11_ng_template_1_Template, 2, 0, "ng-template", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
const _c1 = function () { return [12, 24, 36]; };
class ShopSavedComponent {
    constructor(userShopService, authService, cd, router, noti) {
        this.userShopService = userShopService;
        this.authService = authService;
        this.cd = cd;
        this.router = router;
        this.noti = noti;
        this.subscriptions = [];
        this.userShopRequest = new _module_sticky_modules_user_shop_user_shop_request_payload__WEBPACK_IMPORTED_MODULE_0__["UserShopRequestPayload"]();
        this.dataSource = {};
        this.cols = [
            { width: '50px', header: 'No' },
            { width: '100px', header: 'Name' },
            { width: '300px', header: 'Address' },
            { width: '200px', header: 'Category' },
            { width: '70px', header: '', maxWidth: '50px', class: 'action' },
        ];
    }
    ngOnInit() {
        this.initData();
    }
    onPageChange(event) {
        this.userShopRequest.pageIndex = event.pageIndex;
        this.userShopRequest.pageSize = event.pageSize;
        this.initData();
    }
    initData() {
        const $selectAndCount = [
            this.userShopService.select(this.userShopRequest),
            this.userShopService.count(this.userShopRequest)
        ];
        const sub = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["forkJoin"])($selectAndCount).subscribe((response) => {
            this.userName = this.authService.getUser();
            this.dataSource.items = response[0];
            this.dataSource.paginatorTotal = response[1];
            if (this.cd && !this.cd['destroyed']) {
                this.cd.detectChanges();
            }
        });
        this.cd.detectChanges();
        this.subscriptions.push(sub);
        this.cd.detectChanges();
    }
    viewShop(id) {
        this.router.navigate([`apps/shop/shop-item/${id}`]);
    }
    onBtnDeleteClick(id) {
        this.userShopRequest.shopId = id;
        this.userShopService.deleteShopFromUser(this.userShopRequest).subscribe(res => {
            this.noti.showSuccess();
            this.userShopRequest = new _module_sticky_modules_user_shop_user_shop_request_payload__WEBPACK_IMPORTED_MODULE_0__["UserShopRequestPayload"]();
            this.initData();
            this.cd.detectChanges();
        });
    }
    ngOnDestroy() {
        this.subscriptions.forEach(e => e.unsubscribe());
    }
}
ShopSavedComponent.ɵfac = function ShopSavedComponent_Factory(t) { return new (t || ShopSavedComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_module_sticky_modules_user_shop_user_shop_service__WEBPACK_IMPORTED_MODULE_3__["UserShopService"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_module_sticky_modules_auth_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_module_sticky_common_notification_notification_service__WEBPACK_IMPORTED_MODULE_6__["NotificationService"])); };
ShopSavedComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: ShopSavedComponent, selectors: [["app-shop-saved"]], decls: 12, vars: 12, consts: [[1, "container-fluid", 2, "margin-top", "30px"], [1, "d-flex", "align-items-center", "justify-content-center", 2, "flex-direction", "column", "margin-bottom", "4rem"], [3, "pageSize", "pageSizeOptions", "length", "showFirstLastButtons", "page"], [1, "mat-table__wrapper"], ["tableStyleClass", "table-no-wrap", 3, "value", "autoLayout"], ["pTemplate", "header"], ["pTemplate", "body"], [4, "ngIf"], ["severity", "info", 4, "ngIf"], ["class", "table-no-wrap", 3, "width", "ngClass", 4, "ngFor", "ngForOf"], [1, "table-no-wrap", 3, "width", "ngClass"], [3, "title"], ["data-toggle", "tooltip", "data-placement", "bottom", "title", "Go to shop", "trigger", "hover focus ", 3, "routerLink"], [4, "ngFor", "ngForOf"], [1, "action"], ["mat-icon-button", "", "matTooltip", "More actions", 3, "matMenuTriggerFor"], ["menu", "matMenu"], ["mat-menu-item", "", 3, "title", "click"], ["severity", "info"], ["pTemplate", ""], [1, "p-ml-2"]], template: function ShopSavedComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "mat-paginator", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("page", function ShopSavedComponent_Template_mat_paginator_page_4_listener($event) { return ctx.onPageChange($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "p-table", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](7, ShopSavedComponent_ng_template_7_Template, 2, 1, "ng-template", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, ShopSavedComponent_ng_template_8_Template, 19, 17, "ng-template", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](9, ShopSavedComponent_mat_spinner_9_Template, 1, 0, "mat-spinner", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](10, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](11, ShopSavedComponent_p_messages_11_Template, 2, 0, "p-messages", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" Hi ", ctx.userName, ", this is your list of saved shops");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("pageSize", 12)("pageSizeOptions", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](11, _c1))("length", ctx.dataSource.paginatorTotal)("showFirstLastButtons", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", ctx.dataSource.items)("autoLayout", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](10, 9, ctx.userShopService.isLoading$));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.dataSource.items || ctx.dataSource.items.length == 0);
    } }, directives: [_angular_material_paginator__WEBPACK_IMPORTED_MODULE_7__["MatPaginator"], primeng_table__WEBPACK_IMPORTED_MODULE_8__["Table"], primeng_api__WEBPACK_IMPORTED_MODULE_9__["PrimeTemplate"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["NgClass"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterLinkWithHref"], _angular_material_button__WEBPACK_IMPORTED_MODULE_11__["MatButton"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_12__["MatTooltip"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_13__["MatMenuTrigger"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_14__["MatIcon"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_13__["MatMenu"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_13__["MatMenuItem"], _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_15__["MatSpinner"], primeng_messages__WEBPACK_IMPORTED_MODULE_16__["Messages"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_10__["AsyncPipe"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzaG9wLXNhdmVkLmNvbXBvbmVudC5jc3MifQ== */"] });


/***/ })

}]);
//# sourceMappingURL=view-user-user-module-es2015.js.map