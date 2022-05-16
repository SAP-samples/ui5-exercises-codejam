sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast"
], function (Controller, Filter, FilterOperator, MessageToast) {
    "use strict"
    return Controller.extend("sap.codejam.controller.App", {
        onSelect: function (oEvent) {
            let form = this.getView().byId("bookDetails"),
                contextPath = oEvent.getSource().getBindingContextPath()
            form.bindElement(contextPath)

            let stepInput = this.getView().byId("stepInput")
            let contextStock = oEvent.getSource().getBindingContext().getProperty("stock")
            stepInput.setMax(contextStock)

            this.checkIfStockExceeds(contextStock)
        },
        checkIfStockExceeds: function (contextStock) {
            let stepInput = this.getView().byId("stepInput")
            
            if (contextStock == 0) {
                stepInput.setEnabled(false)
                this.getView().byId("orderBtn").setEnabled(false)
            } else if (stepInput.getValue() > contextStock) {
                stepInput.setValue(contextStock)
                stepInput.setEnabled(true)
            } else {
                stepInput.setEnabled(true)
                this.getView().byId("orderBtn").setEnabled(true)
            }
        },
        disableOrderBtn: function () {
            this.getView().byId("orderBtn").setEnabled(false)
        },
        enableOrderBtn: function () {
            this.getView().byId("orderBtn").setEnabled(true)
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

            this.checkIfStockExceeds(stock - quantity)

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
                    
                    MessageToast.show(oText)
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