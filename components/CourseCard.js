import React from 'react';
import { Card, CardContent, CardMedia, Typography} from "@mui/material";

const CourseCard = ({image,title,code,credits,description,onClick}) => {
  return (
    <Card sx={{ maxWidth: 410, width:"100%", margin:"2rem", cursor:"pointer"}} onClick={onClick}>
        <CardMedia component="img" sx={{height:220, width:"100%",objectFit:"cover"}} image={image} alt='title'/>
        <CardContent>
            <Typography gutterBottom variant="h6" component="div">{title}</Typography>
            <Typography variant="body2" color="text.secondary">Code: {code}</Typography>
            <Typography variant="body2" color="text.secondary">Credits: {credits}</Typography>
            <Typography variant="body2" color="text.secondary">{description}</Typography>
        </CardContent>
    </Card>
  )
}

export default CourseCard;