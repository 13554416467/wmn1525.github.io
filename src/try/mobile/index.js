import {
  w
} from '../../wtools';
import template from './template.html';
import './style.scss';
const screenH = window.screen.availHeight;

export function create() {
  w.$$(".container")[0].innerHTML = template;
}