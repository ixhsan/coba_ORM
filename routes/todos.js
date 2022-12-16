var express = require("express");
var router = express.Router();
var models = require("../models");
var { Response } = require("../helpers/util");

router
  .route("/")
  /* GET todos listing. */
  .get(async function (req, res, next) {
    try {
      const todos = await models.Todo.findAll({
        include: models.User
      });
      res.send(new Response(todos));
    } catch (error) {
      res.status(500).json(new Response(error, false));
    }
  })
  /* Create a todo. */
  .post(async function (req, res, next) {
    try {
      const todo = await models.Todo.create(req.body);
      res.send(new Response(todo));
    } catch (error) {
      res.status(500).json(new Response(error, false));
    }
  })

  router
  .route('/:id')
  /* Update a todo. */
  .put(async function (req, res, next) {
    try {
      const todo = await models.Todo.update(req.body, {
        where: {
          id: req.params.id,
        },
        returning: true,
        plain: true
      });
      res.send(new Response(todo[1]));
    } catch (error) {
      res.status(500).json(new Response(error, false));
    }
  })
  /* Delete a todo. */
  .delete(async function (req, res, next) {
    try {
      const todo = await models.Todo.destroy({
        where: {
          id: req.params.id,
        }
      });
      res.send(new Response(todo));
    } catch (error) {
      res.status(500).json(new Response(error, false));
    }
  });

module.exports = router;
