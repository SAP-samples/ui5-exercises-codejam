# Chapter 2.03 - Making the App Visible to the SAP Fiori Tools



## Steps

[1. Add routing in the `webapp/manifest.json` file](#1-add-routing-in-the-webappmanifestjson-file)<br>

### 1. Move app contents into `webapp/` directory

### 2. Add `@sap/ux-specification` as dependency

```bash
npm install @sap/ux-specification@UI5-1.108 --save-dev
```

### 3. Add `sapux` to `package.json`

```json
"sapux": [ "finished-webapp-fpm" ]
```