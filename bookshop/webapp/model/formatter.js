sap.ui.define([], function () {
	"use strict"
	return {
		inputLowerThanStock: function (availableStock) {
            const inputValue = this.getView().byId("stepInput").getValue()
            return inputValue <= availableStock
		}
	}
})