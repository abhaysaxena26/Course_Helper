import React, { useState } from 'react';
import {Button,Dialog,DialogActions,DialogContent,DialogTitle,TextField,} from "@mui/material";
import axios from "axios";

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

    const handleSubmit = async()=>{
      try{
        const token = localStorage.getItem("token");
        console.log("Token:",token);
        console.log("Course Details:",newCourse);

        const response = await axios.post("https://course-helper-fb5w.vercel.app/courses",newCourse,{ headers: { Authorization: `Bearer ${token}`}});
        alert("Course added successfully");
        location.reload();
        console.log("Course added:",response.data);
        onAddCourse(response.data);
      } catch(error){
        alert("Failed to add course");
        if(error.response){
          console.log("Error adding course:", error.response.data);
        }
        else if(error.request){
          console.log("Error adding course:",error.request);
        }else{
          console.log("Error adding course:",error.message);
        }
      }
    }
      
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