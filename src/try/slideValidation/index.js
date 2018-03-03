import {
  w
} from '../../wtools';
import template from './template.html';
import './style.scss'
export function create() {
  w.$$(".container")[0].innerHTML = template;
  require.ensure([], function () {
    var s = require('./slideValidation')
    var sl = new s();
    console.log(sl.flag)
  });
}