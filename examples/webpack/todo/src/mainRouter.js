var owl = require('owl.js'),
    todoController = require('./todoController');

function MainRouter() {
    var routes = [{
            path: '',
            action: 'readAll'
        }, {
            path: 'item/:id',
            callback: function() {
                console.log('user');
            }
        }],
        defaultRoute = {
            callback: function() {
                console.log('404 page');
            }
        };
    owl.Router.call(this, routes, defaultRoute, todoController);
}
MainRouter.prototype = Object.create(owl.Router.prototype);

module.exports = new MainRouter();
