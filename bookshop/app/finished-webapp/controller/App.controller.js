sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, JSONModel, Filter, FilterOperator) {
    "use strict"
    return Controller.extend("sap.codejam.controller.App", {
        onSelect: function (oEvent) {
            this.onReset()
                
            let form = this.getView().byId("bookDetails"),
                contextPath = oEvent.getSource().getBindingContextPath()
            form.bindElement(contextPath)

            let stepInput = this.getView().byId("stepInput")
            let contextStock = oEvent.getSource().getBindingContext().getProperty("stock")
            stepInput.setMax(contextStock)
            stepInput.setEnabled(true)

            this.checkForStock(contextStock)
        },
        onReset: function () {
            let oView = this.getView()
            oView.byId("bookDetails").unbindElement()
            oView.byId("orderControls").getObjectBinding().getParameterContext().setProperty("orderStatus", "")
            let stepInput = oView.byId("stepInput")
            stepInput.setEnabled(false)
            stepInput.setValue(1)
            stepInput.setValueState("None")

            this.checkForStock()
        },
        checkForStock: function (contextStock) {
            let stepInput = this.getView().byId("stepInput")

            if (!contextStock || stepInput.getValue() > contextStock) {
                this.getView().byId("orderBtn").setEnabled(false)
            } else {
                this.getView().byId("orderBtn").setEnabled(true)
            }
        },
        onSubmitOrder: function (oEvent) {
            let oView = this.getView()
            let selectedBookID = oEvent.getSource().getParent().getParent().getBindingContext().getProperty("ID"),
                selectedBookTitle = oEvent.getSource().getParent().getParent().getBindingContext().getProperty("title"),
                stock = oEvent.getSource().getParent().getParent().getBindingContext().getProperty("stock"),
                quantity = this.getView().byId("stepInput").getValue()
            let oAction = oEvent.getSource().getParent().getObjectBinding()
            oAction.setParameter("book", selectedBookID)
            oAction.setParameter("quantity", quantity)

            this.checkForStock(stock - quantity)

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
                    
                    let oResult = oAction.getBoundContext().getObject()

                },
                function (oError) {
                    let oParameterContext = oAction.getParameterContext()
                    oParameterContext.setProperty("orderStatus", oError.error.message)
                    oView.byId("orderStatus").setState("Error")
                }
            )
        },
        onSearch: function (oEvent) {
            this.onReset()
            let aFilter = []
            let sQuery = oEvent.getParameter("newValue")
            if (sQuery) {
                aFilter.push(new Filter("title", FilterOperator.Contains, sQuery))
            }
            let oList = this.byId("booksTable")
            let oBinding = oList.getBinding("items")
            oBinding.filter(aFilter)
        }
    })
})