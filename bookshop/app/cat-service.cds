using {CatalogService} from '../srv/cat-service';

annotate CatalogService.Books with @(
    UI: {
        Identification: [ {Value: title} ],
        SelectionFields: [ title ],
        HeaderInfo: {
            TypeName      : 'Book',
            TypeNamePlural: 'Books',
            Title: {Value: title},
            Description: {Value: author}
        },
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

annotate CatalogService.Books with @(
    UI: { 
        FieldGroup#GeneratedGroup1: {
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
        },
        Facets: [
            {
                $Type : 'UI.ReferenceFacet',
                ID    : 'GeneratedFacet1',
                Label : 'General Information',
                Target: '@UI.FieldGroup#GeneratedGroup1'
            }
        ]
    }
);
