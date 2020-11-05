const express = require('express');
const sequelize = require('./models').sequelize;

const app = express();
sequelize.sync();

const PORT = 3000;

app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const index = require('./run/index');
const surveyPlay = require('./run/surveyPlay');

app.use("/", index);
app.get("/play", surveyPlay);
app.get("/serachschool/:name", surveyPlay);
app.get("/uploadquizondatabase/:id", surveyPlay);
app.get("/userinfo/:name", surveyPlay);
app.post('/play_Userinfo', surveyPlay);
app.post('/submitSurvey', surveyPlay);

app.listen(PORT, function(){
    console.log(`사이트가 ${PORT} 포트에서 활성화되었습니다.`);
});