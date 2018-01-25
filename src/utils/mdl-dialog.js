import dialogPolyfill from 'dialog-polyfill';

export default { show, close };

let _dialog;

/**
 * Initializes dialog element
 * 
 */
function create() {
  _dialog = document.querySelector('dialog');
  if (!_dialog.showModal) {
    dialogPolyfill.registerDialog(_dialog);
  }
  _dialog.querySelector('.close').addEventListener('click', function() {
    _dialog.close();
  });
}

/**
 * Show dialog with some message.
 * WARNING: dialogs don't stack, only latest will be visible to user
 * 
 * @param {String} message 
 * @returns 
 */
function show(message) {
  if(_dialog == null) create();
  // TODO: better to create message que here
  if(_dialog.open) return;

  _dialog.querySelector('.mdl-dialog__message').textContent = message;

  _dialog.showModal();
};

/**
 * Close current dialog
 * 
 * @returns 
 */
function close() {
  if(_dialog == null) return;
  _dialog.close();
}

