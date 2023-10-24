const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname));

// Configure AWS SDK with your credentials
AWS.config.update({
  accessKeyId: 'AKIAREAV3T6VA5NINTWV',
  secretAccessKey: 'HKUqBzHgPH0eOagjPmDkULHT6F8ifoYubalAuxoE',
  region: 'ap-south-1',
});

// const s3 = new S3Client({
//   region: 'ap-south-1', // Replace with your AWS region
//   credentials: {
//     accessKeyId: 'AKIAREAV3T6VHAGUIBGG',     // Replace with your AWS Access Key
//     secretAccessKey: 'X1tGvuqqIRNfZumBv0al9uqEFGhR6K', // Replace with your AWS Secret Access Key
//   },
// });

const s3 = new AWS.S3();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
  const { file } = req;
  const combinationData = req.body.combinationData;

  // Create a text file from the combination data
  const textData = `Combination Data:\n${combinationData}`;

  // Define S3 parameters
  const params = {
    Bucket: 'ritik26',
    Key: 'combination.txt',
    Body: textData,
  };

  // Upload the text file to S3
  s3.upload(params, (err, data) => {
    if (err) {
      console.error('Error uploading to S3:', err);
      return res.status(500).send('Error uploading to S3');
    }
    res.send('File uploaded to S3 successfully');
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});