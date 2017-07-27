process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');

const server = require('../server');
const knex = require('../db/knex');

chai.use(chaiHttp);

describe('Client Routes', () => {
  it('should return the homepage', (done) => {
    chai.request(server)
    .get('/')
    .end((err, response) => {
      response.should.have.status(200);
      response.should.be.html;
      done();
    });
  });

  it('should return a 404 for a route that does not exist', (done) => {
    chai.request(server)
    .get('/404')
    .end((err, response) => {
      response.should.have.status(404);
      done();
    });
  });
});

describe('API Routes', () => {
  before((done) => {
    knex.migrate.latest()
    .then(() => {
      done();
    });
  });

  beforeEach((done) => {
    knex.seed.run()
    .then(() => {
      done();
    });
  });

  describe('GET /api/v1/store', () => {
    it('should return all items', (done) => {
      chai.request(server)
      .get('/api/v1/store')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.should.be.a('object');
        response.body.length.should.equal(8);
        done();
      });
    });

    it('should not return all items if correct endpoint not hit', (done) => {
      chai.request(server)
      .get('/api/v1/stores')
      .end((error, response) => {
        response.should.have.status(404);
        done();
      });
    });
  });

  describe('GET /api/v1/orders', () => {
    it('should return all items', (done) => {
      chai.request(server)
      .get('/api/v1/orders')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.should.be.a('object');
        response.body.length.should.equal(3);
        done();
      });
    });

    it('should not return all items if correct endpoint not hit', (done) => {
      chai.request(server)
      .get('/api/v1/order')
      .end((error, response) => {
        response.should.have.status(404);
        done();
      });
    });
  });
});

describe('POST /api/v1/orders', () => {
    it('should create a new order', (done) => {
      chai.request(server)
      .post('/api/v1/orders')
      .send({
        id: 4,
        total_price: '600'
      })
      .end((err, response) => {
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.property('id');
        response.body.id.should.equal(4);
        chai.request(server)
        .get('/api/v1/orders/')
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(4);
          done();
        });
      });
    });

    it('should not create a new order', (done) => {
      chai.request(server)
      .post('/api/v1/orders')
      .send({
        id: 5,
        total_price: ''
      })
      .end((err, response) => {
        response.should.have.status(500);
        response.body.should.be.a('object');
        response.body.should.have.property('error');
        response.body.error.should.equal('no order to purchase')
        chai.request(server)
        .get('/api/v1/orders/')
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(4);
          done();
        });
      });
    });
  });
