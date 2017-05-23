const chai = require('chai');
const expect = chai.expect;

const Technical = require('./technical')
const General = require('./general')
const Intro = require('./intro')

const axios = require('axios')
const Promise = require('bluebird')

let questions1, questions2, questions3

describe('Backend tests', () => {

  beforeEach('grab the question', () => {
    return Promise.all(
      axios.get('api/general')
      .then((res) => res.data),
      axios.get('api/intro')
      .then((res) => res.data),
      axios.get('api/technical')
      .then((res) => res.data))
      .spread((general, intro, technical) => {
        questions1 = general;
        questions2 = intro;
        questions3 = technical
      })
    })

    describe('routes for questions', () => {
      it('return the questions', () => {
        expect(questions1).to.have.length.of.at.least(1)
        expect(questions2).to.have.length.of.at.least(1)
        expect(questions3).to.have.length.of.at.least(1)
      })
    })
})
