import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Search from "./Search";

const MyCard = () => {
  const [CurData, setData] = useState([]);

  const id = localStorage.getItem("userId");
  console.log(id);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/curriculum/${id}/Approved`)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      });
  }, []);

  return (
    <>
      <Navbar />
      {/* <Search/> */}
      <div>
        <div style={{ display: "flex", padding: "10px" }}>
          {CurData.map((data) => (
            <Card sx={{ maxWidth: 345, marginTop: "30px" }}>
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
              <CardActions>
                <Button size="small" color="primary">
                  Download
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};
export default MyCard;
