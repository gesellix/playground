# Bibliography on CouchDB

Bibliography on [CouchDB](http://www.couchdb.org/) provides an easy way of collecting data
being used in bibliographies like [BibTeX](http://www.bibtex.org/).

## Concept

This CouchApp is uses a simple interface to let the user add several types of bibliography items.
Each type defines mandatory and optional fields, which correspond to the definitions made by BibTeX.
Additional fields enable the user to add notes, urls or file attachments, so that all relevant data
is at exactly one place.

## Install

Installing Bibliography on CouchDB needs a running CouchDB instance (surprise!) and for best comfort the CouchApp scripts installed.

### Install CouchDB

Please read the documentation at the [CouchDB home](http://www.couchdb.org) or grab a couch at the free hoster [Iris Couch](http://www.iriscouch.com/).

### Install CouchApp

[CouchApp](http://github.com/couchapp/couchapp/) is a set of utilities for developing standalone CouchDB applications.
CouchApp makes it easy to edit application that are hosted in CouchDB,
by keeping a correspondence between a set of files, and a CouchDB design document.
You'll use CouchApp to install Bibliography in your CouchDB instance.

    sudo easy_install couchapp

Since [`easy_install` has an unpleasant bug on OSX](http://mail.python.org/pipermail/pythonmac-sig/2008-October/020567.html),
you might end up having to work from git source.

### Install Bibliography

    git clone git://github.com/gesellix/bibliography.git
    cd bibliography
    couchapp push . http://user:pass@127.0.0.1:5984/mydb

Anytime you make edits to the on-disk version of your git clone,
just run `couchapp push . http://127.0.0.1:5984/blogdb` again.
The CouchApp readme gives you more details.
