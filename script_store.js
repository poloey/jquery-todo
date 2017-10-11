var todoUl = $('ul#todo');
var update_div = $('#update_div')
var update_input =  $('#update_input');
var update_btn =  $('#update_btn');
var create_input = $('#create_input');
var create_btn = $('#create_btn');
var initialTodos = [
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

function store (todos) {
    if (todos) {
        localStorage.setItem('todos', JSON.stringify(todos));
    } else {
        var todoString = localStorage.getItem('todos');
        return JSON.parse(todoString);
    }
}
if (localStorage.getItem('todos' === null)) {
    store(initialTodos);
}

//functions
function readTodo () {
    var todos = store();
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

function createTodo () {
    var todos = store();
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
    store(todos);
    readTodo();
    create_input.val('');
}

function toggleCompletion (id) {
    var todos = store();
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
    store(todos);
    readTodo();
}

function editTodo (id) {
    var todos = store();
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


function updateTodo() {
    var todos = store();
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
    store(todos);
    update_input.val('');
    readTodo();
    update_div.hide();
}

function deleteTodo (id) {
    var todos = store();
    var todoIndex = todos.findIndex(function (todo) {
        todo.id == id;
    }) 
    if (confirm('Are you really want to delete this todo')) {
        todos.splice(todoIndex, 1);
    }
    store(todos);
    readTodo();
}
/// events 

/**
 * todo create event
 */
create_input.on('keypress', function (e){
    if (e.keyCode == 13) {
        createTodo();
    }
})
create_btn.on('click', createTodo);

/**
 * todo completion event
 */
todoUl.on('click', 'li span', function(e) {
    var todo_id = e.target.parentElement.dataset.value || e.currentTarget.parentElement.dataset.value;
    toggleCompletion(todo_id);
})


/**
 * todo edit event
 */
todoUl.on('click', 'li button.edit', function (e) {
    console.log('e', e);
    
    editTodo(e.target.value);
})

/**
 * todo update event
 */
update_btn.on('click', updateTodo);
update_input.on('keypress', function (e){
    if (e.keyCode == 13) {
        updateTodo();
    }
})

/**
 * todo delete event
 */
todoUl.on('click', 'li button.delete', function (e) {
    deleteTodo(e.target.value);
})
