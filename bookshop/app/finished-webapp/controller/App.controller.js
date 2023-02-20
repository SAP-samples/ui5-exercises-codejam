sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Text",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
], function (Controller, MessageToast, Dialog, Button, Text, Filter, FilterOperator) {
    "use strict"
    return Controller.extend("sap.codejam.controller.App", {
        onSelect: function (oEvent) {
            const oSource = oEvent.getSource()
            const contextPath = oSource.getBindingContextPath()
            const form = this.getView().byId("bookDetails")
            form.bindObject(contextPath)

            const stepInput = this.getView().byId("stepInput")
            const availableStock = oSource.getBindingContext().getProperty("stock")
            stepInput.setMax(availableStock)

            this.checkIfInputExceedsAvailability()
        },
        checkIfInputExceedsAvailability: function () {
            const stepInput = this.getView().byId("stepInput")
            const inputValue = stepInput.getValue()
            const orderBtn = this.getView().byId("orderBtn")

            const availableStock = stepInput.getMax()
            if (availableStock == 0) {
                stepInput.setEnabled(false)
                orderBtn.setEnabled(false)
            } else if (inputValue > availableStock) {
                stepInput.setValue(availableStock)
                stepInput.setValueState("None")
                stepInput.setEnabled(true)
            } else {
                stepInput.setEnabled(true)
                orderBtn.setEnabled(true)
            }
        },
        onSubmitOrder: function (oEvent) {
            const oBindingContext = this.getView().byId("bookDetails").getBindingContext()
            const selectedBookID = oBindingContext.getProperty("ID")
            const selectedBookTitle = oBindingContext.getProperty("title")
            const inputValue = this.getView().byId("stepInput").getValue()
            const oAction = oEvent.getSource().getParent().getObjectBinding()
            oAction.setParameter("book", selectedBookID)
            oAction.setParameter("quantity", inputValue)

            oAction.execute().then(
                function () {
                    oAction.getModel().refresh()
                    const oText = `Order successful (${selectedBookTitle}, ${inputValue} pcs.)`
                    MessageToast.show(oText)
                },
                function (oError) {
                    that.oErrorMessageDialog = new Dialog({
                        type: "Standard",
                        title: "Error",
                        state: "Error",
                        content: new Text({ text: oError.error.message })
                        .addStyleClass("sapUiTinyMargin"),
                        beginButton: new Button({
                            text: "OK",
                            press: function () {
                                that.oErrorMessageDialog.close()
                            }.bind(this)
                        })
                    })
                    that.oErrorMessageDialog.open();
                }.bind(this)
            )
        },
        onSearch: function (oEvent) {
            const aFilter = []
            const sQuery = oEvent.getParameter("newValue")
            if (sQuery) {
                aFilter.push(new Filter("title", FilterOperator.Contains, sQuery))
            }
            const oList = this.byId("booksTable")
            const oBinding = oList.getBinding("items")
            oBinding.filter(aFilter)
        }
    })
})