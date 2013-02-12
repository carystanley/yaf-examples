YUI.add('compositeview', function (Y, NAME) {

Y.CompositeView = function() {};
Y.CompositeView.prototype = {

  initializer: function (config) {

    var self = this;
    if (!this.views) this.views = {};
    if (!this.subviews) this.subviews = {};

    Y.Object.each(config.views, function(view, name) {
      self.views[name] = view;
    });
    Y.Object.each(config.subviews, function(view, name) {
      if (Y.Lang.isString(view)) {
        self.subviews[name] = self.views[view];
      } else {
        self.subviews[name] = view;
      }
    });
  },

  attachChildViews: function() {
    var subviews = this.subviews,
        container = this.get('container'),
        x;

    for (x in subviews) {
      //subviews[x].render();
      container.one('[data-subview="'+x+'"]').append(subviews[x].get('container'));
    }
  },

  assignSubView: function(region, view) {
    this.subviews[region] = this.views[view];
  },

};

}, '0.0.2', {
    requires : []
});