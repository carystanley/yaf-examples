YUI.add('compositeview', function (Y, NAME) {

Y.CompositeView = function() {};
Y.CompositeView.prototype = {

  views: {},

  regions: {},

  initializer: function (config) {

    var self = this,
        regions = {};

    this.views = Y.merge(this.views, config.views);

    function mergeRegionConfig(view, name) {
      if (Y.Lang.isString(view)) {
        regions[name] = self.views[view];
      } else {
        regions[name] = view;
      }
    }
    Y.Object.each(this.regions, mergeRegionConfig);
    Y.Object.each(config.regions, mergeRegionConfig);

    this.regions = regions;
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

  getRegionView: function(region) {
    return this.regions[region];
  },

  setRegionView: function(region, view) {
    this.regions[region] = (Y.Lang.isString(view)) ? this.getView(view) : view;
  },

  getView: function(viewid) {
    return this.views[viewid];
  },

  setView: function(viewid, view) {
    this.views[viewid] = view;
  }

};

}, '0.0.2', {
    requires : []
});