require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.33.0/min/vs' }});
require(['vs/editor/editor.main'], function () {
  const editor = monaco.editor.create(document.getElementById('editor'), {
    value: '<!-- Start typing your HTML here -->',
    language: 'html',
    theme: 'vs-light',
    automaticLayout: true,
  });

  // Splash screen timeout
  setTimeout(() => {
    document.getElementById('splash-screen').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
  }, 1500);

  // Theme toggle
  const themeBtn = document.getElementById('toggleTheme');
  let isDark = false;
  themeBtn.addEventListener('click', () => {
    isDark = !isDark;
    document.body.classList.toggle('dark', isDark);
    monaco.editor.setTheme(isDark ? 'vs-dark' : 'vs-light');
  });

  // New file
  document.getElementById('newFile').addEventListener('click', () => {
    editor.setValue('<!-- New File -->');
  });

  // Save file
  document.getElementById('saveFile').addEventListener('click', () => {
    const code = editor.getValue();
    const blob = new Blob([code], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'index.html';
    a.click();
  });

  // Preview fullscreen
  const previewModal = document.getElementById('previewModal');
  const previewFrame = document.getElementById('previewFrame');
  const closePreview = document.getElementById('closePreview');
  document.getElementById('previewFile').addEventListener('click', () => {
    previewFrame.srcdoc = editor.getValue();
    previewModal.classList.remove('hidden');
  });
  closePreview.addEventListener('click', () => {
    previewModal.classList.add('hidden');
  });
});
