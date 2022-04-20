# Chapter 6 - Adding a 'Search' Feature to Our Bookshop

At the end of this chapter we will have added a new feature to our bookshop that enables users to search for books in the table.

## Steps

[1. Add a new `<SearchField />` to our `app/webapp/view/App.view.xml`](#1-add-a-new-searchfield--to-our-appwebappviewappviewxml)<br>
[2. Add a new `onSearch` method to our `app/webapp/controller/App.controller.js`](#2-add-a-new-onsearch-method-to-our-appwebappcontrollerappcontrollerjs)<br>
[3. Import `Filter` and `FilterOperator` in our `app/webapp/controller/App.controller.js`](#3-import-filter-and-filteroperator-in-our-appwebappcontrollerappcontrollerjs)<br>
[4. Test the new feature](#4-test-the-new-feature)<br>

### 1. Add a new `<SearchField />` to our `app/webapp/view/App.view.xml`

➡️ Add the following code to the `app/webapp/view/App.view.xml` just above the `<Table />` and add the new `id` to the `<Table />`:

```xml
<SearchField liveChange=".onSearch"/>
<!-- Add id="booksTable" to the <Table /> -->
```

This is what our view now looks like (a few controls collapsed in the screen shot):

![View with SearchField](/chapters/chapter05/chapter05-01.png)

We added a new `<SearchField />` control to our view. It comes with a `liveChange` event that gets triggered on every keystroke the user submits in the field. We bound an `onSearch` method to that event which we will define in the next step. The great thing about the `liveChange` event is that the user doesn't have to actively click the search icon or hit enter to trigger the search.

### 2. Add a new `onSearch` method to our `app/webapp/controller/App.controller.js`

➡️ Add the following method to the `app/webapp/controller/App.controller.js`:

```javascript
,
onSearch: function (oEvent) {
    var aFilter = [];
    var sQuery = oEvent.getParameter("newValue");
    if (sQuery) {
        aFilter.push(new Filter("title", FilterOperator.Contains, sQuery));
    }
    var oList = this.byId("booksTable");
    var oBinding = oList.getBinding("items");
    oBinding.filter(aFilter);

    let oModel = this.getView().getModel("userSelection")
    oModel.setProperty("/selectedItemPath", {})
    oModel.setProperty("/selectedItemData", {})
    this.getView().byId("orderStatus").setText("")
}
```

### 3. Import `Filter` and `FilterOperator` in our `app/webapp/controller/App.controller.js`

The new method uses the `Filter` and `FilterOperator` from the library. Make sure to import them from the library and pass the to the main function of the `app/webapp/controller/App.controller.js`.

➡️ Replace the array defining the library imports as well the main function and it's imports at the top of the file with the following code snippet. Keep the content of the main function (the return statement with our controller methods):

```javascript
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, JSONModel, Filter, FilterOperator) {
    //content of the function stays here 
}
```

This is what our controller now looks like (a few methods collapsed in the screen shot):

![Controller with onSearch method](/chapters/chapter05/chapter05-02.png)

We added a new `onSearch` method to our controller that gets the `newValue` from the `<SearchField />` (where it was triggered from) and filters for matching book titles in our `booksTable`. The `onSearch` method also resets the `userSelection` model as well as the `orderStatus` message to make sure the user cannot see the description or order status of a book that might not even by displayed in the table any longer after a new search is triggered.

### 4. Test the new feature

➡️ Refresh the app. Test the new feature and search for a book in the table.

You'll notice how the search is instantly triggered after a keystroke is submitted in the `<SearchField />`:

![http://localhost:4004/webapp/index.html](/chapters/chapter05/chapter05-result.png)

Continue to [Chapter 6 - Adding Custom Formatting](/chapters/chapter06):
