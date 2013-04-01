YUI.add('compositeview', function (Y, NAME) {

Y.CompositeView = function() {};
Y.CompositeView.prototype = {

  initializer: function (config) {

    var self = this,
        regions;

    config || (config = {});

    this.views = Y.merge({}, this.views, config.views);
    regions = Y.merge({}, this.regions, config.regions);

    Y.Object.each(regions, function(view, name) {
      self.createRegion(name).setView((Y.Lang.isString(view)) ? self.getView(view) : view);
    });
  },

  attachRegionViews: function() {
    Y.Object.each(this._regions, function(region) {
      region.attachView();
    });
  },

  detachRegionViews: function(options) {
    Y.Object.each(this._regions, function(region) {
      region.detachView(options);
    });
  },

  createRegion: function(name, selector) {
    if (!this._regions) { 
      this._regions = {}
    };
    return (this._regions[name] = new Y.ViewRegion(this, (selector ? selector : '[data-region="'+name+'"]'), null));
  },

  getRegion: function(name) {
    return this._regions[name];
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
    requires : ['view-region']
});

