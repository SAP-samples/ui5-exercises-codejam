# Chapter 1.09 - Adding Custom CSS

At the end of this chapter we will have added custom CSS to our UI5 app that applies styling to the `<FlexBox />` containing the order `<Button />` and `<StepInput />`.

## Steps

[1. Add new `resource` to our `webapp/manifest.json`](#1-add-new-resource-to-our-webappmanifestjson)<br>
[2. Create a `webapp/css/style.css` file](#2-create-a-webappcssstylecss-file)<br>
[3. Use a custom CSS class in the `webapp/view/App.view.xml`](#3-use-a-custom-css-class-in-the-webappviewappviewxml)<br>
[4. Inspect the new styling](#4-inspect-the-new-styling)<br>

### 1. Add new `resource` to our `webapp/manifest.json`

➡️ Add the following code snippet to the `sap.ui5` section of the `webapp/manifest.json`:

```json
,
"resources": {
    "css": [
        {
            "uri": "css/style.css"
        }
    ]
}
```

This is what our application descriptor now looks like:

![manifest.json](manifest.png#border)

We added a new `css` resource to our application descriptor and pointed it to a css file that we are about to create next.

### 2. Create a `webapp/css/style.css` file

➡️ Create a new file `webapp/css/style.css` and paste the following code into it:

```css
.orderControls {
    gap: 20px;
}
```

We created a new css file and added a css class to it. The css class uses the `gap` property which makes sure that all items inside a container with `display = flex` (like the `<FlexBox />` control) have the specified gap between each other.

This is what our project's structure now looks like:

```text
- bookshop/
    + node_modules/
    - webapp/
        - controller/
            - App.controller.js
        - css/
            - style.css
        - i18n/
            - i18n_de.properties
            - i18n.properties
        - model/
            - formatter.js
        - view/
            - App.view.xml
        - Component.js
        - index.html
        - manifest.json
    - package-lock.json
    - package.json
    - ui5.yaml
```

### 3. Use a custom CSS class in the `webapp/view/App.view.xml`

We can now use the css class `orderControls` in our `webapp/view/App.view.xml`.

➡️ Add the class to the `<FlexBox />` containing the order `<Button />`, and `<StepInput />`, so it looks like this:

```xml
<FlexBox 
    alignItems="Center"
    justifyContent="End"
    class="sapUiMediumMarginBottom orderControls" >
    <Button ... />
    <StepInput .../>                     
</FlexBox>
```

This is what our view now looks like (a few controls collapsed in the screen shot):

![App.view.xml](App.view.png#border)

### 4. Inspect the new styling

➡️ Refresh the app and inspect the new styling. 

You will see that the items inside the `<FlexBox />` now have a gap of 20 pixels between each other.

![result](result.png#border)

Continue to [Chapter 1.10 - Deploying the App](/chapters/1.10-deployment/)