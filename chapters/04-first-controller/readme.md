# Chapter 04 - Creating and Extending the First Controller

At the end of this chapter we will have made our UI5 app interactive so that a user can select a book to read more information about it.

## Steps

[1. Create a new `webapp/controller/App.controller.js` file](#1-create-a-new-webappcontrollerappcontrollerjs-file)<br>
[2. Reference the controller in the `webapp/view/App.view.xml`](#2-reference-the-controller-in-the-webappviewappviewxml)<br>
[3. Add a new `onSelect` method to our controller](#3-add-a-new-onselect-method-to-the-controller)<br>
[4. Bind the new `.onSelect` method to the `<ColumnListItem />`](#4-bind-the-new-onselect-method-to-the-columnlistitem)<br>
[5. Add a new `<FlexBox />` to the `webapp/view/App.view.xml`](#5-add-a-new-flexbox--to-the-webappviewappviewxml)<br>
[6. Inspect the app in the browser](#6-inspect-the-app-in-the-browser)<br>

### 1. Create a new `webapp/controller/App.controller.js` file

➡️ Create a new JavaScript file `webapp/controller/App.controller.js` and paste the following code into it:

```javascript
sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict"
    return Controller.extend("sap.codejam.controller.App", {
        onInit: function () {
            alert("I am about to initialize the view.")
        }
    })
})
```

We created our first controller file. We imported the core `Controller` from the library, passed it to a function and extended it. To demonstrate how the controller works, we added an alert to the `onInit` [lifecycle hook](https://sapui5.hana.ondemand.com/sdk/#/topic/121b8e6337d147af9819129e428f1f75.html), which automatically gets called upon initialization of the view.

This is what our project's structure now looks like:

```text
- bookshop/
    + node_modules/
    - webapp/
        - controller/
            - App.controller.js
        - view/
            - App.view.xml
        - Component.js
        - index.html
        - manifest.json
    - package-lock.json
    - package.json
    - ui5.yaml
```

### 2. Reference the controller in the `webapp/view/App.view.xml`

To make the browser execute the JavaScript code in our controller file we have to reference it in our `webapp/view/App.view.xml`.

➡️ Replace the opening tag of the `<mcv:View />` control at the top of our view with the following code snippet:

```xml
<mvc:View
    xmlns="sap.m"
    xmlns:mvc="sap.ui.core.mvc"
    controllerName="sap.codejam.controller.App">
```

We added the controller to the view. We can now refresh our app running in the browser and see the alert being displayed just before the view is visible:

![alert](alert.png#border)

### 3. Add a new `onSelect` method to the controller

Of course we can not only extend existing methods in a controller, but we can write our own ones, too.

➡️ Replace the existing content in the `webapp/controller/App.controller.js` file with the following code:

```javascript
sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict"
    return Controller.extend("sap.codejam.controller.App", {
        onSelect: function (oEvent) {
            const oSource = oEvent.getSource()
            const contextPath = oSource.getBindingContextPath()
            const form = this.getView().byId("bookDetails")
            form.bindElement(contextPath)
        }
    })
})
```

We defined a new `onSelect` method that is being passed an event, which will be the press event when a user clicks on a book. First, the method gets the source of the event. It then gets the binding context path of that source (the selected book, for example `/Books(201)` when clicking on the Book with the ID 201) and binds this element to the "bookDetails" section of the view, which we have not defined yet. This so-called "context binding" (see [binding types](https://ui5.sap.com/#/topic/91f0d8ab6f4d1014b6dd926db0e91070)) will allow us to use relative binding within the "bookDetails" section and all of its children (see [step 5](#5-add-a-new-flexbox--to-the-webappviewappviewxml)).

### 4. Bind the new `.onSelect` method to the `<ColumnListItem />`

We can now use our new method in our `webapp/view/App.view.xml` by binding it to the `press` event of the `<ColumnListItem />`. 

➡️ Replace the opening tag of the `<ColumnListItem />` with the following code snippet:

```xml
<ColumnListItem 
    vAlign="Middle"
    press=".onSelect"
    type="Active">
```

We bound the `.onSelect` method to the press event of the `<ColumnListItem />` which means it will be called when a user clicks on a book in our table. Notice how we prefixed a dot (`.`) to the method name, which is a naming convention for custom methods that live in a controller. The prefixed dot will be omitted when interpreted by the framework.

### 5. Add a new `<FlexBox />` to the `webapp/view/App.view.xml`

Now that we have a model that holds the data of the selected book, we can create a new area at the bottom of our page to display the description of the selected book.

➡️ Add the following code to the `webapp/view/App.view.xml` right after the `<Table />`:

```xml
<FlexBox direction="Column" class="sapUiMediumMarginTop" id="bookDetails">
    <FlexBox direction="Column" >
        <Title text="{title}" />
        <Text 
            text="{descr}"
            class="sapUiSmallMarginTop" />
    </FlexBox>
</FlexBox>
```

This is what our view now looks like (`<Table />` collapsed in the screen shot):

![App.view.xml](App.view.png#border)

We added two `<FlexBox />` controls to display the "bookDetails". A `<FlexBox />` is convenient for aligning content vertically ("Column", same as `<VBox />`) or horizontally ("Row", same as `<HBox />`). Inside the inner `<FlexBox />` we added controls to display the data (title and description text). We made use of the data binding concept again - in this case we used property binding ([binding types](https://ui5.sap.com/#/topic/91f0d8ab6f4d1014b6dd926db0e91070)). We also assigned a predefined CSS class (`sapUiSmallMarginTop`, see [other available classes](https://sapui5.hana.ondemand.com/sdk/#/topic/777168ffe8324873973151dae2356d1c.html))that adds a small margin to the top of the `<Text />` control.

> In the previous three chapters you learned about Models, Views, and Controllers. This approach is also called the Model-view-controller concept (MVC) and is especially important in UI5 as well as web development in general. As a UI5 developer you should familiarize yourself with the concept as much as possible. You can learn more about it in the [SAPUI5 Documentation](https://sapui5.hana.ondemand.com/#/topic/91f233476f4d1014b6dd926db0e91070).

### 6. Inspect the app in the browser

➡️ Move over to the browser and refresh the page. Select any book to see its description:

![result](result.png#border)

Continue to - [Chapter 05 - Adding an 'Order' Feature](/chapters/05-order-feature/)
