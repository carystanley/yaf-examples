YUI.add('compositeview', function (Y, NAME) {

var ViewRegion = function(parent, selector, view) {
  this.parent = parent;
  this.selector = selector;
  this.view = view;
};
ViewRegion.prototype = {
  setView: function(view) {
    this.view = (Y.Lang.isString(view)) ? this.parent.getView(view) : view;
  },
  getView: function() {
    return this.view;
  },
  detachView: function(options) {
    if (this.view) {
      this.view.remove(options)
      this.view.removeTarget(this.parent);
    }
  },
  attachView: function() {
    var container;
    if (this.view) {
      container = this.parent.get('container').one(this.selector);
      container.addClass('yui3-app-views');
      container.append(this.view.get('container'));
      this.view.addTarget(this.parent);
    }
  },
};
Y.ViewRegion = ViewRegion;

Y.CompositeView = function() {};
Y.CompositeView.prototype = {

  initializer: function (config) {

    var self = this,
        regions;

    config || (config = {});

    this.views = Y.merge({}, this.views, config.views);
    regions = Y.merge({}, this.regions, config.regions);

    this.regions = {};
    Y.Object.each(regions, function(view, name) {
      self.getRegion(name).setView(view);
    });
  },

  attachRegionViews: function() {
    Y.Object.each(this.regions, function(region) {
      region.attachView();
    });
  },

  detachRegionViews: function(options) {
    Y.Object.each(this.regions, function(region) {
      region.detachView(options);
    });
  },

  getRegion: function(region) {
    if (!this.regions[region]) {
      this.regions[region] = new ViewRegion(this, '[data-region="'+region+'"]', null);
    }
    return this.regions[region];
  },

  getView: function(viewid) {
    return this.views[viewid];
  },

  setView: function(viewid, view) {
    if (!this.views) this.views = {};
    this.views[viewid] = view;
  }

};

}, '0.0.2', {
    requires : []
});

