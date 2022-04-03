var slideshow = function(tag) {
	// console.log(tag);
	var url = "http://api.flickr.com/services/feeds/photos_public.gne?" + 
			"tags=" + tag + "&format=json&jsoncallback=?";
	var displayMessage = function (messageIndex) {
		if (tag !== "")  {
			$.getJSON(url, function (flickrResponse) {
				console.log(messageIndex);
				var $img = $("<img>").attr("src", flickrResponse.items[messageIndex].media.m).hide();
				$("main .photos").empty();
				$("main .photos").append($img);
				$img.fadeIn();
				setTimeout(function () {
					messageIndex = messageIndex + 1;
					displayMessage(messageIndex);
				}, 3000);
				if (messageIndex === 9) {
						messageIndex = -1;
				}
			});
		}
	};
	displayMessage(0);
}

var mainfun = function () {
	"use strict"; 
	var tag = "";
	var $inputLabel = $("<p>").text("Введите тег для темы слайд-шоу: "),
		$input = $("<input>").addClass("tag"), 				
		$button = $("<button>").text("Поиск");
	$button.on("click", function () {
		var tag = "";
		tag = $input.val();
		// console.log(tag);
		$input.val("");
		if (tag !== "") {
			$("main .photos").empty();
			slideshow(tag);
		}
	});
	$("main .content").append($inputLabel).append($input).append($button); 
	// console.log(tag);
};
$(document).ready(mainfun);
 
// var main = function () {
//     "use strict";
//     var messages = ["первое сообщение", "второе сообщение", "третье", "четвертое"];
//     var displayMessage = function (messageIndex) {
//         // создаем и скрываем элемент DOM
//         var $message = $("<p>").text(messages[messageIndex]).hide();
//         // очищаем текущее содержимое
//         // лучше всего будет выделить текущий параграф
//         // и постепенно скрыть его
//         $(".message").empty();
//         // добавляем сообщение с messageIndex вDOM
//         $(".message").append($message);
//         // постепенное отображение сообщения
//         $message.fadeIn();
//         setTimeout(function () {
//             // через 3 секунды вызываем displayMessage снова со следующим индексом
//             if (messageIndex === 3) {
//                 messageIndex = 0;
//             } else {
//                 messageIndex = messageIndex + 1;
//             }
//             displayMessage(messageIndex);
//         }, 3000);
//     };
//     displayMessage(0);
// }
// $(document).ready(main);