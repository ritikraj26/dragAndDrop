const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

document.addEventListener('DOMContentLoaded', function () {
  const dropZone = document.getElementById('drop-zone');
  const saveButton = document.getElementById('save-button');
  const items = [];

  const s3 = new S3Client({
    region: 'ap-south-1', // Replace with your AWS region
    credentials: {
      accessKeyId: 'AKIAREAV3T6VHAGUIBGG',     // Replace with your AWS Access Key
      secretAccessKey: 'X1tGvuqqIRNfZumBv0al9uqEFGhR6K', // Replace with your AWS Secret Access Key
    },
  });

  dropZone.addEventListener('dragover', function (e) {
    e.preventDefault();
    dropZone.classList.add('dragover');
  });

  dropZone.addEventListener('dragleave', function () {
    dropZone.classList.remove('dragover');
  });

  dropZone.addEventListener('drop', function (e) {
    e.preventDefault();
    dropZone.classList.remove('dragover');

    const itemText = e.dataTransfer.getData('text/plain');
    items.push(itemText);

    const itemElement = document.createElement('div');
    itemElement.textContent = itemText;
    dropZone.appendChild(itemElement);
  });

  saveButton.addEventListener('click', function () {
    if (items.length === 0) {
      alert('No items to save.');
      return;
    }

    const combinedText = items.join('\n');


    const username = 'ritik';  // Replace with the actual username
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); // Converts timestamp to a valid S3 key
    const s3Key = `user-files/${username}/${timestamp}-textfile.txt`;

    // Save the combined text as a text file in AWS S3
    const params = {
      Bucket: 'ritik26',     // Replace with your AWS S3 bucket name
      Key: s3Key,      // Specify the S3 key
      Body: combinedText,
      ACL: 'public-read',             // Optional: Set access control
    };

    s3.send(new PutObjectCommand(params))
      .then(() => {
        alert('Text file saved to S3 successfully');
      })
      .catch((error) => {
        console.error('S3 upload error:', error);
        alert('Error saving text file to S3');
      });
  });
});
