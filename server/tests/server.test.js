const expect = require('expect');
const request = require('supertest');

var {mongoose} = require('./../db/mongoose'); //Reference to db/mongoose.js's exported mongoose object
var {Todo} = require('./../models/todo'); // Reference to models/todo.js
var {app} = require('./../server') // Reference to server/server.js's "app" variable

beforeEach((done) => {
  Todo.deleteMany({}).then(() => {
    done();
  });
});

describe('POST /todos', () => {
  it('Should create todo document', (done) => {
    var text = 'Testing is to be done for post';

    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res) => {
      expect(res.body.text).toBe(text);
    })
    .end((err, res) => {
      if(err){
        return done(err);
      }
      Todo.find().then((todos) => {
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((e) => done(e));

    });

  });

it('Should not create todo with invalid body',(done) => {
  request(app)
  .post('/todos')
  .send({})
  .expect(400)
  .end((err, res) => {
    if(err){
      return done(err);
    }
    Todo.find().then((todos) => {
      expect(todos.length).toBe(0);
      done();
    }).catch((e) => {
      done(e);
    });
  });
});

});
