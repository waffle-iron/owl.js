(function(window, owl) {
    /**
     * owl.Collection
     * @param {array} data Collection data
     * @param {object} options Collection options
     * @constructor
     */
    function Collection(data, options){
        this.url = options.url;
        this.model = options.model;
        this.events = {};

        this.setData(data);
    }
    Collection.prototype = {
        /**
         * Gets data from server
         * @param {object} query Query that will be passed with request
         */
        fetch: function(query) {
            var that = this;
            return owl.ajax.request({
                url: this.url + owl.ajax.toQueryString(query),
                type: 'GET'
            })
            .then(function(result) {
                that.setData(result);
                return result;
            });
        },
        /**
         * Removes models from collection
         */
        clear: function() {
            this.data = [];
            this.models = [];
            this.length = 0;
            this.trigger('change');
        },
        /**
         * Sets collection data
         * @param {object} data Collection data
         */
        setData: function(data) {
            var that = this;
            if (data instanceof Array) {
                this.data = data;
                this.length = data.length;
                this.models = data.map(function(item) {
                    return new that.model(item, {
                        collection: that
                    });
                });
            } else {
                this.data = [];
                this.models = [];
                this.length = 0;
            }
            that.trigger('change');
        },
        /**
         * Gets collection data
         * @return {array} Collection data
         */
        getData: function() {
            return this.data;
        },
        /**
         * Gets collection models
         * @return {array} Collection models
         */
        getModels: function() {
            return this.models;
        },
        /**
         * Gets collection length
         * @return {number}
         */
        getLength: function() {
            return this.length;
        },
        /**
         * Adds event listener
         * @param {string} event Event name
         * @param {function} listener Event listener
         */
        on: function(event, listener) {
            if (!this.events[event]) {
                this.events[event] = [];
            }
            this.events[event].push(listener);
        },
        /**
         * Removes event listener
         * @param {string} event Event name
         * @param {function} listener Event listener
         */
        off: function(event, listener) {
            if (this.events[event]) {
                this.events[event] = this.events[event].filter(function(currentListener) {
                    return currentListener !== listener;
                });
            }
        },
        /**
         * Triggers event
         * @param {string} event Event name
         */
        trigger: function(event) {
            var listeners = this.events[event];
            if (listeners) {
                listeners.forEach(function(listener) {
                    listener();
                });
            }
        }
    };
    owl.Collection = Collection;
})(window, owl);