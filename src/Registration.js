import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import "./Registration.css";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Certificate from "./Certificate";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

async function GenerateReceipt() {
  const canvas = await html2canvas(document.querySelector("#boxCapture"));
  const imgData = canvas.toDataURL("image/png", 1.0);
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: [612, 792],
  });
  pdf.internal.scaleFactor = 1;
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save("Registration Slip.pdf");
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  overflow: "scroll",
  height: "100%",
  display: "block",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  padding: "3rem",
};

export default function Registration(props) {
  const date = props.marriageDate;
  const day = date["$d"].getDate().toString().padStart(2, "0");
  const month = (date["$d"].getMonth() + 1).toString().padStart(2, "0");
  const year = date["$d"].getFullYear().toString();
  const formattedDate = `${day}-${month}-${year}`;

  const [snackOpen, setSnackOpen] = React.useState(false);

  const handleClick = () => {
    setSnackOpen(true);
  };

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackOpen(false);
  };

  const handleDownload = async () => {
    await GenerateReceipt();
    props.handleClose();
    handleClick();
    window.location.reload();
  };

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div id="boxCapture" className="boxCapture">
            <br /> <br /> <br /> <br /> <br /> <br />
            <Typography
              id="anad-karaj"
              className="anad-karaj"
              variant="h6"
              component="h2"
              gutterBottom
            >
              ANAND KARAJ
            </Typography>
            <div className="container-1">
              <Typography className="ref-no" gutterBottom>
                Ref. No.: GSSBMD/BD/YNR/{props.id}
              </Typography>
              <Typography className="dated" gutterBottom>
                Dated: {formattedDate}
              </Typography>
            </div>
            <div className="container-2">
              <Typography gutterBottom>
                GROOM'S NAME: {props.groomName}
              </Typography>
            </div>
            <div className="container-3">
              <Typography gutterBottom>
                MOTHER'S NAME: {props.groomMotherName}
              </Typography>
              <Typography gutterBottom>
                FATHER'S NAME: {props.groomFatherName}
              </Typography>
            </div>
            <div className="container-2">
              <Typography gutterBottom>
                GROOM'S ADDRESS: {props.groomAddress}
              </Typography>
            </div>
            <div className="container-3">
              <Typography gutterBottom>
                CONTACT NO.: {props.groomPhone}
              </Typography>
              <Typography gutterBottom>
                AADHAR NO.: {props.groomAadhar}
              </Typography>
            </div>
            <br /> <br />
            <div className="container-4">
              <Typography gutterBottom>
                ...............................
              </Typography>
              <Typography gutterBottom>
                ...............................
              </Typography>
              <Typography gutterBottom>
                ...............................
              </Typography>
            </div>
            <div className="container-5">
              <Typography gutterBottom>FATHER'S SIGN</Typography>
              <Typography gutterBottom>GROOM'S SIGN</Typography>
              <Typography gutterBottom>WITNESS' SIGN</Typography>
            </div>
            <br />
            <hr
              style={{
                background: "black",
                color: "black",
                borderColor: "black",
              }}
            />
            <hr
              style={{
                background: "black",
                color: "black",
                borderColor: "black",
              }}
            />{" "}
            <br />
            <div className="container-2">
              <Typography gutterBottom>
                BRIDE'S NAME: {props.brideName}
              </Typography>
            </div>
            <div className="container-3">
              <Typography gutterBottom>
                MOTHER'S NAME: {props.brideMotherName}
              </Typography>
              <Typography gutterBottom>
                FATHER'S NAME: {props.brideFatherName}
              </Typography>
            </div>
            <div className="container-2">
              <Typography gutterBottom>
                BRIDE'S ADDRESS: {props.brideAddress}
              </Typography>
            </div>
            <div className="container-3">
              <Typography gutterBottom>
                CONTACT NO.: {props.bridePhone}
              </Typography>
              <Typography gutterBottom>
                AADHAR NO.: {props.brideAadhar}
              </Typography>
            </div>
            <br /> <br />
            <div className="container-4">
              <Typography gutterBottom>
                ...............................
              </Typography>
              <Typography gutterBottom>
                ...............................
              </Typography>
              <Typography gutterBottom>
                ...............................
              </Typography>
            </div>
            <div className="container-5">
              <Typography gutterBottom>FATHER'S SIGN</Typography>
              <Typography gutterBottom>BRIDE'S SIGN</Typography>
              <Typography gutterBottom>WITNESS' SIGN</Typography>
            </div>
            <br /> <br />
            <div className="container-1">
              <Typography gutterBottom></Typography>
              <Typography gutterBottom>
                ...............................
              </Typography>
            </div>
            <div className="container-1">
              <Typography gutterBottom></Typography>
              <Typography gutterBottom>HEAD GRANTHI</Typography>
            </div>
          </div>
          <div className="button-div">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="button"
              startIcon={<CloudDownloadIcon />}
              onClick={() => handleDownload()}
              style={{ backgroundColor: "#704F4F" }}
            >
              Download
            </Button>
          </div>
        </Box>
      </Modal>

      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={handleSnackClose}
      >
        <Alert
          onClose={handleSnackClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Registration successful!
        </Alert>
      </Snackbar>
    </div>
  );
}
