CBR.Controllers.Index = P(CBR.Controllers.Base, function (c, base) {
    c.run = function () {
        this._initElements();
        this._initEvents();
    };

    c._initElements = function () {
        this.$projectsSection = $("#projects");
        this.$showDetailsAnchors = this.$projectsSection.find(".show-details");
        this.$hideDetailsTopAnchors = this.$projectsSection.find(".hide-details.top");
        this.$appearShowroomDetailsSection = $("#appear-showroom").children(".details");
        this.$siteDiaryDetailsSection = $("#site-diary").children(".details");
        this.$trainDamageDetailsSection = $("#train-damage").children(".details");

        this._initContentProjectDetails();
    };

    c._initEvents = function () {
        base.initEvents.call(this);

        this.$showDetailsAnchors.click($.proxy(this._onClickShowDetails, this));
        this.$hideDetailsTopAnchors.click($.proxy(this._onClickTopHideDetails, this));
    };

    c._initContentProjectDetails = function () {
        $.ajax({
            url: "/assets/html/appearShowroomDetails.html"
        }).done(function (data, textStatus, jqXHR) {
                this.$appearShowroomDetailsSection.html(data);
            }.bind(this)
        ).fail(function (jqXHR, textStatus, errorThrown) {
                alert("AJAX fail :(");
            });

        /* TODO $.ajax({
            url: "/assets/html/siteDiaryDetails.html"
        }).done(function (data, textStatus, jqXHR) {
                this.$siteDiaryDetailsSection.html(data);
            }.bind(this)
        ).fail(function (jqXHR, textStatus, errorThrown) {
                alert("AJAX fail :(");
            }); */
    };

    c._onClickShowDetails = function (e) {
        var $showDetailsAnchor = $(e.currentTarget);

        $showDetailsAnchor.parent().siblings(".details").show();
        $showDetailsAnchor.hide();
        $showDetailsAnchor.siblings(".hide-details.top").show();
    };

    c._onClickTopHideDetails = function (e) {
        var $hideDetailsAnchor = $(e.currentTarget);

        $hideDetailsAnchor.parent().siblings(".details").hide();
        $hideDetailsAnchor.hide();
        $hideDetailsAnchor.siblings(".show-details").show();
    };
});
