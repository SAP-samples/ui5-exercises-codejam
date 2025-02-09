sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict"
    return Controller.extend("sap.codejam.controller.App", {
        onSelect: function (oEvent) {
            const oSource = oEvent.getSource()
            const contextPath = oSource.getBindingContextPath()
            const form = this.getView().byId("bookDetails")
            form.bindElement(contextPath)
        }
    })
})