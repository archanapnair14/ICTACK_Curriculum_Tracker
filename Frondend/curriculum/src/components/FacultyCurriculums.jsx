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

    // const downloadFile = async (filename) => {
    //   try {
    //     const response = await axios.get(`http://localhost:3001/files/${filename}`, {
    //       responseType: 'blob' // set the response type to 'blob' to download the file as a binary object
    //     });
    //     const url = window.URL.createObjectURL(new Blob([response.data]));
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.setAttribute('download', filename); // set the name of the downloaded file to the original filename
    //     document.body.appendChild(link);
    //     link.click();
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    // const downloadPdf = (id) => {
    //   fetch(`http://localhost:3001/files/${id}`)
    //     .then(response => {
    //       if (!response.ok) {
    //         throw new Error('Network response was not ok');
    //       }
    //       return response.blob();
    //     })
    //     .then(blob => {
    //       const url = window.URL.createObjectURL(new Blob([blob]));
    //       const link = document.createElement('a');
    //       link.href = url;
    //       link.setAttribute('download',id);
    //       document.body.appendChild(link);
    //       link.click();
    //       link.remove();
    //     })
    //     .catch(error => {
    //       console.error('Error:', error);
    //     });
    // }

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
                {/* <Button onClick={() => downloadPdf(data._id)} size="small" color="primary">
                  Download
                </Button> */}
                  <Button onClick={()=>handleDownload(data._id)} size="small" color="primary">
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
