import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { RiSave3Line } from 'react-icons/ri';
import axios from 'axios';

const MarksScreen = () => {
  const { classId } = useParams();
  const history = useHistory();

  const [student, setStudent] = useState({
    name: '',
    marks: { english: '', maths: '', science: '' },
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const handleMarksChange = (event) => {
    const { name, value } = event.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      marks: {
        ...prevStudent.marks,
        [name]: parseInt(value) || '', 
      },
    }));
  };

  const handleSaveMarks = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/api/marks/:${classId}`, 
        student
      );
      console.log(response.data); 
      history.push('/');
    } catch (error) {
      console.error('Error saving marks:', error);

    }
  };

  return (
    <Container>
      <h1>Marks Screen</h1>
      <Form onSubmit={handleSaveMarks}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={student.name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="english">
          <Form.Label>English</Form.Label>
          <Form.Control
            type="number"
            name="english"
            value={student.marks.english}
            onChange={handleMarksChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="maths">
          <Form.Label>Maths</Form.Label>
          <Form.Control
            type="number"
            name="maths"
            value={student.marks.maths}
            onChange={handleMarksChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="science">
          <Form.Label>Science</Form.Label>
          <Form.Control
            type="number"
            name="science"
            value={student.marks.science}
            onChange={handleMarksChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          <RiSave3Line /> Save Marks
        </Button>
      </Form>
    </Container>
  );
};

export default MarksScreen;
