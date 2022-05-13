sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, JSONModel, Filter, FilterOperator) {
    "use strict";
    return Controller.extend("sap.codejam.controller.App", {
        onInit: function () {

        },
        onSelect: function (oEvent) {
            let form = this.getView().byId("bookdetails"),
                contextPath = oEvent.getSource().getBindingContextPath();
            form.bindElement(contextPath);
            this.getView().byId("orderBtn").setEnabled(true);
        },
        onSubmitOrder: function (oEvent) {
            let selectedBookID = oEvent.getSource().getParent().getParent().getBindingContext().getObject().ID,
                quantity = this.getView().byId("stepInput").getValue();
            let oAction = oEvent.getSource().getParent().getObjectBinding();
            oAction.setParameter("book", selectedBookID);
            oAction.setParameter("quantity", quantity);
            
            oAction.execute().then(
                function() {
                    let oResult = oAction.getBoundContext().getObject()
            })
        },
        onSearch: function (oEvent) {
            let aFilter = []
            let sQuery = oEvent.getParameter("newValue")
            if (sQuery) {
                aFilter.push(new Filter("title", FilterOperator.Contains, sQuery))
            }
            let oList = this.byId("booksTable")
            let oBinding = oList.getBinding("items")
            oBinding.filter(aFilter)
        }
    });
});