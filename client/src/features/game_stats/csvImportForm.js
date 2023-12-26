// client/src/components/CSVImportForm.js

import React, { useState } from 'react';

const CSVImportForm = ({ onImport }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImport = () => {
    const formData = new FormData();
    formData.append('file', file);

    // Make a POST request to your backend endpoint for CSV import
    fetch('/game_stats/import_csv', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle success or error messages from the backend
        onImport(data);
      })
      .catch((error) => {
        console.error('Error importing CSV:', error);
      });
  };

  return (
    <div >
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button className="new-game-button" onClick={handleImport}>Import CSV</button>
    </div>
  );
};

export default CSVImportForm;
