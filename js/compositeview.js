YUI.add('compositeview', function (Y, NAME) {

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
  },

  transitionRegionView: function(region, view, callback) {
    var self = this,
        container = this.get('container'),
        prepend = false,
        transitioning = Y.App.CLASS_NAMES.transitioning,
        oldView,
        newView = (Y.Lang.isString(view)) ? this.getView(view) : view,
        regionContainer = container.one('[data-region="'+region+'"]'),
        transitions,
        fxConfig,
        fx;
 
    oldView = this.getRegionView(region);
    this.setRegionView(region, view);

    regionContainer[prepend ? 'prepend' : 'append'](newView.get('container'));
    newView.addTarget(this);

    container.addClass(transitioning);
    transitions = new Y.Parallel({context: this});
    fxConfig    = {
        crossView: !!oldView && !!newView,
        prepended: prepend
    };
    fx = {
      viewIn: 'app:slideLeft', 
      viewOut: 'app:slideLeft' 
    };

    if (newView && fx.viewIn) {
      newView.get('container')
        .transition(fx.viewIn, fxConfig, transitions.add());
    }

    if (oldView && fx.viewOut) {
      oldView.get('container')
        .transition(fx.viewOut, fxConfig, transitions.add());
    }

    function complete() {
      oldView.remove();
      oldView.removeTarget(self);
      container.removeClass(transitioning);
      callback && callback.call(self, newView);
    }

    transitions.done(complete);
  }

};

}, '0.0.2', {
    requires : []
});

