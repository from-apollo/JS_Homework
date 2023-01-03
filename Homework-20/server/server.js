const express = require('express'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  fs = require('file-system'),
  shortId = require('shortid'),
  dbFilePath = './server/lessons.json',
  app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('common'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/api/lessons', (req, res) => res.send(await getLessonsFromDB()));

app.post('/api/lesson', (req, res) => {
  let lessonsData = getLessonsFromDB();

  let lesson = req.body;

  lesson.id = shortId.generate();
  lesson.description = lesson.description || 'No Description';
  lesson.status = 'In Progress';

  lessonsData.push(lesson);
  setLessonsToDB(lessonsData);

  res.send(lesson);
});

app.get('/api/lesson/:id', (req, res) => {
  const lessonsData = getLessonsFromDB(),
        lesson = lessonsData.find(lesson => lesson.id === req.params.id);

  lesson ? res.send(lesson) : res.status(404).send({ error: 'Lesson with given ID was not found' });
});

app.put('/api/lesson/:id', (req, res) => {
  let lessonsData = getLessonsFromDB(),
    lesson = lessonsData.find(lesson => lesson.id === req.params.id),
    updatedLesson = req.body;

  lesson.title = updatedLesson.title;
  lesson.description = updatedLesson.description || 'No Description';

  setLessonsToDB(lessonsData);

  res.sendStatus(204);
});

app.put('/api/lesson/:id/done', (req, res) => {
  const lessonsData = getLessonsFromDB(),
    lesson = lessonsData.find(lesson => lesson.id === req.params.id);
  lesson.status = 'Done';
  setLessonsToDB(lessonsData);
  res.sendStatus(204);
});

app.delete('/api/lesson/:id', (req, res) => {
  const lessonData = getLessonsFromDB().filter(lesson => lesson.id !== req.params.id);
  setLessonsToDB(lessonData);
  res.sendStatus(204);
});

app.delete('/api/lessons', (req, res) => {
  setLessonsToDB([]);
  res.sendStatus(204);
});

async function getLessonsFromDB() {
  return JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
}

function setLessonsToDB(lessonsData) {
  fs.writeFileSync(dbFilePath, JSON.stringify(lessonsData));
}

app.listen(3000, () => console.log('Server has been started...'));

