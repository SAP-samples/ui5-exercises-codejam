// configuration object
window["sap-ui-config"] = {
    "compatVersion": "edge",
    "async": true,
    "language": "en",
    "resourceroots": {
        "sap.codejam": "./"
    },
    "onInit": "module:sap/ui/core/ComponentSupport",
    "theme": (function () {
        // determine the proper theme for UI5 from current color scheme
        try {
            return window.matchMedia("(prefers-color-scheme: dark)").matches ? "sap_horizon_dark" : "sap_horizon";
        } catch (ex) {
            console.warn("window.matchMedia not supported - keep default theme");
            return "sap_horizon";
        }
    })()
};