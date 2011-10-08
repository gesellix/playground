var $db = '';
var $currentUser = undefined;

var onEdit = function(entryId, entryRev) {
    // TODO
};

var onDelete = function(entryId, entryRev) {
    $db.removeDoc({_id: entryId, _rev: entryRev}, {
        success: function() {
            refreshEntries();
        }
    });
};

var createRowItem = function(entry) {
    var rowItem = $('<li></li>');
    rowItem.append('<input type="hidden" class="docID" id="bibEntry_' + entry._id + '" value="' + entry._id + '" />');
    rowItem.append('<h2 id="headerFor' + entry._id + '">' + entry.type + ' ' + entry._id + '</h2>');
    rowItem.append('&nbsp;');
    rowItem.append($('<a href="#edit">edit</a>').click(function() {
        onEdit(entry._id, entry._rev);
    }));
    rowItem.append('&nbsp;');
    rowItem.append($('<a href="#delete">delete</a>').click(function() {
        if (confirm('Delete entry?')) {
            onDelete(entry._id, entry._rev);
        }
    }));
    var properties = $('<ul id="propertiesFor' + entry._id + '"></ul>');
    properties.hide();
    $.each(Object.keys(entry), function(index, attributeName) {
        if (attributeName != "_id"
            && attributeName != "_rev"
            && attributeName != "owner"
            && attributeName != "type") {
            var attributeElement = $('<li></li>');
            if ("_attachments" == attributeName) {
                attributeElement.html("Attachments:");
                var attachments = $('<ul></ul>');
                $.each(Object.keys(entry[attributeName]), function(index, attachmentName) {
                    var attachmentLink = $('<a></a>');
                    attachmentLink.html(attachmentName);
                    attachmentLink.attr('href', $db.uri + $.couch.encodeDocId(entry._id) + '/' + attachmentName);
                    attachments.append($('<li></li>').append(attachmentLink));
                });
                attributeElement.append(attachments);
            } else {
                attributeElement.append(attributeName + ": " + entry[attributeName]);
            }
            properties.append(attributeElement);
        }
    });
    rowItem.append(properties);

    $('#headerFor' + entry._id).live('click', function() {
        $('#propertiesFor' + entry._id).toggle();
    });

    return rowItem;
};

var refreshEntries = function() {
    $('div#bibliography').empty();
    $('div#createNewEntry').hide();
    $('div#saveResult').hide();
    $('a#link_createNewEntry').hide();

    if ($currentUser) {
        $('a#link_createNewEntry').show();
        $db.list("bibliography/bibliography", "bibliography", {
            success: function(data) {
                var entries = $('<ul></ul>');
                $.each(data.rows, function(index, row) {
                    var rowItem = createRowItem(row.value);
                    entries.append(rowItem);
                });
                $('div#bibliography').append(entries);
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

var onDocumentSaved = function(JSONdoc) {
    refreshEntries();
    $('#saveResult').empty();
    $('#saveResult').append('<p>document ' + JSONdoc._id + ' was successfully updated</p>');
    $('#saveResult').toggle();
};

var submitAttachments = function(JSONdoc) {
    var attachments = $('div#entryContainer input.docAttachments');
    if (attachments.size() > 0) {
        var attachmentForm = $('<form style="display: none;" action="" id="attachmentUploadForm"></form>');
        attachments.each(function() {
            attachmentForm.append($(this));
        });
        attachmentForm.append('<input type="hidden" name="_rev" value="' + JSONdoc._rev + '" />');
        var options = {
            url: $db.uri + $.couch.encodeDocId(JSONdoc._id),
            type: 'post',
            dataType: 'json',
            success: function() {
                onDocumentSaved(JSONdoc);
            }
        };
        attachmentForm.submit(function() {
            $(this).ajaxSubmit(options);
            return false;
        });
        attachmentForm.submit();
        return true;
    }
    return false;
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
                $currentUser = undefined;
                onUserLoggedOut();
            }
        },
        error: function() {
            $currentUser = undefined;
            onUserLoggedOut();
        }
    });

    initializeSelections();

    $('a#link_createNewEntry').live('click', function() {
        $('#saveResult').empty();
        $('div#createNewEntry').fadeIn();
        $('select#selectEntryType').val("Default");
        $('select#selectEntryType').trigger('change', $('select#selectEntryType').val());
    });

    $('input#cancelNewEntry').live('click', function() {
        $('div#createNewEntry').hide();
    });

    $('select#selectEntryType').live('change', function() {

        var entryContainer = $('form#newEntry div#entryContainer');
        entryContainer.empty();

        var newEntryTypeSelection = $(this).val();
        if ('Default' != newEntryTypeSelection) {
            entryContainer.append(generateEntry(entryTypes[newEntryTypeSelection], $currentUser));
            entryContainer.append(generateAdditionalFields());

            $('div#entryButtons').fadeIn();
        }
    });

    $('input#submitNewEntry').live('click', function(evt) {
        evt.preventDefault();

        var JSONdoc = {};

        var docAttributes = $('div#entryContainer .docAttribute');
        docAttributes.each(function() {
            var docAttribute = $(this);
            var attributeName = docAttribute.get(0).name;
            JSONdoc[attributeName] = docAttribute.val();
        });

        $('#saveResult').empty();
        $db.saveDoc(JSONdoc, {
            success: function(doc) {
                $('div#entryButtons').hide();

                $('#saveResult').append('<p>document ' + JSONdoc._id + ' was successfully created, uploading attachments...</p>');
                $('#saveResult').toggle();
                if (!submitAttachments(JSONdoc)) {
                    onDocumentSaved(JSONdoc);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $('#saveResult').append('<p>Error updating document ' + JSONdoc._id + ': ' + jqXHR + ' ' + textStatus + ' - ' + errorThrown + '</p>');
                $('#saveResult').toggle();
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
        $currentUser = undefined;

        // restore login form
        onUserLoggedOut();
    });
});
