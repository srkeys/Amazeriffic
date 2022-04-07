var express = require("express"),
http = require("http"),
app = express(),
// импортируем библиотеку mongoose
mongoose = require("mongoose");
app.use(express.static(__dirname + "/client"));
app.use(express.urlencoded());
mongoose.connect('mongodb://localhost:27017');

// Это модель Mongoose для задач
var ToDoSchema = mongoose.Schema({
    description: String,
    tags: [ String ]
});
var ToDo = mongoose.model("ToDo", ToDoSchema);
// начинаем слушать запросы
http.createServer(app).listen(3000);

app.get("/todos.json", function (req, res) {
    ToDo.find({}, function (err, toDos) {
        // не забудьте о проверке на ошибки!
        res.json(toDos);
    });
});

app.post("/todos", function (req, res) {
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