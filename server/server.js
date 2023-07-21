const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = 5000; 

mongoose.connect('mongodb+srv://Ranjith:Ranjith123@cluster0.mdzkluf.mongodb.net/banglore_soft?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

const marksSchema = new mongoose.Schema({
  classId: { type: String, required: true },
  name: { type: String, required: true },
  rollNumber: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  marks: { type: Object, required: true },
});

const Marks = mongoose.model('Marks', marksSchema);

app.use(bodyParser.json());

app.post('/api/marks/:classId', (req, res) => {
  const { classId } = req.params;
  const studentDetails = req.body;
  const marks = new Marks({
    classId,
    ...studentDetails,
  });
  marks.save()
    .then(() => res.status(201).json({ message: 'Marks saved successfully.' }))
    .catch((err) => res.status(500).json({ error: 'Failed to save marks.', err }));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
