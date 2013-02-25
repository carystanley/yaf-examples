YUI.add('compositeview', function (Y, NAME) {

Y.CompositeView = function() {};
Y.CompositeView.prototype = {

  initializer: function (config) {

    var self = this,
        regions;

    this.views = Y.merge({}, this.views, (config ? config.views : {}));
    regions = Y.merge({}, this.regions, (config ? config.regions : {}));

    this.regions = {};
    Y.Object.each(regions, function(view, name) {
      self.setRegionView(name, view);
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

  getRegionView: function(region) {
    return this.regions[region];
  },

  setRegionView: function(region, view) {
    if (!this.regions) this.regions = {};
    if (this.regions[region]) {
      this.regions[region].removeTarget(this);
    }
    this.regions[region] = (Y.Lang.isString(view)) ? this.getView(view) : view;
    this.regions[region].addTarget(this);
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

