sap.ui.define([
	"sap/m/MessageToast",
	"sap/m/Dialog",
	"sap/m/Button",
    "sap/m/Text",
], function (MessageToast, Dialog, Button, Text) {
	"use strict";
	return {
		submitOrder: function (oEvent) {
			const oView = this.routing.getView()
			const oModel = oView.getModel()
			const i18nModel = oView.getModel("i18n")
			const oOperation = oModel.bindContext("/submitOrder(...)")
			const oBindingContext = oEvent.getSource().getBindingContext()
            const selectedBookID = oBindingContext.getProperty("ID")
            const selectedBookTitle = oBindingContext.getProperty("title")
			const inputID = oEvent.getSource().getId().replace("orderBtn", "stepInput")
			const inputValue = oView.byId(inputID).getValue()

            oOperation.setParameter("book", selectedBookID)
            oOperation.setParameter("quantity", inputValue)
			oOperation.execute().then(function () {
				oModel.refresh()
				const oText = `${i18nModel.getProperty("orderSuccessful")} (${selectedBookTitle}, ${inputValue} ${i18nModel.getProperty("pieces")})`
                MessageToast.show(oText)
			}.bind(this), function (oError) {
				if (oError.responseText) {
					oError = JSON.parse(oError.responseText).error
				}
				this.oErrorMessageDialog = new Dialog({
					type: "Standard",
					title: i18nModel.getProperty("Error"),
					state: "Error",
					content: new Text({ text: oError.message })
					.addStyleClass("sapUiTinyMargin"),
					beginButton: new Button({
						text: i18nModel.getProperty("Close"),
						press: function () {
							this.oErrorMessageDialog.close()
						}.bind(this)
					})
				})
				this.oErrorMessageDialog.open()
			}.bind(this)
		);
		}
	};
});
