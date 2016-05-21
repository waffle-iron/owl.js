var owl = require('../../../../dist/owl-commonjs');

function TodoItemModel(data, options) {
    owl.Model.call(this, data, {
        urlRoot: 'todo/items',
        collection: options && options.collection
    });
}
TodoItemModel.prototype = Object.create(owl.Model.prototype);

module.exports = TodoItemModel;
