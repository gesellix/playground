var $db = '';
var $currentUser = undefined;
var entryTypes = {
    article : {
        type: "Article",
        description: "Artikel aus einer (wissenschaftlichen) Zeitschrift oder einen Journal",
        attributes: {
            mandatory: {
                author: "Author",
                title: "Title",
                journal: "Journal",
                year: "Year"
            },
            optional: {
                volume: "Volume",
                number: "Number",
                pages: "Pages",
                month: "Month",
                note: "Note"
            }
        }
    },
    book : {
        type: "Book",
        description: "Buch, das eine Verlagsangabe besitzt",
        attributes: {
            mandatory: {
                author: "Author",
                editor: "Editor",
                title: "Title",
                publisher: "Publisher",
                year: "Year"
            },
            optional: {
                volume: "Volume",
                number: "Number",
                series: "Series",
                address: "Address",
                edition: "Edition",
                month: "Month",
                note: "Note"
            }
        }
    },
    booklet : {
        type: "Booklet",
        description: "Ein Werk, das zwar gedruckt und gebunden, aber ohne Angabe eines Verlages oder einer entsprechenden Institution ist",
        attributes: {
            mandatory: {
                title: "Title"
            },
            optional: {
                author: "Author",
                howpublished: "How Published",
                address: "Address",
                month: "Month",
                year: "Year",
                note: "Note"
            }
        }
    },
    inbook : {
        type: "In book",
        description: "Teil eines Buches mit Angabe eines Abschnitts oder Seitenbereichs",
        attributes: {
            mandatory: {
                author: "Author",
                editor: "Editor",
                title: "Title",
                chapter: "Chapter",
                pages: "Pages",
                publisher: "Publisher",
                year: "Year"
            },
            optional: {
                volume: "Volume",
                number: "Number",
                series: "Series",
                inbookType: "Type",
                address: "Address",
                edition: "Edition",
                month: "Month",
                note: "Note"
            }
        }
    },
    incollection : {
        type: "In collection",
        description: "Teil eines Buches mit einem eigenen Titel",
        attributes: {
            mandatory: {
                author: "Author",
                title: "Title",
                bookTitle: "Booktitle",
                publisher: "Publisher",
                year: "Year"
            },
            optional: {
                editor: "Editor",
                volume: "Volume",
                number: "Number",
                series: "Series",
                incollectionType: "Type",
                chapter: "Chapter",
                pages: "Pages",
                address: "Address",
                edition: "Edition",
                month: "Month",
                note: "Note"
            }
        }
    },
    inproceedings : {
        type: "In proceedings",
        description: "Artikel in einem Konferenzband",
        attributes: {
            mandatory: {
                author: "Author",
                title: "Title",
                booktitle: "Booktitle",
                year: "Year"
            },
            optional: {
                editor: "Editor",
                volume: "Volume",
                number: "Number",
                series: "Series",
                pages: "Pages",
                address: "Address",
                month: "Month",
                organisation: "Organisation",
                publisher: "Publisher",
                note: "Note"
            }
        }
    },
    manual : {
        type: "Manual",
        description: "Technische Dokumentation oder Anleitung",
        attributes: {
            mandatory: {
                title: "Title"
            },
            optional: {
                author: "Author",
                address: "Address",
                month: "Month",
                organisation: "Organisation",
                year: "Year",
                note: "Note"
            }
        }
    },
    masterthesis : {
        type: "Master thesis",
        description: "Diplomarbeit",
        attributes: {
            mandatory: {
                author: "Author",
                title: "Title",
                school: "School",
                year: "Year"
            },
            optional: {
                masterthesisType: "Type",
                address: "Address",
                month: "Month",
                note: "Note"
            }
        }
    },
    misc : {
        type: "Misc",
        description: "Alles, was sonst nicht passt",
        attributes: {
            mandatory: {
            },
            optional: {
                author: "Author",
                title: "Title",
                howpublished: "How Published",
                month: "Month",
                year: "Year",
                note: "Note"
            }
        }
    },
    phdthesis : {
        type: "Ph.D. thesis",
        description: "Doktorarbeit",
        attributes: {
            mandatory: {
                author: "Author",
                title: "Title",
                school: "School",
                year: "Year"
            },
            optional: {
                masterthesisType: "Type",
                address: "Address",
                month: "Month",
                note: "Note"
            }
        }
    },
    proceedings : {
        type: "Proceedings",
        description: "Konferenzbericht",
        attributes: {
            mandatory: {
                title: "Title",
                year: "Year"
            },
            optional: {
                editor: "Editor",
                volume: "Volume",
                number: "Number",
                series: "Series",
                address: "Address",
                month: "Month",
                organisation: "Organisation",
                publisher: "Publisher",
                note: "Note"
            }
        }
    },
    techreport : {
        type: "Techreport",
        description: "Bericht einer Hochschule oder ähnlichen Institution, der meist in einer Reihe erscheint",
        attributes: {
            mandatory: {
                author: "Author",
                title: "Title",
                institution: "Institution",
                year: "Year"
            },
            optional: {
                techreportType: "Type",
                number: "Number",
                address: "Address",
                month: "Month",
                note: "Note"
            }
        }
    },
    unpublished : {
        type: "Unpublished",
        description: "Dokument eines Autors mit einem Titel, das aber nicht veröffentlicht wurde",
        attributes: {
            mandatory: {
                author: "Author",
                title: "Title",
                note: "Note"
            },
            optional: {
                month: "Month",
                year: "Year"
            }
        }
    }
};

