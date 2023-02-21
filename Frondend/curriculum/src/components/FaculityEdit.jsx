import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";

const EditCurriculums = () => {
  const [CurData, setData] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    axios.get(`http://localhost:3001/pending/${userId}`).then((response) => {
      console.log(response.data);
      setData(response.data);
    });
  }, []);

  return (
    <>
      {CurData.map((data) => (
        <Card
          sx={{
            width: "25%",
            marginTop: "30px",
            padding: "30px",
            backgroundColor: "grey",
            display: "flex",
            justifyContent: "space-evenly",
            alignContent: "space-between",
            color:'#fff'
          }}
        >
          <CardActionArea>
            <CardContent>
              <Typography
                gutterBottom
                variant="body1"
                fontSize="18px"
                component="div"
              >
                Requiremnet Name : {data.reqid.title}
              </Typography>

              <Typography gutterBottom variant="body1" fontSize="18px">
                Type : {data.reqid.type}
              </Typography>
              <Typography gutterBottom variant="body1" fontSize="18px">
                Category : {data.reqid.category}
              </Typography>
              <Typography gutterBottom variant="body1" fontSize="18px">
                Comment : {data.comment}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions component="div">
          <Link to={`/edit/${data._id}`}>

            <Button
              onClick={''}
              size="small"
              variant="contained"
              
              >
            Edit
            </Button>
            </Link>
          </CardActions>
        </Card>
      ))}
    </>
  );
};
export default EditCurriculums;
