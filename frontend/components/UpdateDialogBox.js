import React, { useState } from 'react';
import {Box,Button,Dialog,DialogContent,DialogTitle,TextField,} from "@mui/material";
import axios from "axios";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const UpdateDialogBox = ({ open, course, onClose, onUpdate }) => {
    const [courseDetails, setCourseDetails] = useState(null);
    const router = useRouter();
    useEffect(() => {
      if (course) {
        setCourseDetails({ ...course });
      }
    }, [course]);
  
    const handleInputChange = (field, value) => {
      setCourseDetails((prevDetails) => ({ ...prevDetails, [field]: value }));
    };

    const handleDelete = async () => {
      if (!course || !course.code) {
          alert("Invalid course selected!");
          console.error("Course or course code is undefined.");
          return;
      }
      try {
          const token = localStorage.getItem("token");
          console.log("Deleting course:", course);
          await axios.delete(`https://course-helper-fb5w.vercel.app/courses/${course.code}`, {
              headers: { Authorization: `Bearer ${token}` },
          });
          alert("Course deleted successfully");
          location.reload();
          onClose();
      } catch (error) {
          alert("Failed to delete course");
          console.error("Error deleting course:", error.response?.data || error.message);
      }
  };
    const handleSubmit = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.put(`https://course-helper-fb5w.vercel.app/${course.code}`,courseDetails,{ headers: { Authorization: `Bearer ${token}` } });
        alert("Course updated successfully");
        if (onUpdate) onUpdate(course.id, response.data); // Update parent state
        location.reload();
      } catch (error) {
        alert("Failed to update course");
        console.error(error.response?.data || error.message);
      }
    };
  
    if (!courseDetails) return null;
  
    return (
      <Dialog open={open} onClose={onClose} fullWidth>
        <DialogTitle>Update Course</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            value={courseDetails.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Code"
            value={courseDetails.code}
            onChange={(e) => handleInputChange("code", e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Credits"
            value={courseDetails.credits}
            onChange={(e) => handleInputChange("credits", e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={courseDetails.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Image URL"
            value={courseDetails.image}
            onChange={(e) => handleInputChange("image", e.target.value)}
            fullWidth
            margin="normal"
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
          <Button variant="contained" color="primary" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Update
          </Button>
          </Box>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default UpdateDialogBox;