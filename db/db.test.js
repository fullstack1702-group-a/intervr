const chai = require('chai');
const supertest = require('supertest-as-promised')
const expect = chai.expect;

const Technical = require('./technical')
const General = require('./general')
const Intro = require('./intro')
const app = require('../server/main')

const axios = require('axios')
const Promise = require('bluebird')

let questions1, questions2, questions3

describe('Backend tests', () => {

  let agent

  beforeEach('grab the question', () => {
    agent = supertest(app)
    let p1 = agent.get('/api/general').then((res) => res.data)
    let p2 = agent.get('/api/intro').then((res) => res.data)
    let p3 = agent.get('/api/technical').then((res) => res.data)
    return Promise.all([p1, p2, p3])
      .spread((general, intro, technical) => {
        questions1 = general;
        questions2 = intro;
        questions3 = technical
      })
      .catch(err => console.error(err))
    })

    describe('routes for questions', () => {
      it('return the questions', () => {
        expect(questions1).to.have.length.of.at.least(1)
        expect(questions2).to.have.length.of.at.least(1)
        expect(questions3).to.have.length.of.at.least(1)
      })
    })
})
