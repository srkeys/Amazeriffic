var ToDo = require("../models/todo.js"),
	User = require("../models/user.js"),
    mongoose = require("mongoose"),
	ToDosController = {};

// ToDosController.index = function (req, res) { 
//     console.log("вызвано действие: индексsss");
//     res.send(200);
// };

ToDosController.index = function (req, res) {
    var username = req.params.username || null,
        respondWithToDos;
    respondWithToDos = function (query) {
        ToDo.find(query, function (err, toDos) {
            if (err !== null) {
                res.json(500, err);
            } else {
                res.status(200).json(toDos);
            }
        });
    };
    if (username !== null) {
        User.find({ "username": username }, function (err, result) {
            if (err !== null) {
                res.json(500, err);
            } else if (result.length === 0) {
                res.status(404).json("result_length" , 0);
            } else {
                respondWithToDos({});
            }
        });
    } else {
        res.status(404).json({ "username": username });
    }
};
   

ToDosController.create = function (req, res) {
    console.log("вызвано действие: создать");
    res.send(200);
};

ToDosController.show = function (req, res) {
    console.log("вызвано действие: показать");
    res.send(200);
};

ToDosController.destroy = function (req, res) {
    console.log("destroy action called");
    res.send(200);
}

ToDosController.update = function (req, res) {
    console.log("вызвано действие: обновить");
    res.send(200);
}

module.exports = ToDosController;