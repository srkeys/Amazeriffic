var organizeByTags = function (toDoObjects) {
    var tags = [];
    var toDoes = [];
    var result = [];
    var onetags = function (toDoObjects, tag) {
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

var updateToDos = function (toDoObjects) {
    var todos = toDoObjects.map(function (toDo) {
        // просто возвращаем описание
        // этой задачи
        return toDo.description;
    });
    return todos;
}

// ./javascripts/app.js
var liaWithDeleteOnClick = function (todo) {
    var $todoListItem = $("<li>").text(todo.description),
        $todoRemoveLink = $("<a>").attr("href", "todos/" + todo._id);
    $todoRemoveLink.text("  Удалить");
    console.log("todo._id: " + todo._id);
    console.log("todo.description: " + todo.description);
    $todoRemoveLink.on("click", function () {
        $.ajax({
            "url": "todos/" + todo._id,
            "type": "DELETE"
        }).done(function (response) {
            $(".tabs a:first-child span").trigger("click");
        }).fail(function (err) {
            console.log("error on delete 'todo'!");
        });
        return false;
    });
    $todoListItem.append($todoRemoveLink);
    return $todoListItem;
};

//./javascripts/app.js
var liaWithEditOnClick = function (todo) {
    var $todoListItem = $("<li>").text(todo.description),
        $todoRemoveLink = $("<a>").attr("href", "todos/" + todo._id);
    $todoRemoveLink.text("  Редактировать");
    $todoRemoveLink.on("click", function () {
        var newDescription = prompt("Введите новое наименование для задачи",
            todo.description);
        if (newDescription !== null && newDescription.trim() !== "") {
            $.ajax({
                url: "todos/" + todo._id,
                type: "PUT",
                data: { "description": newDescription }
            }).done(function (response) {
                $(".tabs a:nth-child(2) span").trigger("click");
            }).fail(function (err) {
                console.log("error on delete 'todo'!");
            });
        }
        return false;
    });
    $todoListItem.append($todoRemoveLink);
    return $todoListItem;
};
   

var main = function (toDoObjects) {
    "use strict";

    var tabs = [];

    var toDos = updateToDos(toDoObjects);

    // ./javascripts/app.js
    tabs.push({
        "name": "Новые!",
        "content": function (callback) {
            $.getJSON("todos.json", function (toDoObjects) {
                var $content,
                    i;
                $content = $("<ul>");
                for (i = toDoObjects.length - 1; i >= 0; i--) {
                    var $todoListItem = liaWithDeleteOnClick(toDoObjects[i]);
                    $content.append($todoListItem);
                }
                callback(null, $content);
            }).fail(function (jqXHR, textStatus, error) {
                callback(error, null);
            });
        }
    });
    // добавляем вкладку Старые
    tabs.push({
        "name": "Старые!",
        "content": function (callback) {
            $.getJSON("todos.json", function (toDoObjects) {
                var $content = $("<ul>");
                toDoObjects.forEach(function (todo) {
                    var $todoListItem = liaWithEditOnClick(todo);
                    $content.append($todoListItem);
                });
                callback(null, $content);
            }).fail(function (jqXHR, textStatus, error) {
                callback(error, null);
            });
        }
    });

    // добавляем вкладку Теги
    tabs.push({
        "name": "Теги!",
        "content": function (callback) {
            $.getJSON("todos.json", function (toDoObjects) {
                // создание $content для Теги 
                var tags = organizeByTags(toDoObjects),
                    $content;
                tags.forEach(function (tag) {
                    var $tagName = $("<h3>").text(tag.name);
                    $content = $("<ul>");
                    tag.toDos.forEach(function (description) {
                        var $li = $("<li>").text(description);
                        $content.append($li);
                    });
                    $("main .content").append($tagName);
                    $("main .content").append($content);
                });
                $content = null;
                callback(null, $content);
            }).fail(function (jqXHR, textStatus, error) {
                callback(error, null);
            });
        }
    });

    // добавляем вкладку Добавить
    tabs.push({
        "name": "Добавить!",
        "content": function (callback) {
            $.getJSON("todos.json", function (toDoObjects) {
                var $input = $("<input>").addClass("description"),
                    $inputLabel = $("<p>").text("Новая задача: "),
                    $tagInput = $("<input>").addClass("tags"),
                    $tagLabel = $("<p>").text("Тэги: "),
                    $button = $("<span>").text("Добавить"),

                    $content = $("<div>");
                    $content.append($("<div class= \"div_descr\">").append($inputLabel).append($input))
                    $content.append($("<div class= \"div_but\">").append($button))
                    $content.append($("<div class= \"div_tags\">").append($tagLabel).append($tagInput))

                    $button.on("click", function () {
                        var description = $input.val(),
                            tags = $tagInput.val().replace(/\s+/g, '').split(","),
                            newToDo = { "description": description, "tags": tags };
                        $.post("todos", newToDo, function (result) {
                            console.log(result);
                            // обновление toDos
                            toDos = updateToDos(toDoObjects);
                            $input.val("");
                            $tagInput.val("");
                        });
                    });  
                callback(null, $content);
            }).fail(function (jqXHR, textStatus, error) {
                callback(error, null);
            });
        }
    });

    tabs.forEach(function (tab) {
        var $aElement = $("<a>").attr("href", ""),
            $spanElement = $("<span>").text(tab.name);
        $aElement.append($spanElement);
        $("main .tabs").append($aElement);

        $spanElement.on("click", function () {
            var $content;
            $(".tabs a span").removeClass("active");
            $spanElement.addClass("active");
            $("main .content").empty();
            tab.content(function (err, $content) {
                if (err !== null) {
                    alert("Возникла проблема при обработке запроса: " + err);
                } else {
                    $("main .content").append($content);
                }
            });
            return false;
        });
    });
    $(".tabs a:first-child span").trigger("click");
};

$(document).ready(function () {
    $.getJSON("todos.json", function (toDoObjects) {
        main(toDoObjects);
    });
});
