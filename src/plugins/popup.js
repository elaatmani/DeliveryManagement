import { createApp } from 'vue';

import CustomDialog from '...';

export default (text, onConfirm, onCancel) => {

  const mountEl = document.createElement('div');
  document.body.appendChild(mountEl);

  const dialog = createApp({ extends: CustomDialog }, {
    text, onConfirm, onCancel,
    onClose() {
      dialog.unmount();
      mountEl.remove();
    },
  });

  dialog.mount(mountEl);

}