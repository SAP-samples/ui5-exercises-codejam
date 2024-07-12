# Appendix 03 - Using the SAP Fiori Tools

At the end of this chapter you will have made our application visible to the SAP Fiori Tools and have used them. The [SAP Fiori Tools](https://marketplace.visualstudio.com/items?itemName=SAPSE.sap-ux-fiori-tools-extension-pack) are available both vor VS Code and the SAP Business Application Studio, and are the tooling of choice whenever we work with SAP Fiori elements based applications.

## Steps

[1. Add `@sap/ux-specification` as dependency](#2-add-sapux-specification-as-dependency)<br>
[2. Add `sapux` to `package.json`](#3-add-sapux-to-packagejson)<br>
[3. Install the SAP Fiori Tools](#5-install-the-sap-fiori-tools)<br>
[4. Work with the SAP Fiori Tools Page Map](#6-work-with-the-sap-fiori-tools-page-map)<br>
[5. Test the new layout](#7-test-the-new-layout)<br>

### 1. Add `@sap/ux-specification` as dependency

The `@sap/ux-specification` package is required by the SAP Fiori Tools. It provides the necessary SAP Fiori elements template structure information for the UI5 version we are using. It is important to install the correct version, matching the version [we define in the bootstrapping](/chapters/appendix-01-fe-fpm/readme.md#8-use-sapui5-instead-of-openui5).

➡️ Run the following command in the `bookshop/` directory:

```bash
npm install @sap/ux-specification@UI5-1.108 --save-dev
```

### 2. Add `sapux` to `package.json`

We can now tell the SAP Fiori Tools where to look for our application by specifying a parameter in the `package.json`.

➡️ Add the following block of code to the `package.json`:

```json
,
"sapux": [ "./" ]
```

### 3. Install the SAP Fiori Tools

If you are working in the SAP Business Application Studio, you already have the SAP Fiori Tools, but if you are working in VS Code, you have to install them manually.

➡️ Go to the extension marketplace, search for `sap fiori tools extension pack` and install the first extension that comes up.

### 4. Work with the SAP Fiori Tools Page Map

We can now test and use the SAP Fiori Tools, more specifically the Page Map.

➡️ Open the SAP Fiori Tools Page Map via the built-in Command Palette by searching for the term `Page Map`. Then select the Flexible Column Layout:

![SAP Fiori Tools Page Map](page-map.png)

The SAP Fiori Tools Page Map shows the overall structure of our application and allows us to edit it. We selected the Flexible Column Layout, and the corresponding code was automatically added to our the `webapp/manifest.json` by the SAP Fiori Tools.

### 5. Test the new layout

➡️ Refresh the application in the browser and select a book. The app should app have the Flexible Column Layout:

![result](result.png)

Wow, you have made it all the way through this CodeJam content, congratulations! 🎉 

We would really appreciate if you took the time to [leave feedback](https://github.com/SAP-samples/ui5-exercises-codejam/issues/new?assignees=&labels=feedback&template=session-feedback-template.md&title=Session+Feedback) for this session/content, thank you!

You should feel confident enough to start developing your own UI5 applications now, whether it be freestyle or with the SAP Fiori elements approach. If not, feel free to ask questions or raise concerns via a GitHub issue in this repository.
