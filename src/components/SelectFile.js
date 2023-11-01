import React from 'react'
import { Box, TextField } from '@mui/material'

const SelectFile = ({inputFileRef, setInputFile}) => {

    const handleFile = (e) => {
        setInputFile(e.target.files[0]);  
    }

    

  return (
    <Box sx={{display: "none"}} >
        <TextField inputRef={inputFileRef} type='file' onChange={handleFile} />
    </Box>
  )
}

export default SelectFile
