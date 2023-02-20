import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Navbar from "../Navbar/Navbar";
import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Readcurriclum = () => {
  const navigate = useNavigate();

  const [APIData, setAPIData] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:3001/curriculum`).then((response) => {
      console.log(response.data);
      setAPIData(response.data);
    });
  }, []);

  const onDelete = (_id) => {
    axios.delete(`http://localhost:3001/curriculum/${_id}`).then(() => {
      getData();
    });
  };
  const getData = () => {
    axios.get("http://localhost:3001/curriculum").then((getData) => {
      setAPIData(getData.data);
    });
  };

  const handleApprove = (_id) => {
    axios
      .patch(`http://localhost:3001/curriculum/${_id}`, { status: "Approved" })
      .then((res) => {
        setData(
          data.map((d) => {
            if (d._id === _id) {
              return { ...d, status: "Approved" };
            } else {
              return d;
            }
          })
        );
      })
      .catch((err) => {
        console.error(err);
      });
      navigate('/read');
  };

  return (
    <>
      <Navbar />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell component="th" scope="row">
                Name Of Requirement
              </TableCell>
              <TableCell>Area Of Training</TableCell>
              <TableCell align="right">category</TableCell>
              <TableCell align="right">Comments</TableCell>
              <TableCell align="right">No Of Hours</TableCell>
              <TableCell align="right">Action</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {APIData.map((data) => (
              <TableRow
                key={data._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <TableCell>{data.reqid.title}</TableCell>
                  <TableCell>{data.reqid.type}</TableCell>
                  <TableCell>{data.reqid.category}</TableCell>
                  <TableCell>{data.comment}</TableCell>
                  <TableCell>{data.reqid.hours}</TableCell>
                </TableCell>
                {/* <TableCell>{data.file}</TableCell> */}

                <TableCell>
                  {data.status !== "Approved" && (
                    <Button onClick={() => handleApprove(data._id)}>
                      Approve
                    </Button>
                  )}
                  <Link to={`/updatecurriclum`}>
                    <Button>update</Button>
                  </Link>
                  <Button onClick={() => onDelete(data._id)}>delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Readcurriclum;
