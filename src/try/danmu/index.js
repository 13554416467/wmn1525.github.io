import {
  w
} from '../../wtools';
import template from './template.html';
import './style.scss';
const screenH = window.screen.availHeight;

export function create() {
  w.$$(".container")[0].innerHTML = template;
  w.$("#danmuPool").style.height = screenH * 0.6 + "px";
  require.ensure([], function () {
    require('./danmu')
    const s = require('./slideValidation')
    const sl = new s();
  });
}