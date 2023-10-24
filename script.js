document.addEventListener('DOMContentLoaded', () => {
  const dropArea = document.querySelector('.drop-area');
  const uploadForm = document.getElementById('upload-form');

  dropArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropArea.style.backgroundColor = '#e2f0f8';
  });

  dropArea.addEventListener('dragleave', () => {
      dropArea.style.backgroundColor = '#fff';
  });

  dropArea.addEventListener('drop', (e) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      const fileInput = uploadForm.querySelector('input[type="file"]');
      fileInput.files = e.dataTransfer.files;
      dropArea.style.backgroundColor = '#fff';
      console.log(e);
      console.log("heueueueuue");
      console.log(file);
  });

  uploadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(uploadForm);

      fetch('/upload', {
          method: 'POST',
          body: formData
      })
      .then(response => response.text())
      .then(data => {
          alert(data);
      })
      .catch(error => {
          console.error('Error:', error);
      });
  });
});
