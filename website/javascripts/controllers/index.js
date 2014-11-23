CBR.Controllers.Index = P(CBR.Controllers.Base, function (c, base) {
    c.animatedTextBubblesBelowTheFold = [];
    c.textBubblesBelowTheFoldToAnimateOnNextScroll = [];

    c.run = function () {
        this._initElements();
        this._initEvents();
    };

    c._initElements = function () {
        this.$textBubblesBelowTheFold = $("blockquote > .text-bubble");

        setTimeout(function () {
            this._animateTextBubble($("h1"), this._showRestOfThePage);
        }.bind(this), 500);
    };

    c._initEvents = function () {
        if (Modernizr.touch) {   // Because checking visibility outside viewport doesn't work in touch browsers
            this.$textBubblesBelowTheFold.each(function (index, element) {
                var $textBubble = $(element);

                // The footer was hidden for the animation effect to look nicer
                $textBubble.siblings("footer").css("visibility", "visible");

                this._animateTextBubble($textBubble);

                // For the sake of code logic; not really necessary
                this.animatedTextBubblesBelowTheFold.push($textBubble[0]);
            }.bind(this));
        } else {
            $(window).scroll(_.debounce($.proxy(this._animateTextBubblesBelowTheFold, this), 15));
        }
    };

    c._animateTextBubblesBelowTheFold = function () {
        this.textBubblesBelowTheFoldToAnimateOnNextScroll.forEach(function ($textBubble, index) {
            var $footer = $textBubble.siblings("footer");
            if ($footer.visible()) {    // If the associated footer is fully visible
                // We animate the text bubble after a split second
                setTimeout(function() {
                    // The footer was hidden for the animation effect to look nicer
                    $footer.css("visibility", "visible");

                    this._animateTextBubble($textBubble);
                }.bind(this), 250);

                // We would move this line inside _animateTextBubble() if it wasn't for the 250ms delay
                this.animatedTextBubblesBelowTheFold.push($textBubble[0]);

                // The text bubble has been animated, we remove it from the array
                this.textBubblesBelowTheFoldToAnimateOnNextScroll.splice(index);
            }
        }.bind(this));

        this.$textBubblesBelowTheFold.each(function (index, element) {
            var $textBubble = $(element);

            if (!_.contains(this.animatedTextBubblesBelowTheFold, element)) {
                if ($textBubble.visible(true)) {   // If partly visible
                    // We hide it immediately
                    $textBubble.hide();

                    // And store it as element to be animated on next scroll
                    this.textBubblesBelowTheFoldToAnimateOnNextScroll.push($textBubble);
                }
            }
        }.bind(this));
    };

    c._animateTextBubble = function ($textBubble, onComplete) {
        var $textBubbleOrigin = $textBubble.siblings(".text-bubble-origin");

        TweenLite.set([$textBubble, $textBubbleOrigin], {display: "block"});

        var fromTween = TweenLite.from($textBubble, 0.5, {scale: 0.5, ease: Back.easeOut, paused: true});
        if (onComplete) {
            fromTween.eventCallback("onComplete", this._showRestOfThePage);
        }
        fromTween.resume();

        TweenLite.to($textBubbleOrigin, 0.25, {alpha: 1}).delay(0.25);
    };

    c._showRestOfThePage = function () {
        var $hiddenBeforeBubbleAnimation = $(".hidden-before-bubble-animation");

        TweenLite.set($hiddenBeforeBubbleAnimation, {display: "block"});
        TweenLite.to($hiddenBeforeBubbleAnimation, 0.5, {alpha: 1});
    };
});
