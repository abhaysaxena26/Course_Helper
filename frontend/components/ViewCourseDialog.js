import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dialog, DialogTitle, DialogContent, Typography, Button, Box } from "@mui/material";

const ViewCourseDialog = ({ open, course, onClose, onUpdate, onDelete, isUpdateMode }) => {
  const [courseDetails, setCourseDetails] = useState(null);

  useEffect(() => {
    if (course) {
      setCourseDetails({
        title: course.title || "",
        code: course.code || "",
        credits: course.credits || "",
        description: course.description || "",
        image: course.image || "",
      });
    }
  }, [course]);

  if (!courseDetails) return null; // Avoid rendering when no course is selected

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Course Details</DialogTitle>
      <DialogContent>
        <Typography variant="h6">{course.title}</Typography>
        <Typography>Code: {course.code}</Typography>
        <Typography>Credits: {course.credits}</Typography>
        <Typography>{course.description}</Typography>
        {course.image && (
          <img
            src={course.image}
            alt={course.title}
            style={{ width: "100%", marginTop: "1rem" }}
          />
        )}
        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
          <Button variant="contained" color="primary" onClick={onUpdate}>
            Edit
          </Button>
          <Button variant="contained" color="secondary" onClick={onClose}>
            Close
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ViewCourseDialog;