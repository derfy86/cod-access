const { Theme, Client } = require('../models');

/**
 * @module themeController
 */
module.exports = {

    getAllThemesForExercises: async (req, res, next) => {
        try{
            let clientId = null;
            if (req.user) {
                clientId = req.user.clientId
            }
            const themes = await Theme.findAll({
                include: [
                    {
                        association: 'exercises',
                        where:{published: true},
                        attributes: { exclude: ['brief', 'published', 'exercise_theme'] },
                        include: [ 
                            {
                                model: Client, as: 'clients', where: { id: clientId },
                                required: false,
                                attributes: { exclude: ['password', 'responsibility_id', 'picture_id'] },
                            },
                        ],
                    },
                ]
            });
            return res.status(200).json(
                themes
            );
            
        } catch(error) {
            console.error(error);
            return res.status(500);
        }
    },

    getAllThemes: async (req, res, next) => {
        try{
            const themes = await Theme.findAll();
            return res.status(200).json(
            themes
            );

        } catch(error) {
            console.error(error);
            return res.status(500);
        }
    },

    getAllThemesTest: async (req, res, next) => {
        try{
            const themes = await Theme.findAll();
            return themes

        } catch(error) {
            console.error(error);
            return res.status(500);
        }
    },
    
    getScoreByTheme: async (req, res, next) => {
        try{
            /** need init clientId by null to not bug the request if client dosen't exist or connected */
            let clientId = null;
            if (req.user) {
                clientId = req.user.clientId
            }
            /** we take from database all themes with all exercises without some attributes, and the current user if exist without some attributes too, in only one request */
            const themes = await Theme.findAll({
                include: [
                    {
                        association: 'exercises',
                        where:{published: true},
                        attributes: { exclude: ['brief', 'published', 'exercise_theme'] },
                        include: [ 
                            {   
                                model: Client, as: 'clients', where: { id: clientId },
                                required: false,
                                attributes: { exclude: ['password', 'responsibility_id', 'picture_id'] },
                            },
                        ],
                    },
                ]
            });
            /** init of progression user by theme like an array */
            let progressUser = [];
            /** we need to know how much exercises are by theme */
            for (const theme of themes){
                /** number of exercises for one theme */
                const numberOfExercises = theme.exercises.length
                /** init of exercise complete at 100% */
                let exerciseComplete = 0;
                /** for each exercise by theme we check if the user have played it*/
                for (const exercise of theme.exercises){
                    if(exercise.clients[0]){
                        const score = exercise.clients[0].Client_exercise.score
                        /** if the score user about this exercise is 100% we increment the variable exerciseComplete by one */
                        if(score === 100){
                            exerciseComplete++
                        }
                    }
                }
                /** then let make a percentage about the number of exercises completed at 100% by the number of exercises by theme */
                const progress = Math.round((exerciseComplete/numberOfExercises)*100) 
                /** we push in the array progressUser an object with the name, the color, and the percent progression by theme*/
                progressUser.push({theme: theme.name, color: theme.color, progress: progress})
            }
            return res.status(200).json(
                progressUser
            );
            
        } catch(error) {
            console.error(error);
            return res.status(500);
        }
    },

}