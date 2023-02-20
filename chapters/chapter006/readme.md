# Chapter 6 - Adding Custom Formatting

At the end of this chapter we will have added custom formatting to the `stock` column in our table as well as a method to handle the enabled/disabled state of our order controls.

## Steps

[1. Replace the `<Text />` control for the `stock` with an `<ObjectStatus />`](#1-replace-the-text--control-for-the-stock-with-an-objectstatus)<br>
[2. Add an `itemSelected` property to the `userSelection` model](#2-add-an-itemselected-property-to-the-userselection-model)<br>
[3. Add an `enabled` attribute to the order `<Button />` and `<StepInput />`](#3-add-an-enabled-attribute-to-the-order-button--and-stepinput)<br>
[4. Inspect and test the new formatting](#4-inspect-and-test-the-new-formatting)<br>

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

We replaced the `<Text />` control with an `<ObjectStatus />` which allows us to set a `state` attribute. For the state we use a concept called ***formatting***. 'Formatting' means that we style our content based on conditions. The code for our `state` attribute looks complicated, because it is written as an inline if-statement, but translating it into pseudo code makes it a lot more readable:

```text
is the stock higher or equal to 20?
    if yes: set state to 'Success'
    if no: is the stock is higher than 0?
        if yes: set state to 'Warning'
        if no: set state to 'Error'
```

In case you want to learn more about custom formatting in UI5: There is also a way to write a custom formatter in a separate JavaScript file and avoid the inline syntax. Learn more about that [here](https://sapui5.hana.ondemand.com/#/topic/0f8626ed7b7542ffaa44601828db20de).

### 2. Set max value for `<StepInput />`

We want to make sure that users cannot order more books than there are available. To achieve that, we can add some more logic to our `app/webapp/controller/App.controller.js`.

➡️ Add the following code to the `onSelect` method in the `app/webapp/controller/App.controller.js`:

```javascript
const stepInput = this.getView().byId("stepInput")
const availableStock = oSource.getBindingContext().getProperty("stock")
stepInput.setMax(availableStock)

this.checkIfInputExceedsAvailability()
```

We added some logic to our controller that sets a max value on the `<StepInput />` whenever a user selects a book. This is to ensure that users cannot set a higher quantity than there are books available. However, this is only prevents users from using the "-" (minus) and "+" (plus) icon to set higher values, but it doesn't prevent them from using the free input. Let's tackle this problem in the next step.

### 3. Add `checkIfInputExceedsAvailability()` method to `app/webapp/controller/App.controller.js`

We need a reusable method that handles the enabled/disabled state of the order controls depending on the available stock and the input value.

➡️ Add the following method to the `app/webapp/controller/App.controller.js`:

```javascript
,
checkIfInputExceedsAvailability: function () {
    const stepInput = this.getView().byId("stepInput")
    const inputValue = stepInput.getValue()
    const orderBtn = this.getView().byId("orderBtn")

    const availableStock = stepInput.getMax()
    if (availableStock == 0) {
        stepInput.setEnabled(false)
        orderBtn.setEnabled(false)
    } else if (inputValue > availableStock) {
        stepInput.setValue(availableStock)
        stepInput.setValueState("None")
        stepInput.setEnabled(true)
    } else {
        stepInput.setEnabled(true)
        orderBtn.setEnabled(true)
    }
}
```

We added a new method to our controller that makes sure that the order controls get disabled when a book's stock is equal to zero. The method also resets the input value to equal the available stock in case it ever exceeds it, which can happen when users use the free input of the `<StepInput />`.

This is what our controller now looks like after all the changes (`onSubmitOrder` method collapsed in the screen shot):

![Controller with itemSelected property](/chapters/chapter006/chapter006-02.png)

### 3. Disable order controls by default and invoke validation method

➡️ Replace the existing `<Button />` and `<StepInput />` control in our `app/webapp/view/App.view.xml` with the following controls:

```xml
<Button
    id="orderBtn"
    text="Order"
    press=".onSubmitOrder"
    enabled="false" />
<StepInput 
    id="stepInput"
    min="1"
    textAlign="Center"
    validationMode="LiveChange"
    enabled="false"
    validationError=".checkIfInputExceedsAvailability" />
```

We disabled (`enabled="false"`) our `<Button />` and `<StepInput />` by default, so they cannot be used until a book gets selected, which will trigger the `.onSelect` method enabling the controls. We also bound the `checkIfInputExceedsAvailability` method to the `validationError` event, so it gets triggered whenever the user enters an invalid value.

### 4. Inspect and test the new formatting

➡️ Refresh the app. Inspect and test our new formatting as well as entering invalid value in the `<StepInput />`.

You will notice that the `stock` is color coded based on the thresholds we defined. You will also see that the `<Button />` and `<StepInput />` controls are disabled by default if no book is selected.

![http://localhost:4004/webapp/index.html](/chapters/chapter006/chapter006-result.png)

Continue to [Chapter 7 - Adding i18n Features](/chapters/chapter007)
