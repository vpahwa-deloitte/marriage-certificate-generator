import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
  Typography,
  Box,
  Button,
} from "@mui/material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import "./GroomBrideDetails.css";

const columns = [
  { id: "id", label: "ID", minWidth: 100 },
  { id: "groomName", label: "Groom Name", minWidth: 170 },
  { id: "groomFatherName", label: "Groom Father Name", minWidth: 200 },
  { id: "groomMotherName", label: "Groom Mother Name", minWidth: 200 },
  { id: "groomPhone", label: "Groom Phone", minWidth: 150 },
  { id: "groomAadhar", label: "Groom Aadhar", minWidth: 150 },
  { id: "groomAddress", label: "Groom Address", minWidth: 200 },
  { id: "brideName", label: "Bride Name", minWidth: 170 },
  { id: "brideFatherName", label: "Bride Father Name", minWidth: 200 },
  { id: "brideMotherName", label: "Bride Mother Name", minWidth: 200 },
  { id: "bridePhone", label: "Bride Phone", minWidth: 150 },
  { id: "brideAadhar", label: "Bride Aadhar", minWidth: 150 },
  { id: "brideAddress", label: "Bride Address", minWidth: 200 },
  { id: "marriageDate", label: "Marriage Date", minWidth: 150 },
  { id: "headGranthi", label: "Head Granthi", minWidth: 150 },
];

const GroomBrideDetails = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const handleClose = () => setOpen(false);

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  function GenerateReceipt() {
    html2canvas(document.querySelector("#boxCapture")).then((canvas) => {
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
      pdf.save("certificate.pdf");
    });
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

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={index}
                style={{ cursor: "pointer" }}
                onClick={() => handleRowClick(row)}
              >
                {row.slice(1).map((cell, cellIndex) => (
                  <TableCell key={cellIndex}>{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div id="boxCapture" className="boxCapture">
            <br /> <br /> <br /> <br /> <br /> <br />
            <div className="idContainer">
              <Typography className="ref-no" gutterBottom>
                Ref. No.: GSSBMD/BD/YNR/{selectedRow[1]}
              </Typography>
              <Typography className="dated" gutterBottom>
                Dated: {selectedRow[14]}
              </Typography>
            </div>
            <br /> <br />
            <Typography
              id="marriage-certificate"
              className="marriage-certificate"
              variant="h6"
              component="h2"
              gutterBottom
            >
              MARRIAGE CERTIFICATE
            </Typography>
            <br /><br />
            <div>
              <Typography gutterBottom style={{ textAlign: "justify" }}>
                It is certified that {selectedRow[2]} S/O {selectedRow[3]} R/O{" "}
                {selectedRow[7]} wedded to {selectedRow[8]} D/O {selectedRow[9]}{" "}
                R/O {selectedRow[13]} on {selectedRow[14]} at Gurudwara Sahib
                Shaheed Bhai Mati Dass Ji(Regd.) Main Bazar, Buria, Distt Yamuna
                Nagar(Haryana) as per Sikh Rites.
              </Typography>
              <Typography gutterBottom style={{ textAlign: "justify" }}>
                Anand Karaj / Marriage Ceremony was solemnized by{" "}
                {selectedRow[15]}, Head Granthi of the Gurudwara.
              </Typography>
              <Typography gutterBottom style={{ textAlign: "justify" }}>
                The Marriage has been registered in the Marriage Register,
                maintained by the Committee of the Gurudwara.
              </Typography>
              <Typography gutterBottom style={{ textAlign: "justify" }}>
                The Certificate is put on record so that it can be used as when
                needed.
              </Typography>
              <br /><br /><br /><br /><br /><br />
              <div className="signatureContainer">
                <div>
                  <Typography className="headGranthi" gutterBottom>
                    (Head Granthi)
                  </Typography>
                  <Typography className="headGranthi" gutterBottom>
                    {selectedRow[15]}
                  </Typography>
                </div>
                <div>
                  <Typography className="headGranthi" gutterBottom>
                    (President / Authorized)
                  </Typography>
                  <Typography className="headGranthi" gutterBottom>
                    Baldev Singh Ahuja
                  </Typography>
                </div>
              </div>
            </div>
          </div>
          <div className="button-div">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="button"
              onClick={() => GenerateReceipt()}
              startIcon={<CloudDownloadIcon />}
              style={{ backgroundColor: "#704F4F" }}
            >
              Download
            </Button>
          </div>
        </Box>
      </Modal>
    </Paper>
  );
};

export default GroomBrideDetails;
