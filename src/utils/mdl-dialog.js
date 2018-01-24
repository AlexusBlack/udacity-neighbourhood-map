import dialogPolyfill from 'dialog-polyfill';

export default { show, close };

let _dialog;

function create() {
  _dialog = document.querySelector('dialog');
  if (!_dialog.showModal) {
    dialogPolyfill.registerDialog(_dialog);
  }
  _dialog.querySelector('.close').addEventListener('click', function() {
    _dialog.close();
  });
}

function show(message) {
  if(_dialog == null) create();
  // TODO: better to create message que here
  if(_dialog.open) return;

  _dialog.querySelector('.mdl-dialog__message').textContent = message;

  _dialog.showModal();
};

function close() {
  if(_dialog == null) return;
  _dialog.close();
}

