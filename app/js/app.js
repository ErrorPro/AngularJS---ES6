"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

/**
 * @module MainModule
 * @description Description
 * Dgeni works.
 */

var app = angular.module("todo", []);

app.factory("TodoList", function (Todo) {
    var TodoList = (function () {
        function TodoList() {
            _classCallCheck(this, TodoList);

            this.todos = [];
            this.length = 0;
            this.add("Learn Angular");
            this.add("Work hads");
        }

        _prototypeProperties(TodoList, null, {
            add: {
                value: function add(text) {
                    var todoOne = new Todo(text);
                    this.todos[this.length] = todoOne;
                    this.length++;
                },
                writable: true,
                configurable: true
            }
        });

        return TodoList;
    })();

    return TodoList;
});

app.factory("Todo", function () {
    var Todo = function Todo(text) {
        _classCallCheck(this, Todo);

        this.text = text;
    };

    return Todo;
});

app.controller("TodoCtrl", function ($scope, TodoList) {

    var todo = new TodoList();

    $scope.todo = todo.todos;
    $scope.add = function () {
        todo.add($scope.text);
    };
});