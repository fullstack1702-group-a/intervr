import 'aframe';
import 'aframe-animation-component';
import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import 'babel-polyfill';
import { Entity, Scene } from 'aframe-react';
require('aframe-fence-component')
import { connect } from 'react-redux';
import { toElev } from '../util';
import Assets from './assets';
import Animator from './animator'

class RoomComponent extends React.Component {
  constructor(props) {
    super(props);
    this.animator = null
  }
  componentDidMount() {
    // add listener to camera
    this.cameraNode.addEventListener('componentchanged', (evt) => {
      if (evt.detail.name === 'position') {
        this.props.webRTC.sendDirectlyToAll(null, null, { position: evt.detail.newData });
        this.props.updatePosition(evt.detail.newData);
      } else if (evt.detail.name === 'rotation') {
        this.props.webRTC.sendDirectlyToAll(null, null, { rotation: evt.detail.newData });
        this.props.updateRotation(evt.detail.newData);
      }
    });
    this.animator = new Animator(this.props)
    this.animator.setup()
    this.cameraNode.setAttribute('position', {x: 0, y: .9, z: 0});
    this.cameraNode.setAttribute('rotation', {x: 0, y: 180, z: 0});
  }

  componentWillUnmount() {
    if (this.animator) {
      this.animator.end();
    }
    this.props.webRTC.leaveRoom();
  }

