"use client";
import React, { useState } from "react";
import CourseCard from "@/components/CourseCard";
import AddCourseDialog from "@/components/AddCourseDialog";
import ViewCourseDialog from "@/components/ViewCourseDialog"; 
import { Button } from "@mui/material";
import AddBarComponent from "@/components/AppBarComponent";

const CourseList = [
  {
    image: "/images/machineLearning.jpg",
    title: "Machine Learning",
    code: "CS771",
    credits: 9,
    description: "An advanced course on machine learning algorithms.",
  },
  {
    image: "/images/DSAi.webp",
    title: "Data Structures",
    code: "ESC 207",
    credits: 11,
    description: "Learn about arrays, linked lists, trees, and more.",
  },
  {
    image: "/images/fluidMi.jpg",
    title: "Fluid Mechanics",
    code: "ME302",
    credits: 9,
    description: "Fundamentals of fluid mechanics and applications.",
  },
  {
    image: "/images/electro.jpg",
    title: "Introduction to Electronics",
    code: "ESC201",
    credits: 14,
    description: "Basics of electrical circuits and applications.",
  },
  {
    image: "/images/linearA.webp",
    title: "Linear Algebra",
    code: "MTH113",
    credits: 6,
    description: "Basic knowledge of class XII algebra and a familiarity with calculus",
  },
  {
    image: "/images/lif.jpg",
    title: "Introduction to Biology",
    code: "LIF111",
    credits: 6,
    description: "Principles of Inheritance",
  },
  {
    image: "/images/physical2.webp",
    title: "Physical Chemistry",
    code: "CHM112",
    credits: 6,
    description: "Introduction to principles of Quantum chemistry",
  },
  {
    image: "/images/ta.webp",
    title: "Engineering Graphics",
    code: "TA111",
    credits: 9,
    description: "Fundamentals of technical drawing and graphics",
  },
  {
    image: "/images/osci2.png",
    title: "Oscillation and Waves",
    code: "PHY115",
    credits: 11,
    description: "Basic mathematics and physics of oscillatory and wave phenomena",
  },
  {
    image: "/images/plab.jpg",
    title: "Physics Laboratory",
    code: "PHY111",
    credits: 3,
    description: "Designed to inculcate a hands-on approach towards experimental physics.",
  },
];

const page = () => {
  const [courses, setCourses] = useState(CourseList);
  const [openAddDialog, setOpenAddDialog] = useState(false);            // For Add Course Dialog
  const [openViewDialog, setOpenViewDialog] = useState(false);          // For View Course Dialog
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);                                 // Close the View Course dialog
    setSelectedCourse(null);                                  // Clear the selected course
  };

  
  const handleOpenAddDialog = () => setOpenAddDialog(true);   // Handle opening the Add Course dialog
  const handleCloseAddDialog = () => setOpenAddDialog(false);   // Handle closing the Add Course dialog

  
  const handleAddCourse = (newCourse) => {                           // Handle adding a new course
    setCourses((prevCourses) => [...prevCourses, newCourse]);       // Add new course to the list
    handleCloseAddDialog();                                        // Close the Add Course dialog
  };

  const handleCardClick = (course) => {              //Opening the Card on clicking
    setSelectedCourse(course);                      // Set the selected course
    setOpenViewDialog(true);                       // Open the View Course dialog
  };

  return (
    <div>
      <AddBarComponent />
      <div style={{ marginTop: "80px" }} className="flex flex-wrap gap-4 ml-8">
        {courses.map((course, index) => (
          <CourseCard
            key={index}
            image={course.image}
            title={course.title}
            code={course.code}
            credits={course.credits}
            description={course.description}
            onClick={() => handleCardClick(course)} // Open View Course dialog on click
          />
        ))}
      </div>

      <Button
        variant="contained"
        color="primary"
        style={{ position: "fixed", bottom: 20, left: 20 }}
        onClick={handleOpenAddDialog}            // Open Add Course dialog
      >
        Add Course
      </Button>

      <AddCourseDialog
        open={openAddDialog}                   // State for Add Course dialog
        onClose={handleCloseAddDialog}        // Handle closing Add Course dialog
        onAddCourse={handleAddCourse}        // Handle adding a new course
      />

      <ViewCourseDialog
        open={openViewDialog}                // State for View Course dialog
        course={selectedCourse}             // Pass the selected course
        onClose={handleCloseViewDialog}     // Handle closing View Course dialog
      />
    </div>
  );
};

export default page;