import React, { useState, useEffect } from "react";
import {
  TextField,
  Grid,
  Button,
  Typography,
  makeStyles,
  useMediaQuery,
  Snackbar,
} from "@material-ui/core";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./App.css";
import Registration from "./Registration";
import axios from "axios";
import MuiAlert from "@mui/material/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    "& label.Mui-focused": {
      color: "black",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "black",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "black",
      },
      "&:hover fieldset": {
        borderColor: "black",
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
  },
  container: {
    padding: theme.spacing(4),
    backgroundColor: "#F5EBE0",
    minHeight: "100vh",
  },
  formContainer: {
    backgroundColor: "#FEFCF3",
    borderRadius: 8,
    boxShadow: 2,
    padding: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  formInput: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: "100%",
  },
  submitButton: {
    marginTop: theme.spacing(2),
    backgroundColor: "#704F4F",
    width: "100%",
  },
  heading: {
    color: "#472D2D",
    backgroundColor: "#F5EBE0",
    textAlign: "center",
    padding: theme.spacing(1),
  },
  id: {
    backgroundColor: "#F5EBE0",
    textAlign: "right",
    paddingRight: theme.spacing(4),
  },
  idField13: {
    width: "8vw",
  },
  idField: {
    width: "10vw",
  },
}));

const Certificate = (props) => {
  const classes = useStyles();
  const [groomName, setGroomName] = useState("");
  const [groomFatherName, setGroomFatherName] = useState("");
  const [groomMotherName, setGroomMotherName] = useState("");
  const [groomPhone, setGroomPhone] = useState("");
  const [groomAadhar, setGroomAadhar] = useState("");
  const [groomAddress, setGroomAddress] = useState("");
  const [brideName, setBrideName] = useState("");
  const [brideFatherName, setBrideFatherName] = useState("");
  const [brideMotherName, setBrideMotherName] = useState("");
  const [bridePhone, setBridePhone] = useState("");
  const [brideAadhar, setBrideAadhar] = useState("");
  const [brideAddress, setBrideAddress] = useState("");
  const [headGranthi, setHeadGranthi] = useState("");
  const [marriageDate, setMarriageDate] = React.useState(dayjs());
  const [error, setError] = useState("");
  const [isGroomName, setIsGroomName] = useState(false);
  const [isGroomFather, setIsGroomFatherName] = useState(false);
  const [isGroomMother, setIsGroomMotherName] = useState(false);
  const [isGroomPhone, setIsGroomPhone] = useState(false);
  const [isGroomAadhar, setIsGroomAadhar] = useState(false);
  const [isGroomAddress, setIsGroomAddress] = useState(false);
  const [isBrideName, setIsBrideName] = useState(false);
  const [isBrideFather, setIsBrideFatherName] = useState(false);
  const [isBrideMother, setIsBrideMotherName] = useState(false);
  const [isBridePhone, setIsBridePhone] = useState(false);
  const [isBrideAadhar, setIsBrideAadhar] = useState(false);
  const [isBrideAddress, setIsBrideAddress] = useState(false);
  const [isHeadGranthi, setIsHeadGranthi] = useState(false);

  const isMobile = useMediaQuery("(max-width:800px)");
  const is13inch = useMediaQuery("(max-width:1400px)");

  const [data, setData] = useState([]);
  const [id, setId] = useState(data.length);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/getData");

      if (response.status === 200) {
        setData(response.data.data);
        setId(response.data.data.length);
      } else {
        console.error("Failed to fetch data. Status Code:", response.status);
      }
    } catch (error) {
      console.error("Error occurred while fetching data:", error.message);
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);

  const [successMessageOpen, setSuccessMessageOpen] = useState(false);

  const handleSuccessMessageClose = () => {
    setSuccessMessageOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      id: id,
      groomName: groomName,
      groomFatherName: groomFatherName,
      groomMotherName: groomMotherName,
      groomPhone: groomPhone,
      groomAadhar: groomAadhar,
      groomAddress: groomAddress,
      brideName: brideName,
      brideFatherName: brideFatherName,
      brideMotherName: brideMotherName,
      bridePhone: bridePhone,
      brideAadhar: brideAadhar,
      brideAddress: brideAddress,
      marriageDate: marriageDate.format("DD-MM-YYYY"),
      headGranthi: headGranthi,
    };

    try {
      await axios.post("http://localhost:3001/saveData", data);
      setId(id + 1);
      setSuccessMessageOpen(true);
      setOpen(true);
    } catch (error) {
      console.error("Error saving data:", error);
    }
    setOpen(true);

    // if (
    //   !groomName ||
    //   !groomFatherName ||
    //   !groomMotherName ||
    //   !groomPhone ||
    //   !groomAadhar ||
    //   !brideName ||
    //   !brideFatherName ||
    //   !brideMotherName ||
    //   !bridePhone ||
    //   !brideAadhar ||
    //   !headGranthi ||
    //   !marriageDate
    // ) {
    //   setError("This is required field");
    // } else {
    //   setError("");
    //   setAnchorEl(event.currentTarget);
    // }
  };

  return (
    <>
      <div className={classes.heading}>
        <h2> ☬ GURUDWARA SAHIB SHAHEED BHAI MATI DASS JI (Regd.)</h2>
      </div>
      <div className={classes.id}>
        <Typography>Ref. No. #{id}</Typography>
      </div>
      <Grid container spacing={isMobile ? 0 : 1} className={classes.container}>
        <Grid
          xs={is13inch ? 12 : isMobile ? 12 : 4}
          className={classes.formContainer}
        >
          <Typography variant="h5" gutterBottom>
            GROOM
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              required
              error={isGroomName ? false : Boolean(error)}
              helperText={isGroomName ? "" : error}
              margin="dense"
              variant="outlined"
              value={groomName}
              onChange={(event) => {
                setGroomName(event.target.value);
                setIsGroomName(true);
              }}
              className={classes.formInput}
            />
            <TextField
              label="Father's Name"
              required
              error={isGroomFather ? false : Boolean(error)}
              helperText={isGroomFather ? "" : error}
              margin="dense"
              variant="outlined"
              value={groomFatherName}
              onChange={(event) => {
                setGroomFatherName(event.target.value);
                setIsGroomFatherName(true);
              }}
              className={classes.formInput}
            />
            <TextField
              label="Mother's Name"
              required
              error={isGroomMother ? false : Boolean(error)}
              helperText={isGroomMother ? "" : error}
              margin="dense"
              variant="outlined"
              value={groomMotherName}
              onChange={(event) => {
                setGroomMotherName(event.target.value);
                setIsGroomMotherName(true);
              }}
              className={classes.formInput}
            />
            <TextField
              label="Phone No."
              required
              error={isGroomPhone ? false : Boolean(error)}
              helperText={isGroomPhone ? "" : error}
              margin="dense"
              variant="outlined"
              value={groomPhone}
              onChange={(event) => {
                setGroomPhone(event.target.value);
                setIsGroomPhone(true);
              }}
              className={classes.formInput}
            />
            <TextField
              label="Aadhar No."
              required
              error={isGroomAadhar ? false : Boolean(error)}
              helperText={isGroomAadhar ? "" : error}
              margin="dense"
              variant="outlined"
              value={groomAadhar}
              onChange={(event) => {
                setGroomAadhar(event.target.value);
                setIsGroomAadhar(true);
              }}
              className={classes.formInput}
            />
            <TextField
              label="Address"
              multiline
              required
              error={isGroomAddress ? false : Boolean(error)}
              helperText={isGroomAddress ? "" : error}
              maxRows={6}
              variant="outlined"
              value={groomAddress}
              onChange={(event) => {
                setGroomAddress(event.target.value);
                setIsGroomAddress(true);
              }}
              className={classes.formInput}
            />
          </form>
        </Grid>
        <Grid
          xs={is13inch ? 12 : isMobile ? 12 : 4}
          className={classes.formContainer}
        >
          <Typography variant="h5" gutterBottom>
            BRIDE
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              required
              color="secondary"
              error={isBrideName ? false : Boolean(error)}
              helperText={isBrideName ? "" : error}
              margin="dense"
              variant="outlined"
              value={brideName}
              onChange={(event) => {
                setBrideName(event.target.value);
                setIsBrideName(true);
              }}
              className={classes.formInput}
            />
            <TextField
              label="Father's Name"
              required
              color="secondary"
              error={isBrideFather ? false : Boolean(error)}
              helperText={isBrideFather ? "" : error}
              margin="dense"
              variant="outlined"
              value={brideFatherName}
              onChange={(event) => {
                setBrideFatherName(event.target.value);
                setIsBrideFatherName(true);
              }}
              className={classes.formInput}
            />
            <TextField
              label="Mother's Name"
              required
              color="secondary"
              error={isBrideMother ? false : Boolean(error)}
              helperText={isBrideMother ? "" : error}
              margin="dense"
              variant="outlined"
              value={brideMotherName}
              onChange={(event) => {
                setBrideMotherName(event.target.value);
                setIsBrideMotherName(true);
              }}
              className={classes.formInput}
            />
            <TextField
              label="Phone No."
              required
              color="secondary"
              error={isBridePhone ? false : Boolean(error)}
              helperText={isBridePhone ? "" : error}
              margin="dense"
              variant="outlined"
              value={bridePhone}
              onChange={(event) => {
                setBridePhone(event.target.value);
                setIsBridePhone(true);
              }}
              className={classes.formInput}
            />
            <TextField
              label="Aadhar No."
              required
              color="secondary"
              error={isBrideAadhar ? false : Boolean(error)}
              helperText={isBrideAadhar ? "" : error}
              margin="dense"
              variant="outlined"
              value={brideAadhar}
              onChange={(event) => {
                setBrideAadhar(event.target.value);
                setIsBrideAadhar(true);
              }}
              className={classes.formInput}
            />
            <TextField
              label="Address"
              multiline
              required
              color="secondary"
              error={isBrideAddress ? false : Boolean(error)}
              helperText={isBrideAddress ? "" : error}
              maxRows={6}
              variant="outlined"
              value={brideAddress}
              onChange={(event) => {
                setBrideAddress(event.target.value);
                setIsBrideAddress(true);
              }}
              className={classes.formInput}
            />
          </form>
        </Grid>
        <Grid
          xs={is13inch ? 12 : isMobile ? 12 : 3}
          className={classes.formContainer}
        >
          <Typography variant="h5" gutterBottom>
            OTHER DETAILS
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Head Granthi's Name"
              variant="outlined"
              required
              error={isHeadGranthi ? false : Boolean(error)}
              helperText={isHeadGranthi ? "" : error}
              margin="dense"
              onChange={(event) => {
                setHeadGranthi(event.target.value);
                setIsHeadGranthi(true);
              }}
              className={classes.formInput}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  className={classes.formInput}
                  label="Date of Marriage"
                  format="DD-MM-YYYY"
                  required
                  value={marriageDate}
                  onChange={(newValue) => setMarriageDate(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.submitButton}
            >
              Submit
            </Button>
            <Snackbar
              open={successMessageOpen}
              autoHideDuration={3000}
              onClose={handleSuccessMessageClose}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <MuiAlert
                elevation={6}
                variant="filled"
                onClose={handleSuccessMessageClose}
                severity="success"
              >
                Data Submitted successfully!
              </MuiAlert>
            </Snackbar>
            <Registration
              open={open}
              handleClose={handleClose}
              id={id}
              groomName={groomName}
              groomFatherName={groomFatherName}
              groomMotherName={groomMotherName}
              groomAddress={groomAddress}
              groomAadhar={groomAadhar}
              groomPhone={groomPhone}
              brideName={brideName}
              brideFatherName={brideFatherName}
              brideMotherName={brideMotherName}
              brideAddress={brideAddress}
              brideAadhar={brideAadhar}
              bridePhone={bridePhone}
              marriageDate={marriageDate}
              headGranthi={headGranthi}
              handleChange={props.handleChange}
            />
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default Certificate;
