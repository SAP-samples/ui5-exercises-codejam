sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, JSONModel, Filter, FilterOperator) {
    "use strict";
    return Controller.extend("sap.codejam.controller.App", {
        onSelect: function (oEvent) {
            let form = this.getView().byId("bookDetails"),
                contextPath = oEvent.getSource().getBindingContextPath();
            form.bindElement(contextPath);
            this.getView().byId("orderBtn").setEnabled(true);
        },
        onSubmitOrder: function (oEvent) {
            let oView = this.getView()
            let selectedBookID = oEvent.getSource().getParent().getParent().getBindingContext().getObject().ID,
                selectedBookTitle = oEvent.getSource().getParent().getParent().getBindingContext().getObject().title,
                quantity = this.getView().byId("stepInput").getValue();
            let oAction = oEvent.getSource().getParent().getObjectBinding();
            oAction.setParameter("book", selectedBookID);
            oAction.setParameter("quantity", quantity);
            
            oAction.execute().then(
                function() {
                    oAction.getModel().refresh()

                    let oParameterContext = oAction.getParameterContext()
                    let oText = 
                        "Order successful ("
                        + selectedBookTitle
                        + ", "
                        + oParameterContext.getProperty("quantity")
                        + " pcs.)"
                    oParameterContext.setProperty("orderStatus", oText)
                    oView.byId("orderStatus").setState("Success")
                    
                    //let oResult = oAction.getBoundContext().getObject()
                },
                function() {
                    console.log("error")
                }
            )
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