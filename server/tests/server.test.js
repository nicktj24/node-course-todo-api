const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./../db/mongoose'); //Reference to db/mongoose.js's exported mongoose object
var {Todo} = require('./../models/todo'); // Reference to models/todo.js
var {app} = require('./../server') // Reference to server/server.js's "app" variable

var todos = [
  {
    _id : new ObjectID(),
    text:'Go to Gym'
  },
  {
    _id : new ObjectID(),
    text:'Go to Running',
    completed:true,
    completedAt: 333
  }
];

beforeEach((done) => {
  Todo.deleteMany({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => { done() });
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
      Todo.find({text}).then((todos) => {
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
      expect(todos.length).toBe(2);
      done();
    }).catch((e) => {
      done(e);
    });
  });
});

});

describe('GET /todos', () => {
  it('Should get all todos', (done) => {
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(2);
  })
  .end(done);
  });
});

describe('GET todos/:id',() => {
  it('Should return todo doc', (done) => {
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(todos[0].text)
    })
    .end(done);
  });

 it('Should return 404 if todo not found ', (done) => {
   let tid = new ObjectID().toHexString();
   request(app)
   .get(`/todos/${tid}}`)
   .expect(404)
   .end(done);
 });

 it('Should return 404 if id is invalid', (done) => {
   request(app)
   .get('/todos/12434432422')
   .expect(404)
   .end(done);
 });

});

describe('DELETE /todos/:id', () => {

  it('Should delete todo doc associate with passing id', (done) => {
    let id = todos[0]._id.toHexString();
    request(app)
    .delete(`/todos/${id}`)
    .expect(200)
    .expect((res) => {
      // expect(res.body.todo._id).toBe(id);
      expect(res.body.todo.text).toBe(todos[0].text);
    })
    .end((err, res) => {
      if(err){
        return done(err);
      }

      Todo.findById(id).then((todo) => {
        expect(todo).toBeFalsy();
        done();
      }).catch((e) => {
        done(e);
      });

    });
  });

  it('Should return 404 if object not found', (done) => {
    let tid = new ObjectID().toHexString();
    request(app)
    .delete(`/todos/${tid}`)
    .expect(404)
    .end(done)
  });

  it('Should return 404 if ObjectID is invalid', (done) => {
    request(app)
    .delete('/todos/121324')
    .expect(404)
    .end(done);
  });

});

describe('PATCH /todos/:id', () => {


  it('should update the todo connected with given id', (done) => {
    let body = {
      text:'New todo to do',
      completed:true
    };

    request(app)
    .patch(`/todos/${todos[0]._id.toHexString()}`)
    .send(body)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(body.text);
      expect(res.body.todo.completed).toBe(true);
      expect(typeof res.body.todo.completedAt).toBe('number');
    })
    .end(done);
  });

  it('should clear completedAt when todo is not completed', (done) => {
    let body = {
      text:'New todo to do 11',
      completed:false
    };

    request(app)
    .patch(`/todos/${todos[1]._id.toHexString()}`)
    .send(body)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(body.text);
      expect(res.body.todo.completed).toBe(false);
      expect(res.body.todo.completedAt).toBeFalsy();
    })
    .end(done);
  });

});
