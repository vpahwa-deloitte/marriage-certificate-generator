import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Certificate from "./Certificate";
import GroomBrideDetails from "./GroomBrideDetails";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TabsPanel(props) {
  const [value, setValue] = React.useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/getData");

      if (response.status === 200) {
        setData(response.data.data);
      } else {
        console.error("Failed to fetch data. Status Code:", response.status);
      }
    } catch (error) {
      console.error("Error occurred while fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          backgroundColor: "#FEFCF3",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          TabIndicatorProps={{
            style: {
              backgroundColor: "#D97D54",
            },
          }}
          sx={{
            "& button:hover": {
              backgroundColor: "#FEFCF3",
              color: "#472D2D",
              fontWeight: "bold",
            },
            "& button:focus": {
              backgroundColor: "#FEFCF3",
              color: "#472D2D",
              fontWeight: "bold",
            },
            "& button:active": {
              backgroundColor: "#FEFCF3",
              color: "#472D2D",
              fontWeight: "bold",
            },
          }}
        >
          <Tab label="Registration" {...a11yProps(0)} />
          <Tab label="Details" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Certificate />
      </TabPanel>
      <TabPanel value={value} index={1}>
        {loading ? (
          <CircularProgress />
        ) : (
          <GroomBrideDetails data={data} />
        )}
      </TabPanel>
    </Box>
  );
}
