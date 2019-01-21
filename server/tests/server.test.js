const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');


var {mongoose} = require('./../db/mongoose'); //Reference to db/mongoose.js's exported mongoose object
var {Todo} = require('./../models/todo'); // Reference to models/todo.js
var User = require('./../models/users').Users; // Reference to models/users.js
var {app} = require('./../server') // Reference to server/server.js's "app" variable
var {todos, populateTodos, users, populateUsers} = require('./seed/seed');



beforeEach(populateUsers);
beforeEach(populateTodos);

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

describe('GET /users/me', () => {
  it('Should successfully return user if authenticated', (done) => {
    request(app)
    .get('/users/me')
    .set('x-auth',users[0].tokens[0].token)
    .expect(200)
    .expect((res) => {
      expect(res.body._id).toBe(users[0]._id.toHexString());
      expect(res.body.email).toBe(users[0].email);
    })
    .end(done);
  });

  it('Should return 401 if user is not authenticated', (done) => {
    request(app)
    .get('/users/me')
    .set('x-auth', users[0].tokens[0].token + 1)
    .expect(401)
    .expect((res) => {
      expect(res.body).toEqual({});
    })
    .end(done);
  });
});

describe('POST /users (Sign UP)', () => {
  it('Should create a user with proper values', (done) => {
    var email = 'amruta@gmail.com';
    var password = '1234abcd';
    request(app)
    .post('/users')
    .send({email, password})
    .expect(200)
    .expect((res) => {
      expect(res.header['x-auth']).toBeTruthy();
      expect(res.body._id).toBeTruthy();
      expect(res.body.email).toBe(email);
    })
    .end((err) => {
      if(err){
        return done(err);
      }
      User.findOne({email}).then((user) => {
        expect(user).toBeTruthy();
        expect(user.password).not.toBe(password);
        expect(user.email).toBe(email);
        done();
      });
    });
  });

  it('Should return validation errors if request in invalid', (done) => {
    request(app)
    .post('/users')
    .send({
      email:'and@', //we're sending invalid email & password
      password:'1334'
    })
    .expect(400)
    .end(done);
  });

  it('Should not create user if email is in use', (done) => {
    request(app)
    .post('/users')
    .send({
      email:users[0].email, // this email is already associated with existing user
      password:'123131224'
    })
    .expect(400)
    .end(done);
  });
});
