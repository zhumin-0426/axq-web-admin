
import { router } from '@/router';
import { store } from '@/store';
import { historyBar } from '@/utils/history-bar';

router.afterEach((from) => {
  historyBar.add({
    name: from.meta.title,
    url: from.fullPath
  });
  store.commit('sys/SET_HISTORY_BAR', historyBar.all(), { root: true });
});
