# Chapter 6 - Adding Custom Formatting

At the end of this chapter we will have added custom formatting to the `stock` column in our table as well as to the order `<Button />` and `<StepControl />`.

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

![View with ObjectStatus for stock](/chapters/chapter06/chapter06-01.png)

We replaced the `<Text />` control with an `<ObjectStatus />` which allows us to set a `state` attribute. For the state we use a concept called ***formatting***. 'Formatting' means that we style our content based on conditions. The code for our `state` attribute looks complicated, because it is written as an inline if-statement, but translating it into pseudo code makes it a lot more readable:

```text
is the stock higher or equal to 20?
    if yes: set state to 'Success'
    if no: is the stock is higher than 0?
        if yes: set state to 'Warning'
        if no: set state to 'Error'
```

### 2. Add an `itemSelected` property to the `userSelection` model

Let us also use formatting to enable and disable our order `<Button />` and `<StepInput />` based on whether a book is currently selected or not. For that, we can add a new property to our `userSelection` model. 

➡️ Add the following three code snippets to their respective places in the `app/webapp/controller/App.controller.js` (specified in the comments above):

```javascript
//in the onInit method where the userSelection model get instantiated, just before the selectedQuantity gets set to 1
itemSelected: false,

//at the very end of the onSelect method
oModel.setProperty("/itemSelected", true)

//at the very end of the onSearch method
oModel.setProperty("/itemSelected", false)
```

This is what our controller now looks like after all the changes (`onSubmitOrder` method collapsed in the screen shot):

![Controller with itemSelected property](/chapters/chapter06/chapter06-02.png)

We added a new `itemSelected` property to the `userSelection` model and made sure it gets updated accordingly when a user selects a book (set to `true`) or searches for another book (set to `false`).

### 3. Add an `enabled` attribute to the order `<Button />` and `<StepInput />`

The previous step laid the foundation for being able to enable and disable the order `<Button />` and `<StepInput />` control based on whether an item is selected or not.

➡️ Replace the existing `<Button />` and `<StepInput />` control in our `app/webapp/view/App.view.xml` with the following controls:

```xml
<Button 
    text="Order"
    press=".onSubmitOrder"
    enabled="{= 
        ${userSelection>/itemSelected} === true 
            ? ${userSelection>/selectedItemData/stock} === 0 
                || ${userSelection>/selectedQuantity} === 0
                ? false 
                : true 
            : false}" />
<StepInput
    value="{userSelection>/selectedQuantity}"
    min="0"
    textAlign="Center"
    max="{userSelection>/selectedItemData/stock}"
    enabled="{= 
        ${userSelection>/itemSelected} === true 
            ? ${userSelection>/selectedItemData/stock} === 0 
                ? false 
                : true 
            : false}" />
```

We added the `enabled` attribute to our `<Button />` and `<StepInput />` control making sure they are only enabled and clickable when the user has selected a book. We used the inline if-statement syntax for it again, which looks complicated at first but can easily be broken down into its individual pieces. This is the pseudo code for the `enabled` attribute of the `<Button />`:

```text
is an item selected?
    if yes: is the stock 0 or the selected quantity 0?
        if yes: set to false
        if not: set to true
    if not: set to false
```

In case you want to learn more about custom formatting in UI5: There is also a way to write a custom formatter in a separate JavaScript file and avoid the inline syntax. Learn more about that [here](https://sapui5.hana.ondemand.com/#/topic/0f8626ed7b7542ffaa44601828db20de).

### 4. Inspect and test the new formatting

➡️ Refresh the app. Inspect and test our new formatting.

You will see that the `stock` is color coded based on the thresholds we defined. You will also see that the `<Button />` and `<StepInput />` controls are disabled by default if no book is selected. Try and set the `selectedQuantity` to match the `stock` of a book and submit an order. After that, the `<Button />` and `<StepInput />` control will be disabled based on our formatting, because no more books are available.

![http://localhost:4004/webapp/index.html](/chapters/chapter06/chapter06-result.png)

Continue to [Chapter 7 - Adding i18n Features](/chapters/chapter07)
