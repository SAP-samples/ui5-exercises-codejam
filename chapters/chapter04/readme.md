# Chapter 4 - Adding an 'Order' Feature to Our Bookshop

At the end of this chapter we will have added a new feature to our bookshop that enables users to order books.

## Steps

[1. Add input field and button to our `app/webapp/view/App.view.xml`](#1-add-input-field-and-button-to-our-appwebappviewappviewxml)<br>
[2. Modify the `userSelection` model](#2-modify-the-userselection-model)<br>
[3. Add a new `onSubmitOrder` method to our `app/webapp/controller/App.controller.js`](#3-add-a-new-onsubmitorder-method-to-our-appwebappcontrollerappcontrollerjs)<br>
[4. Reset `userSelection` model and `orderStatus` text](#4-reset-userselection-model-and-orderstatus-text)<br>
[5. Test the new feature](#5-test-the-new-feature)<br>

### 1. Add input field and button to our `app/webapp/view/App.view.xml`

We need an input field for the order quantity as well as an order button for our new feature.

➡️ Paste the following code snippet as the first child in the existing outer `<FlexBox />` that we created in our `app/webapp/view/App.view.xml` in the previous chapter (replacing the inner `<FlexBox />`):

```xml
<FlexBox alignItems="Center" justifyContent="End" >
    <ObjectStatus id="orderStatus" text="" />
    <Button text="Order" press=".onSubmitOrder" />
    <StepInput
        value="{userSelection>/selectedQuantity}"
        min="0"
        textAlign="Center"
        class="sapUiSmallMarginRight"
        max="{userSelection>/selectedItemData/stock}" />                        
</FlexBox>
```

This is what our view now looks like (`<Table />` collapsed in the screen shot):

![View with updated FlexBox](/chapters/chapter04/chapter04-01.png)

We added a new `<FlexBox />` with the attributes `justifyContent="End" alignItems="Center"` which makes sure all of its children will be centered vertically and displayed at the end of the box horizontally (which is the right side of the browser window in this case). We bound the `value` attribute of the `<StepInput />` to a new `selectedQuantity` property of the `userSelection` model, which we are going to define a default for in the next step. Our `<Button />` already triggers an `onSubmitOrder` method which we also have not yet defined.

### 2. Modify the `userSelection` model

We want to define a default value for the `selectedQuantity` property to our `userSelection` model.

➡️ Replace the `onInit` method in the `app/webapp/controller/App.controller.js` with the following code snippet:

```javascript
onInit: function () {
    this.getView().setModel(new JSONModel({
        selectedQuantity: 1
    }), "userSelection")
},
```

We added the `selectedQuantity` property to the `onInit` method where the `userSelection` model gets created in the first place and set the value to `1`. This makes the value the default when the view is initialized. If you are curious, you can already refresh the app in the browser and see the value `1` in the `<StepInput />`.

### 3. Add a new `onSubmitOrder` method to our `app/webapp/controller/App.controller.js`

We successfully set up our `userSelection` model so that we can take the data and send it to the server in the form of an order. 

➡️ Add the following code snippet to the `app/webapp/controller/App.controller.js` right after the `onSelect` method:

```javascript
,
onSubmitOrder: function () {
    let oView = this.getView()
    let userSelectionData = oView.getModel("userSelection").getData()

    let reqSettings = {
        "url": "/browse/submitOrder",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "book": userSelectionData.selectedItemData.ID,
            "quantity": userSelectionData.selectedQuantity
        }),
    }

    jQuery.ajax(reqSettings)
        .done(function (response) {
            oView.byId("orderStatus")
                .setText(
                    `Order successful 
                    (${userSelectionData.selectedItemData.title}, 
                    ${userSelectionData.selectedQuantity} pcs.)`
                )
            oView.byId("orderStatus").setState("Success")

            let userSelectedPath = oView.getModel("userSelection").getProperty("/selectedItemPath")
            oView.getModel().setProperty(userSelectedPath + "/stock", response.stock)
            oView.getModel("userSelection").setProperty("/selectedItemData/stock", response.stock) 
        })
        .fail(function(response) {
            oView.byId("orderStatus").setText("Error")
            oView.byId("orderStatus").setState("Error")
        })
}
```

We added a new `onSubmitOrder` method to our controller which we already bound to the press event of the order button in [step 1](/chapters/chapter04#1-add-input-field-and-button-to-our-appwebappviewappviewxml) of this chapter. The method gets the `userSelection` model and defines a new a new Ajax request, which is an easy-to-use technique for accessing web servers (our CAP backend) from a web page (our UI5 frontend) with asynchronous HTTP requests. Ajax is part of the popular jQuery library, which is already included in UI5. The request is sent to the `/browser/submitOrder` endpoint of our backend application. It handles the subtraction of the ordered books in the database for us. After the request is sent it can go one of two ways:
1. **done ✅** : The request is successful, we get the new `stock` of the book in the response. In that case we display a success message in the `<ObjectStatus />` control that we added in step 1 of this chapter and set its state to `Success`, which makes it turn green. We also update both our default model and our `userSelection` model with the new `stock`. Because of the data binding the stock in the table will then automatically be updated.
1. **fail ❌** : The request was unsuccessful, we get an error message in response. In that case we display `Error` and set the state of the  `<ObjectStatus />` to `Error` as well, which makes it turn red.

### 4. Reset `userSelection` model and `orderStatus` text

The new order feature brought new complexity to our app. You might have noticed that the success or error message of an order does not disappear even if we select a new book. Also, the `selectedQuantity` does not reset, which makes is possible to enter a high quantity, then select a book with lower stock and submit an unsuccessful order. To prevent that from happening, we want to reset the `orderStatus` as well as the `selectedQuantity` when a book is selected.

➡️ Paste the following code snippet at the end of the `onSelect` method in the `controller/App.controller.js`:

```javascript
oModel.setProperty("/selectedQuantity", 1)
this.getView().byId("orderStatus").setText("")
```

This is what our controller looks like after all the changes:

![Controller](/chapters/chapter04/chapter04-02.png)

### 5. Test the new feature

We can now test our new feature and order one or more books.

➡️ Refresh the app. Play around with the `<StepInput />` control and try to set the quantity to be higher than the stock. Also try refreshing the page after you have submitted an order.

You will notice that it's not possible to set the quantity to be higher than the stock, because we set the max value to be the stock in step 1 of this chapter. You will also notice that the data is persisted in the database after submitting an order. It will only be reset when the database is stopped.

![http://localhost:4004/webapp/index.html](/chapters/chapter04/chapter04-result.png)

<br>
<details><summary>Further Questions to Discuss 🤔</summary>

<br>

- What other options are there to send requests to the backend from your UI5 application?

</details>
<br>

Continue to [Chapter 5 - Adding a 'Search' Feature to Our Bookshop](/chapters/chapter05)
