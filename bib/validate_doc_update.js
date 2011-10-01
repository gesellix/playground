function (newDoc, oldDoc, userCtx, secObj) {
    if (!userCtx.name) {
        // CouchDB sets userCtx.name only after a successful authentication
        throw({forbidden: "Please log in first."});
    }
}
