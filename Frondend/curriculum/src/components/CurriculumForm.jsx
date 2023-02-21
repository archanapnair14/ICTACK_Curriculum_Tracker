import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormLabel } from "@mui/material";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import Typography from "@mui/material/Typography";



const Curriculum = () => {
  const [file, setFileData] = useState(null);
  const navigate = useNavigate();

  const { id } = useParams();
  const fileInput = useRef();

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setError,
    resetField,
    formState: { errors },
  } = useForm();

  const handleFileChange = (e) => {
    const fileData = e.target.files[0];
    console.log(fileData);
    setFileData(fileData);
  };

  const onSubmit = (data) => {
    const userId = localStorage.getItem("userId");
    const formData = new FormData();
    formData.append("comment", data.cmnt);
    formData.append("reqid", id);
    formData.append("userId", userId);
    formData.append("file", file);
    formData.append("status",'');

    fetch("http://localhost:3001/curriculum", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
      reset();
      navigate('/view')
  };

  return (
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
            Add Curriculum
          </Typography>
          <TextField
            sx={{ mt: 3 }}
            variant="outlined"
            label="Comment"
            name="cmnt"
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
            fullWidth
            {...register("files", {
              required: "Required field",
            })}
            error={!!errors?.files}
            helperText={errors?.files && errors.files.message}
            accept="application/pdf"
            onChange={handleFileChange}
          />
          {/* {fileData && <p>File Data: {fileData}</p>} */}
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
  );
};

export default Curriculum;
