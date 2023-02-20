// import React, { useState } from "react";
// import TextField from "@mui/material/TextField";
// import Container from "@mui/material/Container";
// import Button from "@mui/material/Button";
// import Box from "@mui/material/Box";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { FormLabel } from "@mui/material";
// import { useParams } from "react-router-dom";
// import { useRef } from "react"

// const Updatecurriculam = () => {
   
//   return (
//     <Container maxWidth="xs">
//     <h1>Add Curriculum</h1>
//     <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
//       <Box
//         mb={2}
//         sx={{
//           marginTop: 8,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//       >
//         <TextField
//           sx={{ mt: 3 }}
//           variant="outlined"
//           label="Comment"
//           name="cmnt"
//           fullWidth
//           autoComplete="cmnt"
//           autoFocus
//           {...register("cmnt", {
//             required: "Required field",
//           })}
//           error={!!errors?.cmnt}
//           helperText={errors?.cmnt ? errors.cmnt.message : null}
//         />
//         <TextField
//           sx={{ mt: 5 }}
//           variant="outlined"
//           type="file"
//           fullWidth
//           {...register("files", {
//             required: "Required field",
//           })}
//           error={!!errors?.files}
//           helperText={errors?.files && errors.files.message}
//           accept="application/pdf"
//           onChange={handleFileChange}
//         />
//         {/* {fileData && <p>File Data: {fileData}</p>} */}
//       </Box>

//       <Button
//         sx={{ mt: 3 }}
//         type="submit"
//         variant="contained"
//         color="primary"
//         fullWidth
//       >
//         Submit
//       </Button>
//     </form>
//   </Container>
//   )
// }

// export default Updatecurriculam