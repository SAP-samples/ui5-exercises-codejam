# Chapter 1 - Scaffolding the App - Our First View

At the end of this chapter we will have created a fully functional UI5 app that displays the title of our bookshop and greets the user.

## Steps

[0. Make sure you are in the project root (`bookshop/`)](#0-make-sure-you-are-in-the-project-root-bookshop)<br>
[1. Create a new `app/webapp/` directory for our UI5 app](#1-create-a-new-appwebapp-directory-for-our-ui5-app)<br>
[2. Create an `app/webapp/index.html` file](#2-create-an-appwebappindexhtml-file)<br>
[3. Add `ComponentSupport` to our `app/webapp/index.html` file](#3-add-componentsupport-to-our-appwebappindexhtml-file)<br>
[4. Create an `app/webapp/Component.js` file](#4-create-an-appwebappcomponentjs-file)<br>
[5. Create an `app/webapp/manifest.json` file](#5-create-an-appwebappmanifestjson-file)<br>
[6. Create an `app/webapp/view/App.view.xml` file (our first view)](#6-create-an-appwebappviewappviewxml-file-our-first-view)<br>
[7. Run our app](#7-run-our-app)<br>

### 0. Make sure you are in the project root (`bookshop/`)

➡️ Make sure you are in the `bookshop/` directory, which is our project root.

The material in this repository will always reference directories and files in relation to the project root.

### 1. Create a new `app/webapp/` directory for our UI5 app

Let's begin this project by creating a new `app/webapp/` directory inside the `bookshop/` directory. This is where our UI5 application is going to live.

The rest of the files and directories of the `bookshop` represent the backend application that was built with the Node.js flavour of the SAP Cloud Application Programming Model (CAP):
- The [package.json](/bookshop/package.json) declares the project's dependencies, which were loaded into the `node_modules` directory when we ran `npm install` during [Chapter 0 - Preparing the Development Environment](/chapters/chapter00/readme.md).
- The [db](/bookshop/db/) directory represents the database layer of the backend, defining all tables (entities) as well as the association between them.
- The [srv](/bookshop/srv/) directory represents the service layer of the backend, which is the API our frontend UI5 application will be interacting with.

### 2. Create an `app/webapp/index.html` file

Like any other web application our UI5 app needs an `index.html` serving as the entry point.

➡️ Create a new `app/webapp/index.html` file and paste the following code into it:

```html
<!DOCTYPE html>
<html>

<head>
    <script
        id="sap-ui-bootstrap"
        src="https://openui5.hana.ondemand.com/resources/sap-ui-core.js"
        data-sap-ui-theme="sap_horizon"
        data-sap-ui-libs="sap.m"
        data-sap-ui-compatVersion="edge"
        data-sap-ui-resourceroots='{
            "sap.codejam": "./"
        }'>
    </script>
</head>

<body class="sapUiBody" id="content">
</body>

</html>
```

We loaded the UI5 framework into our project and configured a few attributes such as the theme and library we want to use, and the name of our project root.

### 3. Add `ComponentSupport` to our `app/webapp/index.html` file

At this point we could theoretically already start instantiating UI5 elements (also called ***controls***), but because we want to make sure our project scales well, we will follow one of the best practices and wrap our app into a ***component*** first. This makes our app independent from the environment it's running in. In our case the component will be started from the `index.html`, but because it is encapsulated and reuseable, the same component could also be started from another `html` file that is powering a Fiori Launchpad for example.

We need to add the `ComponentSupport` to the bootstrapping of our app and add a component to our html `<body />`.

➡️ Replace the existing content of the `app/webapp/index.html` file with the following code:

```html
<!DOCTYPE html>
<html>

<head>
    <script
        id="sap-ui-bootstrap"
        src="https://openui5.hana.ondemand.com/resources/sap-ui-core.js"
        data-sap-ui-theme="sap_horizon"
        data-sap-ui-libs="sap.m"
        data-sap-ui-compatVersion="edge"
        data-sap-ui-oninit="module:sap/ui/core/ComponentSupport"
        data-sap-ui-resourceroots='{
            "sap.codejam": "./"
        }'>
    </script>
</head>

<body class="sapUiBody" id="content">
    <div
        data-sap-ui-component
        data-name="sap.codejam"
        data-id="container"
        data-settings='{"id" : "codejam"}'>
    </div>
</body>

</html>
```

### 4. Create an `app/webapp/Component.js` file

Our `index.html` is now actively looking for a `Component.js` file on root level of our UI5 app (in the `app/webapp/` directory).

➡️ Create a new `app/webapp/Component.js` file and paste the following code into it:

```javascript
sap.ui.define([
    "sap/ui/core/UIComponent",
], function (UIComponent) {
    "use strict"
    return UIComponent.extend(
        "sap.ui.demo.Component", {
            metadata : {
                "interfaces": [
                    "sap.ui.core.IAsyncContentCreation"
                    ],
                    manifest: "json"
            },
            init : function () {
                UIComponent.prototype.init.apply(
                    this,
                    arguments
                    )
            }
        })
    }
)
```

We initialized the `UIComponent` from the UI5 library and extended it with some metadata, referencing the `manifest.json`, which we will create next.

### 5. Create an `app/webapp/manifest.json` file

The `manifest.json` is our application descriptor file and holds metadata about our app

➡️ Create a new `app/webapp/manifest.json` and paste the following code into it:

```json
{
    "sap.app": {
        "id": "codejam",
        "type": "application",
        "title": "CodeJam Bookshop",
        "applicationVersion": {
            "version": "1.0.0"
        },
        "dataSources": {}
    },
    "sap.ui5": {
        "rootView": {
            "viewName": "sap.codejam.view.App",
            "type": "XML",
            "id": "app"
        },
        "models": {}
    }
}
```

At this point we successfully scaffolded our UI5 project: We have an `app/webapp/index.html` file serving as the entry point and holding our component, which references our `manifest.json`, which describes our application. We can now go ahead and populate our app with actual content that is visible to the user. This is what out project's structure looks like at the moment:

![The project's structure](/chapters/chapter01/chapter01-01.png)

### 6. Create an `app/webapp/view/App.view.xml` file (our first view)

We already referenced our root XML view in our `app/webapp/manifest.json`. Let's create this file.

➡️ Create a new `app/webapp/view/App.view.xml` file and paste the following code into it:

```xml
<mvc:View
    xmlns="sap.m"
    xmlns:mvc="sap.ui.core.mvc">

<App>
    <pages>
        <Page title="Bookshop">
            <content>
            <Panel
                headerText="Hello, Dev! 👋">
                <content>
                </content>
            </Panel>
            </content>
        </Page>
    </pages>
</App>

</mvc:View>
```

We defined our first XML view with a few UI5 controls. UI5 controls are reusable UI elements provided by the framework. Similar to HTML elements, they have an opening and closing tag and predefined attributes (`<Control attributes="myValue"></Control>`). They follow the Fiori design guidelines and provide a lot of functionalities out of the box. XML views are the best way to use and structure UI5 controls, as they are very easy to read and represent the hierarchical structure of controls very well. We will just call them 'views' from now on.

You might be wondering how you as a developer can find out which UI5 controls to use and what attributes and APIs they have. The official [SAPUI5 API Reference](https://sapui5.hana.ondemand.com/#/api) as well as the [Code Samples](https://sapui5.hana.ondemand.com/#/controls) are your go-to resources and contain all the information you will ever need regarding UI5. You can check the documentation for the [`<Panel />`](https://sapui5.hana.ondemand.com/#/api/sap.m.Panel%23controlProperties) control for example to see that we can define a `headerText`.

### 7. Run our app

At this point we have already created a fully functional UI5 app. Let's start our app.

➡️ Open a terminal session from the `bookshop/` directory and run the following command:

```bash
npm run dev 
```

We ran the script to start our app locally, which is defined in our [package.json](/bookshop/package.json). We did this on root level of the `bookshop` project, as we want to start both our front and backend application. The SAP Cloud Application Model automatically looks for `html` files inside the `app/` directory and serves them on a web server (`localhost:4004` or something similar) alongside the service endpoints for the backend application (see [srv](/bookshop/srv/)).

![http://localhost:4004](/chapters/chapter01/chapter01-result1.png)
![http://localhost:4004/webapp/index.html](/chapters/chapter01/chapter01-result2.png)

Continue to [Chapter 2 - Creating and Consuming Our First Model](/chapters/chapter02)