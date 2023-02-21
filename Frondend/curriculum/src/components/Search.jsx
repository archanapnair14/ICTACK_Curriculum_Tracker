import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import { Button, CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import AllCurriculums from "./ApprovedCurriculums";

const Search = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const onSubmit = async (event) => {
    const response = await axios.get("http://localhost:3001/search", {
      params: { q: query },
    });
    setResults(response.data);
    console.log(response.data);
    reset();
  };

  return (
    <>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <TextField
              sx={{ mt: 3 }}
              variant="outlined"
              label="Search"
              name="name"
              value={query} onChange={(event) => setQuery(event.target.value)}
              fullWidth
              autoComplete="name"
              autoFocus
              {...register("name", {
                required: "Type Anything To Search",
            })}
              error={!!errors?.name}
              helperText={errors?.name ? errors.name.message : null}
            /> */}
          <TextField
          sx={{ mt: 3,padding:'20px',width:'50%' }}
          variant="outlined"
          placeholder="Search......."
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />

          <Button
          sx={{ mt:5,padding:'18px'}}
          type="submit"
            variant="contained"
            color="success"
          >
            Search
          </Button>
        </form>
      <div style={{ padding: "20px" }}>
        <div style={{ display: "flex", padding: "10px" }}>
          {query.length > 1 ? 
            results.map((data) => (
              <Card
                sx={{
                  width: "25%",
                  marginTop: "30px",
                  padding: "30px",
                  backgroundColor: "beige",
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
              </Card>
            ))
           : (
            <AllCurriculums/>
          )}
        </div>
      </div>
      </>
  );
};
export default Search;
