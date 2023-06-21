// server.js
const express = require('express');
const ExcelJS = require('exceljs');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/getData', async (req, res) => {
    try {
      // Read the existing Excel file
      const workbook = new ExcelJS.Workbook();
  
      await workbook.xlsx.readFile('./src/assets/Details.xlsx');
  
      // Get the first worksheet from the workbook
      const worksheet = workbook.getWorksheet(1);
  
      // Get all rows of data excluding the header row
      const rows = worksheet.getRows(2, worksheet.lastRow.number);
  
      // Transform the rows into an array of objects
      const data = rows.map((row) => row.values);
  
      res.status(200).json({ data });
    } catch (error) {
      console.error('Error reading Excel file:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });

app.post('/saveData', async (req, res) => {
  try {
    // Read the existing Excel file
    const workbook = new ExcelJS.Workbook();

    await workbook.xlsx.readFile('./src/assets/Details.xlsx');

    // Get the first worksheet from the workbook
    const worksheet = workbook.getWorksheet(1);

    // Get the last row index to append the data
    const lastRow = worksheet.lastRow;

    // Define your data to add to the worksheet
   const data = req.body
    // Define the column headings
    const columnHeadings = Object.keys(data);

    // If the worksheet is empty, add the column headings
    if (lastRow.number === 1) {
      worksheet.addRow(columnHeadings);
    }

    // Create an array of data values in the same order as the column headings
    const rowData = columnHeadings.map((heading) => data[heading]);

    // Add the data row to the worksheet
    worksheet.addRow(rowData);

    // Save the modified workbook
    await workbook.xlsx.writeFile('./src/assets/Details.xlsx');
    console.log('Excel file saved successfully!', lastRow.number, columnHeadings);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error saving Excel file:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
