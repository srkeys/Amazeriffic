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

// var clearflicker = function() {
//     $("main .photos").empty();
//     var but_abort = document.getElementById("search");
//     but_abort.addEventListener("click", function(event) {
//         console.log("Действие было отменено");
//         event.preventDefault();
//     }, false)
//     //$("body .script_photos").empty();
//     // $(document).trigger(function () {
//     //     // вызов функции main с аргументом в виде объекта toDoObjects
//     //     slideshow("");
//     // });
// }

var updateToDos = function(toDoObjects) {
    var todos = toDoObjects.map(function (toDo) {
        // просто возвращаем описание
        // этой задачи
        return toDo.description;
    });
    return todos;
}

var main = function (toDoObjects) {
    "use strict";

    var toDos = updateToDos(toDoObjects);
    // var toDos = toDoObjects.map(function (toDo) {
    //     // просто возвращаем описание
    //     // этой задачи
    //     return toDo.description;
    // });

    $(".tabs a span").toArray().forEach(function (element) {
    $(element).on("click", function () {
        var $element = $(element), $content;
        $(".tabs a span").removeClass("active");
        $element.addClass("active");
        $("main .content").empty();
        $content = $("<ul>");
        if ($element.parent().is(":nth-child(1)")) {
            for (var i = toDos.length - 1; i > -1; i--) {
                $content.append($("<li>").text(toDos[i]));
                }

        } else if ($element.parent().is(":nth-child(2)")) {
            toDos.forEach(function (todo) {
                $content.append($("<li>").text(todo));
            });
        } else if ($element.parent().is(":nth-child(3)")) {
            // ЭТО КОД ДЛЯ ВКЛАДКИ ТЕГИ
            console.log("щелчок на вкладке Теги");
            //var organizedByTag = organizeByTag(toDoObjects);
            var tags = organizeByTags(toDoObjects);
                tags.forEach(function (tag) {
                    var $tagName = $("<h3>").text(tag.name),
                    $content = $("<ul>");
                    tag.toDos.forEach(function (description) {
                    var $li = $("<li>").text(description);
                    $content.append($li);
                    });
                    $("main .content").append($tagName);
                    $("main .content").append($content);
                    });                                              
            } else if ($element.parent().is(":nth-child(4)")) {
                var $input = $("<input>").addClass("description"),
                $inputLabel = $("<p>").text("Новая задача: "),
                $tagInput = $("<input>").addClass("tags"),
                $tagLabel = $("<p>").text("Тэги: "),
                $button = $("<span>").text("Добавить");
                $button.on("click", function () {
                    var description = $input.val(),
                    // разделение в соответствии с запятыми
                    tags = $tagInput.val().replace(/\s+/g, '').split(",");
                    toDoObjects.push({"description" : description, "tags" : tags });
                    alert('Новое задание "' + description + '" успешно добавлено! С тегами "' + tags + '" ');
                    // здесь мы отправляем быстрое сообщение на маршрут списка задач
                    $.post("todos", {toDoObjects}, function (response) {
                        // этот обратный вызов выполняется при ответе сервера
                        console.log("Мы отправили данные и получили ответ сервера!");
                        console.log(response);
                    });
                    // обновление toDos
                    toDos = updateToDos(toDoObjects);
                    $input.val("");
                    $tagInput.val("");
                });
                $content = $("<div>");
                $content.append($("<div class= \"div_descr\">").append($inputLabel).append($input))
                $content.append($("<div class= \"div_but\">").append($button))
                $content.append($("<div class= \"div_tags\">").append($tagLabel).append($tagInput))
            // } else if ($element.parent().is(":nth-child(5)")) { 
			// 	var js = document.createElement('script');
			// 	js.src = "test_2.js";
			// 	document.body.appendChild(js);
            //     // $("body .script_photos").empty();
            //     // var js = $("<script>").attr("src", "test_2.js")
            //     // $("body .script_photos").append(js);
			}
        $("main .content").append($content);
        return false;
        });
    });
    $(".tabs a:first-child span").trigger("click");
};

$(document).ready(function () {
    $.getJSON("todos.json", function (toDoObjects) {
        // вызов функции main с аргументом в виде объекта toDoObjects
        main(toDoObjects);
    });
});
    