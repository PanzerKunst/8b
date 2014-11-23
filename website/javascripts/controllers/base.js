CBR.Controllers.Base = P(function (c) {
    c.init = function (options) {
        this.options = options;
    };

    c.getEl = function () {
        return $(this.options.el);
    };
});