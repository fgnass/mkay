$(function() {


// ---------------------------------------------------------------------------
// Model
// ---------------------------------------------------------------------------

var tasks = [];
var stat;


function Todo(name, done) {
  this.name = name;
  this.done = !!done;
}

function Stat() {
  this.left = 0;
  this.completed = 0;
  this.total = 0;
}

function clearCompleted() {
  for (var i=tasks.length-1; i >= 0; --i) {
    if (tasks[i].done) tasks.splice(i, 1);
  }
}

function addTask(name) {
  tasks.push(new Todo(name, false));
  refreshData();
}

function removeTask(task) {
  var i = tasks.indexOf(task);
  if (~i) tasks.splice(i, 1);
}

function refreshData() {
  saveTasks();
  computeStats();
  redrawTasksUI();
  redrawStatsUI();
}

function loadTasks() {
  if (!localStorage.todo)
    localStorage.todo = JSON.stringify([]);

  tasks = JSON.parse(localStorage.todo);
}

function saveTasks() {
  localStorage.todo = JSON.stringify(tasks);
}

function computeStats() {
  stat = new Stat();
  stat.total = tasks.length;
  for (var i=0; i < tasks.length; i++)
    if (tasks[i].done) stat.completed++;

  stat.left = stat.total - stat.completed;
}

// ---------------------------------------------------------------------------
// View
// ---------------------------------------------------------------------------

var todoList, todoStats, newTodo;

function appendTodo(i, task) {
  var li = $.mk("li").appendTo(todoList);
  li.mk(".todo").toggleClass('done', !!task.done)
      .mk(".display")
        .mk("input.check[type=checkbox]").attr('checked', task.done)
          .on("change", function() {
            task.done = this.checked;
            refreshData();
          })
        ._
        .mk(".todo-content", task.name)
          .on("dblclick", function() {
            li.addClass("editing");
            li.find('.todo-input').focus();
          })
        ._
        .mk("span.todo-destroy")
          .on("click", function() {
            removeTask(task);
            refreshData();
          })
        ._
      ._
      .mk(".edit")
        .mk("input.todo-input[type=text]").val(task.name)
          .on("keypress", function(ev) {
            if (ev.keyCode === 13) {
              task.name = this.value;
              refreshData();
            }
          });
}

function redrawTasksUI() {
  todoList.empty();
  newTodo.val("");
  $.each(tasks, appendTodo);
}

function redrawStatsUI() {
  todoStats.empty();
  if (stat.total) {
    todoStats.mk("span.todo-count")
      .mk("span.number", stat.left)._
      .mk("span.word", ' ', stat.left == 1 ? 'item' : 'items')._
      .mk("span", " left.");
  }

  if (stat.completed) {
    todoStats.mk("span.todo-clear")
     .mk("a[href=#]",
        "Clear ",
        $.mk("span.number-done", stat.completed),
        " completed ",
        $.mk("span.word-done", stat.completed == 1 ? "item" : "items")
      )
      .on("click", function() {
        clearCompleted();
        refreshData();
      });
  }
}


$('body').mk("#todoapp")
  .mk(".title", $.mk("h1", "Todos"))._
  .mk(".content",
    $.mk("#create-todo",
      newTodo = $.mk("input[placeholder=What needs to be done?]").on("keypress", function(ev) {
        if (ev.keyCode === 13) addTask(this.value);
      }),
      $.mk("span.ui-tooltip-top", "Press Enter to save this task").hide()
    ),
    $.mk("#todos", todoList = $.mk('ul#todo-list')),
    todoStats = $.mk('#todo-stats')
  );

loadTasks();
refreshData();

});
