# Chapter 06 - Adding a 'Search' Feature

At the end of this chapter we will have added a new feature to our bookshop that enables users to search for books.

## Steps

[1. Add a new `<SearchField />` to the `webapp/view/App.view.xml`](#1-add-a-new-searchfield--to-the-webappviewappviewxml)<br>
[2. Add a new `onSearch` method to the `webapp/controller/App.controller.js`](#2-add-a-new-onsearch-method-to-the-webappcontrollerappcontrollerjs)<br>
[3. Import `Filter` and `FilterOperator` in the `webapp/controller/App.controller.js`](#3-import-filter-and-filteroperator-in-the-webappcontrollerappcontrollerjs)<br>
[4. Test the new feature](#4-test-the-new-feature)<br>

### 1. Add a new `<SearchField />` to the `webapp/view/App.view.xml`

➡️ Add the following code to the `webapp/view/App.view.xml` just above the `<Table />` and add the new `id` to the `<Table />`:

```xml
<SearchField liveChange=".onSearch"/>
<!-- Add id="booksTable" to the <Table /> -->
```

This is what our view now looks like (a few controls collapsed in the screen shot):

![App.view.xml](App.view.png#border)

We added a new `<SearchField />` control to our view. It comes with a `liveChange` event that gets fired on every keystroke the user submits in the field. We bound an `.onSearch` method to that event which we will define in the next step. The great thing about the `liveChange` event is that the user doesn't have to actively click the search icon or hit enter to start the search.

### 2. Add a new `onSearch` method to the `webapp/controller/App.controller.js`

➡️ Add the following method to the `webapp/controller/App.controller.js`:

```javascript
,
onSearch: function (oEvent) {
    const sQuery = oEvent.getParameter("newValue")
    const aFilter = []
    if (sQuery) {
        aFilter.push(new Filter("title", FilterOperator.Contains, sQuery))
    }
    const oList = this.byId("booksTable")
    const oBinding = oList.getBinding("items")
    oBinding.filter(aFilter)
}
```

We added a new `onSearch` method, which is being passed an event. The method gets the query string from that event, sets an empty filter array, and if a query string exists, adds a new filter to the array that filters for the book title. It then gets the `booksTable` and its binding, to then execute the filter method. This will update the UI accordingly - only showing the books that match the filter.

<details>
<summary>Are you curious how we could filter for multiple columns such as `title` and/or `author` or how case sensitivity can be handled? 💬</summary>

<br>

```javascript
onSearch: function (oEvent) {
    const sQuery = oEvent.getParameter("newValue")
    const aFilter = []
    if (sQuery) {
        aFilter.push(new Filter({
            filters: [
                new Filter({path: 'title',
                caseSensitive: false,
                operator: FilterOperator.Contains,
                value1: sQuery}),
                new Filter({path: 'author',
                caseSensitive: false,
                operator: FilterOperator.Contains,
                value1: sQuery}),
            ],
            and: false                    
        }))
    }
    const oList = this.byId("booksTable")
    const oBinding = oList.getBinding("items")
    oBinding.filter(aFilter)
}
```

</details>

### 3. Import `Filter` and `FilterOperator` in the `webapp/controller/App.controller.js`

The new `.onSearch` method uses the `Filter` and `FilterOperator` from the library. Make sure to import them from the library and pass the to the main function of the `webapp/controller/App.controller.js`.

➡️ Replace the array defining the library imports as well the main function and its arguments at the top of the file with the following code snippet. Keep the content of the main function (the return statement with all controller methods):

```javascript
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Text",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
], function (Controller, MessageToast, Dialog, Button, Text, Filter, FilterOperator) {
    // content of the function stays here 
})
```

This is what our controller now looks like (a few methods collapsed in the screen shot):

![App.controller.js](App.controller.png#border)

### 4. Test the new feature

➡️ Refresh the app. Test the new feature and search for a book in the table.

You'll notice how the search is instantly triggered after a keystroke is submitted in the `<SearchField />`:

![result](result.png#border)

Continue to [Chapter 07 - Adding Expression Binding and Custom Formatting](/chapters/07-formatting/)
