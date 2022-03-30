var toDoObjects = [
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
    var organizeByTags = function (toDoObjects) {
        var tags = [];
        var toDoes = [];
        var result = [];
        var onetags = function(toDoObjects, tag) {
            var toTag = [];
            toDoObjects.forEach(function (toDo) {
                if (toDo.tags.indexOf(tag) !== -1) {
                    toTag.push(toDo.description);
                }
            });
            return toTag;
        }
        toDoObjects.forEach(function (toDo) {
            toDo.tags.forEach(function (tag) {
                if (tags.indexOf(tag) === -1) {
                    tags.push(tag);
                    toDoes = onetags(toDoObjects, tag);
                    result.push({ "name": tag, "toDos": toDoes });
                }
            });
        });
    return result;
}
        
var main = function () {
    "use strict";
    var organizedByTags = function () {
    console.log("organizeByTagsqqq вызвана");
    };
    console.log(organizeByTags(toDoObjects));
};
$(document).ready(main);