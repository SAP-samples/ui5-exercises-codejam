# Chapter 2.02 - Adding an Object Page

For this version of our bookshop application (using the SAP Fiori elements flexible programming model) we will implement a separate object (detail) page to display more information about a selected book instead of using a custom section under the `booksTable`. This design is known as [List Report Object Page](https://sapui5.hana.ondemand.com/sdk/#/topic/c0eec49db81a441e878f528c8f3d28de.html).

## Steps

[1. Add routing in the `webapp/manifest.json` file](#1-add-routing-in-the-webappmanifestjson-file)<br>
[2. Inspect annotations](#2-inspect-annotations)<br>
[3. Test the app](#3-test-the-app)<br>

### 1. Add routing in the `webapp/manifest.json` file

➡️ Replace the current `sap.ui5.routing` section of the `webapp/manifest.json` with the following code:

```json
,
"routing": {
    "routes": [
        {
            "pattern": ":?query:",
            "name": "mainPage",
            "target": "mainPage"
        },
        {
            "pattern": "/Books({key}):?query:",
            "name": "detailPage",
            "target": "detailPage"
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
                    "navigation": {
                        "Books": {
                            "detail": {
                                "route": "detailPage"
                            }
                        }
                    }
                }
            }
        },
        "detailPage": {
            "type": "Component",
            "id": "detailPage",
            "name": "sap.fe.templates.ObjectPage",
            "options": {
                "settings": {
                    "entitySet": "Books",
                    "navigation": {}
                }
            }
        }
    }
}
```

We added a new page to our application in the form of a new route and target. Let's dive into the details:
- The `detailPage` will be reachable via the `/Books({key}):?query:` route, so the primary key of the book we want to see will be part of the URL (plus optional query parameters, as always).
- The route points to the `detailPage` target, which is a component using the Fiori elements ObjectPage template (`sap.fe.templates.ObjectPage`)
- We also addded the `detailPage` to the `navigation` section of the `mainPage` target, which will allow us to get to the `detailPage` by selecting a book on the `mainPage`.

### 2. Inspect annotations

You might be wondering how the application knows what to display on the new object page. This information is provided via annotations in the metadata of the backend service (built with the SAP Cloud Application Programming model). The service doesn't only contain the annotations we already used in the [previous step](/chapters/2.01-fe-fpm#9-rebuild-the-webappviewappviewxml), but also some more annotations that the object page interprets.

➡️ Inspect the annotation file that was used to create the metadata annotation in the backend:

```cds
using {CatalogService} from '../srv/cat-service';

// List Report
annotate CatalogService.Books with @(
    UI: {
        LineItem: [
            {
                $Type: 'UI.DataField',
                Label: 'Book',
                Value: title
            },
            {
                $Type: 'UI.DataField',
                Label: 'Author',
                Value: author
            },
            {
                $Type: 'UI.DataField',
                Label: 'Genre',
                Value: genre.name
            },
            {
                $Type: 'UI.DataField',
                Label: 'Price',
                Value: price
            },
            {
                $Type: 'UI.DataField',
                Label: 'Stock',
                Value: stock
            }
        ]
    }
);

//Object Page
annotate CatalogService.Books with @(
    UI: {
		Identification: [ { Value: ID } ],
		HeaderInfo: {
			TypeName      : 'Book',
			TypeNamePlural: 'Books',
			Title: {
				Value: title
			},
			Description: {
				Value: author
			}
		},
		Facets: [
            {
                $Type : 'UI.ReferenceFacet',
                ID    : 'GeneratedFacet',
                Label : 'General Information',
                Target: '@UI.FieldGroup#GeneratedGroup'
            }
        ],
        FieldGroup#GeneratedGroup: {
            $Type: 'UI.FieldGroupType',
            Data : [
                {
                    $Type: 'UI.DataField',
                    Label: 'Title',
                    Value: title
                },
                {
                    $Type: 'UI.DataField',
                    Label: 'Author',
                    Value: author
                },
                {
                    $Type: 'UI.DataField',
                    Label: 'Genre',
                    Value: genre.name
                },
                {
                    $Type: 'UI.DataField',
                    Label: 'Price',
                    Value: price
                },
                {
                    $Type: 'UI.DataField',
                    Label: 'Stock',
                    Value: stock
                },
                {
                    $Type: 'UI.DataField',
                    Label: 'Description',
                    Value: descr
                }
            ]
        }
    }
);
```

The bottom block of annotations is used and interpreted by the object page. Let's dive into the details:
- The `HeaderInfo` with `Title`, `Description`, and more is used to construct the header of the object page.
- In the `Facets` array, one facet is created that points to a custom `@UI.FieldGroup` with the name `GeneratedGroup`.
- The `FieldGroup#GeneratedGroup` references the data points to be displayed in a group.

You can learn more about annotations in this [document](https://github.com/SAP-samples/odata-basics-handsonsapdev/blob/annotations/bookshop/README.md).

### 3. Test the app

➡️ Refresh the app and select a book. This should get you to the object page.

![result](result.png#border)

We added an object page to our application using an SAP Fiori elements template, powered by OData annotations.

Continue to [Chapter 2.03 - Using the SAP Fiori Tools](/chapters/2.03-fiori-tools/)