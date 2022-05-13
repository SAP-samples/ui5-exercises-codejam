# Chapter 3 - Creating and Extending our First Controller

At the end of this chapter we will have made our UI5 app interactive so that a user can select a book to read more information about it.

## Steps

[1. Create a new `app/webapp/controller/App.controller.js` file](#1-create-a-new-appwebappcontrollerappcontrollerjs-file)<br>
[2. Reference the controller file in our `app/webapp/view/App.view.xml`](#2-reference-the-controller-file-in-our-appwebappviewappviewxml)<br>
[3. Add a new `userSelection` model and an `onSelect` method to our controller](#3-add-a-new-userselection-model-and-an-onselect-method-to-our-controller)<br>
[4. Bind the new `onSelect` method to the `<ColumnListItem />`](#4-bind-the-new-onselect-method-to-the-columnlistitem)<br>
[5. Add a new `<FlexBox />` to the `app/webapp/view/App.view.xml`](#5-add-a-new-flexbox--to-the-appwebappviewappviewxml)<br>
[6. Inspect our app in the browser](#6-inspect-our-app-in-the-browser)<br>

### 1. Create a new `app/webapp/controller/App.controller.js` file

➡️ Create a new JavaScript file `app/webapp/controller/App.controller.js` and paste the following code into it:

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

We created our first controller file. We imported the `Controller` from the library, passed it to a function and extended it. To demonstrate how the controller works, we added an alert to the `onInit` method, which automatically gets triggered upon initialization of the view.

### 2. Reference the controller file in our `app/webapp/view/App.view.xml`

To make the browser execute the JavaScript code in our controller file we have to reference it in our `app/webapp/view/App.view.xml`.

➡️ Replace the opening tag of the `<mcv:View />` control at the top of our view with the following code snippet:

```xml
<mvc:View
    xmlns="sap.m"
    xmlns:mvc="sap.ui.core.mvc"
    controllerName="sap.codejam.controller.App">
```

We can now refresh our app running in the browser and see the alert being displayed just before the view is visible.

### 3. Add a new `userSelection` model and an `onSelect` method to our controller

Of course we can not only extend existing methods in a controller, but we can write our own ones, too.

➡️ Replace the existing content in the `app/webapp/controller/App.controller.js` file with the following code:

```javascript
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict"
    return Controller.extend("sap.codejam.controller.App", {
        onInit: function () {
            this.getView().setModel(new JSONModel({}), "userSelection")
        },
        onSelect: function (oEvent) {
            let oModel = this.getView().getModel("userSelection")
            let selectedModelPath = oEvent.getSource().getBindingContext().sPath
            let selectedModelData = oEvent.getSource().getModel().getProperty(selectedModelPath)
            oModel.setProperty("/selectedItemPath", selectedModelPath)
            oModel.setProperty("/selectedItemData", selectedModelData)
        }
    })
})
```

We imported the `JSONModel` from the library and instantiated a new one with the name `userSelection` in the `onInit` method of the controller. We can use this model to store data that is used to control the state of certain UI elements. We also defined a new `onSelect` method for when a user clicks on a book in the table. Inside this method, we get the `userSelection` model and set the data of the selected item (as well as the path to it) as a new property of the model.

### 4. Bind the new `onSelect` method to the `<ColumnListItem />`

We can now use our new method in our `app/webapp/view/App.view.xml` by binding it to the `press` event of the `<ColumnListItem />`. 

➡️ Replace the opening tag of the `<ColumnListItem />` with the following code snippet:

```xml
<ColumnListItem 
    vAlign="Middle"
    press=".onSelect"
    type="Active">
```

We bound the `onSelect` method to the press event of the `<ColumnListItem />` which means it will be executed when a user clicks on a book in our table. Notice how we prefixed a dot to the method name, which is a naming convention for custom methods that live in a controller. The dot will be omitted when interpreted by the framework.

### 5. Add a new `<FlexBox />` to the `app/webapp/view/App.view.xml`

Now that we have a model that holds the data of the selected book, we can create a new area at the bottom of our page to display the description of the selected book.

➡️ Add the following code to the `app/webapp/view/App.view.xml` right after the `<Table />`:

```xml
<FlexBox direction="Column" class="sapUiMediumMarginTop">
    <FlexBox direction="Column" >
        <Title text="{userSelection>/selectedItemData/title}" />
        <Text 
            text="{userSelection>/selectedItemData/descr}"
            class="sapUiSmallMarginTop" />
    </FlexBox>
</FlexBox>
```

This is what our view now looks like (`<Table />` collapsed in the screen shot):

![View with Table](/chapters/chapter03/chapter03-01.png)

We added two `<FlexBox />` controls to display the data as they make it very easy to align content vertically ("Column") or horizontally ("Row"). Inside the inner `<FlexBox />` we added controls for the actual data (title and description text). We made use of the data binding concept again and bound our control to our newly created `userSelection` model (see step 3). We also assigned a predefined CSS class that adds a small margin at the top to the `<Text />` control.

> In the previous three chapters you learned about Models, Views, and Controllers. This approach is also called the Model-view-controller concept (MVC) and is especially important in UI5 as well as web development in general. As a UI5 developer you should familiarize yourself with the concept as much as possible. You can learn more about it in the [SAPUI5 Documentation](https://sapui5.hana.ondemand.com/#/topic/91f233476f4d1014b6dd926db0e91070).

### 6. Inspect our app in the browser

➡️ Move over to the browser and refresh the page. Select any book to see its description:

![http://localhost:4004/webapp/index.html](/chapters/chapter03/chapter03-result.png)

Continue to - [Chapter 4 - Adding an 'Order' Feature to Our Bookshop](/chapters/chapter04)
