# Chapter 1 - Scaffolding the App - Our First View

By the end of this chapter, we will have created a fully functional UI5 app that displays the title of our bookshop and greets the user.

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

<details><summary>What do the rest of the files and directories of the bookshop do? 💬</summary>

<br>

> The rest of the files and directories of the `bookshop` represent the backend application that was built with the Node.js flavour of the SAP Cloud Application Programming Model (CAP):
> - The [package.json](/bookshop/package.json) declares the project's dependencies, which were loaded into the `node_modules` directory when we ran `npm install` during [Chapter 0 - Preparing the Development Environment](/chapters/chapter00/readme.md).
> - The [db/](/bookshop/db/) directory represents the database layer of the backend, defining all tables (entities) as well as the association between them.
> - The [srv/](/bookshop/srv/) directory represents the service layer of the backend, which is the API our frontend UI5 application will be interacting with.
> - The [app/finished-webapp/](app/finished-webapp/) directory already includes the finished UI5 bookshop app, but we want to rebuild it from scratch step by step.

</details>

### 2. Create an `app/webapp/index.html` file

Like most other web applications our UI5 app needs an `index.html` serving as the entry point.

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
> - With the `data-sap-ui-libs` attribute, which is technically optional, but should always be used, we specify which UI5 library we want to preload before our app is initialized. This drastically improves the performance of our app. We can always load other libraries into our views and controllers on demand (see examples in [step 6](/chapters/chapter01#6-create-an-appwebappviewappviewxml-file-our-first-view) of the current chapter).
> - With the `data-sap-ui-compatVersion` attribute we specify which version of certain UI5 features we want to use in case of incompatibilities. Since this concept has been abandoned the [SAPUI5 Documentation](https://sapui5.hana.ondemand.com/sdk/#/topic/9feb96da02c2429bb1afcf6534d77c79.html) suggests to set this value to `edge`.
> - With the `data-sap-ui-resourceroots` attribute we define a namespace for a certain location in our project. In our case we gave the root of our project (`./`) the namespace `sap.codejam`. We will use this namespace to reference our project root in other places of our code (e.g. in [step 5](/chapters/chapter01#5-create-an-appwebappmanifestjson-file) of the current chapter).


</details>

### 3. Add `ComponentSupport` to our `app/webapp/index.html` file

At this point we could theoretically already start instantiating UI5 elements (also called ***controls***), but because we want to make sure our project scales well, we will follow one of the best practices and wrap our app into a ***component*** first. A component is an independent and reusable part. This makes our app independent from the environment it's running in. In our case the component will be started from the `index.html`, but because it is encapsulated and reuseable, the same component could also be started from another `html` file that is powering a Fiori Launchpad for example. A UI5 component most of the times contains a whole UI5 app, so it's a little different from components you may now from other frameworks. If you want to reuse smaller UI parts, such as a single button or dialog, UI5 offers the concept of [fragments](https://sapui5.hana.ondemand.com/sdk/#/topic/4da72985139b4b83b5f1c1e0c0d2ed5a), which we will not cover in this project.

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

We used the `data-sap-ui-oninit` attribute in our bootstrapping to specify that we want to initialize a UI5 Component. We also added a new HTML element (`div`) to our `<body />` that holds the component. The component set up is defined in a `Component.js` file, which we will create next.

### 4. Create an `app/webapp/Component.js` file

Our `index.html` is now actively looking for a `Component.js` file on root level of our UI5 app. This is an important naming convention, so don't change the name of this file.

In case you are wondering, we configured the root of our project, which is the `app/webapp/` directory, during the bootstrapping in [step 2](/chapters/chapter01#2-create-an-appwebappindexhtml-file) of this chapter.

➡️ Create a new `app/webapp/Component.js` file and paste the following code into it:

```javascript
sap.ui.define([
    "sap/ui/core/UIComponent",
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
> 1. A function that will be executed
>
> Our only dependency is the `UIComponent`, which we pass to the function. This function returns the `UIComponent`, but [extends](https://sapui5.hana.ondemand.com/sdk/#/api/sap.ui.core.UIComponent%23methods/sap.ui.core.UIComponent.extend) it with an new subclass that we call `sap.codejam.Component`. This subclass is enriched with a `metadata` parameter, which is an object that points to a `manifest.json` and makes sure that the `UIComponent` is created fully asynchronously (`"sap.ui.core.IAsyncContentCreation"`). The subclass is also enriched by an `init` function, which is automatically invoked by the framework when the component is instantiated. Inside this function, we make sure that the init function of the `UIComponent`'s parent is invoked (which is obligatory).
>
> Read more about the component configuration in the [SAPUI5 Documentation](https://sapui5.hana.ondemand.com/sdk/#/topic/4cfa60872dca462cb87148ccd0d948ee). 

</details>

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

<details>
<summary>What is a manifest.json file? 💬</summary>

<br>

> A `manifest.json` file is usually used to define metadata about a web app or extension, like its name, icon, or other details. It is not specific to UI5. Apps built with other frameworks also have this file. The `manifest.json` is especially important for UI5, as it is used by the framework during runtime to define important properties of the app, such as data sources, localization settings, and [many more](https://sapui5.hana.ondemand.com/sdk/#/topic/be0cf40f61184b358b5faedaec98b2da.html#loiobe0cf40f61184b358b5faedaec98b2da/section_nonamespace).

</details>

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
                    <Panel headerText="Hello, Dev! 👋">
                        <content>
                        </content>
                    </Panel>
                </content>
            </Page>
        </pages>
    </App>

</mvc:View>
```

We defined our first XML view with a few UI5 controls. UI5 controls are reusable UI elements provided by the framework. Similar to HTML elements, they have an opening and closing tag and predefined attributes (non-working example: `<Control attributes="myValue"></Control>`). They follow the [Fiori Design Guidelines](https://experience.sap.com/fiori-design-web/) and provide a lot of functionalities out of the box. XML views are the best way to use and structure UI5 controls, as they are very easy to read and represent the hierarchical structure of controls very well. We will just call them 'views' from now on.

You might be wondering how you as a developer can find out which UI5 controls to use and what attributes and APIs they have. The official [SAPUI5 API Reference](https://sapui5.hana.ondemand.com/#/api) as well as the [Code Samples](https://sapui5.hana.ondemand.com/#/controls) are your go-to resources and contain all the information you will ever need.

<details>
<summary>What do the individual controls in our code do? 💬</summary>

<br>

> - The [`<View />`](https://sapui5.hana.ondemand.com/#/api/sap.ui.core.mvc.View) control is our base class for the view. At the top of the file you can see that it is part of the `sap.ui.core.mvc` library. We assign this library to an xml namespace (abbreviated `xmlns`) that we call `mvc` (we will cover what `mvc` stands for in [chapter 3](/chapters/chapter03#5-add-a-new-flexbox--to-the-appwebappviewappviewxml)). We always use controls by prefixing its namespace (the library it is from) followed by a colon (e.g. `<mcv:View />`). Each view can have one default namespace, that can be omitted. In our case we assigned the `sap.m` library to the default namespace.
> - The [`<App />`](https://sapui5.hana.ondemand.com/#/api/sap.m.App) control is the root element of a UI5 app. In the documentation we can see that its [default aggregation](https://sapui5.hana.ondemand.com/#/api/sap.m.App%23aggregations) is `<pages />`. This means that these are the expected children of the `<App />` control. Aggregations are always lowercase.
> - The [`<Page />`](https://sapui5.hana.ondemand.com/#/api/sap.m.Page) control is a container that holds one whole screen of an app. In its documentation we can see that it can have a `title` text that appears in the page header bar. We can also see that its [default aggregation](https://sapui5.hana.ondemand.com/#/api/sap.m.Page%23aggregations) is `<content />`.
> - The [`<Panel />`](https://sapui5.hana.ondemand.com/#/api/sap.m.Panel%23overview) control is a container for grouping and displaying information. In its documentation we can see that we can define a `headerText` that will be displayed at the top of it. We can also see that its [default aggregation](https://sapui5.hana.ondemand.com/#/api/sap.m.Panel%23aggregations) is `<content />`.

</details>


### 7. Run our app

At this point we have already created a fully functional UI5 app. Let's start our app.

➡️ Open a terminal session from the `bookshop/` directory and run the following command:

```bash
npm run dev 
```

We ran the script to start our app locally, which is defined in our [package.json](/bookshop/package.json). We did this on root level of the `bookshop` project, as we want to start both our front and backend application. The SAP Cloud Application Model automatically looks for `html` files inside the `app/` directory and serves them on a web server alongside the service endpoints for the backend application (see [srv](/bookshop/srv/)). You can find the URL to access it in the terminal output. It will be [http://localhost:4004](http://localhost:4004) or something similar depending on your development environment.

The server is set to restart once it detects a change in one of the files. This is very useful as we don't have to do this manually after we one or more changes to our app. You can test this by editing the `title` attribute of the `<Page />`, saving the file, and reloading the page in the browser.

![http://localhost:4004](/chapters/chapter01/chapter01-result1.png)
![http://localhost:4004/webapp/index.html](/chapters/chapter01/chapter01-result2.png)

Continue to [Chapter 2 - Creating and Consuming Our First Model](/chapters/chapter02)