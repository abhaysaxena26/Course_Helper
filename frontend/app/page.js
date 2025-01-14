"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CourseCard from "@/components/CourseCard";
import AddCourseDialog from "@/components/AddCourseDialog";
import ViewCourseDialog from "@/components/ViewCourseDialog";
import AppBarComponent from "@/components/AppBarComponent";
import UpdateDialogBox from "@/components/UpdateDialogBox";
import { Button } from "@mui/material";
import {useRouter} from "next/navigation";

const Page = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    const fetchCourses = async () => {
      try {
        const response = await axios.get("https://course-helper-fb5w.vercel.app/courses",{ headers: { Authorization: `Bearer ${token}`}});
        console.log(response.data);
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    if(!token){
      router.push("/login");
    }
  }, []);

  // Add Course Dialog Handlers
  const handleOpenAddDialog = () => setOpenAddDialog(true);
  const handleCloseAddDialog = () => setOpenAddDialog(false);

  const handleViewCourse = (course) => {
    setSelectedCourse(course);
    // setIsUpdateMode(false);
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setSelectedCourse(null);
    setOpenViewDialog(false);
    // setIsUpdateMode(false);
  };

  const handleAddCourse = (newCourse) => {
    setCourses((prevCourses) => [...prevCourses, newCourse]);
    handleCloseAddDialog();
  };

  const handleOpenUpdateDialog = () => {
    setOpenViewDialog(false); // Close view dialog
    setOpenUpdateDialog(true); // Open update dialog
  };

  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
    setOpenViewDialog(true); // Reopen view dialog
  };

  const handleUpdateCallback = (courseId,updatedData) => {
    setCourses((prevCourses)=>
      prevCourses.map((course)=>
        course.id === courseId ? {...course, ...updatedData} : course
      )
    );
  };

  return (
    <div>
      <AppBarComponent/>
      
      <div style={{ marginTop: "80px" }} className="flex flex-wrap gap-4 ml-8">
        {courses.map((course) => (
          <CourseCard key={course.code}  course={course} onClick={() => handleViewCourse(course)} />
        ))}
      </div>

      <Button variant="contained" color="primary" style={{ position: "fixed", bottom: 20, left: 20 }} onClick={handleOpenAddDialog}>Add Course</Button>
      <AddCourseDialog
        open={openAddDialog} 
        onClose={handleCloseAddDialog}
        onAddCourse={handleAddCourse}
      />
      {selectedCourse && (
      <ViewCourseDialog
        open={openViewDialog}
        course={selectedCourse}
        onClose={handleCloseViewDialog}
        onUpdate={handleOpenUpdateDialog}
      />
      )}
      <UpdateDialogBox
        open={openUpdateDialog}
        course={selectedCourse}
        onClose={handleCloseUpdateDialog}
        onUpdate={(courseId, updatedData) => {
        handleUpdateCallback(courseId, updatedData);
        handleCloseUpdateDialog();
        handleCloseViewDialog();
        }}
      />
    </div>
  );
};

export default Page;