// window.rll = window.rll || {};
// window.rll.Pages = window.rll.Pages || {};
window.pollApp = window.pollApp || {};

(function(
    pollApp,
    $,
    _) {
    'use strict';

    var self;

    pollApp.Timer = {

        init: function() {
            this.timer = 0;
            this.timerIsOn = false;
            this.cycleTime = 100;
            this.startTime();
        },

        timedCount: function() {
            var self = this;
            this.timer = setTimeout(function(){
                self.timedCount();
            }, this.cycleTime);
        },

        startTime: function() {
            if (!this.timerIsOn) {
                this.timerIsOn=1;
                this.timedCount();
            }
        },

        stopTime: function() {
            clearTimeout(t);
            this.timerIsOn=0;
        },

        readTime: function() {
            var totalSec = parseInt(this.timer / (1000 / this.cycleTime), 10),
                hours = parseInt(totalSec / 3600, 10) % 24,
                minutes = parseInt(totalSec / 60, 10) % 60,
                seconds = totalSec % 60;

            return (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);
        }
    };

    pollApp.Poll = {

        // Instantiates the poll
        init: function($el) {
            self = this;

            // Map of feature ID to feature name
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
            self.makeSortable(self.$featureListEl);

            self.setupListeners();

            self.setClientIP();
            pollApp.Timer.init();
        },

        getClientIP: function() {
            return self.clientIP;
        },

        // Returns device type, based on browser width
        getDeviceType: function() {
            var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
            if (width < 768) {
                return "Phone";
            } else if (width < 992) {
                return "Tablet";
            } else {
                return "Computer";
            }
        },

        // Return feature ID from its <li>
        getFeatureIdFromLi: function(featureLi) {
            var featureId = $(featureLi).data("feature");
            return self.featureMap[featureId] ? featureId : false;
        },

        // Return feature name from its <li>
        getFeatureNameFromLi: function(featureLi) {
            var featureId = $(featureLi).data("feature");
            return self.featureMap[featureId];
        },

        // Return sorted array of features, based on current arrangement
        // Array is made up of feature IDs
        getSortedFeatureList: function() {
            var $featureListElements = self.$featureListEl.find('li');
            return _.map($featureListElements, self.getFeatureIdFromLi);
        },

        // Return mapping of sorted features, based on current arrangement
        // ajaxData = True: Map the keys to match the expected server-side keys
        getSortedFeatureMap: function(ajaxData) {
            var sortedFeatureList = self.getSortedFeatureList(),
                keys = _.range(1, sortedFeatureList.length + 1);
            if(ajaxData) {
                keys = _.map(keys, function(key) {
                    return "feature_" + key;
                });
            }
            return _.object(keys, sortedFeatureList);
        },

        findMessageWrapper: function() {
            if(!self.$findMessageWrapper) {
                self.$findMessageWrapper = this.$el.find('.messages');
            }
            return self.$findMessageWrapper;
        },

        findSubmitForm: function() {
            if(!self.$submitForm) {
                self.$submitForm = this.$el.find('form');
            }
            return self.$submitForm;
        },

        // Returns data for the form submission
        formData: function() {
            var sortedFeatureMap = self.getSortedFeatureMap(true),
                seconds = pollApp.Timer.readTime(),
                device = self.getDeviceType(),
                ip = self.getClientIP(),
                data = {};

            data = {
                ip_address: ip,
                device_type: device,
                completion_time: seconds
            };
            return _.extend(data, sortedFeatureMap);
        },

        formSubmit: function() {
            var url = "http://py.conorzsheehan.com/survey/survey-responses/",
                data = self.formData();
            console.log(data);

            $.post(url, data)
                .done(self.formSuccess)
                .fail(self.formFail)
                .always(self.formAlways);
        },

        formSuccess: function() {
            console.log('Success');
            self.findSubmitForm().hide();
            self.showMessage("success");
        },

        formFail: function() {
            console.log('Fail');
            self.findSubmitForm().hide();
            self.showMessage("fail");
        },

        formAlways: function() {
            console.log('Always');
        },

        makeSortable: function($el) {
            $el.sortable();
            $el.disableSelection();
        },

        // Renders the feature list to the page
        renderFeatureList: function(features) {
            self.$featureListEl.empty();
            _.each(features, function(featureId) {
                var renderedFeature = self.renderFeatureListItem(featureId);
                self.$featureListEl.append(renderedFeature);
            });
        },

        // Return rendered <li> for a feature
        renderFeatureListItem: function(featureId) {
            var feature = self.featureMap[featureId],
                html = '<li class="ui-state-default" data-feature="' + featureId + '"><i class="fa fa-sort"></i> ' + feature + '</li>';
            return $(html);
        },

        // Sets client IP via asynchronous call to JSON IP
        setClientIP: function() {
            self.clientIP = null;
            $.get("http://jsonip.com/", function(resp) {
                self.clientIP = resp.ip;
            });
        },

        setupListeners: function() {
            self.$el.find('form').submit(function(e) {
                e.preventDefault();
                self.formSubmit();
            });
        },

        showMessage: function(messageClass) {
            var $messageWrapper = self.findMessageWrapper(),
                $messageEl = $messageWrapper.find("." + messageClass);
            $messageWrapper
                .children()
                .hide()
                .end()
                .show();
            $messageEl.show();
        }

    };
})(
    window.pollApp,
    window.$,
    window._);