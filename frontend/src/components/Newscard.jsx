import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

const NewsCard = ({ title, author, content, date, image, link }) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        marginBottom: 10,
      }}
    >
      <CardActionArea href={link} target="_blank">
        <CardMedia component="img" height="140" image={image} alt={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Author:</strong> {author}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Date:</strong> {date}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" href={link} target="_blank">
          Read More
        </Button>
      </CardActions>
    </Card>
  );
};

export default NewsCard;
