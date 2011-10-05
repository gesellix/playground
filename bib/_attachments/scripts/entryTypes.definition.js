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
