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
    var labelNotes = $('<label></label>');
    labelNotes.append("Notes: ");
    labelNotes.append(additionalNotes);

    var additionalUrl = $('<input type="text" name="additionalUrl" />');
    additionalUrl.addClass('docAttribute');
    var labelUrl = $('<label></label>');
    labelUrl.append("URL: ");
    labelUrl.append(additionalUrl);

    var additionalFile = $('<input type="file" name="_attachments" />');
    additionalFile.addClass('docAttachments');
    var labelFile = $('<label></label>');
    labelFile.append("File: ");
    labelFile.append(additionalFile);

    additionalFields.append($('<div></div>').append(labelUrl));
    additionalFields.append($('<div></div>').append(labelFile));
    additionalFields.append($('<div style="height: 19ex;"></div>').append(labelNotes));

    return additionalFields;
};

var generateEntry = function(entryType, currentUser) {
    var ownerAttribute = $('<input type="hidden" name="owner" />');
    ownerAttribute.addClass('docAttribute');
    ownerAttribute.val(currentUser);

    var typeAttribute = $('<input type="hidden" name="type" />');
    typeAttribute.addClass('docAttribute');
    typeAttribute.val(entryType.type);

    var entryDetails = $('<div></div>');
    entryDetails.attr("id", "entryDetailsFor" + entryType.type);
    entryDetails.append($('<p></p>').append(entryType.description));
    entryDetails.append(typeAttribute);
    entryDetails.append(ownerAttribute);

    $.each(entryType.attributes.mandatory, function(fieldname, fieldlabel) {
        var inputField = $('<input type="text" name="' + fieldname + '" />');
        inputField.addClass('docAttribute');
        inputField.addClass('mandatoryField');
        inputField.attr('id', 'id' + fieldname);

        var label = $('<label></label>');
        label.html(fieldlabel + ": ");
        label.append(inputField);
        label.attr('for', 'id' + fieldname);

        entryDetails.append($('<div></div>').append(label));
    });

    $.each(entryType.attributes.optional, function(fieldname, fieldlabel) {
        var inputField = $('<input type="text" name="' + fieldname + '" />');
        inputField.addClass('docAttribute');
        inputField.addClass('optionalField');
        inputField.attr('id', 'id' + fieldname);

        var label = $('<label></label>');
        label.html(fieldlabel + ": ");
        label.append(inputField);
        label.attr('for', 'id' + fieldname);

        entryDetails.append($('<div></div>').append(label));
    });
    return entryDetails;
};
