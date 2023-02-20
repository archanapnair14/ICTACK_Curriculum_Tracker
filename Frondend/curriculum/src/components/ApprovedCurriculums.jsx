import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";

const AllCurriculums = () => {
  const [CurData, setData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/curriculum/Approved`).then((response) => {
      console.log(response.data);
      setData(response.data);
    });
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <div style={{ display: "flex", padding: "10px",}}>
          {CurData.map((data) => (
            <Card
              sx={{
                maxWidth: 345,
                marginTop: "30px",
                backgroundColor: "grey",
                color: "#fff",
              }}
            >
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {data.reqid.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {data.comment}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {data.status}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};
export default AllCurriculums;