var initializeSelections = function() {
    var selections = $('<select id="selectEntryType" name="entryType">');
    selections.append('<option value="Default">Please select...</option>');
    $.each(entryTypes, function(fieldname, field) {
        selections.append('<option value="' + fieldname + '">' + field.type + '</option>');
    });
    var typeSelection = $('div#typeSelection');
    typeSelection.append('<label for="selectEntryType">Select entry type:</label>');
    typeSelection.append(selections);
};

var generateEntryTemplate = function(entryType) {
    var typeAttribute = $('<input type="hidden" name="type" />');
    typeAttribute.addClass("docAttribute");
    typeAttribute.val(entryType.type);

    var entryDetails = $('<div></div>');
    entryDetails.attr("id", "entryDetailsFor" + entryType.type);
    entryDetails.append(typeAttribute);

    $.each(entryType.attributes.mandatory, function(fieldname, fieldlabel) {
        var inputField = $('<input type="text" name="' + fieldname + '" />');
        inputField.addClass("docAttribute");
        inputField.addClass("mandatoryField");

        var label = $("<label></label>");
        label.append(fieldlabel + ": ");
        label.append(inputField);

        entryDetails.append("<br />");
        entryDetails.append(label);
    });

    $.each(entryType.attributes.optional, function(fieldname, fieldlabel) {
        var inputField = $('<input type="text" name="' + fieldname + '" />');
        inputField.addClass("docAttribute");
        inputField.addClass("optionalField");

        var label = $("<label></label>");
        label.append(fieldlabel + ": ");
        label.append(inputField);

        entryDetails.append("<br />");
        entryDetails.append(label);
    });
    console.log(entryDetails.get(0).outerHTML);
    return entryDetails;
};

var refreshEntries = function() {
    $('div#bibliography').empty();
    $('div#createNewEntry').hide();
    $('div#saveResult').hide();
    $('a#link_createNewEntry').hide();

    if ($currentUser) {
        $('a#link_createNewEntry').show();
        $db.view("bibliography/bibliography", {
            success:function(data) {
                $.each(data.rows, function(index, row) {
                    var entry = row.value;
                    if ($currentUser == entry.owner) {
                        var rowItem = $('<li></li>');
                        rowItem.append('<input type="hidden" class="docID" id="bibEntry_' + entry._id + '" value="' + entry._id + '" />');
                        rowItem.append('<h2>' + entry.type + '</h2>');
                        var properties = $('<ul></ul>');
                        $.each(Object.keys(entry), function(index, attributeName) {
                            if (attributeName != "_id"
                                && attributeName != "_rev"
                                && attributeName != "owner"
                                && attributeName != "type") {
                                properties.append($('<li></li>').append(attributeName + ": " + entry[attributeName]));
                            }
                        });
                        rowItem.append(properties);

                        $('div#bibliography').append(rowItem);
                    }
                });
            }
        });
    }
};

