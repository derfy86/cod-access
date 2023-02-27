const { Picture, Client } = require('../models');
const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');

/**
 * @module clientController
 */
module.exports = {
  getAllClients: async (req, res) => {
    try {
      const page = Number(req.query.page) - 1 || 0;
      const limit = Number(req.query.limit) || 30;
      const clients = await Client.findAndCountAll({
        include: 'responsibility',
        distinct: true,
        offset: page * limit,
        limit: limit,
      });
      return res.status(200).json(clients);
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  },

  getOneClient: async (req, res, next) => {
    try {
      const clientId = Number(req.auth.clientId);
      if (isNaN(clientId)) {
        return res.status(406).json({
          errorType: 406,
          message: `the provided id must be a number`,
        });
      }
      const client = await Client.findByPk(clientId, {
        include: ['client_picture', 'responsibility', 'exercises'],
      });
      return res.status(200).json(client);
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  },

  changeRoleClient: async (req, res, next) => {
    try {
      /** @name id - the id is actually the clientId but taking in the url parameters */
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(406).json({
          errorType: 406,
          message: `the provided id must be a number`,
        });
      }
      if (req.body.responsibility === 'utilisateur') {
        req.body.responsibility = 1;
      } else if (req.body.responsibility === 'admin') {
        req.body.responsibility = 2;
      } else {
        return res.status(400).json({
          errorType: 400,
          message: `the status must be client or admin`,
        });
      }
      const client = await Client.findByPk(id, {
        include: 'responsibility',
      });

      if (!client) {
        return res.status(404).json({
          errorType: 404,
          message: 'miss client',
        });
      }
      await client.update({ responsibility_id: req.body.responsibility });
      return res.status(200).json({
        message: 'client update',
      });
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  },

  deleteOneClient: async (req, res, next) => {
    try {
      /** @name id - the id is actually the clientId but taking in the url parameters */
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(406).json({
          errorType: 406,
          message: `the provided id must be a number`,
        });
      }
      const client = await Client.findByPk(id);
      if (!client) {
        return res.status(404).json({
          errorType: 404,
          message: 'miss client',
        });
      }
      await client.destroy();
      return res.json({ message: 'client delete' });
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  },

  deleteProfileClient: async (req, res, next) => {
    try {
      const clientId = Number(req.auth.clientId);
      if (isNaN(clientId)) {
        return res.status(406).json({
          errorType: 406,
          message: `the provided id must be a number`,
        });
      }
      const client = await Client.findByPk(clientId);
      if (!client) {
        return res.status(404).json({
          errorType: 404,
          message: 'miss client',
        });
      }
      await client.destroy();
      return res.json({ message: 'profile delete' });
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  },

  updateClient: async (req, res, next) => {
    try {
      const clientId = Number(req.auth.clientId);
      if (isNaN(clientId)) {
        return res.status(406).json({
          errorType: 406,
          message: `the provided id must be a number`,
        });
      }
      const client = await Client.findByPk(clientId);
      if (req.body.email) {
        const otherClient = await Client.findOne({ where: { email: req.body.email } });
        if (otherClient) {
          return res.status(406).json({
            errorType: 406,
            message: 'email used',
          });
        } else {
          const isValidEmail = emailValidator.validate(req.body.email);
          if (!isValidEmail) {
            return res.status(406).json({
              errorType: 406,
              message: 'email incorrect',
            });
          }
        }
        await client.update({ email: req.body.email });
        return res.status(200).json(client);
      }

      if (req.body.password) {
        const isValidPassword = await bcrypt.compare(req.body.password, client.password);
        if (isValidPassword) {
          if (req.body.newPassword.length < 6) {
            return res.status(411).json({
              errorType: 411,
              message: 'password need 6',
            });
          }
          if (req.body.newPassword !== req.body.newPasswordConfirm) {
            return res.status(406).json({
              errorType: 406,
              message: 'password and confirm not same',
            });
          }
          const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
          await client.update({ password: hashedPassword });
          return res.status(200).json(client);
        } else {
          return res.status(401).json({
            errorType: 401,
            message: 'unauthorized',
          });
        }
      }
      if (req.body.pseudo) {
        await client.update({ pseudo: req.body.pseudo });
        return res.status(200).json(client);
      }
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  },

  addImageToClient: async (req, res, next) => {
    try {
      const clientId = Number(req.auth.clientId);
      const myFile = req.file;
      const pathPicture = myFile.path.substring(6);
      const picture = new Picture({
        name: myFile.filename,
        path: pathPicture,
        alternative: null,
      });

      picture.save().then((result) => {
        Client.findByPk(clientId, {
          include: 'client_picture',
        }).then((user) => {
          user.update({ picture_id: result.id });
        });
        return res.status(200).json({
          pictureId: result.id,
          picturePath: result.path,
          pictureAlt: result.alternative,
        });
      });
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  },
};
