YUI.add('compositeview', function (Y, NAME) {

Y.CompositeView = function() {};
Y.CompositeView.prototype = {

  initializer: function (config) {

    var self = this;
    if (!this.views) this.views = {};
    if (!this.regions) this.regions = {};

    Y.Object.each(config.views, function(view, name) {
      self.views[name] = view;
    });
    Y.Object.each(config.regions, function(view, name) {
      if (Y.Lang.isString(view)) {
        self.regions[name] = self.views[view];
      } else {
        self.regions[name] = view;
      }
    });
  },

  attachRegionViews: function() {
    var container = this.get('container');

    Y.Object.each(this.regions, function(view, region) {
      var regionContainer = container.one('[data-region="'+region+'"]');
        regionContainer.append(view.get('container'));
    });
  },

  detachRegionViews: function(options) {
    Y.Object.each(this.regions, function(view, region) {
      view.remove(options)
    });
  },

  detachViews: function(options) {
    Y.Object.each(this.views, function(view, viewid) {
      view.remove(options)
    });
  },

  setRegionView: function(region, view) {
    this.regions[region] = (Y.Lang.isString(view)) ? this.getView(view) : view;
  },

  getRegionView: function(region) {
    return this.regions[region];
  },

  getView: function(viewid) {
    return this.views[viewid];
  }

};

}, '0.0.2', {
    requires : []
});