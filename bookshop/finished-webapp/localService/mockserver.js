sap.ui.define([
	"sap/ui/core/util/MockServer",
	"sap/base/util/UriParameters"
], function (MockServer, UriParameters) {
	"use strict";

	return {
		init: function () {
			// create
			const oMockServer = new MockServer({
				rootUri: "/v2/browse/"
			});

			const oUriParameters = new UriParameters(window.location.href);

			// configure mock server with a delay
			MockServer.config({
				autoRespond: true,
				autoRespondAfter: oUriParameters.get("serverDelay") || 500
			});

			// simulate
			const sPath = sap.ui.require.toUrl("sap/codejam/localService");
			oMockServer.simulate(sPath + "/metadata.xml", sPath + "/mockdata");

			// mock custom function
			const defaultRequests = oMockServer.getRequests()
			oMockServer.setRequests(defaultRequests.concat({
				method: "POST",
				path: new RegExp("submitOrder(.*)"),
				response: function (oXhr, sUrlParams) {
					const responseBody = { d: {} } // sending empty data, just mocking backend functionality
					const responseHeader = { "Content-Type": "application/json" }
					oXhr.respond(200, responseHeader, JSON.stringify(responseBody))
				}
			}))

			// start
			oMockServer.start();
		}
	};

});