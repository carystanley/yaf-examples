YUI.add('compositeview', function (Y, NAME) {

var ViewRegion = function(parent, view) {
  this.parent = parent;
  this.view = view;
};
ViewRegion.prototype = {
  setView: function(view) {
    this._detachView();
    this.view = (Y.Lang.isString(view)) ? this.parent.getView(view) : view;
    this._attachView();
  },
  getView: function() {
    return this.view;
  },
  _detachView: function() {
    if (this.view) {
      this.view.removeTarget(this.parent);
    }
  },
  _attachView: function() {
    this.view.addTarget(this.parent);
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
    var container = this.get('container');

    Y.Object.each(this.regions, function(region, name) {
      var regionContainer = container.one('[data-region="'+name+'"]'),
          regionView = region.getView();

      if (regionView) {
        regionContainer.addClass('yui3-app-views');
        regionContainer.append(regionView.get('container'));
      }
    });
  },

  detachRegionViews: function(options) {
    Y.Object.each(this.regions, function(region, name) {
      var regionView = region.getView();
      if (regionView) {
        regionView.remove(options)
      }
    });
  },

  detachViews: function(options) {
    Y.Object.each(this.views, function(view, viewid) {
      view.remove(options)
    });
  },

  getRegion: function(region) {
    if (!this.regions[region]) {
      this.regions[region] = new ViewRegion(this, null);
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

