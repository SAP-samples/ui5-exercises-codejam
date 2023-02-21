# Chapter 6 - Adding Expression Binding & Custom Formatting

At the end of this chapter we will have added expression binding to the stock column in our table as well as custom formatting to the order `<Button />`.

## Steps

[1. Replace the `<Text />` control for the `stock` with an `<ObjectStatus />`](#1-replace-the-text--control-for-the-stock-with-an-objectstatus)<br>
[2. Use a custom formatting function](#2-use-a-custom-formatting-function)<br>
[3. Create `app/webapp/model/formatter.js`](#3-create-appwebappmodelformatterjs)<br>
[4. Import and use `../model/formatter` in `app/webapp/controller/App.controller.js`](#4-import-and-use-modelformatter-in-appwebappcontrollerappcontrollerjs)<br>
[5. Disable `<Button />` by default](#5-disable-button--by-default)<br>
[6. Test the new formatting](#6-test-the-new-formatting)<br>

### 1. Replace the `<Text />` control for the `stock` with an `<ObjectStatus />`

➡️ Replace the `<Text />` control for the `stock` in the `<ColumnListItem />`  in our `app/webapp/view/App.view.xml` with the following control:

```xml
<ObjectStatus 
    text="{stock}"
    state="{=
        ${stock} >= 20
            ? 'Success'
        : ${stock} > 0
            ? 'Warning'
        : 'Error'}" />
```

This is what our view now looks like (a few controls collapsed in the screen shot):

![View with ObjectStatus for stock](/chapters/chapter006/chapter006-01.png)

We replaced the `<Text />` control with an `<ObjectStatus />` which allows us to set a `state` attribute. For the state we make use of a concept called [expression binding](https://sapui5.hana.ondemand.com/#/topic/c98d57347ba444c6945f596584d2db45). Expressions bindings can be used to set a control's attributes based on simple conditions or calculations. Our expression might look complicated, because it is written as an inline if-statement, but translating it into pseudo code makes it a lot more readable:

```text
is the stock higher or equal to 20?
    if yes: set state to 'Success'
    if no: is the stock is higher than 0?
        if yes: set state to 'Warning'
        if no: set state to 'Error'
```

### 2. Use a custom formatting function

We want to make sure that users cannot order more books than there are available. Interestingly, this feature is a little too complex to be represented as an expression binding, as we will have to compare two values from different sources. We will have to compare the `{stock}` (bound via element binding) to the current value of the `<StepInput />` (gettable via `getValue()`). To achieve that, we will implement custom formatting function.

➡️ Replace the existing `<Button />` and `<StepInput />` in our `app/webapp/view/App.view.xml` with the following controls:

```xml
<Button
    id="orderBtn"
    text="Order"
    press=".onSubmitOrder"
    enabled="{
        path: 'stock',
        targetType: 'any',
        formatter: '.formatter.inputLowerThanStock'
    }" />
<StepInput 
    id="stepInput"
    min="1"
    max="{stock}"
    textAlign="Center"
    validationMode="LiveChange" />
```

We added data binding syntax to the `enabled` attribute of the `<Button />` and specified a `formatter`. A formatter is a JavaScript function that is being passed the value of the `path` binding and gets executed every time this data changes. The function should return the value that should be set for the `enabled` attribute - a boolean (true/false) in this case. Because `{stock}` is an integer however and OData V4 will try to set this type on the attribute, we have to specify `targetType: 'any'`, which will turn off the automatic [type determination](https://openui5.hana.ondemand.com/topic/53cdd55a77ce4f33a14bd0767a293063.html).

We also set a max value for the `<StepInput />` using a relative [property binding](https://ui5.sap.com/#/topic/91f0d8ab6f4d1014b6dd926db0e91070). This only prevents users from using the plus and minus icons of the `<StepInput />` to set invalid value though and doesn't restrict the free input.

### 3. Create `app/webapp/model/formatter.js`

Let's now implement the custom formatting function.

➡️ Create a new file `app/webapp/model/formatter.js` with the following content:

```javascript
sap.ui.define([], function () {
	"use strict";
	return {
		inputLowerThanStock: function (availableStock) {
            const inputValue = this.getView().byId("stepInput").getValue()
            return inputValue <= availableStock
		}
	};
});
```

We implemented a custom formatting function to custom format the `<Button />`. The function does not extend any base object but just returns a JavaScript object with the `formatter` method(s) inside the `sap.ui.define` call. `inputLowerThanStock` method is being passed the `availableStock` from the control's `{stock}` property binding and gets the current value of the `<StepInput />` via the standard internal UI5 APIs. It does a simple comparison and returns a boolean.

### 4. Import and use `../model/formatter` in `app/webapp/controller/App.controller.js`

Although we have implemented and used our custom formatting function already, our view doesn't actually know where the function lives yet. Let's make our view aware of the function by importing it in the corresponding controller.

➡️ Replace the array defining the library imports as well the main function and its arguments at the top of the file with the following code snippet. Also add the formatter method. Keep the content of the main function (the return statement with the controller methods):

```javascript
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Text",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "../model/formatter"
], function (Controller, MessageToast, Dialog, Button, Text, Filter, FilterOperator, formatter) {
    formatter: formatter,
    // content of the function stays here
})  
```

We added the formatter to our controller to be able to call it in the corresponding view.

### 5. Disable `<Button />` by default

The current default behavior of our app is that no book is selected when users first visit the bookshop. However, the order button is already enabled. This is a good opportunity to use a [lifecycle hook](https://sapui5.hana.ondemand.com/sdk/#/topic/121b8e6337d147af9819129e428f1f75.html).

➡️ Add the following method to the `app/webapp/controller/App.controller.js` file:

```javascript
,
onAfterRendering: function () {
    this.getView().byId("orderBtn").setEnabled(false)
}
```

This is what our controller now looks like:

![]()

We added the `onAfterRendering` method to our controller. This method is automatically called once the rendering of the view is completed and its HTML is part of the document. Inside the method, we disable the order button. It will later be enabled once the user selects a book and the `{stock}` (property binding) changes and the custom formatting function gets called.

There are more lifecycle hooks available in UI5 that are suited for different tasks. Check the [documentation](https://sapui5.hana.ondemand.com/sdk/#/topic/121b8e6337d147af9819129e428f1f75.html) for more information.

### 6. Test the new formatting

➡️ Refresh the app. Inspect and test our new formatting. 

You will notice that the `stock` is color coded based on the thresholds we defined. You will also notice that the order button is disabled by default and always gets disabled once you enter value that is too high.

![http://localhost:4004/webapp/index.html](/chapters/chapter006/chapter006-result.png)

Continue to [Chapter 7 - Adding i18n Features](/chapters/chapter007)
