import React, { useState } from 'react';
import {Button,Dialog,DialogActions,DialogContent,DialogTitle,TextField,} from "@mui/material";


const AddCourseDialog = ({open,onClose,onAddCourse}) => {

    const [newCourse,setNewCourse] = useState({     //The state "newCourse" is an object with the following properties
        title: "",
        code: "",
        credits: "",
        description: "",
        image: "",
    });

    const handleChange = (e) => {     //input handling
      const {name,value} = e.target;
      setNewCourse((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {      //form submission
        onAddCourse(newCourse); 

        setNewCourse({    //Resets the form fields by setting "newCourse" back to the initial empty state
          title: "",
          code: "",
          credits: "",
          description: "",
          image: "",
        });

        onClose();
      };
      
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Course</DialogTitle>
      <DialogContent>
        <TextField margin="dense" label="Course Name" name="title" fullWidth variant="outlined"
          value={newCourse.title}
          onChange={handleChange}
        />
        <TextField margin="dense" label="Course Code" name="code" fullWidth variant="outlined"
          value={newCourse.code}
          onChange={handleChange}
        />
        <TextField margin="dense" label="Credits" name="credits" type="number" fullWidth variant="outlined"
          value={newCourse.credits}
          onChange={handleChange}
        />
        <TextField margin="dense" label="Description" name="description" fullWidth multiline rows={4} variant="outlined"
          value={newCourse.description}
          onChange={handleChange}
        />
        <TextField margin="dense" label="Image URL" name="image" fullWidth variant="outlined"
          value={newCourse.image}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary"> Cancel </Button>
        <Button onClick={handleSubmit} color="primary"> Submit </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddCourseDialog;