import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Table, Button } from 'react-bootstrap';

const ClassScreen = ({ classes }) => {
  return (
    <Container>
      <h1>Class Screen</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Class Name</th>
            <th>Students</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((cls) => (
            <tr key={cls.id}>
              <td>{cls.name}</td>
              <td>{cls.students.join(', ')}</td>
              <td>
                <Link to={`/marks/${cls.id}`}>
                  <Button variant="primary">Add Marks</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ClassScreen;
