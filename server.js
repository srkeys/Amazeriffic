var express = require("express"),
http = require("http"),
app = express(),
toDos = [
    {        
        "description" : "Купить продукты",
        "tags" : [ "шопинг", "рутина" ]
        },
        {
        "description" : "Сделать несколько новых задач",
        "tags" : [ "писательство", "работа" ]
        },
        {
        "description" : "Подготовиться к лекции в понедельник",
        "tags" : [ "работа", "преподавание" ]
        },
        {
        "description" : "Ответить на электронные письма",
        "tags" : [ "работа" ]
        },
        {
        "description" : "Вывести Грейси на прогулку в парк",
        "tags" : [ "рутина", "питомцы" ]
        },
        {
        "description" : "Закончить писать книгу",
        "tags" : [ "писательство", "работа" ]
    }       
];
app.use(express.static(__dirname + "/client"));
// этот маршрут замещает наш файл
// todos.json в примере из части 5
app.get("/todos.json", function (req, res) {
    res.json(toDos);    
    });
// командуем Express принять поступающие
// объекты JSON
app.use(express.urlencoded());
app.post("/todos", function (req, res) {
// сейчас объект сохраняется в req.body
var newToDo = req.body;
console.log(newToDo);
toDos.push(newToDo);
// отправляем простой объект
res.json({"message":"Вы размещаетесь на сервере!"});
});
http.createServer(app).listen(3000);
// app.post("/todos", function (req, res) {
//     console.log("Данные были отправлены на сервер!");
//     // простой объект отправлен обратно
//     res.json({"message":"Вы размещаетесь на сервере!"});
//     });
