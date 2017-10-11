# jquery todo Application
I build a todo crud application using javaScript dom library jquery.    
It has 4 features.
* can read todos
* can create todo
* can toggle completion of a todo
* can edit a todo
* can update a todo
* can Delete a todo

### read todos
Here I have used array `map` function to iterate through array and generate li item.
~~~js
var todoUl = $('ul#todo');
var todos = [
    {
        id: 1,
        text: 'Go to market',
        complete: false
    },

    {
        id: 2,
        text: 'Cleaning room',
        complete: true
    },

    {
        id: 3,
        text: 'Purchase grocery',
        complete: false
    }

];

//functions
function readTodo () {
    var todoList = todos.map(function (todo) {
        if (todo.complete) {
            return `
            <li data-value="${todo.id}"> 
                <span class="complete"> ${todo.text}</span>
                <button class="edit" value="${todo.id}">Edit</button>
                <button value="${todo.id}" class="delete">delete</button>
            </li>`
        } else {
            return `
            <li data-value="${todo.id}"> 
                <span> ${todo.text}</span>
                <button class="edit" value="${todo.id}">Edit</button>
                <button value="${todo.id}" class="delete">delete</button>
            </li>`
            
        }
    })
    todoUl.html(todoList);
}
readTodo();
~~~

### create todo
using `val()`  function we are able to get text box value, We are using `keypress` event to track user typing. Here code is self explanatory    
~~~js
var create_input = $('#create_input');
var create_btn = $('#create_btn');
function createTodo () {
    if (create_input.val().length > 2) {
        var text = create_input.val();
    }else {
        alert('todo should be more than 2 character ');
        return true;
    }
    var todo = {
        id: todos[todos.length - 1].id + 1,
        text: create_input.val(),
        complete: false
    }
    todos.push(todo);
    readTodo();
    create_input.val('');
}
/**
 * todo create event
 */
create_input.on('keypress', function (e){
    if (e.keyCode == 13) {
        createTodo();
    }
})
create_btn.on('click', createTodo);
~~~

### can toggle completion of a todo
`findIndex` function return index of array. `splice` take 3 arguments. first arguments is start index, 2nd arguments is how many index will be deleted, 3rd arguments is new value. 
on function take 2 or 3 parameters. In following code 2nd parameter is for specific target.  `dataset` use for retrieving value from data attribute.
~~~js
function toggleCompletion (id) {
    var selectedTodoIndex = todos.findIndex(function (todo) {
        return todo.id == id;
    })
    var selectedTodo = todos[selectedTodoIndex];
    var todo = {
        id: selectedTodo.id,
        text: selectedTodo.text,
        complete: !selectedTodo.complete
    }
    todos.splice(selectedTodoIndex, 1, todo);
    readTodo();
}
/**
 * todo completion event
 */
todoUl.on('click', 'li span', function(e) {
    var todo_id = e.target.parentElement.dataset.value || e.currentTarget.parentElement.dataset.value;
    toggleCompletion(todo_id);
})
~~~

### Edit todo
`find` return single array value. In case `findIndex` we get array index. When use find function we will get array value for specific index;
~~~js
function editTodo (id) {
    var todo = todos.find(function (todo) {
        return todo.id == id;
    })
    console.log('todo', todo);

    if (update_div.is(':hidden')) {
        update_div.show();
    }
    update_input.val(todo.text);
    update_input.attr('data-id', todo.id);
}
/**
 * todo edit event
 */
todoUl.on('click', 'li button.edit', function (e) {
    console.log('e', e);
    
    editTodo(e.target.value);
})
~~~

### Update todo
`attr` is a jquery function to set and get dom attribute. In plain js we have to use `getAttribute` and `setAttribute`
~~~js
function updateTodo() {
    if (update_input.val().length > 2) {
        var text = update_input.val();
    }else {
        alert('todo should be more than 2 character ');
        return true;
    }
    var id = update_input.attr('data-id');
    var selectedTodoIndex = todos.findIndex(function (todo) {
        return todo.id == id;
    })
    var selectedTodo = todos[selectedTodoIndex];
    var todo = {
        id: selectedTodo.id,
        text: text,
        complete: selectedTodo.complete
    }
    todos.splice(selectedTodoIndex, 1, todo);
    update_input.val('');
    readTodo();
    update_div.hide();
}

/**
 * todo update event
 */
update_btn.on('click', updateTodo);
update_input.on('keypress', function (e){
    if (e.keyCode == 13) {
        updateTodo();
    }
})

~~~


### Delete todo
~~~js
function deleteTodo (id) {
    var todoIndex = todos.findIndex(function (todo) {
        todo.id == id;
    }) 
    if (confirm('Are you really want to delete this todo')) {
        todos.splice(todoIndex, 1);
    }
    readTodo();
}
/**
 * todo delete event
 */
todoUl.on('click', 'li button.delete', function (e) {
    deleteTodo(e.target.value);
})
~~~
