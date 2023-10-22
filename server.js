const express = require('express');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.text());

// AWS S3 Configuration
const s3 = new S3Client({
  region: 'ap-south-1', // Replace with your AWS region
  credentials: {
    accessKeyId: 'AKIAREAV3T6VHAGUIBGG',     // Replace with your AWS Access Key
    secretAccessKey: 'X1tGvuqqIRNfZumBv0al9uqEFGhR6K', // Replace with your AWS Secret Access Key
  },
});

// Serve your HTML/CSS/JS files
app.use(express.static(__dirname));
console.log(__dirname);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

const username = 'ritik';  // Replace with the actual username
const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); // Converts timestamp to a valid S3 key
const s3Key = `user-files/${username}/${timestamp}-textfile.txt`;

// Save combined items as a text file in AWS S3
app.post('/save', (req, res) => {
  const combinedText = req.body;

  // Save the combined text as a text file in AWS S3
  const params = {
    Bucket: 'ritik26',     // Replace with your AWS S3 bucket name
    Key: s3Key,      // Specify the S3 key
    Body: combinedText,
    ACL: 'public-read',             // Optional: Set access control
  };

  s3.send(new PutObjectCommand(params))
    .then(() => {
      res.json({ message: 'Text file saved to S3 successfully' });
    })
    .catch((error) => {
      console.error('S3 upload error:', error);
      res.status(500).json({ message: 'Error saving text file to S3' });
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
