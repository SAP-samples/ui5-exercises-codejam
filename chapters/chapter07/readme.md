# Chapter 7 - Adding i18n Features

At the end of this chapter we will have added internationalization (i18n) features to our UI5 app, so that it can be displayed in German (and other languages you want to add) as well.

## Steps

[1. Add an `i18n` model to our `app/webapp/manifest.json`](#1-add-an-i18n-model-to-our-appwebappmanifestjson)<br>
[2. Create a new file `app/webapp/i18n/i18n.properties`](#2-create-a-new-file-appwebappi18ni18nproperties)<br>
[3. Create a new file `app/webapp/i18n/i18n_de.properties`](#3-create-a-new-file-appwebappi18ni18ndeproperties)<br>
[4. Consume the `i18n` model in our `app/webapp/view/App.view.xml`](#4-consume-the-i18n-model-in-our-appwebappviewappviewxml)<br>
[5. Consume the `i18n` model in our `app/webapp/controller/App.controller.js`](#5-consume-the-i18n-model-in-our-appwebappcontrollerappcontrollerjs)<br>
[6. Test the app in another language](#6-test-the-app-in-another-language)<br>

> BTW: The abbreviation for 'internationalization' is 'i18n' because there are 18 letters between the 'i' and the 'n'. Internationalization is one of the main requirements for enterprise apps and one of the strengths of UI5.

### 1. Add an `i18n` model to our `app/webapp/manifest.json`

➡️ Add the following code snippet to the end of the `models` section of the `manifest.json`:

```json
,
"i18n": {
    "type": "sap.ui.model.resource.ResourceModel",
    "settings": {
        "bundleName": "sap.codejam.i18n.i18n"
    }
}
```

This is what our application descriptor now looks like:

![manifest.json with i18n model](/chapters/chapter07/chapter07-01.png)

We added a new `i18n` model which is of type `ResourceModel` (special type for `i18n` models). It points to an `i18n` directory and file, which we are about to create next.

### 2. Create a new file `app/webapp/i18n/i18n.properties`

➡️ Create a new file `app/webapp/i18n/i18n.properties` and paste the following code into it:

```properties
Bookshop=Bookshop
Book=Book
Author=Author
Genre=Genre
Price=Price
Stock=Stock
Order=Order
orderSuccessful=Order successful
pieces=pcs.
Error=Error
```

We created a new file that contains a few key value pairs for texts we want to use in our app. This allows us to simply reference the keys when consuming the model in our view instead of hardcoding the values. Because the keys as well as the values are in English it might look like this doesn't add much value, but you will see what this is about once we add some translations in the next step.

### 3. Create a new file `app/webapp/i18n/i18n_de.properties`

Create a new file `app/webapp/i18n/i18n_de.properties` and paste the following code into it:

```properties
Bookshop=Buchhandlung
Book=Buch
Author=Autor
Genre=Genre
Price=Preis
Stock=Verfügbarkeit
Order=Bestellen
orderSuccessful=Bestellung erfolgreich
pieces=Stk.
Error=Fehler
```

This is what our project's structure now looks like:

![The project's structure](/chapters/chapter07/chapter07-02.png)

We added a new file that contains the German translations for the texts we want to use in our app. This makes it possible for our app to be displayed in German as well. You can add support for other languages as well if you want. Simply add a language code (for example `de`) prefixed with an underscore to the file name (like we did with `i18n_de.properties`).

### 4. Consume the `i18n` model in our `app/webapp/view/App.view.xml`

We can now consume the `i18n` model in our `app/webapp/view/App.view.xml` using the keys. The app will then display their respective values based on the language preferences of the user.

➡️ Replace all hardcoded texts in our view with the data binding syntax for the `i18n` model shown in the example below. Go through the whole file to make sure not to miss any texts:

```xml
<Page title="{i18n>Bookshop}" >
```

### 5. Consume the `i18n` model in our `app/webapp/controller/App.controller.js`

We not only want to consume the `i18n` model in our view but also in our `app/webapp/controller/App.controller.js`. We previously hardcoded the text for the `orderStatus` and now want to use the `i18n` model instead.

➡️ Replace the `jQuery.ajax` request including the `done` and `fail` methods with the following code:

```javascript
let i18nModel = oView.getModel("i18n")
jQuery.ajax(reqSettings)
    .done(function (response) {
        console.log(response)
        oView.byId("orderStatus")
            .setText(
                `${i18nModel.getProperty("orderSuccessful")} 
                (${userSelectionData.selectedItemData.title}, 
                ${userSelectionData.selectedQuantity} 
                ${i18nModel.getProperty("pieces")})`
            )
        oView.byId("orderStatus").setState("Success")

        let userSelectedPath = oView.getModel("userSelection").getProperty("/selectedItemPath")
        oView.getModel().setProperty(userSelectedPath + "/stock", response.stock)
        oView.getModel("userSelection").setProperty("/selectedItemData/stock", response.stock)
    })
    .fail(function(response) {
        console.log(response)
        oView.byId("orderStatus").setText(`${i18nModel.getProperty("Error")}`)
        oView.byId("orderStatus").setState("Error")
    })
```

We added the `i18n` model to our controller and used it when setting the text for the `orderStatus`.

### 6. Test the app in another language

We can now test our app in another language.

➡️ Reload the app and attach a query parameter to the URL of the app to specify which language you want the bookshop to be displayed in. Attach `?sap-ui-language=de` to the URL to view the app in German for example.

Feel free to try other language codes in case you provided translation files for other languages. You can learn more about languages in UI5 and other options to set them in the [SAPUI5 Documentation](https://sapui5.hana.ondemand.com/#/topic/91f21f176f4d1014b6dd926db0e91070).

![http://localhost:4004/webapp/index.html?sap-ui-language=de](/chapters/chapter07/chapter07-result.png)

<br>
<details><summary>Further Questions to Discuss 🤔</summary>

<br>

- Why are the i18n capabilities of UI5 considered one of its strength? What makes them so powerful?

</details>
<br>

Continue to [Chapter 8 - Adding Custom CSS](/chapters/chapter08)
