import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/joy/Button';
import { blue } from '@mui/material/colors';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios';

function valuetext(value) {
  return `${value}°C`;
}

const Scout = () => {
  const [sliderValue, setSliderValue] = useState(30); // Initial value of the slider
  const [showData, setShowData] = useState(false); // Flag to show data div
  const [isLoading, setIsLoading] = useState(false); // Flag to indicate loading state

  // Define a function to handle the value change
  const handleSliderChange = (event, value) => {
    setSliderValue(value);
  };

  const handleSearchClick = async() => {
    setIsLoading(true); // Start loading
    console.log("Clicked sv",sliderValue)

    await axios.post('http://127.0.0.1:5000/feature4', null,
    {params:{'intial_overall':sliderValue}})

  .then(response => {
      console.log(response.data)



    

     
    })
    .catch(error => {
      console.log(error);
    });






    // Simulating an asynchronous API call
    setTimeout(() => {
      setIsLoading(false); // Stop loading
      setShowData(true); // Show the data div
    }, 2000);
  };

  const sliderStyle = {
    marginTop: '50px',
    width: '200px', // Adjust this value to set the desired width
    color:blue[500],
    marginLeft: '30px'
  };

  return (
    <Box>
        <FormControl>
        <FormLabel sx={{marginTop:'40px',marginLeft:'50px', color: 'black',
            fontWeight: 'bold',
            fontFamily: 'inherit',}}>PlayerScore</FormLabel>
      <Box display="flex" alignItems="center">
        <Slider
          aria-label="Temperature"
          defaultValue={30}
          getAriaValueText={valuetext}
          color="secondary"
          onChange={handleSliderChange}
          style={sliderStyle}
        />
        <Button
          onClick={handleSearchClick}
          disabled={isLoading} // Disable button while loading
          style={{
            marginLeft: '30px',
            padding: '5px',
            marginTop:'50px',
            width:'100px'
          }}
        >
          {isLoading ? (
            'Scouting...'
          ) : (
            <>
              Scout<SearchIcon style={{ marginLeft: '5px' }} />
            </>
          )}
        </Button>
      </Box>
      </FormControl>
      {showData && (
        <div style={{ marginTop: '20px' }}>
          <p>Data: {sliderValue}</p>
          {/* Display the fetched data */}
        </div>
      )}
      
    </Box>
  );
};

export default Scout;