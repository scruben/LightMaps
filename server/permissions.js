module.exports = function (permission, role) {
  if (role === 'admin') {
    return true;
  } if (role === 'user') {
    if (permission === 'CREATE_PANEL') return false;
    if (permission === 'GET_PANELS') return true;
  } else {
    return false;
  }
}
