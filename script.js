window.addEventListener('load', () => {
  setTimeout(() => {
    const splash = document.getElementById('splash-screen');
    if (splash) splash.style.display = 'none';
  }, 2500);
});

const editor = document.getElementById('editor');
const preview = document.getElementById('preview');

editor.addEventListener('input', () => {
  preview.srcdoc = editor.value;
});

document.getElementById('newFile').onclick = () => {
  editor.value = '';
  preview.srcdoc = '';
};

document.getElementById('saveFile').onclick = () => {
  const blob = new Blob([editor.value], { type: 'text/html' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'index.html';
  a.click();
};

document.getElementById('downloadZip').onclick = async () => {
  const zip = new JSZip();
  zip.file('index.html', editor.value);
  const blob = await zip.generateAsync({ type: 'blob' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'project.zip';
  a.click();
};
