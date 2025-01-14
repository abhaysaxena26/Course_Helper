import React from 'react';
import { Card, CardContent, CardMedia, Typography} from "@mui/material";

const CourseCard = ({course,onClick}) => {
  return (
    <Card sx={{ maxWidth: 410, width:"100%", margin:"2rem", cursor:"pointer"}} onClick={onClick}>
        <CardMedia component="img" sx={{height:220, width:"100%",objectFit:"cover"}} image={course.image} alt='title'/>
        <CardContent>
            <Typography gutterBottom variant="h6" component="div">{course.title}</Typography>
            <Typography variant="body2" color="text.secondary">Code: {course.code}</Typography>
            <Typography variant="body2" color="text.secondary">Credits: {course.credits}</Typography>
            <Typography variant="body2" color="text.secondary">{course.description}</Typography>
        </CardContent>
    </Card>
  )
}

export default CourseCard;