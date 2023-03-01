# Chapter 1.05 - Adding an 'Order' Feature

At the end of this chapter we will have added a new feature to our bookshop that enables users to order books.

## Steps

[1. Add input field and button to the `webapp/view/App.view.xml`](#1-add-input-field-and-button-to-the-webappviewappviewxml)<br>
[2. Add a new `onSubmitOrder` method to the `webapp/controller/App.controller.js`](#2-add-a-new-onsubmitorder-method-to-the-webappcontrollerappcontrollerjs)<br>
[3. Add new imports to `webapp/controller/App.controller.js`](#3-add-new-imports-to-webappcontrollerappcontrollerjs)
[4. Test the new feature](#4-test-the-new-feature)<br>

### 1. Add input field and button to the `webapp/view/App.view.xml`

We need an input field for the order quantity as well as an order button for our new feature.

➡️ Paste the following code snippet as the first child in the existing outer `<FlexBox />` that we created in our `webapp/view/App.view.xml` in the previous chapter:

```xml
<FlexBox 
    alignItems="Center"
    justifyContent="End"
    class="sapUiMediumMarginBottom">
    <Button
        id="orderBtn"
        text="Order"
        press=".onSubmitOrder" />
    <StepInput 
        id="stepInput"
        min="1"
        textAlign="Center"
        validationMode="LiveChange" />
</FlexBox>
```

This is what our view now looks like (`<Table />` collapsed in the screen shot):

![App.view.xml](App.view.png#border)

We added a new `<FlexBox />` with the attributes `alignItems="Center"` and `justifyContent="End"` which makes sure all of its children will be centered vertically and displayed at the end of the box horizontally (which is the right side of the browser window in this case). Inside that `<FlexBox />` we define a `<Button />` that calls an `.onSubmitOrder` method when pressed, which we will define in the next step. We also added a `<StepInput />` so the user can set the order quantity.

### 2. Add a new `onSubmitOrder` method to the `webapp/controller/App.controller.js`

We can now implement the `onSubmitOrder` method that will send an order request to the remote backend system.

➡️ Add the following code snippet to the `webapp/controller/App.controller.js` right after the `onSelect` method:

```javascript
,
onSubmitOrder: function (oEvent) {
    const oBindingContext = this.getView().byId("bookDetails").getBindingContext()
    const selectedBookID = oBindingContext.getProperty("ID")
    const selectedBookTitle = oBindingContext.getProperty("title")
    const inputValue = this.getView().byId("stepInput").getValue()

    const oModel = this.getView().getModel()
    oModel.callFunction("/submitOrder", {
        method: "POST",
        urlParameters: {
            "book": selectedBookID,
            "quantity": inputValue
        },
        success: function(oData, oResponse) {
            oModel.refresh()
            const oText = `Order successful (${selectedBookTitle}, ${inputValue} pcs.)`
            MessageToast.show(oText)
        },
        error: function(oError) {
            if (oError.responseText) {
                oError = JSON.parse(oError.responseText).error
            }
            this.oErrorMessageDialog = new Dialog({
                type: "Standard",
                title: "Error",
                state: "Error",
                content: new Text({ text: oError.message })
                .addStyleClass("sapUiTinyMargin"),
                beginButton: new Button({
                    text: "Close",
                    press: function () {
                        this.oErrorMessageDialog.close()
                    }.bind(this)
                })
            })
            this.oErrorMessageDialog.open()
        }.bind(this)
    })
}
```

We added a new `onSubmitOrder` method to our controller, which we already bound to the order button's press event in [step 1](/chapters/1.05-order-feature/readme.md#2-add-a-new-onsubmitorder-method-to-our-webappcontrollerappcontrollerjs) of this chapter. First, the method gets the binding context from the `bookDetails` wrapper control. It then gets the book's ID and title from that context as well as the order quantity from the step input. It then get the view's default model (> no parameter when calling `.getModel()`) and calls the `/submitOrder` function on this model. This function was implemented a part of the OData backend service. So, at this point the application sends a `POST` request to the backend service, which handles the processing of the order and calculates the new stock. The promise of the call gets either resolved or rejected, so only one of the following two callback functions gets called:
1. **success** : The request is successful and we can refresh the data in our data model. This is to make sure the stock gets updated in our table accordingly. We can then display a message toast informing the user about the successful order and its details.
1. **error** : The request was unsuccessful and we get passed and error object. We instantiate a new dialog control (a pop-up window basically) and display the error message inside that dialog. We also add a button to the dialog so it can be closed by the user.

### 3. Add new imports to `webapp/controller/App.controller.js`

The new `onSubmitOrder` method uses several UI5 controls we have not imported yet. Make sure to import them from the library and pass the to the main function of the `webapp/controller/App.controller.js`.

➡️ Replace the array defining the library imports as well the main function and its arguments at the top of the file with the following code snippet. Keep the content of the main function (the return statement with all controller methods):

```javascript
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Text"
], function (Controller, MessageToast, Dialog, Button, Text) {
    // content of the function stays here 
})
```

This is what our controller now looks like (a few methods collapsed in the screen shot):

![App.controller.js](App.controller.png#border)

### 4. Test the new feature

We can now test our new feature and order one or more books.

➡️ Refresh the app. Play around with the `<StepInput />` control and order one ore more books. Refresh the page to check if the data is persistent. Try to order more books than there are available to provoke an error. You might notice changes in the data that you didn't make yourself, because everyone in this SAP CodeJam is consuming the same OData service.

![result](result.png#border)

Continue to [Chapter 1.06 - Adding a 'Search' Feature](/chapters/1.06-search-feature/)
