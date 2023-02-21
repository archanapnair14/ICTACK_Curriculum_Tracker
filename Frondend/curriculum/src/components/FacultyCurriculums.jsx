import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Search from "./Search";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const MyCard = () => {
  const [CurData, setData] = useState([]);
  const [loading, setLoading] = useState(false);

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

    const handleDownload = async (id) => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3001/files/${id}`, {
          responseType: "blob",
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "file.pdf");
        document.body.appendChild(link);
        link.click();
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    return (
    <>
      {/* <div style={{padding:"20px"}}>
        <div style={{ display: "flex", padding: "10px" }}> */}
          {CurData.map((data) => (
            <Card sx={{ width:"25%", marginTop: "30px",padding:'30px',backgroundColor:'beige'}}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="body1" fontSize='20px' component='div'>
                    Requirment Name : {data.reqid.title}
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
              <CardActions component="div">
                  <Button onClick={()=>handleDownload(data._id)} size="small" color="primary" disabled={loading}>
                  {loading ? "Downloading..." : "Download File"}
                </Button> 
              
              </CardActions>
            </Card>
          ))}
        {/* </div>
              </div> */}
    </>
  );
};
export default MyCard;
