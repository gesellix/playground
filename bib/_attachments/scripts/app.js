var $db = '';
var $currentUser = undefined;

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

var generateAdditionalFields = function() {
    var additionalFields = $('<div></div>');

    var additionalNotes = $('<textarea name="additionalNotes" cols="50" rows="10" ></textarea>');
    additionalNotes.addClass('docAttribute');
    var labelNotes = $("<label></label>");
    labelNotes.append("Notes: ");
    labelNotes.append(additionalNotes);

    var additionalUrl = $('<input type="text" name="additionalUrl" />');
    additionalUrl.addClass('docAttribute');
    var labelUrl = $("<label></label>");
    labelUrl.append("URL: ");
    labelUrl.append(additionalUrl);

    var additionalFile = $('<input type="file" name="_attachments" />');
    additionalFile.addClass('docAttribute');
    var labelFile = $("<label></label>");
    labelFile.append("File: ");
    labelFile.append(additionalFile);

    additionalFields.append("<br />");
    additionalFields.append(labelNotes);
    additionalFields.append("<br />");
    additionalFields.append(labelUrl);
    additionalFields.append("<br />");
    additionalFields.append(labelFile);

    return additionalFields;
};

var generateEntry = function(entryType) {
    var typeAttribute = $('<input type="hidden" name="type" />');
    typeAttribute.addClass('docAttribute');
    typeAttribute.val(entryType.type);

    var entryDetails = $('<div></div>');
    entryDetails.attr("id", "entryDetailsFor" + entryType.type);
    entryDetails.append($('<p></p>').append(entryType.description));
    entryDetails.append(typeAttribute);

    $.each(entryType.attributes.mandatory, function(fieldname, fieldlabel) {
        var inputField = $('<input type="text" name="' + fieldname + '" />');
        inputField.addClass('docAttribute');
        inputField.addClass('mandatoryField');

        var label = $("<label></label>");
        label.append(fieldlabel + ": ");
        label.append(inputField);

        entryDetails.append("<br />");
        entryDetails.append(label);
    });

    $.each(entryType.attributes.optional, function(fieldname, fieldlabel) {
        var inputField = $('<input type="text" name="' + fieldname + '" />');
        inputField.addClass('docAttribute');
        inputField.addClass('optionalField');

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
        $db.list("bibliography/bibliography", "bibliography", {
            success: function(data) {
                $.each(data.rows, function(index, row) {
                    var entry = row.value;
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
                $currentUser = undefined;
                onUserLoggedOut();
            }
        },
        error: function(data) {
            $currentUser = undefined;
            onUserLoggedOut();
        }
    });

    initializeSelections();

    $('a#link_createNewEntry').live('click', function(evt) {
        $('#saveResult').empty();
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
            entryContainer.append(generateEntry(entryTypes[newEntryTypeSelection]));
//            entryContainer.append(generateAdditionalFields());

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

        $('#saveResult').empty();
        $db.saveDoc(JSONdoc, {
            success: function(doc) {
                $('div#entryButtons').hide();
                refreshEntries();
                $('#saveResult').append('<p>document ' + JSONdoc._id + ' was successfully updated</p>');
                $('#saveResult').fadeIn();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $('#saveResult').append('<p>Error updating document ' + JSONdoc._id + ': ' + jqXHR + ' ' + textStatus + ' - ' + errorThrown + '</p>');
                $('#saveResult').fadeIn();
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
