'use strict';

/**
 * The main application module. qweqweq weqw eqw
 * It depends upon.
 */

var app = angular.module('todo', []);

app.factory('TodoList',Todo => {

    class TodoList {

        constructor() {
            this.todos = [];
            this.length = 0;
            this.add('Learn Angular');
            this.add('Work hads');
        }

        add(text){
            var todoOne = new Todo(text);
            this.todos[this.length] = todoOne;
            this.length++;
        }

    }

    return TodoList;

});

app.factory('Todo', () => {

    class Todo {

        constructor(text) {
            this.text = text;
        }
    }

return Todo;

});

app.controller('TodoCtrl', ($scope,TodoList) => {

    var todo = new TodoList();

    $scope.todo = todo.todos;
    $scope.add = () => {
        todo.add($scope.text);
    }

});