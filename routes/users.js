var express = require("express");
var router = express.Router();
var models = require("../models");
var { Response } = require("../helpers/util");

router
  .route("/")
  /* GET users listing. */
  .get(async function (req, res, next) {
    try {
      const users = await models.User.findAll({
        include: models.Todo
      });
      res.send(new Response(users));
    } catch (error) {
      res.status(500).json(new Response(error, false));
    }
  })
  /* Create a user. */
  .post(async function (req, res, next) {
    try {
      const user = await models.User.create(req.body);
      res.send(new Response(user));
    } catch (error) {
      res.status(500).json(new Response(error, false));
    }
  })

  router
  .route('/:id')
  /* Update a user. */
  .put(async function (req, res, next) {
    try {
      const user = await models.User.update(req.body, {
        where: {
          id: req.params.id,
        },
        returning: true,
        plain: true
      });
      res.send(new Response(user[1]));
    } catch (error) {
      res.status(500).json(new Response(error, false));
    }
  })
  /* Delete a user. */
  .delete(async function (req, res, next) {
    try {
      const user = await models.User.destroy({
        where: {
          id: req.params.id,
        }
      });
      res.send(new Response(user));
    } catch (error) {
      res.status(500).json(new Response(error, false));
    }
  });

module.exports = router;
