(function(){
  // Editor setup with Monaco
  let editor = null;
  let currentTheme = 'vs'; // vs = light, vs-dark = dark
  const defaultContent = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Untitled</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <h1>Hello from WebCode Studio Pro v2!</h1>
    <p>Edit HTML on the left, then preview fullscreen.</p>
    <script>console.log('hello')</script>
  </body>
</html>`;

  function initMonaco(){
    require(['vs/editor/editor.main'], function() {
      editor = monaco.editor.create(document.getElementById('monaco'), {
        value: localStorage.getItem('wcs_content') || defaultContent,
        language: 'html',
        theme: currentTheme,
        automaticLayout: true,
        lineNumbers: 'on',
        minimap: { enabled: false },
        fontSize: 14,
        wordWrap: 'off',
        tabSize: 2,
      });

      editor.getModel().onDidChangeContent(()=>{
        localStorage.setItem('wcs_content', editor.getValue());
      });
    });
  }

  // Wait until require is available (loader.js sets require)
  function waitForRequire(cb){
    if(typeof require === 'function') return cb();
    setTimeout(()=>waitForRequire(cb), 50);
  }

  waitForRequire(initMonaco);

  // Splash handled in index.html; no further action here for splash
  // Controls
  const btnNew = document.getElementById('btn-new');
  const btnSave = document.getElementById('btn-save');
  const btnPreview = document.getElementById('btn-preview');
  const btnTheme = document.getElementById('btn-theme');
  const previewModal = document.getElementById('preview-modal');
  const previewIframe = document.getElementById('preview-iframe');
  const closePreview = document.getElementById('close-preview');
  const openNewTab = document.getElementById('open-new-tab');

  // New file
  btnNew.addEventListener('click', ()=>{
    if(!editor) return alert('Editor not ready yet');
    if(!confirm('Create new file? Unsaved changes will be kept in localStorage.')) return;
    editor.setValue(defaultContent);
    localStorage.setItem('wcs_content', defaultContent);
  });

  // Save file (download)
  btnSave.addEventListener('click', ()=>{
    if(!editor) return alert('Editor not ready yet');
    const blob = new Blob([editor.getValue()], {type:'text/html'});
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'index.html'; a.click();
  });

  // Preview fullscreen (modal)
  btnPreview.addEventListener('click', ()=>{
    if(!editor) return alert('Editor not ready yet');
    const html = editor.getValue();
    previewIframe.srcdoc = html;
    previewModal.classList.remove('hidden');
    previewModal.setAttribute('aria-hidden','false');
  });

  closePreview.addEventListener('click', ()=>{
    previewModal.classList.add('hidden');
    previewModal.setAttribute('aria-hidden','true');
    previewIframe.srcdoc = 'about:blank';
  });

  openNewTab.addEventListener('click', ()=>{
    if(!editor) return;
    const w = window.open();
    w.document.write(editor.getValue());
    w.document.close();
  });

  // Theme toggle
  btnTheme.addEventListener('click', ()=>{
    const body = document.body;
    if(body.classList.contains('dark')){
      body.classList.remove('dark'); currentTheme = 'vs'; monaco.editor.setTheme('vs');
    } else {
      body.classList.add('dark'); currentTheme = 'vs-dark'; monaco.editor.setTheme('vs-dark');
    }
  });

  // Keyboard shortcuts
  window.addEventListener('keydown', (e)=>{
    if((e.ctrlKey || e.metaKey) && e.key === 's'){
      e.preventDefault();
      btnSave.click();
    }
    if((e.ctrlKey || e.metaKey) && e.key === 'n'){
      e.preventDefault();
      btnNew.click();
    }
    if((e.ctrlKey || e.metaKey) && e.key === 'p'){
      e.preventDefault();
      btnPreview.click();
    }
  });

})();