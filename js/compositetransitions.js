YUI.add('compositetransitions', function (Y, NAME) {

Y.CompositeTransitions = function() {};
Y.CompositeTransitions.prototype = {

/*
 * To Do:
 *
 * - Queuing of Transitions
 */

  _getFx: function (newView, oldView, transition) {
    var fx = Y.App.Transitions.FX

    if (transition) {
      return fx[transition];
    }

    return 'slideLeft';
  },

  transitionRegionView: function(region, view, options) {
    options || (options = {});

    var self = this,
        callback = options.callback,
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

    if (oldView == newView) return callback && callback.call(self, newView);

    this.setRegionView(region, view);

    regionContainer[prepend ? 'prepend' : 'append'](newView.get('container'));
    newView.addTarget(this);

    container.addClass(transitioning);
    transitions = new Y.Parallel({context: this});
    fxConfig    = {
        crossView: !!oldView && !!newView,
        prepended: prepend
    };

    fx = this._getFx(newView, oldView, options.transition);
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

