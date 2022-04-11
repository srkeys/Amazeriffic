var express = require("express"),
http = require("http"),
app = express(),
// импортируем библиотеку mongoose
mongoose = require("mongoose"),
toDosController = require("./controllers/todos_controller.js"),
usersController = require("./controllers/users_controller.js");
 
//app.use(express.static(__dirname + "/client"));
app.use('/', express.static(__dirname + '/client'));
app.use('/user/:username', express.static(__dirname + '/client'));
app.use(express.urlencoded());
mongoose.connect('mongodb://localhost:27017');

// Это модель Mongoose для задач
var ToDoSchema = mongoose.Schema({
    description: String,
    tags: [ String ]
});
var ToDo = mongoose.model("ToDo_old", ToDoSchema);
// начинаем слушать запросы
http.createServer(app).listen(3000);

app.get("/todos.json", function (req, res) {
    ToDo.find({}, function (err, toDos) {
        // не забудьте о проверке на ошибки!
        res.json(toDos);
    });
});

app.post("/todos_old", function (req, res) {
    console.log(req.body);
    var newToDo = new ToDo(
        {
        "description":req.body.description,
        "tags":req.body.tags
        });
    newToDo.save(function (err, result) {
        if (err !== null) {
            console.log(err);
            res.send("ERROR");
        } else {
            // клиент ожидает, что будут возвращены все задачи,
            // поэтому для сохранения совместимости сделаем дополнительный запрос
            ToDo.find({}, function (err, result) {
                if (err !== null) {
                    // элемент не был сохранен
                    res.send("ERROR");
                }
                res.json(result);
            });
        }
    });
});

app.get("/users.json", usersController.index);
app.post("/users", usersController.create);
app.get("/users/:username", usersController.show);
app.put("/users/:username", usersController.update);
app.delete("/users/:username", usersController.destroy)

app.get("/user/:username/todos.json", toDosController.index);
app.post("/user/:username/todos", toDosController.create);
app.put("/user/:username/todos/:id", toDosController.update);
app.delete("/user/:username/todos/:id", toDosController.destroy);
