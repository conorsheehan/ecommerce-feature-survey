window.rll = window.rll || {};
window.rll.Pages = window.rll.Pages || {};

(function(
    $,
    _) {
    'use strict';

    var self;

    var Poll = {

        // Instantiates the poll
        init: function($el) {
            self = this;

            self.featureMap = {
                1: "Free Shipping",
                2: "Reliable User Comments",
                3: "Free Returns",
                4: "Guest Checkout",
                5: "Coupon Codes",
                6: "Customer Support",
                7: "Social Discounts / Referral Programs",
                8: "Retail Locations"
            };
            self.features = _.shuffle(_.keys(self.featureMap)); // Shuffled array of feature keys

            self.$el = $el;
            self.$featureListEl = self.$el.find('ul.features');
            self.renderFeatureList(self.features);
        },

        // Return sorted array of features, based on current arrangement
        getSortedFeatureList: function() {
            var $featureListElements = $self.$featureListEl.find('li');
            return _.map($featureListElements, self.getFeatureFromLi);
        },

        // Return mapping of sorted features, based on current arrangement
        // ajaxData = True: Map the keys to match the expected server-side keys
        getSortedFeatureMap: function(ajaxData) {
            var sortedFeatureList = self.getSortedFeatureList();
            var keys = _.range(1, sortedFeatureList.length + 1);
            if(ajaxData) {
                keys = _.map(keys, function(key) {
                    return "feature-" + key;
                });
            }
            return _.object(keys, sortedFeatureList);
        },

        // Return feature name from its <li>
        getFeatureFromLi: function($featureLi) {
            var featureId = $featureLi.data("feature");
            return self.featureMap[featureId];
        },

        formSubmit: function() {
            var url = "http://py.czsheez.com/ecomm-poll/create/";
            var sortedFeatureMap = self.getSortedFeatureMap();
            console.log(sortedFeatureMap);

            $.post(url, sortedFeatureMap)
                .done(self.formSuccess)
                .fail(self.formFail)
                .always(self.formAlways);
        },

        formSuccess: function() {
            console.log('Success');
        },

        formFail: function() {
            console.log('Fail');
        },

        formAlways: function() {
            console.log('Always');
        },
        // Renders the feature list to the page
        renderFeatureList: function(features) {
            self.$featureListEl.empty();
            _.each(features, function(featureId) {
                var renderedFeature = renderFeatureListItem(featureId);
                self.featureListElement.append(renderedFeature);
            });
        },

        // Return rendered <li> for a feature
        renderFeatureListItem: function(featureId) {
            var feature = self.featureMap[featureId];
            return '<li class="ui-state-default" data-feature="' + featureId + '"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>' + feature + '</li>';
        },

        setupListeners: function() {
            this.$el.find('form').submit(function(e) {
                e.preventDefault();
                self.formSubmit();
            });
        }

    };
})(
    jQuery,
    window._);