sap.ui.define([
    "sap/fe/core/AppComponent",
], function (AppComponent) {
    "use strict"
    return AppComponent.extend(
        "sap.codejam.Component", {
            metadata : {
                    manifest: "json"
            },
            init : function () {
                AppComponent.prototype.init.apply(this)
                this.getRouter().initialize();
            }
        })
    })