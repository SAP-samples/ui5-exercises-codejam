# Chapter 01 - Scaffolding the App

By the end of this chapter, we will have scaffolded an empty UI5 application.

## Steps

[0. Make sure you are in the project root (`bookshop/`)](#0-make-sure-you-are-in-the-project-root-bookshop)<br>
[1. Create a new `webapp/` directory for the UI5 app](#1-create-a-new-webapp-directory-for-the-ui5-app)<br>
[2. Create a `webapp/index.html` file](#2-create-a-webappindexhtml-file)<br>
[3. Add `ComponentSupport` to the `webapp/index.html` file](#3-add-componentsupport-to-the-webappindexhtml-file)<br>
[4. Create a `webapp/Component.js` file](#4-create-a-webappcomponentjs-file)<br>
[5. Create a `webapp/manifest.json` file](#5-create-a-webappmanifestjson-file)<br>
[6. Create a `ui5.yaml` file](#6-create-a-ui5yaml-file)<br>
[7. Create a `package.json` file](#7-create-a-packagejson-file)<br>
[8. Install dependencies and start application](#8-install-dependencies-and-start-application)<br>

### 0. Make sure you are in the project root (`bookshop/`)

➡️ Make sure you are in the `bookshop/` directory, which is our project root.

The material in this repository will always reference directories and files in relation to the project root.

### 1. Create a new `webapp/` directory for the UI5 app

Let's begin this project by creating an empty directory, which our UI5 application is going to sit in.

➡️ Create a new `webapp/` directory inside the `bookshop/` directory.

### 2. Create a `webapp/index.html` file

Like most other web applications our UI5 app needs an `index.html` serving as the entry point.

➡️ Create a new `webapp/index.html` file and paste the following code into it:

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

We loaded the UI5 framework into our project and configured a few attributes such as the theme and library we want to use, and the name of our project root. This process is called **bootstrapping**.

<details>
<summary>What is HTML and how is it structured? 💬</summary>

<br>

> HTML (HyperText Markup Language) is the standard markup language for documents that are designed to be displayed in a web browser (web pages) and is one of the fundamental building blocks of the web. It is used to describe a web page's elements such as paragraphs, links and images.
>
>An HTML file usually includes 4 major parts.
> 1. `<!DOCTYPE html>` is the document type declaration and tells the browser what the document is - HTML.
> 1. In HTML, elements always have an opening and a closing tag and everything in between is considered to be a child of that element. The first element of a document is the HTML element itself, represented by the opening `<html>` and closing `<html>` tag. This tells the browser that everything between those markers should be interpreted as HTML.
> 1. The first child of the HTML element is the head. The head includes meta information about the document.
> 1. The second child of the HTML element is the body. The body includes the actual content of the document. Elements such as paragraphs, links and images will be children of the body.
>
> An `index.html` file is usually the entry point to a web page. Our UI5 app is no exception to that.

</details>

<details>
<summary>What do the attributes inside the &#60;script &#47;&#62; element mean? 💬</summary>

<br>

> An HTML `<script />` element tells the browser that its content should be interpreted as JavaScript code. In our case we don't have content inside the tags, but rather specify attributes of that `<script />` element. By specifying these attributes we initialize the UI5 framework and turn our blank `index.html` file into a UI5 project. This step is called **bootstrapping**.
>
> Let's go through each of the attributes step-by-step:
> - We specify an `id` for the `<script />` element, which is used by the framework to find out where it was initialized from.
> - The `src` attribute defines where the JavaScript code for the script tag lives. This JavaScript code is the UI5 framework. As you can see, we are loading OpenUI5. You can visit [https://openui5.hana.ondemand.com/resources/sap-ui-core.js](https://openui5.hana.ondemand.com/resources/sap-ui-core.js) and see the code that makes up the framework.
> - With the `data-sap-ui-theme` attribute we specify which UI5 theme we want to use. This is the  parameter we can modify to change the looks of our app. You can read more about Theming in the [SAPUI5 Documentation](https://sapui5.hana.ondemand.com/sdk/#/topic/497c27a8ee26426faacd2b8a1751794a).
> - With the `data-sap-ui-libs` attribute, which is technically optional, but should always be used, we specify which UI5 library we want to preload before our app is initialized. This drastically improves the performance of our app. We can always load other libraries into our views and controllers on demand (see examples in [chapter 02](/chapters/02-first-view/readme.md#1-create-a-webappviewappviewxml-file) of the current chapter).
> - With the `data-sap-ui-compatVersion` attribute we specify which version of certain UI5 features we want to use in case of incompatibilities. Since this concept has been abandoned the [SAPUI5 Documentation](https://sapui5.hana.ondemand.com/sdk/#/topic/9feb96da02c2429bb1afcf6534d77c79.html) suggests to set this value to `edge`.
> - With the `data-sap-ui-resourceroots` attribute we define a namespace for a certain location in our project. In our case we gave the root of our project (`./`) the namespace `sap.codejam`. We will use this namespace to reference our project root in other places of our code (e.g. in [step 5](#5-create-a-webappmanifestjson-file) of this chapter).


</details>

### 3. Add `ComponentSupport` to the `webapp/index.html` file

At this point we could theoretically already start instantiating UI5 elements (also called ***controls***), but because we want to make sure our project scales well, we will follow one of the best practices and wrap our app into a ***component*** first. A component is an independent and reusable part. This makes our app independent from the environment it's running in. In our case the component will be started from the `index.html`, but because it is encapsulated and reuseable, the same component could also be started from another `html` file that is powering a Fiori Launchpad for example. A UI5 component most of the times contains a whole UI5 app, so it's a little different from components you may now from other frameworks. If you want to reuse smaller UI parts, such as a single button or dialog, UI5 offers the concept of [fragments](https://sapui5.hana.ondemand.com/sdk/#/topic/4da72985139b4b83b5f1c1e0c0d2ed5a), which we will not cover in this project.

We need to add the `ComponentSupport` to the bootstrapping of our app and add a component to our html `<body />`.

➡️ Replace the existing content of the `webapp/index.html` file with the following code:

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

We used the `data-sap-ui-oninit` attribute in our bootstrapping to specify that we want to initialize a UI5 Component. We also added a new HTML element (`div`) to our `<body />` that holds the component. The component set up is defined in a `Component.js` file, which we will create in the next step.

### 4. Create a `webapp/Component.js` file

Our `index.html` is now actively looking for a `Component.js` file on root level of our UI5 app. This is an important naming convention, so don't change the name of this file.

In case you are wondering, we configured the root of our project, which is the `webapp/` directory, during the bootstrapping in [step 2](#2-create-a-webappindexhtml-file) of this chapter.

➡️ Create a new `webapp/Component.js` file and paste the following code into it:

```javascript
sap.ui.define([
    "sap/ui/core/UIComponent"
], function (UIComponent) {
    "use strict"
    return UIComponent.extend(
        "sap.codejam.Component", {
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

We have set up our component by initializing the `UIComponent` from the UI5 library. We extended it with some metadata, referencing the `manifest.json`, which we will create next.

<details>
<summary>What does this code do in detail? 💬</summary>

<br>

> Our component set up is essentially a JavaScript module. We have defined it with the `sap.ui.define` method. This method takes two parameters (also see its [documentation](https://sapui5.hana.ondemand.com/sdk/#/api/sap.ui%23methods/sap.ui.define)):
> 1. An array of dependencies from UI5 libraries
> 1. A function that will be called
>
> Our only dependency is the `UIComponent` class, which we pass to the function. This function returns the `UIComponent`, but [extends](https://sapui5.hana.ondemand.com/sdk/#/api/sap.ui.core.UIComponent%23methods/sap.ui.core.UIComponent.extend) it with a new subclass that we call `sap.codejam.Component`. This subclass is enriched with a `metadata` parameter, which is an object that points to a `manifest.json` and makes sure that the `UIComponent` is created fully asynchronously (`"sap.ui.core.IAsyncContentCreation"`). The subclass is also enriched by an `init` function, which is automatically invoked by the framework when the component is instantiated. Inside this function, we make sure that the init function of the `UIComponent`'s parent is invoked (which is obligatory).
>
> Read more about the component configuration in the [SAPUI5 Documentation](https://sapui5.hana.ondemand.com/sdk/#/topic/4cfa60872dca462cb87148ccd0d948ee). 

</details>

### 5. Create a `webapp/manifest.json` file

The `manifest.json` is our application descriptor file and holds metadata about our app

➡️ Create a new `webapp/manifest.json` and paste the following code into it:

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

<details>
<summary>What is a manifest.json file? 💬</summary>

<br>

> A `manifest.json` file is usually used to define metadata about a web app or extension, like its name, icon, or other details. It is not specific to UI5. Apps built with other frameworks also have this file. The `manifest.json` is especially important for UI5, as it is used by the framework during runtime to define important properties of the app, such as data sources, localization settings, and [many more](https://sapui5.hana.ondemand.com/sdk/#/topic/be0cf40f61184b358b5faedaec98b2da.html#loiobe0cf40f61184b358b5faedaec98b2da/section_nonamespace).

</details>

This is what our project's structure now looks like:

```text
- bookshop/
    - webapp/
        - Component.js
        - index.html
        - manifest.json
```

At this point the UI5 application itself is complete, although it's more an empty shell. We have a `webapp/index.html` file (entry point) containing our component, which references our `manifest.json`, which describes our application. The only thing missing is a web server to serve these files. Let's implement this web server next.

### 6. Create a `ui5.yaml` file

It is recommended to use the [UI5 Tooling](https://sap.github.io/ui5-tooling/v2/) to serve a UI5 application. This tooling requires a `ui5.yaml` file describing the project.

➡️ Create a new `ui5.yaml` file in the *project root* (NOT in the `webapp/` directory) with the following content:

```yaml
specVersion: '2.6'
metadata:
  name: bookshop
type: application
```

We created a minimal `ui5.yaml` file describing our UI5 project. The UI5 Tooling uses this file to configure the web server that the application will be hosted on.

### 7. Create a `package.json` file

The UI5 Tooling is a Node.js based package, so we have to turn our project into a Node.js based project to be able to use it. We can do so by adding a `package.json` file to the project root.

➡️ Create a new `package.json` file in the *project root* (NOT in the `webapp/` directory) with the following content:

```json
{
  "name": "bookshop",
  "version": "0.0.1",
  "scripts": {
    "dev": "ui5 serve --open \"index.html\""
  },
  "devDependencies": {
    "@ui5/cli": "^4"
  }
}
```

We added a new `package.json` file, which essentially turns our project into a Node.js based project. We currently only have one script and one (development) dependency, which are both pointing to the UI5 Tooling (`@ui5/cli`). We can now finally start installing the tooling and start our application.

### 8. Install dependencies and start application

➡️ Open a new terminal session on root level of our project and run the following command:

```bash
npm install && npm run dev
```

We installed the project's dependencies and executed the `start` script of our project. This script is like a "shortcut" for the `ui5 serve --open "index.html"` command of the UI5 Tooling. You should see a new browser window or tab automatically opening and displaying our (empty) UI5 application.

This is what our project structure now looks like: 

```text
- bookshop/
    + node_modules/
    - webapp/
        - Component.js
        - index.html
        - manifest.json
    - package-lock.json
    - package.json
    - ui5.yaml
```

This is what our application currently looks like:

![result](result.png#border)

Continue to [Chapter 02 - Creating the First View](/chapters/02-first-view/)
