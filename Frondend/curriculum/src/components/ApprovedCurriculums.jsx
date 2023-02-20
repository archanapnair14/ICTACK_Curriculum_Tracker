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
    axios.get(`http://localhost:3001/curriculums`).then((response) => {
      console.log(response.data);
      setData(response.data);
    });
  }, []);

  return (
    <>
      <Navbar />
      <div style={{padding:"20px"}}>
          {CurData.map((data) => (
          <div style={{ display: "flex"}}>
            <Card sx={{ width:"25%", marginTop: "30px",padding:'30px',backgroundColor:'beige',border:'2px solid',display:"flex",justifyContent:'space-evenly',alignContent:'space-between'}}>
           <CardActionArea>
             <CardContent>
                  <Typography gutterBottom variant="body1" fontSize='18px' component='div'>
                    Requiremnet Name : {data.reqid.title}
                  </Typography>
                
                  <Typography gutterBottom variant="body1" fontSize='18px'>
                    Type : {data.reqid.type}
                  </Typography>
                  <Typography gutterBottom variant="body1" fontSize='18px'>
                    Category : {data.reqid.category}
                  </Typography>
                  <Typography gutterBottom variant="body1" fontSize='18px'>
                    Comment : {data.comment}
                  </Typography>
               </CardContent>
              </CardActionArea>
            </Card>
            </div>

          ))}
      </div>
    </>
  );
};
export default AllCurriculums;
