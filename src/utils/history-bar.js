
const HISTORY_LS_KEY = 'HISTORY_LS_KEY';

const HISTORY_MAX_LEN = 10;

export const historyBar = {
  add: (o) => {
    const arrHis = localStorage.getItem(HISTORY_LS_KEY) ? JSON.parse(localStorage.getItem(HISTORY_LS_KEY)) : [];
    if (arrHis.length >= HISTORY_MAX_LEN) {
      arrHis.splice(0, 1);
    }
    if (arrHis.map(i => i.name).includes(o.name)) {
      arrHis.splice(arrHis.map(i => i.name).indexOf(o.name), 1);
    }
    arrHis.push(o);
    localStorage.setItem(HISTORY_LS_KEY, JSON.stringify(arrHis));
  },
  delete: (index) => {
    const arrHis = localStorage.getItem(HISTORY_LS_KEY) ? JSON.parse(localStorage.getItem(HISTORY_LS_KEY)) : [];
    arrHis.splice(index, 1);
    localStorage.setItem(HISTORY_LS_KEY, JSON.stringify(arrHis));
  },
  all: () => {
    return localStorage.getItem(HISTORY_LS_KEY) ? JSON.parse(localStorage.getItem(HISTORY_LS_KEY)) : [];
  }
};