  render() {
    return (
      <Scene >
        <Assets />

        {/* Planes */}
        <a-box color="#fff" repeat="14 14" position="-1.45 0 -7" rotation="0 0 0" height="10" width="14" scale="0.8 1 1"/>
        <a-box color="#fff" repeat="14 14" position="-1.7 0.12 7" rotation="0 180 0" height="10" width="14" scale="0.8 1 1" />
        <a-box color="#fff" repeat="14 14" position="4 0 0" rotation="0 -90 0" height="10" width="14" />
        <a-box color="#fff" repeat="14 14" position="-7 0 -0.35" rotation="0 90 0" height="10" width="14" scale="1 1 1" />
        <a-plane src="#floor" repeat="14 14" position="-1.3 5 0.2" rotation="90 0 0" height="10" width="14" scale="0.9 1.4 0.9" />
        <a-plane src="#floor" rotation="-90 0 0" position="-1.5 0 0" height="14" width="14" scale="0.85 1 0.8" />

        {/* Single Objects */}
        <Entity obj-model="obj: #couch-obj; mtl: #couch-mtl" position="-3 0.14 -6" scale="1 1 1" />
        <Entity obj-model="obj: #table-obj; mtl: #table-mtl" position="2 0.9 -1.5" scale="0.003 0.001 0.005" />
        <Entity obj-model="obj: #flower-obj; mtl: #flower-mtl" position="1.1 .7 1.17" scale="0.01 0.01 0.01" />

        {/* Desks */}
        <Entity obj-model="obj: #desk-obj; mtl: #desk-mtl" position="-5.8 0 -3" scale="1.5 1.6 1.5" />
        <Entity obj-model="obj: #desk-obj; mtl: #desk-mtl" position="-5.8 0 -1.9" scale="1.5 1.6 1.5" />
        <Entity obj-model="obj: #desk-obj; mtl: #desk-mtl" rotation="0 90 0" position="-5.9 0 1.65" scale="1.5 1.6 1.5" />

        {/* Chairs */}
        <Entity obj-model="obj: #office-chair-obj; mtl: #office-chair-mtl" rotation="0 90 .0" position="-0.5 -0.12 1.5" scale="1.75 1.5 1.4" />
        <Entity obj-model="obj: #office-chair-obj; mtl: #office-chair-mtl" rotation="0 90 .0" position="-0.5 -0.12 -1.77" scale="1.75 1.5 1.4" />
        <Entity obj-model="obj: #office-chair-obj; mtl: #office-chair-mtl" rotation="0 90 .0" position="-0.5 -0.12 -0.177" scale="1.75 1.5 1.4" />

        <Entity obj-model="obj: #office-chair-obj; mtl: #office-chair-mtl" rotation="0 -90 0" position="0.7 -0.12 2" scale="1.75 1.5 1.8" />
        <Entity obj-model="obj: #office-chair-obj; mtl: #office-chair-mtl" rotation="0 -90 0" position="0.7 -0.12 -1.3" scale="1.75 1.5 1.8" />

        <Entity obj-model="obj: #office-chair-obj; mtl: #office-chair-mtl" rotation="0 -90 0" position="0.7 -0.12 0.37" scale="1.75 1.5 1.8" />
        <Entity obj-model="obj: #office-chair-obj; mtl: #office-chair-mtl" rotation="0 0 0" position="1.3 -0.12 -1.25" scale="1.75 1.5 2" />
        <Entity obj-model="obj: #office-chair-obj; mtl: #office-chair-mtl" rotation="0 180 0" position="-0.55 -0.19 1.6" scale="1.75 1.5 2" />
        <Entity obj-model="obj: #office-chair-obj; mtl: #office-chair-mtl" rotation="0 180 0" position="0.765 -0.19 1.6" scale="1.75 1.5 2" />
        <Entity obj-model="obj: #office-chair-obj; mtl: #office-chair-mtl" rotation="0 0 0" position="-0.17 -0.19 -1.25" scale="1.75 1.5 2" />

        <Entity obj-model="obj: #office-chair-obj; mtl: #office-chair-mtl" rotation="0 0 0" position="-5.27 -0.12 -2.55" scale="1.75 1.5 2" />
        <Entity obj-model="obj: #office-chair-obj; mtl: #office-chair-mtl" rotation="0 180 0" position="-5.68 -0.12 -2.34" scale="1.75 1.5 2" />
        <Entity obj-model="obj: #office-chair-obj; mtl: #office-chair-mtl" rotation="0 -90 0" position="-6.2 -0.12 1.9" scale="1.75 1.5 2" />

        {/* Computers */}
        <Entity obj-model="obj: #desktop-computer-obj; mtl: #desktop-computer-mtl" rotation="0 90 0" position="-5.6 1.17 -2" scale="0.4 0.3 0.4" />
        <Entity obj-model="obj: #desktop-computer-obj; mtl: #desktop-computer-mtl" rotation="0 -90 0" position="-5.6 1.17 -2.75" scale="0.4 0.3 0.4" />
        <Entity obj-model="obj: #desktop-computer-obj; mtl: #desktop-computer-mtl" rotation="0 180 0" position="-5.8 1.17 1.66" scale="0.4 0.3 0.4" />

        <Entity obj-model="obj: #tv-obj; mtl: #tv-mtl" rotation="0 90 0" position="3.4 1.55 0" scale="0.8 0.4 1.2" />
        <Entity obj-model="obj: #paintings-obj; mtl: #paintings-mtl" rotation="0 180 0" position="-2 2.7 6.45" scale="0.5 0.4 0.8" />

        <Entity obj-model="obj: #door-obj" rotation="270 0 0" position="1.5 0 -6.4" scale="0.015 0.015 0.015" />

        <Entity primitive="a-light" type="point" intensity="1.4" color="white" position="-1.3 7.7 0" />
        <Entity primitive="a-light" type="ambient" intensity="0.05" color="white" position="-1.3 7.7 0" />

        <Entity
          primitive="a-plane"
          src="#exit"
          width="1.5"
          height=".5"
          position={{ x: 2.2, y: 3.7, z: -6.49 }}
          rotation={{ x: 0, y: 0, z: 0 }}
          events={{ click: toElev }}>
          <a-animation begin="mouseenter" end="mouseleave" fill="forwards" repeat="0"
            direction="normal" attribute="scale" from="1 1 1"
            to="1.2 1.2 1.2" dur="1000"></a-animation>
          <a-animation begin="mouseleave" end="mouseenter" repeat="0" fill="forwards"
            direction="normal" attribute="scale"
            to="1 1 1" dur="1000"></a-animation>
        </Entity>
        <Entity position={{x: 2, y: 0, z: -5}} rotation={{x:0, y: 0, z: 0}}>
          <a-camera
            fence="width: 7; depth: 10; x0: -2.5; z0: 5"
            ref={(cameraNode) => this.cameraNode = cameraNode}
            id="camera">
          <Entity primitive="a-cursor" animation__click={{ property: 'scale', startEvents: 'click', from: '0.1 0.1 0.1', to: '1 1 1', dur: 150 }} />
            <a-entity obj-model="obj: #person-obj; mtl: #person-mtl" position=".3 -2.5 .5"/>
          </a-camera>
        </Entity>

        {/* Each person */}
        {Object.keys(this.props.peer).map((key, index) => (
          <Entity obj-model="obj: #person-obj; mtl: #person-mtl"
            position={this.props.peer[key].position}
            rotation={this.props.peer[key].rotation}>
            {this.props.peer[key].handle &&
              <a-entity text={`value: ${this.props.peer[key].handle}; align: center; color: blue;`} position="-0.5 3.5 0" scale="8 8 8" rotation="0 180 0" />
            }

            <a-box rotation="0 0 45" scale="0.1 0.1 0.1" position="-0.11 2.6 -0.48"/>
            <a-box rotation="0 0 45" scale="0.1 0.1 0.1" position="-0.52 2.6 -0.47"/>

            <a-cone id="boxbot" rotation="0 90 90" radius-bottom="2" radius-top="0.9" position="-0.33 2.2 -0.43" color="white" scale={
              this.props.peer[key].animation ?
              "0.07 0.2 0.12" :
              "0.02 0.2 0.12"
            }>
            </a-cone>

          </Entity>
        ))}

      </Scene>
    );
  }
}

import { updateRotation, updatePosition, updateAnimation } from '../reducers/camera';

export default connect(
  ({ webRTC, peer, camera }) => ({ webRTC, peer, camera }),
  ({ updateRotation, updatePosition, updateAnimation }))
  (RoomComponent);