var onUserLoggedIn = function(data) {
// show logged in user name and logout button
    $('#session').html(
        'logged in as ' + data.userCtx.name + ' ' +
            '<input type="submit" name="logOut" value="sign out"/>' +
            '<input type="hidden" id="username" value="' + data.userCtx.name + '" />');
    refreshEntries();
};

var onUserLoggedOut = function() {
// show logon form
    $('#session').html(
        '<form action="#">' +
            '<label for="username">username</label><input type="text" name="username">' +
            '<label for="password">password</label><input type="password" name="password">' +
            '<input type="submit" name="logIn" value="log in"/>' +
            '</form>');
    refreshEntries();
};

$(document).ready(function() {

    $db = $.couch.db("bib");

    // Check whether user is already connected
    $.couch.session({
        success: function(data) {
            if (data.userCtx.name != null) {
                $currentUser = data.userCtx.name;
                onUserLoggedIn(data);
            }
            else {
                $currentUser = null;
                onUserLoggedOut();
            }
        },
        error: function(data) {
            $currentUser = null;
            onUserLoggedOut();
        }
    });

    initializeSelections();

    $('a#link_createNewEntry').live('click', function(evt) {
        $('div#createNewEntry').fadeIn();
        $('select#selectEntryType').val("Default");
        $('select#selectEntryType').trigger('change', $('select#selectEntryType').val());
    });

    $('input#cancelNewEntry').live('click', function(evt) {
        $('div#createNewEntry').hide();
    });

    $('select#selectEntryType').live('change', function(evt) {

        var entryContainer = $('form#newEntry div#entryContainer');
        entryContainer.empty();

        var newEntryTypeSelection = $(this).val();
        if ('Default' != newEntryTypeSelection) {
            var attributeContainer = generateEntryTemplate(entryTypes[newEntryTypeSelection]);
            entryContainer.append(attributeContainer);
            $('div#entryButtons').fadeIn();
        }
    });

    $('input#submitNewEntry').live('click', function(evt) {
        evt.preventDefault();

        var JSONdoc = {};
//        JSONdoc._id = undefined;
        JSONdoc.owner = $currentUser;

        var docAttributes = $('div#entryContainer input.docAttribute');
        docAttributes.each(function() {
            var docAttribute = $(this);
            var attributeName = docAttribute.get(0).name;
            JSONdoc[attributeName] = docAttribute.val();
        });

        $db.saveDoc(JSONdoc, {
            success: function(doc) {
                refreshEntries();
                $('#saveResult').replaceWith('<p>document ' + JSONdoc._id + ' was successfully updated</p>');
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $('#saveResult').replaceWith('<p>Error updating document ' + JSONdoc._id + ': ' + jqXHR + ' ' + textStatus + ' - ' + errorThrown + '</p>');
            }
        });
    });

    $('[type="submit"][name="logIn"]').live('click', function(e) {
        // sign user in
        e.preventDefault();

        var username = $('input[name="username"]', '#session').val();
        var password = $('input[name="password"]', '#session').val();

        // login the user
        $.couch.login({
            'name': username,
            'password': password,
            success: function(data) {
                /*
                 // replace login form by user name
                 $('#session').html('logged in as '+data.name+ ' <input type="submit" name="logOut" value="sign out"/>');
                 */
                // workaround to avoid some bug in couchdb1.0.2: username is not always returned in the callback function.
                $.couch.session({
                    success: function(data) {
                        if (data.userCtx.name != null) {
                            $currentUser = data.userCtx.name;
                            onUserLoggedIn(data);
                        }
                    }
                });
            }
        });

    });

    $('[type="submit"][name="logOut"]').live('click', function(e) {
        // sign user in
        e.preventDefault();

        // log the user out
        $.couch.logout();
        $currentUser = null;

        // restore login form
        onUserLoggedOut();
    });
});
