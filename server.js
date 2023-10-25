const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');

const app = express();
const port = 3000;

app.use(express.static(__dirname));

AWS.config.update({
  accessKeyId: 'AKIAREAV3T6VA5NINTWV',
  secretAccessKey: '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',
  region: 'ap-south-1',
});

const s3 = new AWS.S3();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
  const { file } = req;
  const combinationData = req.body.combinationData;
  // console.log(combinationData);
  const timestamp = Date.now();
  const key = `combination-${timestamp}.txt`;

  const textData = `Combination Data:\n${combinationData}`;

  const params = {
    Bucket: 'ritik26',
    Key: key,
    Body: textData,
  };

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