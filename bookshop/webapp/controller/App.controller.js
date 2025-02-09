sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Text"
], function (Controller, MessageToast, Dialog, Button, Text) {
    "use strict"
    return Controller.extend("sap.codejam.controller.App", {

        onSelect: function (oEvent) {
            const oSource = oEvent.getSource()
            const contextPath = oSource.getBindingContextPath()
            const form = this.getView().byId("bookDetails")
            form.bindElement(contextPath)
        },

        onSubmitOrder: function (oEvent) {
            const oSource = oEvent.getSource();
            const oBindingContext = oSource.getBindingContext();
            const selectedBookID = oBindingContext.getProperty("ID");
            const selectedBookTitle = oBindingContext.getProperty("title");
            const chosenQuantity = this.getView().byId("stepInput").getValue();

            const oModel = this.getView().getModel()

            oModel.callFunction("/submitOrder", {
                method: "POST",
                urlParameters: {
                    "book": selectedBookID,
                    "quantity": chosenQuantity
                },
                success: function (oData, oResponse) {
                    oModel.refresh()
                    const oText = `Order successful (${selectedBookTitle}, ${chosenQuantity} pcs.)`
                    MessageToast.show(oText)
                },
                error: function (oError) {
                    if (oError.responseText) {
                        oError = JSON.parse(oError.responseText).error
                    }
                    this.oErrorMessageDialog = new Dialog({
                        type: "Standard",
                        title: "Error",
                        state: "Error",
                        content: new Text({ text: oError.message })
                            .addStyleClass("sapUiTinyMargin"),
                        beginButton: new Button({
                            text: "Close",
                            press: function () {
                                this.oErrorMessageDialog.close()
                            }.bind(this)
                        })
                    })
                    this.oErrorMessageDialog.open()
                }.bind(this)
            })
        },

        resetOrderAmount: function () {
            this.getView().byId("stepInput").setValue(1);
        }

    })
})