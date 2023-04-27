import React,{useRef,useEffect, useState} from "react"
import Autocomplete from '@mui/joy/Autocomplete';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import Divider from '@mui/joy/Divider';
import Chip from '@mui/joy/Chip';
import Input from '@mui/joy/Input';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Button from '@mui/joy/Button';
import BarChart from "../BarChart";
import LineChart from "../LineChart";
import axios from 'axios'

//icons for chips
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import TransformIcon from '@mui/icons-material/Transform';
import DangerousIcon from '@mui/icons-material/Dangerous';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

//Importing background image
import backgroundImage from './feature1bg.jpeg';




const TeamAnalysis = () =>{

    const [graph1x, setgraph1x] = useState([])
    const [graph1y, setgraph1y] = useState([])


    const [graph2x, setgraph2x] = useState([])
    const [graph2y, setgraph2y] = useState([])

    const [graph3x, setgraph3x] = useState([])
    const [graph3y, setgraph3y] = useState([])

    const [graph4x, setgraph4x] = useState([])
    const [graph4y, setgraph4y] = useState([])







    const teams = [
        { name: 'Real Madrid' },
        { name: 'FC Barcelona' },
        { name: 'Juventus'},
        { name: 'Paris Saint German' }
    ]
    const content = `Description of each chart will come here.`



    const [team,setTeam] = useState('')
    const handleTeamSelection = (event, value) => {
            setTeam(value)
            console.log(value); // logs the selected value
          }

    async function handleClick(){
            // Handle button click here




            console.log("SElected team is :", team)
            
            
            const data={
              'team': team};

            
            axios.post('http://127.0.0.1:5000/feature1', data)
            .then(response => {
              console.log(response.data)
              setgraph1x(response.data.grpah1.data);
              setgraph1y(response.data.grpah1.labels);

              setgraph2x(response.data.graph2.data);
              setgraph2y(response.data.graph2.labels);
            
              setgraph3x(response.data.graph3.data);
              setgraph3y(response.data.graph3.labels);

              setgraph4x(response.data.graph4.data);
              setgraph4y(response.data.graph4.labels);


            })
            .catch(error => {
              console.log(error);
            });









            console.log("Button clicked!");
          }
    

    return(
        <div>

<div style={{ 
    backgroundImage: `url(${backgroundImage})`, 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    height: '50vh',
    }}>
    <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
    }}>


            {/*  THIS IS THE TOP SEARCH BOX */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' , margin: '5rem',marginLeft:'20rem',borderRadius:10,width:'800px',zIndex:1,backgroundColor: 'white', // add white background
    boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)', // add shadow
    border: '2px solid black'}}>
        <h1 style={{marginTop:'1rem',marginLeft:'18rem'}}>Team Analysis</h1>
            <Autocomplete
        placeholder="Choose team"
        options={teams.map((team) => team.name)}
        autoHighlight
        sx={{ width: 300 , margin:4}}
        onChange={handleTeamSelection}
    />
    <Button variant="soft" endDecorator={<KeyboardArrowRight />} color="success"
    sx={{ width: 300 , margin:4}}
    onClick={handleClick}>
        Analyze
      </Button>
      
    </Box >
    </div>
</div>
   

    {/* First Plot*/}
    <div style={{marginTop:'20px',padding:'10px'}}>
    <Divider>
        <Chip color="success" size="sm" startDecorator={<SportsScoreIcon/>}>
          Goals
        </Chip>
      </Divider>
  <Box sx={{ marginLeft:'45px',marginTop:'10px',display: 'flex', flexDirection: 'row', gap: 2 ,width:'1300px',padding:'2em'}}>
    <LineChart labels={graph1y} data={graph1x} color={'green'} sx={{margin:'50px',width:'50%'}}/>
    <Divider orientation="vertical"></Divider>
    {content}
  </Box>
</div>



{/* Second Plot*/}
<div style={{marginTop:'60px'}}>
<Divider>
        <Chip  color="primary" size="sm" startDecorator={<TransformIcon/>}>
          Substitutions
        </Chip>
      </Divider>
  <Box sx={{ marginLeft:'45px',marginTop:'10px',display: 'flex', flexDirection: 'row', gap: 2 ,width:'1300px',padding:'2em'}}>
  <div style={{width:'600px'}}>
  {content}
  </div>
    <Divider orientation="vertical"></Divider>
    
    <LineChart labels={graph2y} data={graph2x} color={'blue'}sx={{margin:'50px',width:'50%'}}/>
  </Box>
</div>



{/* Third Plot*/}
<div style={{marginTop:'60px'}}>


<Divider>
        <Chip color="danger" size="sm" startDecorator={<DangerousIcon/>}>
          Red Cards
        </Chip>
      </Divider>
  <Box sx={{ marginLeft:'45px',marginTop:'10px',display: 'flex', flexDirection: 'row', gap: 2 ,width:'1300px',padding:'2em'}}>
    <LineChart labels={graph3y} data={graph3x}  sx={{margin:'50px',width:'50%'}}/>
    <Divider orientation="vertical"></Divider>
    {content}
  </Box>
</div>



{/* Fourth Plot*/}
<div style={{marginTop:'60px',marginBottom:'35px'}}>

<Divider>
        <Chip  color="warning" size="sm" startDecorator={<WarningAmberIcon/>}>
          Yellow Cards
        </Chip>
      </Divider>
  <Box sx={{ marginLeft:'45px',marginTop:'10px',display: 'flex', flexDirection: 'row', gap: 2 ,width:'1300px',padding:'2em'}}>
    <div style={{width:'600px'}}>
  {content}
  </div>
    <Divider orientation="vertical"></Divider>
    
    <LineChart labels={graph4y} data={graph4x} color={'orange'} sx={{margin:'50px',width:'50%'}}/>
  </Box>
</div>

            
        </div>
        
    )
}

export default TeamAnalysis;