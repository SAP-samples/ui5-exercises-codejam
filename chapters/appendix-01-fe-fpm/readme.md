# Appendix 01 - Enabling the SAP Fiori Elements Flexible Programming Model

**If you want to learn more about the SAP Fiori elements flexible programming model, checkout this other [SAP CodeJam repository](https://github.com/SAP-samples/fiori-elements-fpm-exercises-codejam)**

The following series of chapters (in the appendix) introduces the **SAP Fiori elements flexible programming model**, which bridges the gap between freestyle UI5 development and [SAP Fiori elements](https://ui5.sap.com/#/topic/03265b0408e2432c9571d6b3feb6b1fd).

The application we built so far in part 1 used a freestyle approach, meaning we built our own custom view with specific controls and controller logic. In contrast to that, SAP Fiori elements provide predefined [floorplans](https://ui5.sap.com/#/topic/797c3239b2a9491fa137e4998fd76aa7.html) (think "application layouts") for common business application use cases. Using this approach, the framework (SAPUI5) generates an application by interpreting metadata that is part of the consumed OData backend services. The specific parts of OData metadata that define the way a backend service is represented in frontend applications are called "annotations" and are mandatory when using SAP Fiori elements.

Usually you would decide before starting a new development which of the two approaches you want to use to build your application. The [SAP Fiori Tools](https://help.sap.com/docs/SAP_FIORI_tools/17d50220bcd848aa854c9c182d65b699/2d8b1cb11f6541e5ab16f05461c64201.html?locale=en-US) provide guided application generators for both approaches.

![SAP Fiori Tools Application Generator](fiori-tools.png#border)

However, the situation is not exactly black and white, as the [SAP Fiori elements flexible programming model](https://sapui5.hana.ondemand.com/test-resources/sap/fe/core/fpmExplorer/index.html#/overview/introduction) provides building blocks (macros), which are metadata-driven UI controls that can be used in any (freestyle) SAPUI5 application. This flexible programming model is perfect for our use case, as we already have a working freestyle UI5 application and solely want to enhance it - while learning about SAP Fiori elements and OData annotations along the way. The instructions given in this chapter align with the [the official documentation](https://sapui5.hana.ondemand.com/test-resources/sap/fe/core/fpmExplorer/index.html#/buildingBlocks/guidance/guidanceCustomApps), but are more detailed and more specific to our use case.

At the end of this chapter we will have enabled the Fiori elements flexible programming model for our custom UI5 application. Essentially, we will have turned our application into an SAP Fiori elements application.

## Steps

[1. Duplicate the existing application](#1-duplicate-the-existing-application)<br>
[2. Extend the `sap/fe/core/AppComponent` instead of the `sap/ui/core/UIComponent`](#2-extend-the-sapfecoreappcomponent-instead-of-the-sapuicoreuicomponent)<br>
[3. Use OData V4](#3-use-odata-v4)<br>
[4. Add OData V4 model settings](#4-add-odata-v4-model-settings)<br>
[5. Add routing to the `webapp/manifest.json`](#5-add-routing-to-the-webappmanifestjson)<br>
[6. Remove the `rootView` from the `webapp/manifest.json`](#6-remove-the-rootview-from-the-webappmanifestjson)<br>
[7. Add dependencies to the `webapp/manifest.json`](#7-add-dependencies-to-the-webappmanifestjson)<br>
[8. Use SAPUI5 instead of OpenUI5](#8-use-sapui5-instead-of-openui5)<br>
[9. Rebuild the `webapp/view/App.view.xml`](#9-rebuild-the-webappviewappviewxml)<br>
[10. Use the `sap/fe/core/PageController` instead of the `sap/ui/core/mvc/Controller`](#10-use-the-sapfecorepagecontroller-instead-of-the-sapuicoremvccontroller)<br>
[11. Change `ui5.yaml` configuration](#11-change-ui5yaml-configuration)<br>
[12. Test the new app](#12-test-the-new-app)<br>

### 1. Duplicate the existing application

➡️ Duplicate your existing UI5 application living in `webapp/`. Then rename the copy to `freestyle-webapp/`.

This is what our project's structure now looks like:

```text
- bookshop/
    + node_modules/
    + freestyle-webapp/
    + webapp/
    - manifest.yaml
    - package-lock.json
    - package.json
    - ui5.yaml
    - xs-app.json
```

We duplicated our existing application to preserve the progress we made in the previous chapters (`freestyle-webapp/`). The structural changes we are about to make to our application require us to delete parts of the application (and thus the progress we made).

### 2. Extend the `sap/fe/core/AppComponent` instead of the `sap/ui/core/UIComponent`

➡️ Replace the content of the existing `webapp/Component.js` with the following code:

```javascript
sap.ui.define([
    "sap/fe/core/AppComponent",
], function (AppComponent) {
    "use strict"
    return AppComponent.extend(
        "sap.codejam.Component", {
            metadata : {
                "interfaces": [
                    "sap.ui.core.IAsyncContentCreation"
                    ],
                    manifest: "json"
            },
            init : function () {
                AppComponent.prototype.init.apply(
                    this,
                    arguments
                    )
            }
    })
})
```

We now use and extend the `sap/fe/core/AppComponent` instead of the `sap/ui/core/UIComponent` to make sure our [component](/chapters/chapter001/readme.md#4-create-an-webappcomponentjs-file) runs within the SAP Fiori elements framework.

### 3. Use OData V4

The SAP Fiori elements Flexible Programming Model is only available for OData V4, meaning it's not compatible with the OData service we are currently consuming, which is version 2 of the protocol. Luckily, our remote backend service provide endpoints for both V2 and V4, so all we have to do is change the data source in our `webapp/manifest.json`.

➡️ Replace the `sap.app.dataSources` section of the `webapp/manifest.json` with the following code:

```json
,
"dataSources": {
    "remoteBookshop": {
        "uri": "/browse/",
        "type" : "OData",
        "settings" : {
            "odataVersion" : "4.0"
        }
    }  
}
```

We changed the OData uri (different endpoint of the remote bookshop service) and changed the version to V4.

### 4. Add OData V4 model settings

➡️ Replace the default model in the `sap.ui5.models` section of the `webapp/manifest.json` with the following code:

```json
"": {
    "dataSource": "remoteBookshop",
    "settings": {
        "synchronizationMode": "None",
        "operationMode": "Server",
        "autoExpandSelect": true,
        "earlyRequests": true
    }
}
```

We added a few settings to our default model that are specific to OData V4. Let's go through them step-by-step:
- We set the `operationMode` to `Server`, which is mandatory for filtering and sorting queries with OData V4.
- We set the `synchronizationMode` to `None`, which is also mandatory for OData V4.
- `"autoExpandSelect": true` makes sure the `$expand` and `$select` OData query parameters are automatically being used, which we need for nested entities like `Genre` (https://developer-advocates-free-tier-central-hana-cloud-instan3b540fd6.cfapps.us10.hana.ondemand.com/browse/Books?$expand=genre).
- `"earlyRequests": true` makes sure the OData service metadata is called as early as possible.

### 5. Add routing to the `webapp/manifest.json`

➡️ Add the following code to the `sap.ui5` section of the `webapp/manifest.json`:

```json
,
"routing": {
    "routes": [
        {
            "pattern": ":?query:",
            "name": "mainPage",
            "target": "mainPage"
        }
    ],
    "targets": {
        "mainPage": {
            "type": "Component",
            "id": "mainPage",
            "name": "sap.fe.core.fpm",
            "options": {
                "settings": {
                    "viewName": "sap.codejam.view.App",
                    "entitySet": "Books",
                    "navigation": {}
                }
            }
        }
    }
}
```

We added a new `sap.ui5.routing` section to our application descriptor file in which we define all `routes` (think "pages") our application contains. Currently we have just one route and target, but that will change shortly. Let's go through the additions step by step:

- We describe a `pattern` for our route, which allows us to access it by attaching it to the URL of our application.
- Our route also has a `name` and a `target`, which points to the `mainPage` object we define in the `targets` section.
- The `targets` section is where we provide content information for the pages of our app. If we where to follow a freestyle UI5 approach, we could directly point to an xml file at this point, but within the SAP Fiori elements framework we specify the type as `Component` and use `sap.fe` templates for the pages.
- For our `mainPage` we use the `sap.fe.core.fpm` template component, which allows us to point to our own `sap.codejam.view.App` xml view, but have it run inside the SAP Fiori elements flexible programming model. We define the main `entitySet` (coming from the backend OData service) we want to use on the page. We leave the `navigation` section empty for now, as we currently only have one route.

### 6. Remove the `rootView` from the `webapp/manifest.json`

➡️ Remove the entire `rootView` section (inside `sap.ui5`) from the `webapp/manifest.json` file.

It was mandatory to remove the `rootView` from our application descriptor as we now have a dedicated `sap.ui5.routing` section and want the SAP Fiori elements framework to handle the routing, including embedding our views.

### 7. Add dependencies to the `webapp/manifest.json`

➡️ Add the following code at the beginning of the `sap.ui5` section of the `webapp/manifest.json`:

```json
,
"dependencies": {
    "minUI5Version": "1.60.0",
    "libs": {
        "sap.ui.core": {},
        "sap.m": {},
        "sap.fe.macros": {},
        "sap.fe.templates": {}
    }
}
```

We added SAP Fiori elements related libraries to our dependencies to make sure they are preloaded by the SAPUI5 (performance optimizations) and are available at runtime.

This is what our `webapp/manifest.json` now looks like:

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
            "remoteBookshop": {
                "uri": "/browse/",
                "type" : "OData",
                "settings" : {
                    "odataVersion" : "4.0"
                }
            }  
        }
    },
    "sap.ui5": {
        "models": {
            "": {
				"dataSource": "remoteBookshop",
                "settings": {
                    "synchronizationMode": "None",
                    "operationMode": "Server",
                    "autoExpandSelect": true,
                    "earlyRequests": true
                }
            },
            "i18n": {
                "type": "sap.ui.model.resource.ResourceModel",
                "settings": {
                    "bundleName": "sap.codejam.i18n.i18n"
                }
            }
        },
        "resources": {
            "css": [
                {
                    "uri": "css/style.css"
                }
            ]
        },
        "routing": {
            "routes": [
                {
                    "pattern": ":?query:",
                    "name": "mainPage",
                    "target": "mainPage"
                }
            ],
            "targets": {
                "mainPage": {
                    "type": "Component",
                    "id": "mainPage",
                    "name": "sap.fe.core.fpm",
                    "options": {
                        "settings": {
                            "viewName": "sap.codejam.view.App",
                            "entitySet": "Books",
                            "navigation": {}
                        }
                    }
                }
            }
        },
        "dependencies": {
            "minUI5Version": "1.60.0",
            "libs": {
                "sap.ui.core": {},
                "sap.m": {},
                "sap.fe.macros": {},
                "sap.fe.templates": {}
            }
        }
    }
}
```

### 8. Use SAPUI5 instead of OpenUI5

➡️ Replace `openui5` with `sapui5` in the `webapp/index.html` and specify a version, so the bootstrapping (the script tag) looks like this:

```html
<script
    id="sap-ui-bootstrap"
    src="https://sapui5.hana.ondemand.com/1.108/resources/sap-ui-core.js"
    data-sap-ui-theme="sap_horizon"
    data-sap-ui-async="true"
    data-sap-ui-libs="sap.m"
    data-sap-ui-compatVersion="edge"
    data-sap-ui-oninit="module:sap/ui/core/ComponentSupport"
    data-sap-ui-resourceroots='{
        "sap.codejam": "./"
    }'>
</script>
```

- We moved from OpenUI5 to SAPUI5, because SAP Fiori elements are not available and not part of OpenUI5. Check the [base readme](/README.md#sapui5-vs-openui5) to learn more about the differences between SAPUI5 and OpenUI5.
- We also specified a [long-term maintenance version](https://sapui5.hana.ondemand.com/versionoverview.html) of SAPUI5. Interestingly, we didn't specify a patch number, which means we will always load the latest patch ([patch-level independent bootstrap](https://blogs.sap.com/2022/04/14/sapui5-patch-level-independent-bootstrap)).

### 9. Rebuild the `webapp/view/App.view.xml`

➡️ Replace the content of the `webapp/view/App.view.xml` with the following code:

```xml
<mvc:View
    xmlns="sap.m"
    xmlns:mvc="sap.ui.core.mvc"
    controllerName="sap.codejam.controller.App"
    xmlns:macros="sap.fe.macros">

<App id="Main">
    <pages>
        <Page title="{i18n>Bookshop}">
            <content>
                <macros:Table metaPath="@com.sap.vocabularies.UI.v1.LineItem" id="booksTable" />
            </content>
        </Page>
    </pages>
</App>

</mvc:View>
```

We removed almost all the content of our app view and replaced it with a `<macros:Table />`, which is a so called **building block** that we can use in SAP Fiori elements flexible programming model enabled applications. We pass it a `metaPath` pointing to specific **OData annotations** using the [SAP UI vocabulary](https://github.com/SAP/odata-vocabularies/blob/main/vocabularies/UI.md). As described [earlier](#chapter-201---enabling-the-sap-fiori-elements-flexible-programming-model), annotations are mandatory when using SAP Fiori elements. Luckily, they have already been implemented as part of the OData backend application (built with the SAP Cloud Application Programming model) and are ready to be consumed.

<details>
<summary>How have the OData annotations been implemented? 💬</summary>

<br>

> This is what the annotation file in the backend looks like:
>
>```cds
>using {CatalogService} from '../srv/cat-service';
>
>// List Report
>annotate CatalogService.Books with @(
>    UI: {
>        LineItem: [
>            {
>                $Type: 'UI.DataField',
>                Label: 'Book',
>                Value: title
>            },
>            {
>                $Type: 'UI.DataField',
>                Label: 'Author',
>                Value: author
>            },
>            {
>                $Type: 'UI.DataField',
>                Label: 'Genre',
>                Value: genre.name
>            },
>            {
>                $Type: 'UI.DataField',
>                Label: 'Price',
>                Value: price
>            },
>            {
>                $Type: 'UI.DataField',
>                Label: 'Stock',
>                Value: stock
>            }
>        ]
>    }
>);
>```
>
>Although annotations are considered backend development and therefore not exactly the scope of this repository, it is important to understand how annotations work and how SAP Fiori elements is able to interpret them:
>
>CDS based OData annotations are one of the superpowers of the SAP Cloud Application Programming Model. It automatically picks up and reads annotation files and serves the provided information in the service [metadata document](https://developer-advocates-free-tier-central-hana-cloud-instan3b540fd6.cfapps.us10.hana.ondemand.com/browse/$metadata). This is the document our SAP Fiori elements application interprets and uses to build the UI. Let's go through the annotations file step by step:
>
>- It uses the [UI vocabulary](https://github.com/SAP/odata-vocabularies/blob/main/vocabularies/UI.md) developed by SAP to describe how the entity should to be displayed in user interfaces. Generally a vocabulary is a collection of terms that can be used to describe and give meaning to OData services.
>- It describes a `LineItem`, which is a collection (array) of data fields (think "columns") suitable to be visualized in a table or list.
>- The objects of the `LineItem` array are of type `UI.DataField` and therefore simply represent a piece of data. Each data field (think "column") has a `Label` and a `Value`, the latter comes directly from our Books entity.
>
>You can learn more about annotations in this [document](https://github.com/SAP-samples/odata-basics-handsonsapdev/blob/annotations/bookshop/README.md).

</details>


### 10. Use the `sap/fe/core/PageController` instead of the `sap/ui/core/mvc/Controller`

➡️ Replace the content of the `webapp/controller/App.controller.js` with the following code:

```javascript
sap.ui.define([
    "sap/fe/core/PageController"
], function (PageController) {
    "use strict"
    return PageController.extend("sap.codejam.controller.App", {})
})
```

Similar to what we did in [step 2](#2-extend-the-sapfecoreappcomponent-instead-of-the-sapuicoreuicomponent) we now use the `PageController` provided by SAP Fiori elements instead of the core UI5 controller. This is to make sure our controller code runs within the SAP Fiori elements framework and has access to its [extension APIs](https://ui5.sap.com/#/api/sap.fe.core.PageController%23methods/getExtensionAPI). The `sap/fe/core/PageController` itself extends the `sap/ui/core/mvc/Controller`.

### 11. Change `ui5.yaml` configuration

Now that we are consuming a different OData service endpoint (V4), we need to tweak the UI5 server configuration in the `ui5.yaml` file:

➡️ Replace the current content of the `ui5.yaml` file with the following code:

```yaml
specVersion: '2.6'
metadata:
  name: bookshop
type: application
server:
  customMiddleware:
    - name: fiori-tools-proxy
      afterMiddleware: compression
      configuration:
        backend:
          - path: /browse
            url: https://developer-advocates-free-tier-central-hana-cloud-instan3b540fd6.cfapps.us10.hana.ondemand.com
```

We changed the path to the backend service (via the `fiori-tools-proxy`) to `/browse`, as we are now consuming a different OData service endpoint (V4). This configuration has to match our `webapp/manifest.json` file.

### 12. Test the new app

➡️ Stop the UI5 server (`control + c`) and restart it `npm run dev` so the the server configuration changes take effect.

![result](result.png#border)

We enabled the SAP Fiori elements flexible programming model for our custom SAPUI5 application and used the Table building block, powered by OData annotations. You might have to resize your browser window to see all the columns of the Table. We will continue to fine tune and work on our application in the following chapters.

Continue to [Appendix 02 - Adding an Object Page](/chapters/appendix-02-object-page/)
