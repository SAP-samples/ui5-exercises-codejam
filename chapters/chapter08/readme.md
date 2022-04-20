# Chapter 8 - Adding Custom CSS

At the end of this chapter we will have added custom CSS to our UI5 app that makes sure that our `<FlexBox />` containing the `<ObjectStatus />`, `Button`, and `<StepInput />` is styled properly.

## Steps

[1. Add new `resource` to our `app/webapp/manifest.json`](#1-add-new-resource-to-our-appwebappmanifestjson)<br>
[2. Create a new `app/webapp/css/style.css` file](#2-create-a-new-appwebappcssstylecss-file)<br>
[3. Use a custom CSS class in our `app/webapp/view/App.view.xml`](#3-use-a-custom-css-class-in-our-appwebappviewappviewxml)<br>
[4. Inspect the new styling](#4-inspect-the-new-styling)<br>

### 1. Add new `resource` to our `app/webapp/manifest.json`

➡️ Add the following code snippet to the `sap.ui5` section of the `app/webapp/manifest.json`:

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

![manifest.json with css resource model](/chapters/chapter08/chapter08-01.png)

We added a new `css` resource to our application descriptor and pointed it to a css file that we are about to create next.

### 2. Create a new `app/webapp/css/style.css` file

➡️ Create a new file `app/webapp/css/style.css` and paste the following code into it:

```css
.orderControls {
    gap: 20px;
}
```

We created a new css file and added a css class to it. The css class uses the `gap` property which makes sure that all items inside a container that is styled with `display = flex` (like the `<FlexBox />` control) have the specified gap between each other.

### 3. Use a custom CSS class in our `app/webapp/view/App.view.xml`

We can now apply the css class `orderControls` to our `app/webapp/view/App.view.xml`.

➡️ Add the class to the `<FlexBox />` containing the `<ObjectStatus />`, `Button`, and `<StepInput />`, so it looks like this:

```xml
<FlexBox alignItems="Center" justifyContent="End" class="orderControls">
    <ObjectStatus ... />
    <Button ... />
    <StepInput .../>                     
</FlexBox>
```

This is what our view now looks like (a few controls collapsed in the screen shot):

![View with custom css class](/chapters/chapter08/chapter08-02.png)

### 4. Inspect the new styling

➡️ Refresh the app and inspect the new styling. 

You will see that all items inside the `<FlexBox />` that we applied the new class to now have a gap of 20 pixels between each other.

![http://localhost:4004/webapp/index.html?sap-ui-language=de](/chapters/chapter08/chapter08-result.png)

Continue to [Chapter 9 - Deploying Our App](/chapters/chapter09)