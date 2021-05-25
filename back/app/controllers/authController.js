const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');
const jsonwebtoken = require('jsonwebtoken');
const jwtSecret = process.env.JWTSECRET;
const mailPassword = process.env.MAILPASSWORD;
const mailPath = process.env.MAILPATH;
const { Client } = require('../models');
const nodemailer = require('nodemailer');

/**
 * @module authController
 */
module.exports = {

  signout: async (req, res) => {
    res.status(200)
      .clearCookie('token', { httpOnly: true })
      .json({ message: 'signed out' });
  },

  /**
   * @function getCSRFToken - this token will be sent into a cookie as well as a header set by the React App,
   * the csrf middleware in the entry file of the server is in charge of checking 
   * that both the tokens (sent in cookie + sent in header) are a match,
   * this is to ensure the React App is the source of the request
   */
  getCSRFToken: (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
  },

  submitSignupForm: async (req, res) => {
    try {
      if (req.body.pseudo.length === 0) {
        return res.status(411).json({
          errorType: 411,
          message: 'need pseudo'
        });
      };
      const isValidEmail = emailValidator.validate(req.body.email);
      if (!isValidEmail) {
        return res.status(406).json({
          errorType: 406,
          message: 'email incorrect'
        });
      }
      if (req.body.password.length < 6) {
        return res.status(411).json({
          errorType: 411,
          message: 'password need 6'
        });
      }
      if (req.body.password !== req.body.passwordConfirm) {
        return res.status(406).json({
          errorType: 406,
          message: 'password and confirm not same'
        });
      }
      const client = await Client.findOne({
        where: {
          email: req.body.email
        }
      });
      if (client) {
        return res.status(406).json({
          errorType: 406,
          message: 'email used'
        });
      } else {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newClient = new Client({
          email: req.body.email,
          password: hashedPassword,
          pseudo: req.body.pseudo,
          picture_id: 1,
          responsibility_id: 1
        });
        await newClient.save();
        /** send mail to newClient */
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: mailPath,
            pass: mailPassword
          },
          tls: {
            rejectUnauthorized: false
          }
        });
        const mailOptions = {
          from: mailPath,
          to: req.body.email,
          subject: 'Cod\'access bienvenue à bord!',
          text: 'Bienvenue sur cod\'access'
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
            return res.status(500).json({
              errorType: 500,
              message: 'mail failed'
            });
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        return res.status(200).json(newClient);
      }
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  },

  submitLoginForm: async (req, res) => {
    try {
      /** check if the email and the password aren't empty */
      if (req.body.email.length === 0 || req.body.password.length === 0) {
        return res.status(411).json({
          errorType: 411,
          message: 'need email or password'
        });
      } else {
        /** check if the user exists in the database */
        const client = await Client.findOne({
          where: {
            email: req.body.email
          },
          include: ['responsibility', 'client_picture']
        });
        if (!client) {
          return res.status(404).json({
            errorType: 404,
            message: 'miss client'
          });
        } else {
          /** verify that the hash user and the hash database are the same */
          const isValidPassword = await bcrypt.compare(req.body.password, client.password);
          if (isValidPassword) {
            /** init the content of the new token, by the id and the role about the user */
            const jwtContent = {
              clientId: client.id,
              clientRole: client.responsibility.entitled,
            };
            /** init token algorithm and time validity */
            const jwtOptions = {
              algorithm: process.env.JWTALGO,
              expiresIn: '3h'
            };
            /** create the token and storage in cookie httpOnly */
            const token = jsonwebtoken.sign(jwtContent, jwtSecret, jwtOptions);
            res.cookie('token', token, { httpOnly: true });
            /** returning informations about the user to the front */
            return res.status(200).json({
              id: client.id,
              pseudo: client.pseudo,
              email: client.email,
              responsibility: client.responsibility,
              picture_id: client.picture_id,
              client_picture: client.client_picture
            });
            
          } else {
            return res.status(401).json({
              errorType: 401,
              message: 'wrong password'
            });
          }
        }
      }
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  },

  submitContact: async (req, res) => {
    try {
      if (req.body.name.length === 0) {
        return res.status(411).json({
          errorType: 411,
          message: 'need name'
        });
      };
      if (req.body.content.length === 0) {
        return res.status(411).json({
          errorType: 411,
          message: 'need content'
        });
      };
      const isValidEmail = emailValidator.validate(req.body.email);
      if (!isValidEmail) {
        return res.status(406).json({
          errorType: 406,
          message: 'email incorrect'
        });
      }
      /** need email/name/content from front */
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: mailPath,
          pass: mailPassword
        },
        tls: {
          rejectUnauthorized: false
        }
      });
      /** send mail to client */
      const mailOptionsToClient = {
        from: mailPath,
        to: req.body.email,
        subject: `Confirmation d'envoi de message`,
        text: `Merci Mr ${req.body.name} pour l'intérêt que vous portez à notre site. Nous avons bien reçu votre message et traiterons votre demande dans les plus brefs délais. Cordialement.`
      };
      transporter.sendMail(mailOptionsToClient, function (error, info) {
        if (error) {
          console.log(error);
          return res.status(500).json({
            errorType: 500,
            message: 'mail failed'
          });
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      /** send mail to us */
      const mailOptionsToUs = {
        from: mailPath,
        to: mailPath,
        subject: 'Nouveau méssage de' + ' ' + req.body.name,
        text: req.body.content
      };
      transporter.sendMail(mailOptionsToUs, function (error, info) {
        if (error) {
          console.log(error);
          return res.status(500).json({
            errorType: 500,
            message: 'mail failed'
          });
        } else {
          console.log('Email sent: ' + info.response);
          return res.status(200).json({
            message: 'mail send'
          });
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  },
  
  forgetPassword: async (req, res) => {
    try {
      if (req.body.email.length === 0) {
        return res.status(411).json({
          errorType: 411,
          message: 'need mail'
        });
      };
      const isValidEmail = emailValidator.validate(req.body.email);
      if (!isValidEmail) {
        return res.status(406).json({
          errorType: 406,
          message: 'email incorrect'
        });
      };
      /** verify if email exist in database */
      const client = await Client.findOne({where:{email: req.body.email}})
      if(!client) {
        return res.status(404).json({
          errorType: 404,
          message: 'email not found'
        });
      };
      const jwtContent = {
        clientId: client.id,
        clientEmail: client.email
      };
      const jwtOptions = {
        algorithm: process.env.JWTALGO,
        expiresIn: '0.15h'
      };
      let token = jsonwebtoken.sign(jwtContent, jwtSecret, jwtOptions);
      token = token.replace(/\./g,'$')
      /** need email to front for sending email */ 
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: mailPath,
          pass: mailPassword
        },
        tls: {
          rejectUnauthorized: false
        }
      });
      /** send mail to client */
      const mailOptionsToClient = {
        from: mailPath,
        to: req.body.email,
        subject: 'Creation d\'un nouveau mot de passe',
        text: `Veuillez cliquer sur le lien ci-dessous pour pouvoir créer un nouveau mot de passe: http://localhost:8080/changement-mot-de-passe/${token}`
      };
      transporter.sendMail(mailOptionsToClient, function (error, info) {
        if (error) {
          console.log(error);
          return res.status(500).json({
            errorType: 500,
            message: 'mail failed'
          });
        } else {
          console.log('Email sent: ' + info.response);
          return res.status(200).json({
            message: 'mail send'
          });
        }
      });
     
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  },

  newPassword: async (req, res) => {
    try {
      const client = await Client.findOne({where:{id: req.user.clientId, email: req.user.clientEmail}})
      if(!client) {
        return res.status(404).json({
          errorType: 404,
          message: 'user not found'
        });
      };
      if (req.body.password.length < 6) {
        return res.status(411).json({
          errorType: 411,
          message: 'password need 6'
        });
      }
      if (req.body.password !== req.body.passwordConfirm) {
        return res.status(406).json({
          errorType: 406,
          message: 'password and confirm not same'
        });
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      if(client){
        await client.update({password: hashedPassword});
      }
      /** need email to front for sending email */
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: mailPath,
          pass: mailPassword
        },
        tls: {
          rejectUnauthorized: false
        }
      });
      /** send mail to client */
      const mailOptionsToClient = {
        from: mailPath,
        to: req.user.clientEmail,
        subject: 'Modification de votre mot de passe',
        text: `Votre mot de passe a bien été mis à jour si vous n'êtes pas l'auteur de cette action contactez notre service au plus vite.`
      };
      transporter.sendMail(mailOptionsToClient, function (error, info) {
        if (error) {
          console.log(error);
          return res.status(500).json({
            errorType: 500,
            message: 'mail failed'
          });
        } else {
          console.log('Email sent: ' + info.response);
          return res.status(200).json({
            message: 'mdp updated, mail send'
          });
        }
      });
      
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  },
};