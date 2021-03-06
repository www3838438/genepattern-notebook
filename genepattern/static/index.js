/**
 * @author Thorin Tabor
 *
 * Asynchronous RequireJS-style loader, necessary for bootstrapping the
 * GenePattern Notebook extension in the legacy Jupyter Notebook environment
 *
 * Copyright 2015-2017, Regents of the University of California & Broad Institute
 */

define([
    // Load the dependencies
    "base/js/namespace", "base/js/events", "jquery",

    // Bootstrap loading the GenePattern requirejs modules
    "nbextensions/genepattern/resources/genepattern",
    "nbextensions/genepattern/resources/genepattern.navigation",
    "nbextensions/genepattern/resources/genepattern.authentication",
    "nbextensions/genepattern/resources/genepattern.job",
    "nbextensions/genepattern/resources/genepattern.task",
    "nbextensions/genepattern/resources/genepattern.uibuilder"], function(Jupyter, events, $) {

    function load_ipython_extension() {
        const STATIC_PATH = Jupyter.notebook.base_url + "nbextensions/genepattern/resources/";

        $('head')
            // Import styles used by GenePattern Notebook
            .append(
                $('<link rel="stylesheet" type="text/css" />')
                    .attr("rel", "stylesheet")
                    .attr("type", "text/css")
                    .attr('href', STATIC_PATH + 'genepattern.css')
            );

        // Wait for the kernel to be ready and then initialize the widgets
        require(["genepattern/navigation"], function(GPNotebook) {
            const interval = setInterval(function() {
                GPNotebook.init.wait_for_kernel(interval);
            }, 500);
        });
    }

    return {
        load_ipython_extension: load_ipython_extension
    };
});