import React from "react";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Requirements = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const title = data.title;
    const type = data.type;
    const organisation = data.organisation;
    const category = data.category;
    const hours = data.hours;

    reset();

    axios
      .post(`http://localhost:3001/requirements/`, {
        title,
        type,
        category,
        organisation,
        hours,
      })
      .then(() => {
        navigate("/");
        alert("Success");
      });
  };
  return (
    <>
      <Container maxWidth="xs">
        <h1>Add Requirements</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            mb={2}
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              sx={{ mt: 3 }}
              variant="outlined"
              label="Name Of requirement"
              name="title"
              fullWidth
              autoComplete="title"
              autoFocus
              {...register("title", {
                required: "Required field",
              })}
              error={!!errors?.title}
              helperText={errors?.title ? errors.title.message : null}
            />
            <FormControl sx={{ mt: 3 }} fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Area Of Requirement
              </InputLabel>
              <Select
                label="Select Area Of Requirement"
                {...register("type", {
                  required: "Required field",
                })}
                error={!!errors?.type}
                helperText={errors?.type ? errors.type.message : null}
              >
                <MenuItem value={"FSD"}>FSD</MenuItem>
                <MenuItem value={"DSA"}>DSA</MenuItem>
                <MenuItem value={"ML-AI"}>ML-AI</MenuItem>
                <MenuItem value={"RPA"}>RPA</MenuItem>
                <MenuItem value={"ST"}>ST</MenuItem>
                <MenuItem value={"CSA"}>CSA</MenuItem>
              </Select>
            </FormControl>
            <TextField
              sx={{ mt: 3 }}
              variant="outlined"
              label="Institute or Co-operate office"
              name="organisation"
              fullWidth
              autoComplete="organisation"
              autoFocus
              {...register("organisation", {
                required: "Required field",
              })}
              error={!!errors?.organisation}
              helperText={
                errors?.organisation ? errors.organisation.message : null
              }
            />
            <FormControl sx={{ mt: 3 }} fullWidth>
              <InputLabel id="demo-simple-select-label">
                Category Of Requirement
              </InputLabel>
              <Select
                label="Select Category Of Requirement"
                {...register("category", {
                  required: "Required field",
                })}
                error={!!errors?.category}
                helperText={errors?.category ? errors.category.message : null}
              >
                <MenuItem value={"Retail"}>Retail</MenuItem>
                <MenuItem value={"Academic"}>Academic</MenuItem>
                <MenuItem value={"Co-operate"}>Co-operate</MenuItem>
              </Select>
            </FormControl>

            <TextField
              sx={{ mt: 3 }}
              variant="outlined"
              label="Number Of Hours Of Training"
              name="hours"
              fullWidth
              autoComplete="hours"
              autoFocus
              {...register("hours", {
                required: "Required field",
              })}
              error={!!errors?.iname}
              helperText={errors?.iname ? errors.iname.message : null}
            />
          </Box>

          <Button
            sx={{ mt: 3 }}
            type="submit"
            variant="contained"
            color="success"
            fullWidth
          >
            Add
          </Button>
        </form>
      </Container>
    </>
  );
};

export default Requirements;
