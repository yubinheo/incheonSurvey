const express = require('express');
const School = require('school-kr');
const fs = require('fs');

const { user, quest, select, answer } = require('../models');

const router = express.Router();
const school = new School();



router.get('/play', function (req, res, next) {
  res.render('EnterUserInfo');
});

router.get('/uploadquizondatabase/:id', function (req, res, next) {
  const id = req.params.id;

  if (id === "surveywebadmin2020!") {

    const quizFile = `${__dirname}/quiz/quiz.json`;
    fs.readFile(quizFile, 'utf8', (error, jsonFile) => {
      if (error) return console.log(error);
      const jsonData = JSON.parse(jsonFile);
      const quiz = jsonData.quiz;

      quiz.forEach(content => {
        const uploadQuestData = async () => {
          let questData = {
            quest_index: content.id,
            title: content.name,
            gubun: content.gubun,
          }
          const Data = await quest.create(questData);
        }

        uploadQuestData();
      });
    });

    const selectFile = `${__dirname}/quiz/select.json`;
    fs.readFile(selectFile, 'utf8', (error, jsonFile) => {
      if (error) return console.log(error);
      const jsonData2 = JSON.parse(jsonFile);
      const quiz2 = jsonData2.select;

      quiz2.forEach(content2 => {
        const uploadselectData = async () => {
          let selectData = {
            quest_index: content2.id,
            comment: content2.contents,
            type: content2.gubun,
          }
          const Data2 = await select.create(selectData);
        }

        uploadselectData();
      });
    });

  }
});

router.get('/serachschool/:name', function (req, res, next) {
  const schoolName = req.params.name;

  const SearchSchools = async function (schoolName) {
    let result = await school.search(School.Region.INCHEON, schoolName);
    res.render("select_school", { result: result });
  }

  SearchSchools(schoolName);
});

router.get('/userinfo/:name', function (req, res, next) {
  const schoolName = req.params.name;
  res.render("userinfo", { name: schoolName });
});

router.post('/play_Userinfo', function (req, res, next) {
  const { school, email, age, phone } = req.body;
  const ip = (req.headers['x-forwarded-for'] || '').split(',').pop().trim() ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  const setNewUser = async () => {
    let newUser = {
      age: age,
      school: school,
      email: email,
      phone: phone,
      ip: ip,
    }
    const users = await user.create(newUser);
  }

  setNewUser();

  user.findAll({
    where: {
      phone: phone
    },
    limit: 1,
    order: [['idx', 'DESC']],
  }).then(userInfo => {
    quest.findAll().then(questInfo => {
      select.findAll().then(selectInfo => {
        res.render("playQuiz", { usInfo: userInfo, qsInfo: questInfo, scInfo: selectInfo });
      })
    });
  });
});

router.post('/submitSurvey', function (req, res, next) {
  const { useridx, value_1, value_2, value_3, value_4, value_5, value_6, value_7, value_8, value_9, value_10, value_11, value_12, value_13, value_14,
    value_15, value_16, value_17, value_18, value_19, index_1, index_2, index_3, index_4, index_5,
    index_6, index_7, index_8, index_9, index_10, index_11, index_12, index_13, index_14, index_15,
    index_16, index_17, index_18, index_19 } = req.body;

  let values = [value_1, value_2, value_3, value_4, value_5, value_6, value_7, value_8, value_9, value_10,
    value_11, value_12, value_13, value_14, value_15, value_16, value_17, value_18, value_19];

  let indexs = [index_1, index_2, index_3, index_4, index_5, index_6, index_7, index_8, index_9, index_10,
    index_11, index_12, index_13, index_14, index_15, index_16, index_17, index_18, index_19];

  let result;

    if(value_5 == 278) {
      result =  1;
    } else if (value_5 == 279) {
      result = 5;
    } else if (value_5 == 280) {
      result = 7;
    } else if (value_5 == 281) {
      result = 2;
    } else if (value_5 == 282) {
      result = 3;
    } else if (value_5 == 284) {
      result = 4;
    } else if (value_15 == 335) {
      result = 6;
    }

  res.render("end", { result: result });

});


module.exports = router;