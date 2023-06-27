import { useState } from "react";
//mui
import { MuiFileInput } from 'mui-file-input';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

//
import Encoding from "encoding-japanese";

export const FileEncoderPage = () => {
  const [file, setFile] = useState(null);
  const [originFileText, setOriginFileText] = useState('');
  const [convertedFileText, setConvertedFileText] = useState('');
  const [dlElement, setDlElement] = useState(null);
  const handleFileChange = (newFile) => {
    setFile(newFile);
    setConvertedFileText('');
    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginFileText( e.target.result);
    }
    reader.readAsText(newFile);
  } 
  const handleConvertButtonClick = () => {
    const reader = new FileReader();
    reader.onload = (e) => {
      var array = new Uint8Array(e.target.result);
      switch (Encoding.detect(array)) {
        case 'SJIS':
          const unicodeArray = Encoding.convert(array, {to: 'UNICODE',from: 'SJIS'});

          setConvertedFileText(Encoding.codeToString(unicodeArray));
        case 'UTF8':
          const sjisArray = Encoding.convert(array, {to: 'UNICODE',from: 'SJIS'});
          setConvertedFileText(Encoding.codeToString(sjisArray));
      }
    }
    reader.readAsArrayBuffer(file); 
  }

  //
  const handleDownloadButtonClick = () => {
    //文字コード
    const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
    const blob = new Blob([bom, convertedFileText], { type: 'text/csv' });
    const URL = (window.URL || window.webkitURL);
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = 'csv_file.csv';
    a.click();
    //createObjectURLで作成したURLを開放する
    URL.revokeObjectURL(blobUrl);
  }

  return (<>
  <Box>
    <MuiFileInput value={file}
        placeholder="select a file."
        onChange={handleFileChange} />
    <input type="button" value="Convert"
      disabled={!file} 
      onClick={handleConvertButtonClick} />
  </Box>
  <Box>
    <input type="button" value="Download"
      disabled={!convertedFileText}
      onClick={handleDownloadButtonClick} />
  </Box>
  </>);
}