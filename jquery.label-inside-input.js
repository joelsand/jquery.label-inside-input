/*!
 * jQuery lightweight plug-in for placing labels in a textbox, and displaying a tooltip when focused.
 * Original author: @joelsanderson, @protectedtrust
 * Licensed under the MIT license
 */

; (function ($) {

    // Create the defaults once
    var pluginName = "labelInsideInput",
        defaults = {
            label: "",
            labelAttr: "",
            infieldClass: "infield-label",
            tooltipClass: "infield-tooltip",
            tooltipPosition: "right"
        };

    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = element;

        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    // forward declared functions
    var positionTooltip;
    var hideElement;
    var showElement;
    var uniqueIdCounter = 0;
    
    Plugin.prototype = {

        init: function () {

            this.makeLabel(this.element, this.options);
        },

        makeLabel: function (el, options) {

            var input = $(el);
            
            var parent = input.parent();

            var labelText;
            var wrapper;

            if (parent.prop('tagName').toLowerCase() == 'label') {
                labelText = '';
                wrapper = parent;
                wrapper
                    .contents()
                    .filter(function () {
                        if (this.nodeType == 3 /* Node.TEXT_NODE */ ) {
                            // text node
                            labelText += $(this).text();
                            return true;
                        }
                        else {
                            // not a text node
                            return false;
                        }
                    })
                    .remove();
                wrapper.addClass(options.infieldClass);
            }
            else {
                wrapper = $('<label></label>');
                wrapper.addClass(options.infieldClass);
                input.wrap(wrapper);
                if (options.label == '') {
                    labelText = $(this.element).attr(options.labelAttr);
                }
                else {
                    labelText = options.label;
                }
            }

            var labelSpan = $('<span></span>');
            labelSpan.text(labelText);
            labelSpan.insertBefore(input);

            var inputHeight = input.outerHeight();
            var inputMarginTop = parseInt(input.css('margin-top'));
            var labelHeight = labelSpan.outerHeight();
            labelSpan.css({
                marginTop: inputMarginTop + ((inputHeight - labelHeight) / 2)
            });

            var id = input.attr('id');
            if (!id || id == '') {
                uniqueIdCounter++;
                id = 'infieldtextbox_id' + uniqueIdCounter;
                input.attr('id', id);
            }

            if (input.val() != '') {
                hideElement(labelSpan);
            }

            // create tooltip label
            var tooltipElement = $('<div></div>');
            tooltipElement.addClass(options.tooltipClass);
            tooltipElement.addClass(options.tooltipClass + "-" + options.tooltipPosition);

            var tooltipLabel = $('<label></label>');
            tooltipLabel.text(labelText);
            tooltipElement.append(tooltipLabel);

            tooltipElement.insertBefore(input);

            if (!options.tooltipMargins) {
                options.tooltipMargins = {
                    top: parseInt(tooltipElement.css('margin-top')),
                    right: parseInt(tooltipElement.css('margin-right')),
                    bottom: parseInt(tooltipElement.css('margin-bottom')),
                    left: parseInt(tooltipElement.css('margin-left'))
                };
            }

            if (!input.is(":focus")) {
                hideElement(tooltipElement);
            }

            // event handlers
            input.focus(function () {
                hideElement(labelSpan);
                positionTooltip(options, input, tooltipElement);
                showElement(tooltipElement);
            });

            input.blur(function () {
                hideElement(tooltipElement);
                if (input.val() == '') {
                    showElement(labelSpan);
                }
            });

            input.change(function () {
                if (input.val() == '') {
                    showElement(labelSpan);
                }
                else {
                    hideElement(labelSpan);
                }
            });

            labelSpan.click(function () {
                input.focus();
            });

        }
    };

    positionTooltip = function (options, input, tooltipElement) {

        var inputWidth = input.outerWidth();
        var inputHeight = input.outerHeight();
        var inputMarginTop = parseInt(input.css('margin-top'));

        var tooltipWidth = tooltipElement.outerWidth();
        var tooltipHeight = tooltipElement.outerHeight();
        

        switch (options.tooltipPosition) {
            case 'left':
                tooltipElement.css('margin-left', 0 - tooltipWidth - options.tooltipMargins.right);
                tooltipElement.css('margin-top', inputMarginTop + (inputHeight - tooltipHeight) / 2);
                break;

            case 'right':
                tooltipElement.css('margin-left', inputWidth + options.tooltipMargins.left);
                tooltipElement.css('margin-top', inputMarginTop + (inputHeight - tooltipHeight) / 2);
                break;

            default:
                throw 'Invalid tooltip position: ' + options.tooltipPosition;
        }
    };

    hideElement = function (element) {
        element.css({
            visibility: 'hidden'
        });
    };

    showElement = function (element) {
        element.css({
            visibility: 'visible'
        });
    }

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                new Plugin(this, options));
            }
        });
    }

})(jQuery, window, document);