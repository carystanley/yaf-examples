YUI.add('view-region', function (Y, NAME) {

var ViewRegion = function(parent, selector, view) {
  this.parent = parent;
  this.selector = selector;
  this.view = view;
};

ViewRegion.prototype = {

  setView: function(view) {
    this.view = view;
  },

  showView: function(view, options) {
    options || (options = {});
    this.detachView();
    this.view = view;
    this.attachView();
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

  getContainer: function() {
    return this.parent.get('container').one(this.selector);
  },

  attachView: function() {
    var container;
    if (this.view) {
      container = this.getContainer();
      container.addClass('yui3-app-views');
      container.append(this.view.get('container'));
      this.view.addTarget(this.parent);
    }
  },

  transitionView: function(view, options) {
    options || (options = {});

    var self = this,
        callback = options.callback,
        prepend = options.prepend || false,
        transitioning = Y.App.CLASS_NAMES.transitioning,
        oldView,
        newView = view,
        regionContainer = this.getContainer(),
        transitions,
        fxConfig,
        fx;
 
    oldView = this.getView();

    if (oldView === newView) return callback && callback.call(self, newView);
    if (!Y.App.TransitionsNative) {
      self.showView(newView, options);
      return callback && callback.call(self, newView);
    }

    this.setView(view);

    regionContainer[prepend ? 'prepend' : 'append'](newView.get('container'));
    newView.addTarget(this.parent);

    regionContainer.addClass(transitioning);
    transitions = new Y.Parallel({context: this});
    fxConfig    = {
        crossView: !!oldView && !!newView,
        prepended: prepend
    };

    fx = Y.App.Transitions.FX[options.transition || 'slideLeft'];
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
      oldView.removeTarget(self.parent);
      regionContainer.removeClass(transitioning);
      callback && callback.call(self, newView);
    }

    transitions.done(complete);
  }
};
Y.ViewRegion = ViewRegion;

}, '0.0.2', {
    requires : ['parallel']
});

