const { Picture } = require('../models');
const path = require('path');
const fs = require('fs');

/**
 * @module imageController
 */
module.exports = {
    deleteOneImage: async (req, res, next) => {
        try {
            /** @name id - id of picture */
            const id = Number(req.params.id);
            if (isNaN(id)) {
                return res.status(406).json({
                    errorType: 406,
                    message: `the provided id must be a number`
                });
            }

            const image = await Picture.findByPk(id);
            if (!image) {
                return res.status(404).json({
                    errorType: 404,
                    message: 'miss image'
                });
            }

            await image.destroy();
            fs.unlink(path.join(__dirname, `../../upload/${image.path}`), (err) => {
                if (err) {
                    return res.status(500).json({
                        error: err,
                        message: 'error deleting file'
                    });
                }
                
                res.status(200).json({
                    message: "picture deleted"
                });
            });

        }
        catch (error) {
            console.error(err);
            return res.status(500);
        }
    }
};