var $db = '';
var $currentUser = undefined;
var attributesByType = {
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
            },
            optional: {
                author: "Author",
                howpublished: "How Published",
                address: "Address",
                month: "Month",
                year: "Year",
                note: "Note",
                title: "Title",
                edition: "Edition",
                publisher: "Publisher",
                editor: "Editor",
                volume: "Volume",
                number: "Number",
                series: "Series"
            }
        }
    },
    manual : {
        type: "Manual",
        description: "Technische Dokumentation oder Anleitung",
        attributes: {
            mandatory: {
            },
            optional: {
                author: "Author",
                howpublished: "How Published",
                address: "Address",
                month: "Month",
                year: "Year",
                note: "Note",
                title: "Title",
                edition: "Edition",
                publisher: "Publisher",
                editor: "Editor",
                volume: "Volume",
                number: "Number",
                series: "Series"
            }
        }
    },
    masterthesis : {
        type: "Master thesis",
        description: "Diplomarbeit",
        attributes: {
            mandatory: {
            },
            optional: {
                author: "Author",
                howpublished: "How Published",
                address: "Address",
                month: "Month",
                year: "Year",
                note: "Note",
                title: "Title",
                edition: "Edition",
                publisher: "Publisher",
                editor: "Editor",
                volume: "Volume",
                number: "Number",
                series: "Series"
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
                howpublished: "How Published",
                address: "Address",
                month: "Month",
                year: "Year",
                note: "Note",
                title: "Title",
                edition: "Edition",
                publisher: "Publisher",
                editor: "Editor",
                volume: "Volume",
                number: "Number",
                series: "Series"
            }
        }
    },
    phdthesis : {
        type: "Ph.D. thesis",
        description: "Doktorarbeit",
        attributes: {
            mandatory: {
            },
            optional: {
                author: "Author",
                howpublished: "How Published",
                address: "Address",
                month: "Month",
                year: "Year",
                note: "Note",
                title: "Title",
                edition: "Edition",
                publisher: "Publisher",
                editor: "Editor",
                volume: "Volume",
                number: "Number",
                series: "Series"
            }
        }
    },
    proceedings : {
        type: "proceedings",
        description: "Konferenzbericht",
        attributes: {
            mandatory: {
            },
            optional: {
                author: "Author",
                howpublished: "How Published",
                address: "Address",
                month: "Month",
                year: "Year",
                note: "Note",
                title: "Title",
                edition: "Edition",
                publisher: "Publisher",
                editor: "Editor",
                volume: "Volume",
                number: "Number",
                series: "Series"
            }
        }
    },
    techreport : {
        type: "techreport",
        description: "Bericht einer Hochschule oder ähnlichen Institution, der meist in einer Reihe erscheint",
        attributes: {
            mandatory: {
            },
            optional: {
                author: "Author",
                howpublished: "How Published",
                address: "Address",
                month: "Month",
                year: "Year",
                note: "Note",
                title: "Title",
                edition: "Edition",
                publisher: "Publisher",
                editor: "Editor",
                volume: "Volume",
                number: "Number",
                series: "Series"
            }
        }
    },
    unpublished : {
        type: "unpublished",
        description: "Dokument eines Autors mit einem Titel, das aber nicht veröffentlicht wurde",
        attributes: {
            mandatory: {
            },
            optional: {
                author: "Author",
                howpublished: "How Published",
                address: "Address",
                month: "Month",
                year: "Year",
                note: "Note",
                title: "Title",
                edition: "Edition",
                publisher: "Publisher",
                editor: "Editor",
                volume: "Volume",
                number: "Number",
                series: "Series"
            }
        }
    }
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
                                properties.append($('<li></li>').append(entry[attributeName]));
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

    $('a#link_createNewEntry').live('click', function(evt) {
        $('div#createNewEntry').fadeIn();
        $('select#selectEntryType').val("Default");
        $('select#selectEntryType').trigger('change', $('select#selectEntryType').val());
    });

    $('input#cancelNewEntry').live('click', function(evt) {
        $('div#createNewEntry').hide();
    });

    $('select#selectEntryType').live('change', function(evt) {

        $('form#newEntry > div.initiallyHidden').hide();

        var newEntryTypeSelection = $(this).val();
        if ('Default' != newEntryTypeSelection) {
            var docAttributes = $('div#entryDetailsFor' + newEntryTypeSelection + ' input[type="text"].docAttribute');
            docAttributes.each(function() {
                $(this).val('');
            });

            $('div#entryDetailsFor' + newEntryTypeSelection).fadeIn();
            $('div#entryButtons').fadeIn();
        }
    });

    $('input#submitNewEntry').live('click', function(evt) {
        evt.preventDefault();

        var JSONdoc = {};
//        JSONdoc._id = undefined;
        JSONdoc.owner = $currentUser;

        var docAttributes = $('div#entryDetailsFor' + $('#selectEntryType').val() + ' input.docAttribute');
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
