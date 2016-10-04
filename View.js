var View = Backbone.View = function (options) {
	this.cid = _.uniqueId('view');
	this.preinitialize.apply(this, arguments);
	_.extend(this, _.pick(options, viewOptions));
	this._ensureElement();
	this.initialize.apply(this, arguments);
};

var delegateEventSplitter = /^(\S+)\s*(.*)$/;

var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];

_.extend(View.prototype, Events, {

	tagName: 'div',

	$: function (selector) {
		return this.$el.find(selector);
	},

	preinitialize: function () {
	},

	initialize: function () {
	},

	render: function () {
		return this;
	},

	remove: function () {
		this._removeElement();
		this.stopListening();
		return this;
	},

	_removeElement: function () {
		this.$el.remove();
	},

	setElement: function (element) {
		this.undelegateEvents();
		this._setElement(element);
		this.delegateEvents();
		return this;
	},

	_setElement: function (el) {
		this.$el = el instanceof Backbone.$ ? el : Backbone.$(el);
		this.el = this.$el[0];
	},

	delegateEvents: function (events) {
		events || (events = _.result(this, 'events'));
		if (!events) return this;
		this.undelegateEvents();
		for (var key in events) {
			var method = events[key];
			if (!_.isFunction(method)) method = this[method];
			if (!method) continue;
			var match = key.match(delegateEventSplitter);
			this.delegate(match[1], match[2], _.bind(method, this));
		}
		return this;
	},

	delegate: function (eventName, selector, listener) {
		this.$el.on(eventName + '.delegateEvents' + this.cid, selector, listener);
		return this;
	},

	undelegateEvents: function () {
		if (this.$el) this.$el.off('.delegateEvents' + this.cid);
		return this;
	},

	undelegate: function (eventName, selector, listener) {
		this.$el.off(eventName + '.delegateEvents' + this.cid, selector, listener);
		return this;
	},

	_createElement: function (tagName) {
		return document.createElement(tagName);
	},

	_ensureElement: function () {
		if (!this.el) {
			var attrs = _.extend({}, _.result(this, 'attributes'));
			if (this.id) attrs.id = _.result(this, 'id');
			if (this.className) attrs['class'] = _.result(this, 'className');
			this.setElement(this._createElement(_.result(this, 'tagName')));
			this._setAttributes(attrs);
		} else {
			this.setElement(_.result(this, 'el'));
		}
	},

	_setAttributes: function (attributes) {
		this.$el.attr(attributes);
	}

});
