
YUI.add('paginated-model-sync', function (Y, NAME) {
    "use strict";

    function PaginatedModelSync() {}

    PaginatedModelSync._NON_ATTRS_CFG = ['pageSize'];

    PaginatedModelSync.prototype = {

      initializer: function (config) {
        config || (config = {});

        // Overrides `master` at the instance level.
        if ('master' in config) {
          this.master = config.master || '';
        }

        // Overrides `master` at the instance level.
        if ('pagesize' in config) {
          this.pagesize = config.pagesize || 10;
        }
      },

      sync: function(action, options, callback) {

        if (action !== 'read') {
          return callback('Read-only');
        }

        /* find the "start" item */
        var start = (options.page || 0) * this.pagesize;
        var items;

        /* filter the set */
        var filter = this.getFilter(options.filter);
        if (filter) {
          items = this.master.filter(filter);
        } else {
          items = this.master.toArray();
        }

        var sort = this.getSort(options.sortby);
        /* sort the set */
        if (sort) {
          items.sort(sort);
        }

        /* get the page */
        var totalItems = items.length,
          totalPages = Math.ceil(totalItems / this.pagesize)
        items = items.slice(start, start + this.pagesize);

        return callback(null, {
          items: items,
          totalItems: totalItems,
          totalPages: totalPages
        });
      },

      getFilter: function(filter) {
        if (filter) {
          return function(item) {
            var field, value;
            for (field in filter) {
              value = filter[field];
              if (item.get(field) !== value) {
                return false;
              }
            }
            return true;
          };
        }
        return null;
      },

      getSort: function(sort) {
        if (sort) {
          return function(a,b) {
            var z, dimension, za, zb, zdir;
            for (z = 0; z < sort.length; z++) {
              dimension = sort[z];
              za = a.get(dimension.field);
              zb = b.get(dimension.field);
              if (za == zb) continue;
              if (dimension.dir === 'desc') {
                return (za > zb) ? -1 : 1;
              } else {
                return (za > zb) ? 1 : -1;
              }
            }
            return 0;
          };
        }
        return null;
      }
    };

    Y.PaginatedModelSync = PaginatedModelSync;

}, '0.0.2', {
    requires : []
});
