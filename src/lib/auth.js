import { getCookie, deleteCookie } from './cookie';
import history from './history'
import _ from 'lodash'

export function isLoggedIn() {
  return !isLoggedOut();
}

export function isLoggedOut() {
  return _.isUndefined(getCookie('uid')) || getCookie('uid') == '';
}

export function clearCookie() {
  deleteCookie('uid');
}
