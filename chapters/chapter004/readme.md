# Chapter 4 - Adding an 'Order' Feature to Our Bookshop

At the end of this chapter we will have added a new feature to our bookshop that enables users to order books.

## Steps

[1. Add input field and button to our `app/webapp/view/App.view.xml`](#1-add-input-field-and-button-to-our-appwebappviewappviewxml)<br>
[2. Add a new `onSubmitOrder` method to our `app/webapp/controller/App.controller.js`](#2-add-a-new-onsubmitorder-method-to-our-appwebappcontrollerappcontrollerjs)<br>
[3. Add new imports to `app/webapp/controller/App.controller.js`](#3-add-new-imports-to-appwebappcontrollerappcontrollerjs)
[4. Test the new feature](#4-test-the-new-feature)<br>

### 1. Add input field and button to our `app/webapp/view/App.view.xml`

We need an input field for the order quantity as well as an order button for our new feature.

➡️ Paste the following code snippet as the first child in the existing outer `<FlexBox />` that we created in our `app/webapp/view/App.view.xml` in the previous chapter (replacing the inner `<FlexBox />`):

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

![View with updated FlexBox](/chapters/chapter004/chapter004-01.png)

We added a new `<FlexBox />` with the attributes `alignItems="Center"` and `justifyContent="End"` which makes sure all of its children will be centered vertically and displayed at the end of the box horizontally (which is the right side of the browser window in this case). Inside that `<FlexBox />` we define a `<Button />` that triggers an `.onSubmitOrder` method when pressed, which we will define in the next step. We also added a `<StepInput />` so the user can set the order quantity.

### 2. Add a new `onSubmitOrder` method to our `app/webapp/controller/App.controller.js`

We can now implement the `onSubmitOrder` method that will send an order request to the CAP backend.

➡️ Add the following code snippet to the `app/webapp/controller/App.controller.js` right after the `onSelect` method:

```javascript
,

onSubmitOrder: function (oEvent) {
    const oBindingContext = this.getView().byId("bookDetails").getBindingContext()
    const selectedBookID = oBindingContext.getProperty("ID")
    const selectedBookTitle = oBindingContext.getProperty("title")
    const inputValue = this.getView().byId("stepInput").getValue()

    const oModel = this.getView().getModel()
    const oAction = oModel.bindContext("/submitOrder(...)")
    oAction.setParameter("book", selectedBookID)
    oAction.setParameter("quantity", inputValue)

    oAction.execute().then(
        function () {
            oModel.refresh()
            const oText = `Order successful (${selectedBookTitle}, ${inputValue} pcs.)`
            MessageToast.show(oText)
        },
        function (oError) {
            that.oErrorMessageDialog = new Dialog({
                type: "Standard",
                title: "Error",
                state: "Error",
                content: new Text({ text: oError.error.message })
                .addStyleClass("sapUiTinyMargin"),
                beginButton: new Button({
                    text: "Close",
                    press: function () {
                        that.oErrorMessageDialog.close()
                    }.bind(this)
                })
            })
            that.oErrorMessageDialog.open();
        }.bind(this)
    )
}
```

We added a new `onSubmitOrder` method to our controller, which we already bound to the order button's press event in [step 1](/chapters/chapter004#1-add-input-field-and-button-to-our-appwebappviewappviewxml) of this chapter. First, the method gets the binding context from the `bookDetails` wrapper control. It then gets the book's ID and title from that context as well as the order quantity from the step input. It then binds an action, which is [defined in the CAP backend](/bookshop/srv/cat-service.cds#L14), to the view's model (see [another example](https://sapui5.hana.ondemand.com/sdk/#/topic/a3e7cb6f671b4b839f37eb5f88429e41) and the [documentation](https://sapui5.hana.ondemand.com/sdk/#/topic/b54f7895b7594c61a83fa7257fa9d13f)). The method then sets parameters on that action and executes it, meaning it sends the OData request to the backend. Once the promise of the action gets resolved, it can go either one of two ways:
1. **Success** : The request is successful and we can refresh the data in our data model. This is to make sure the stock gets updated in our table accordingly. We can then display a message toast informing the user about the successful order and its details.
1. **Error** : The request was unsuccessful and we get passed and error object. We instanciate a new dialog control (a pop-up window basically) and display the error message inside that dialog. We also add a button to the dialog so it can be closed by the user.

### 3. Add new imports to `app/webapp/controller/App.controller.js`

The new `onSubmitOrder` method uses several controls we have not imported yet. Make sure to import them from the library and pass the to the main function of the `app/webapp/controller/App.controller.js`.

➡️ Replace the array defining the library imports as well the main function and its arguments at the top of the file with the following code snippet. Keep the content of the main function (the return statement with the controller methods):

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

![Controller with onSubmitOrder method](/chapters/chapter004/chapter004-02.png)

### 4. Test the new feature

We can now test our new feature and order one or more books.

➡️ Refresh the app. Play around with the `<StepInput />` control and order one ore more books. Refresh the page to check if the data is persistent. Try to order more books than there are available to provoke an error.

![http://localhost:4004/webapp/index.html](/chapters/chapter004/chapter004-result.png)

Continue to [Chapter 5 - Adding a 'Search' Feature to Our Bookshop](/chapters/chapter005)
