# Chapter 2 - Creating and Consuming Our First Model

By the end of this chapter, we will have added a Table to our UI5 app that displays the books that are available in our bookshop.

## Steps

[1. Add a new `dataSource` and `model` to our `app/webapp/manifest.json`](#1-add-a-new-datasource-and-model-to-our-appwebappmanifestjson)<br>
[2. Add a new `<Table />` to our `app/webapp/view/App.view.xml` that consumes the model](#2-add-a-new-table--to-our-appwebappviewappviewxml-that-consumes-the-model)<br>
[3. Inspect our app in the browser](#3-inspect-our-app-in-the-browser)<br>

### 1. Add a new `dataSource` and `model` to our `app/webapp/manifest.json`

Models are another major part of UI5 development. We use models to store data in our app ("data layer"). Models are not bound to or represented by a specific file, but are dynamic objects that can be consumed and modified by different parts of the app. They can be created via the `manifest.json` file or via a controller (which we will do in [chapter 03](/chapters/chapter003#3-add-a-new-userselection-model-and-an-onselect-method-to-our-controller)).

➡️ Paste the following code into the `app/webapp/manifest.json`:

```json
{
    "sap.app": {
        "id": "codejam",
        "type": "application",
        "title": "CodeJam Bookshop",
        "applicationVersion": {
            "version": "1.0.0"
        },
        "dataSources": {
            "capBooks": {
                "uri": "/browse/Books?$expand=genre",
                "type": "JSON"
            }  
        }
    },
    "sap.ui5": {
        "rootView": {
            "viewName": "sap.codejam.view.App",
            "type": "XML",
            "id": "app"
        },
        "models": {
            "": {
                "dataSource": "capBooks"
            }
        }
    }
}
```

We defined a new model with an empty string as its name, which makes it the default model of the app. The `dataSource` for the model is `capBooks`, which is a new data `dataSource` we created that links to our backend application that is being served on the same domain as our UI5 app (see [chapter 1 - step 7](/chapters/chapter001#7-run-our-app)). We can inspect the data at [http://localhost:4004/browse/Books?$expand=genre](http://localhost:4004/browse/Books?$expand=genre).

### 2. Add a new `<Table />` to our `app/webapp/view/App.view.xml` that consumes the model

We can now go ahead an consume the newly created model in our `app/webapp/view/App.view.xml`.

➡️ Paste the following code into the `<content />` section of the `<Panel />` in our existing view:

```xml
<Table 
    items="{/value}">
    <columns>
        <Column>
            <Text text="Book" />
        </Column>
        <Column>
            <Text text="Author" />
        </Column>
        <Column>
            <Text text="Genre" />
        </Column>
        <Column>
            <Text text="Price" />
        </Column>
        <Column>
            <Text text="Stock" />
        </Column>
    </columns>
    <items>
        <ColumnListItem 
            vAlign="Middle"
            type="Active">
            <cells>
                <ObjectIdentifier
                    title="{title}"/>
                <Text
                    text="{author}" />
                <Text
                    text="{genre/name}" />
                <ObjectNumber
                    number="{price}"
                    unit="{currency_code}" />
                <Text
                    text="{stock}" />
            </cells>
        </ColumnListItem>
    </items>
</Table>
```

We created a Table that displays the books from our bookshop data. Let's go through the code step by step to better understand how we did it:

- We created a new [`<Table />`](https://sapui5.hana.ondemand.com/#/api/sap.m.Table) that holds `<columns />` and `<items />` (rows) as its aggregations.
- The `<Table />` has an `items` attribute where we want to reference the `value` array of our bookshop data as it holds the book items (check it out at [http://localhost:4004/browse/Books?$expand=genre](http://localhost:4004/browse/Books?$expand=genre)). For that we make use of a concept called ***data binding***. Data binding is very important in UI5 and requires a special syntax. We use curly brackets `{}` to tell the framework we will be using a model and then use a slash `/` to enter the json structure of our default model, which is our bookshop data (see step 1). Then we specify that our items live in the `value` array. Putting all the pieces together we end up with `items="{/value}"` as our data binding syntax.
- The `<columns />` aggregation inside the `<Table />` holds several [`<Column />`](https://sapui5.hana.ondemand.com/#/api/sap.m.Column) controls that each hold a [`<Text />`](https://sapui5.hana.ondemand.com/#/api/sap.m.Text) control. These are the texts in the header row of our `<Table />`.
- The `<items />` (rows) of our `<Table />` hold a [`<ColumnListItem />`](https://sapui5.hana.ondemand.com/#/api/sap.m.ColumnListItem), which serves as a wrapper for the `<cells />` of each row. The controls inside the `<cells />` aggregation have to match our `<columns />` with respect to the order of the content (book, author, genre, price, stock).
- Check the [documentation](https://sapui5.hana.ondemand.com/#/api/sap.m.ColumnListItem%23controlProperties) to see what the `vAlign` and `type` attributes for the `<ColumnListItem />` do.
- Inside the `<cells />` we display the actual data and make use of the data binding concept again. As our whole `<Table />` is bound to the `value` array of our data model, we can bind the controls inside the `<cells />` aggregation to properties of the items inside that array, such a the title and author.
- For the controls inside the `<cells />` aggregation we selected controls that fit the type of data that they display.

You might want to check the documentation for the [`<ColumnListItems />`](https://sapui5.hana.ondemand.com/#/api/sap.m.ColumnListItem%23controlProperties) control to see what the attributes `vAlign` and `type` in our code mean.

This is what our view now looks like (`<Table />` collapsed in the screen shot):

![View with Table](/chapters/chapter002/chapter002-01.png)

### 3. Inspect our app in the browser

➡️ Move over to the browser and refresh the page to see our Table:

![http://localhost:4004/webapp/index.html](/chapters/chapter002/chapter002-result.png)

Continue to - [Chapter 3 - Creating and Extending our First Controller](/chapters/chapter003)