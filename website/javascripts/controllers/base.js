CBR.Controllers.Base = P(function (c) {
    c.init = function (options) {
        this.options = options;
    };

    c.getEl = function () {
        return $(this.options.el);
    };

    c.initEvents = function () {
        this._listenToCheckboxesAndRadiosClicks();
    };

    c._listenToCheckboxesAndRadiosClicks = function() {
        $(".check-or-radio").find("label").click(function(e) {
            var $checkboxOrRadio = $(e.currentTarget).parent().parent().find("input");
            $checkboxOrRadio.click();
        });
    };
});