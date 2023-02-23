# Chapter 1.02 - Creating the First View

By the end of this chapter, we will have added the first view to our UI5 application.

## Steps

[1. Create a `webapp/view/App.view.xml` file](#1-create-a-webappviewappviewxml-file)<br>
[2. Inspect the app in the browser](#2-inspect-the-app-in-the-browser)<br>

### 1. Create a `webapp/view/App.view.xml` file

As of now, our project is more an empty shell than a real application, so let's now enrich it with some "real" content that is visible to the user - a so called "view". We already referenced our root XML view in our `webapp/manifest.json` in the [previous chapter](/chapters/1.01-scaffolding/readme.md#5-create-a-webappmanifestjson-file). Let's create this file now.

➡️ Create a new `webapp/view/App.view.xml` file and paste the following code into it:

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

We defined our first XML view with a few UI5 controls. UI5 controls are reusable UI elements provided by the framework. Similar to HTML elements, they have an opening and closing tag and predefined attributes (non-working example: `<Control attribute="myValue"></Control>`). They follow the [Fiori Design Guidelines](https://experience.sap.com/fiori-design-web/) and provide a lot of functionalities out of the box. XML views are the best way to use and structure UI5 controls, as they are very easy to read and represent the hierarchical structure of controls very well. We will just call them 'views' from now on.

You might be wondering how you as a developer can find out which UI5 controls to use and what attributes and APIs they have. The official [SAPUI5 API Reference](https://sapui5.hana.ondemand.com/#/api) as well as the [Code Samples](https://sapui5.hana.ondemand.com/#/controls) are your go-to resources and contain all the information you will ever need.

<details>
<summary>What do the individual controls in our view do? 💬</summary>

<br>

> - The [`<View />`](https://sapui5.hana.ondemand.com/#/api/sap.ui.core.mvc.View) control is our base class for the view. At the top of the file you can see that it is part of the `sap.ui.core.mvc` library. We assign this library to an xml namespace (abbreviated `xmlns`) that we call `mvc` (we will cover what `mvc` stands for in [chapter 1.04](/chapters/1.04-first-controller/readme.md#5-add-a-new-flexbox--to-the-appwebappviewappviewxml)). We always use controls by prefixing its namespace (the library it is from) followed by a colon (e.g. `<mcv:View />`). Each view can have one default namespace, that can be omitted. In our case we assigned the `sap.m` library to the default namespace.
> - The [`<App />`](https://sapui5.hana.ondemand.com/#/api/sap.m.App) control is the root element of a UI5 app. In the documentation we can see that its [default aggregation](https://sapui5.hana.ondemand.com/#/api/sap.m.App%23aggregations) is `<pages />`. This means that these are the expected children of the `<App />` control. Aggregations are always lowercase.
> - The [`<Page />`](https://sapui5.hana.ondemand.com/#/api/sap.m.Page) control is a container that holds one whole screen of an app. In its documentation we can see that it can have a `title` text that appears in the page header bar. We can also see that its [default aggregation](https://sapui5.hana.ondemand.com/#/api/sap.m.Page%23aggregations) is `<content />`.
> - The [`<Panel />`](https://sapui5.hana.ondemand.com/#/api/sap.m.Panel%23overview) control is a container for grouping and displaying information. In its documentation we can see that we can define a `headerText` that will be displayed at the top of it. We can also see that its [default aggregation](https://sapui5.hana.ondemand.com/#/api/sap.m.Panel%23aggregations) is `<content />`.

</details>


### 2. Inspect the app in the browser

➡️ Refresh the UI5 application in the browser.

This is what the application now looks like:

![]()

Continue to [Chapter 1.03 - Creating and Consuming the First Model](/chapters/1.03-first-model/)