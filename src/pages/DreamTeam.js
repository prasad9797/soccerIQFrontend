import React,{useState,useRef} from "react";
import Box from '@mui/joy/Box';
import FormLabel from '@mui/joy/FormLabel';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Sheet from '@mui/joy/Sheet';
import Autocomplete from '@mui/joy/Autocomplete';
import Fab from '@mui/material/Fab';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Button from '@mui/joy/Button';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";


import PositionSelect from "../components/PositionSelect";
import CardGrid from "../components/CardGrid";



//Typing effect
import { useTypingEffect } from "../hooks/typing-effect";

import backgroundImage from './feature3-bg.jpeg'
import pitch from './pitch.jpeg'


const Grid = styled(MuiGrid)(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    '& [role="separator"]': {
      margin: theme.spacing(0, 2),
    },
  }));

const DreamTeam = () =>{

    const ref = useRef(null);
    const text = useTypingEffect('Build Your Dream Team',400)
    const [teams,setTeams] = useState([])
    const [textFieldValue, setTextFieldValue] = useState('');
    const[team,setteam]=useState('All')
    const [tactic, setTactic] = React.useState('');
    const[ccflag,setccflag] = useState(0)
    //0 -club 1-country



    const handleRadioChange = (event) => {

        console.log(event.target.value); 
        if(event.target.value === 'Club')
        {
            setccflag(0)
            setTeams(clubs)
        }else{
            setccflag(1)
            setTeams(countries)
        }
      }

      const handleTeamSelection = (event, value) => {
        setteam(value)
        console.log(value); // logs the selected value
      }

      const handleSearchButtonClick = async ()=>{
        console.log("left search clicked")
        let p ={}
         
        if(ccflag === 0)
        {
          p ={
            tactic:tactic,
            club:team
          }
        }
        else
        {
          p ={
            tactic:tactic,
            country:team
          }
        }



        await axios.post('http://127.0.0.1:5000/feature3', null,
        {params:p})
      .then(response => {
                  console.log(response.data)



        
  
         
        })
        .catch(error => {
          console.log(error);
        });


      }
      //For getting position array in parent element
    const [parentSelectValues, setParentSelectValues] = useState([]);

    const handleSelectValuesChange = (values) => {
      setParentSelectValues(values);
      console.log("In parent element:",parentSelectValues)
    };

      const handleRSearchButtonClick = async ()=>{
        console.log(typeof(parentSelectValues))
        console.log(parentSelectValues)
        setTactic(textFieldValue)

        let p ={}
         
        if(ccflag === 0)
        {
          p ={
            tactic:tactic,
            club:team,
            position:parentSelectValues
          }
        }
        else
        {
          p ={
            tactic:tactic,
            country:team,
            position:parentSelectValues
          }
        }
        await axios.post('http://127.0.0.1:5000/feature3', null,
        {params:p})
      .then(response => {
          console.log(response.data)



        
  
         
        })
        .catch(error => {
          console.log(error);
        });




        console.log("right search clicked")
      }

      const clubs = [
        { name: 'Real Madrid CF' },
        { name: 'FC Barcelona' },
        { name: 'Juventus'},
        { name: 'Paris Saint German' }
    ]
    const countries = [
        { name: 'Portugal' },
        { name: 'Spain' },
        { name: 'Argentina'},
        { name: 'France' }
    ]


      const handleTacticChange = (event) => {
           setTactic(event.target.value);
      };

      const handleButtonClick =  () => {
 
        ref.current?.scrollIntoView({behavior: 'smooth'})}


    return (
        <>
        <div style={{ width: '100vw' }}>
        <img src = {backgroundImage} alt="Image description" style={{ width: '100%',height:'90vh' }} />
        <div style={{ position: 'absolute', top: '140px', left: '275px', transform: 'translate(-50%, -50%)', textAlign: 'center', color: 'black', fontSize: '2rem',fontWeight:'bold' }}>
    <p>{text}</p>
    
  </div>
  <div style={{ position: 'absolute', top: '92%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: 'black', fontSize: '2rem',fontWeight:'bold' }}>
  <Fab color="primary" aria-label="add" onClick={handleButtonClick}>
        <KeyboardDoubleArrowDownIcon />
      </Fab>
    
  </div>
  
        </div>
        <div ref={ref}>
            
            <Box sx={{ width: 200,marginLeft:'55px'}}>
            <FormLabel
        id="storage-label"
        sx={{
          mb: 2,
          fontWeight: 'xl',
          textTransform: 'uppercase',
          fontSize: 'xs',
          letterSpacing: '0.15rem',
          paddingTop:'2em'
        
        }}
      >
        Select
      </FormLabel>
      <RadioGroup
        aria-labelledby="storage-label"
        defaultValue="512GB"
        size="lg"
        sx={{ gap: 1.5,display:'flex', flexDirection: 'row' } }
        onChange={handleRadioChange}
      >
        {['Club','Country'].map((value) => (
          <Sheet
            key={value}
            sx={{
              p: 2,
              borderRadius: 'md',
              boxShadow: 'sm',
              bgcolor: 'background.body',
            }}
          >
            <Radio
              label={`${value}`}
              overlay
              disableIcon
              value={value}
              sx = {{width:'80px',textAlign:'center'}}
              slotProps={{
                label: ({ checked }) => ({
                  sx: {
                    fontWeight: 'lg',
                    fontSize: 'md',
                    color: checked ? 'text.primary' : 'text.secondary',
                  },
                }),
                action: ({ checked }) => ({
                  sx: (theme) => ({
                    ...(checked && {
                      '--variant-borderWidth': '2px',
                      '&&': {
                        // && to increase the specificity to win the base :hover styles
                        borderColor: theme.vars.palette.primary[500],
                      },
                    }),
                  }),
                }),
              }}
            />
          </Sheet>
        ))}
      </RadioGroup>
      <Autocomplete
        placeholder="Choose"
        options={teams.map((team) => team.name)}
        autoHighlight
        sx={{ width: 235 , marginTop:'20px',height:30}}
        onChange={handleTeamSelection}
    />
    </Box>
    <Grid container sx={{width:'700px',marginLeft:'20px',marginTop:'30px'}}>
      <Grid item xs>
      <InputLabel id="demo-simple-select-label">Select Tactic</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={tactic}
          onChange={handleTacticChange}
          sx={{width:'200px'}}
        >
          <MenuItem value={'433'}>4 - 3 - 3</MenuItem>
          <MenuItem value={'343'}>3 - 4 - 3</MenuItem>
          <MenuItem value={'3422'}>3 - 4 - 2 - 2</MenuItem>
        </Select>
        <Button startDecorator={<SearchIcon/>} sx={{marginTop:'20px',marginLeft:'60px'} }onClick={handleSearchButtonClick}></Button>
      </Grid>
      <Divider orientation="vertical" flexItem>
        OR
      </Divider>
      <Grid item xs>
    <TextField value={textFieldValue}
        onChange={(e) => setTextFieldValue(e.target.value)} id="outlined-basic" label="Outlined" variant="outlined" type="number"/>      <PositionSelect  onSelectValuesChange={handleSelectValuesChange} />

      <Button startDecorator={<SearchIcon/>} sx={{marginTop:'20px',marginLeft:'60px'} }onClick={handleRSearchButtonClick}></Button>
      </Grid>
    </Grid>
    <Box sx={{border:'2px black solid',marginTop:'30px',marginLeft:'40px',width:'95vw',height:'210vh'}}>
    <div style={{ position: 'relative',marginTop:'30px',marginLeft:'30px', width: '90vw', height: '200vh',padding:'5px' }}>
  <img src={pitch} alt="Image description" style={{ width: '100%', height: '100%' }} />
  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: 'black', fontSize: '2rem', fontWeight: 'bold' }}>
    <CardGrid />
  </div>
</div>
</Box>




        </div>
        </>
    )
}
export default DreamTeam;