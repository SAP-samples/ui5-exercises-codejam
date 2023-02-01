using { sap.capire.bookshop as my } from '../db/schema';
service CatalogService @(path:'/browse') {

  /** For displaying lists of Books */
  @readonly entity ListOfBooks as projection on Books
  excluding { descr };

  /** For display in details pages */
  @readonly entity Books as projection on my.Books 
  { *, author.name as author } 
  excluding { createdBy, modifiedBy };

  //@requires: 'authenticated-user'
  action submitOrder ( book: Books:ID, quantity: Integer ) returns { stock: Integer };
  event OrderedBook : { book: Books:ID; quantity: Integer; buyer: String };
}

annotate CatalogService.Books with @(
    UI.HeaderInfo: {
        TypeName      : 'Book',
        TypeNamePlural: 'Books'
    },
    UI.LineItem  : [
        {
            $Type: 'UI.DataField',
            Label: 'Title',
            Value: title,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Author',
            Value: author,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Price',
            Value: price,
        }
    ]
);

annotate CatalogService.Books with @(
    UI.FieldGroup #GeneratedGroup1: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Label: 'title',
                Value: title,
            }
        ],
    },
    UI.Facets                     : [{
        $Type : 'UI.ReferenceFacet',
        ID    : 'GeneratedFacet1',
        Label : 'General Information',
        Target: '@UI.FieldGroup#GeneratedGroup1',
    }, ]
);