import React from "react";
import { Dialog, DialogTitle, DialogContent, Typography } from "@mui/material";

const ViewCourseDialog = ({ open, course, onClose }) => {
  if (!course) return null; 

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle variant="h5" sx={{ display:'flex',justifyContent:'center'}}>Course Details</DialogTitle>
      <DialogContent>
        <Typography variant="h6">{course.title}</Typography>
        <Typography>Code: {course.code}</Typography>
        <Typography>Credits: {course.credits}</Typography>
        <Typography>{course.description}</Typography>
        <img
          src={course.image}
          alt={course.title}
          style={{ width: "100%", marginTop: "1rem" }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ViewCourseDialog;