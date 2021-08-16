require('dotenv').config()
const { expect } = require('chai');
const { Theme } = require('../app/models');
const themeController = require('../app/controllers/themeController');
const sequelize = require('../app/database');
const { QueryTypes } = require('sequelize');
let theFirstQuestion;

describe('GET all questions in the first exercise with query', function(){

    before(async function(){
        const rows = await sequelize.query("SELECT * FROM exercise JOIN question on question.exercise_id = exercise.id WHERE exercise.id=1", { type: QueryTypes.SELECT });
        theFirstQuestion = rows[0];
    });

    it('should have the same title of the exercise', function(){
        expect(theFirstQuestion).to.have.property('title').to.equal('Guide de démarrage du Nautilus - Attributs alt');
    });

    it('should be published', function(){
        expect(theFirstQuestion.published).to.equal(true);
    })
})

let themeObj;

describe('theme model', function(){

    before(function(){
        themeObj = {
            name: 'theme test',
            color: 'theme color'
        };
    });

    it('should create an instance of theme', function(){
        const otherTheme = new Theme(themeObj);
        expect(otherTheme).to.have.property('name').to.equal('theme test')
    });

    describe('#findAll', function(){
        it('should fetch all instance of theme', async function(){
            const allTemes = await themeController.getAllThemesTest();
            expect(allTemes.length).to.equal(13);
        });
    });

});

