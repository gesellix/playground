function(head, req) {
    provides('json', function() {
        var response = new Object();
        response.rows = new Array();

        var row;
        while (row = getRow()) {
            if (row.value.owner == req.userCtx.name) {
                response.rows.push(row);
            }
        }
        response.total_rows = response.rows.length;
        response.offset = head.offset;
        send(toJSON(response));
    });
}