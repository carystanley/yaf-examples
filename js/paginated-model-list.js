YUI.add('paginated-model-list', function (Y, NAME) {

Y.PaginatedModelList = Y.Base.create('paginatedModelList', Y.ModelList, [], {

  initializer: function (config) {
    config = config || {};
    this._currentPage = config.currentPage || 1;
    this._totalPages = 10;
    this._currentFilter = config.filter || null;
    this._currentSort = config.sort || null;
  },

  nextPage: function(options, callback) {
    if (this._currentPage < this._totalPages) {
      this._currentPage++;
      this.load(options, callback);
    }
  },

  previousPage: function(options, callback) {
    if (this._currentPage > 1) {
      this._currentPage--;
      this.load(options, callback);
    }
  },

  goToPage: function(page, options, callback) {
    if (page !== undefined) {
      this._currentPage = parseInt(page, 10);
      this.load(options, callback);
    }
  },

  sortBy: function(sort, options, callback) {
    this._currentPage = 1;
    this._currentSort = sort;
    this.load(options, callback);
  },

  filterBy: function(filter, options, callback) {
    this._currentPage = 1;
    this._currentFilter = filter;
    this.load(options, callback);
  },

  getCurrentPage: function() {
    return this._currentPage;
  },

  getNavigation: function() {
    return {
      totalPages: this._totalPages,
      currentPage: this._currentPage,
      currentSort: this._currentSort,
      currentFilter: this._currentFilter
    };
  },

  load: function(options, callback) {
    var opts = Y.merge({
      page: this._currentPage-1,
      filter: this._currentFilter,
      sortby: this._currentSort
    }, options || {});
    Y.PaginatedModelList.superclass.load.apply(this, [opts, callback]);
  }

});

}, '0.0.2', {
    requires : ['model-list']
});

