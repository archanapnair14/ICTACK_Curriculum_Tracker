import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { FormLabel } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Sidemenu from "./Dashboard";

const EditCurriculam = () => {

  const navigate = useNavigate();
  const [datas,setData]= useState('');
  const [file, setFileData] = useState(null);
  const [message, setMessage] = useState('');


  const { id } = useParams();
  const userId = localStorage.getItem('userId');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios.get(`http://localhost:3001/curriculum/${id}`).then((response) => {
      console.log(response.data);
      setData(response.data);
    });
  }, []);

  const handleFileChange = (e) => {
    const fileData = e.target.files[0];
    console.log(fileData);
    setFileData(fileData);
  };  
  
  const onSubmit = async(data) => {
    console.log(data);
    const formData = new FormData();
    formData.append('comment',data.cmnt);
    formData.append('file',file);

    try {
      const response = await axios.put(`http://localhost:3001/edit/${id}`, formData);
      console.log(response.data.message);
      reset();
      navigate('/edits');
    
    } catch (error) {
      console.error(error);
      setMessage    ('Error updating image');
    }
  };

  return (
    <Box sx={{display:"flex",backgroundColor:'lightblue',height:900,mt:6}}>
    <Sidemenu/>

    <Container maxWidth="xs">
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <Box
          mb={2}
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            gutterBottom
            variant="h4"
            fontFamily="cursive"
            component="div"
          >
            Edit Curriculum
          </Typography>
          <TextField
            sx={{ mt: 3 }}
            variant="outlined"
            label="Comment"
            name="cmnt"
            value={datas.comment}
            fullWidth
            autoComplete="cmnt"
            autoFocus
            {...register("cmnt", {
              required: "Required field",
            })}
            error={!!errors?.cmnt}
            helperText={errors?.cmnt ? errors.cmnt.message : null}
          />
          <TextField
            sx={{ mt: 5 }}
            variant="outlined"
            type="file"
            defaultValue={datas.filename}
            fullWidth
            {...register("files", {
              required: "Required field",
            })}
            error={!!errors?.files}
            helperText={errors?.files && errors.files.message}
            inputProps={{ aaccept:"application/pdf" }}
            onChange={handleFileChange}
          />
        </Box>

        <Button
          sx={{ mt: 3 }}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Submit
        </Button>
      </form>
    </Container>
    </Box>
  );
};

export default EditCurriculam;
