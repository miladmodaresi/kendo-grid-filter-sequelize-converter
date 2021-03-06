var { Op } = require('sequelize');
const { sequelize } = require('../../app/Models/index.js');

function KendoGridFilterSequelizeConverter() {

    var translations = require('./kendo-grid-filter-map.js');

    this.resolveFilter = function (filter) {
        if (!filter || !filter.logic || !filter.filters)
            throw 'Invalid filter format';

        if (filter.filters.length == 0)
            return null;

        var where = {};
        var logic = Op[filter.logic];
        where[logic] = [];

        for (var i = 0; i < filter.filters.length; i++) {
            if (filter.filters[i].logic) {
                var a = this.resolveFilter(filter.filters[i]);
                if (!a)
                    continue;

                where[logic].push(a);

            } else {
                where[logic].push(addSimpleCondition(filter.filters[i]));
            }
        }

        return where;
    };

    function addSimpleCondition(filter) {
        var item = translateFieldCondition(filter);
		
		if (item.name == '') {
            toInsert = sequelize.where(sequelize.col(filter.field), '=', item.value);
        } else {
            toInsert = sequelize.where(sequelize.col(filter.field), item.name, item.value);
        }
        return toInsert;
    }

    function translateFieldCondition(filter) {
        var item = {};
        item.name = translations[filter.operator];

        var value = filter.value;
        if (filter.operator == 'isnull' || filter.operator == 'isnotnull') {
            value = null;
        } else if (filter.operator == 'isempty' || filter.operator == 'isnotempty') {
            value = '';
        } else if (filter.operator == 'contains' || filter.operator == 'doesnotcontain') {
            value = '%' + filter.value + '%';
        } else if (filter.operator == 'startswith') {
            value = filter.value + '%';
        } else if (filter.operator == 'endswith') {
            value = '%' + filter.value;
        }

        item.value = value;
        return item;
    }
}


module.exports = KendoGridFilterSequelizeConverter;