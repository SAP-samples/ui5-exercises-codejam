sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, JSONModel, Filter, FilterOperator) {
    "use strict";
    return Controller.extend("sap.codejam.controller.App", {
        onSelect: function (oEvent) {
            this.onDeselect()
            let form = this.getView().byId("bookDetails"),
                contextPath = oEvent.getSource().getBindingContextPath();
            form.bindElement(contextPath);

            let contextStock = oEvent.getSource().getBindingContext().getProperty("stock")
            this.getView().byId("stepInput").setMax(contextStock)
            this.getView().byId("orderBtn").setEnabled(true);
            this.getView().byId("stepInput").setEnabled(true);
        },
        onDeselect: function () {
            this.getView().byId("bookDetails").unbindElement();
            this.getView().byId("orderBtn").setEnabled(false);
            this.getView().byId("stepInput").setEnabled(false);
            this.getView().byId("stepInput").setValue(1)
            this.getView().byId("stepInput").setValueState("None")
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
                function () {
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
                function (oError) {
                    let oParameterContext = oAction.getParameterContext()
                    oParameterContext.setProperty("orderStatus", oError.error.message)
                    oView.byId("orderStatus").setState("Error")
                }
            )
        },
        onSearch: function (oEvent) {
            this.onDeselect()
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