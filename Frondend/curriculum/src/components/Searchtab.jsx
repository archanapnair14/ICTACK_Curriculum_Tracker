import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import { Button, CardActionArea,CardActions } from "@mui/material";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MyCard from "./FacultyCurriculums";
import Sidemenu from "./Dashboard";

const Searchtab = () => {
  const userid = localStorage.getItem('userId');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);


  const onSubmit = async (event) => {
    const response = await axios.get(`http://localhost:3001/search/${userid}`, {
      params: { q: query },
    });
    setResults(response.data);
    console.log(response.data);
    reset();
  };

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
        <Box sx={{backgroundColor:'lightblue',height:900,mt:1}}>
          <Sidemenu/>

      <form onSubmit={handleSubmit(onSubmit)}>
        
        <TextField
          sx={{ padding:'20px',width:'50%',ml:6 }}
          variant="outlined"
          placeholder="Search......."
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        <Button
          sx={{ mt:2,ml:6,padding:'15px',width:'10%'}}
          type="submit"
          variant="contained"
          color="primary"
        >
          Search
        </Button>
      </form>
      <div style={{ padding: "20px",ml:4 }}>
        <div style={{ display: "flex", padding: "10px",}}> 
          {query.length > 1 ? (
            results.map((data) => (
              <Card
                sx={{
                  width: "25%",
                  marginTop: "30px",
                  padding: "30px",
                  backgroundColor: "beige",
                  marginLeft:'30px'
                }}
              >
                <CardActionArea>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="body1"
                      fontSize="20px"
                      component="div"
                    >
                      Requirment Name : {data.reqid.title}
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
                  <Button
                    onClick={() => handleDownload(data._id)}
                    size="small"
                    color="primary"
                    disabled={loading}
                  >
                    {loading ? "Downloading..." : "Download File"}
                  </Button>
                </CardActions>
              </Card>
            ))
          ) : (
            <MyCard />
          )}
         </div>
      </div> 
      </Box>
    </>
  );
};
export default Searchtab;
