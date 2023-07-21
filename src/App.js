import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ClassScreen from './components/ClassScreen';
import MarksScreen from './components/MarksScreen';

function App() {
  const [classes, setClasses] = useState([
    { id: 1, name: 'Class 1', students: [] },
    { id: 2, name: 'Class 2', students: [] },
  ]);

  const handleAddMarks = (classId, student) => {
    setClasses((prevClasses) =>
      prevClasses.map((cls) =>
        cls.id === classId
          ? { ...cls, students: [...cls.students, student] }
          : cls
      )
    );
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <ClassScreen classes={classes} />
        </Route>
        <Route exact path="/marks/:classId">
          <MarksScreen classes={classes} onAddMarks={handleAddMarks} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
