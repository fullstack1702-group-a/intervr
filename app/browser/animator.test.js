import chai from 'chai'
import {expect} from 'chai'
import chaiEnzyme from 'chai-enzyme'
chai.use(chaiEnzyme())

import Animator from './animator'
let testBot = null

describe('The animator ', () => {

  beforeEach('Initialize animator and trigger sound event', () => {
    testBot = new Animator({webRTC: {sendDirectlyToAll: ( a, b, action) => action.animation}}) // webRTC artifically provided to establish context
    let isTalking = () => (testBot.monitor(75))()
  })

  it('animates the mouths when the amplitude < 100', () => {
    expect(isTalking).to.be.true
  })
})


