import React,{useState,useRef,useEffect} from "react"
import { useNavigate,useLocation, useParams } from 'react-router-dom';
import Box from '@mui/joy/Box';
import FormLabel from '@mui/joy/FormLabel';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Sheet from '@mui/joy/Sheet';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Button from '@mui/joy/Button';
import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/joy/Autocomplete';
import axios from 'axios'
import backgroundImage from './feature2-bg.png'

//Typing effect
import { useTypingEffect } from "../hooks/typing-effect";
import BarChart from "../BarChart";
import GroupedBarChart from "../components/GroubedBarChart";
import TableData from "../components/Table";
import { isMuiElement } from "@mui/material";



const SuitedPlayer = () =>{
    const [team_value, setteam_value] = useState('');
    const [metric, setmetric] = useState('');
    const [dataList, setDataList] = useState([]);
    const [actual, setActual] = useState([]);
    const [expected, setexpected] = useState([]);
    const [justify, setJustify] = React.useState('Plot');
    const [content, setContent] = React.useState('Plot');
    const [goaldiff,setgoaldiff] = useState([])
    const [obshots,setobshots] = useState([])
    const [items, setItems] = useState([]);
    //club =0 country =1
    const dynamicData = [
      {
        name: 'Player 1',
        stat1: 100,
        stat2: 20,
        stat3: 30,
        stat4: 10,
        stat5:57
      },
      {
        name: 'Player 2',
        stat1: 150,
        stat2: 15,
        stat3: 20,
        stat4: 5,
        stat5:0
      },
    ];

    const handleTeamSelection = (event, value) => {
        setteam_value(value)
         
      }




      const handleMetricSelection = (event, value) => {
        setmetric(value)
        console.log("Metric set to ", metric); // logs the selected value
      }




      const ref = useRef(null);
      
      const handleButtonClick = async() => {
        
        
        axios.post('http://127.0.0.1:5000/feature2', null,{params:{team_name:team_value,sub_feature:metric}})

        .then(response => {
          console.log(response.data)
          setItems(response.data.result)
          
          if(metric == 'Most Expected Goals')
          {


          const names = response.data.result.map(item => item.player);
          setDataList(names)

          const exp = response.data.result.map(item => parseInt(item.expectedGoals));
          setexpected(exp)

    

          const act= response.data.result.map(item => item.trueGoals);
          setActual(act)
          }
          else if(metric == 'Best Finisher')
          {
            const name = response.data.result.map(item => item.player);
            setDataList(name)
            const gd = response.data.result.map(item => Math.abs(item.difference));
            setgoaldiff(gd)
          }
          else
          {
            const name = response.data.result.map(item => item.player);
            setDataList(name)
            const ob = response.data.result.map(item => (item.n_outbox_shots));
            setobshots(ob)



          }
        })
        .catch(error => {
          console.log(error);
        });

      



        
        ref.current?.scrollIntoView({behavior: 'smooth'});
      
      
      }


      const handleContentRadioChange = (event) => {
        setJustify(event.target.value);
        switch (event.target.value) {
          case 'Plot':
            setContent('Plot');
            break;
          case 'Table':
            setContent('Table');
            break;
          default:
            setContent('Plot');
        }
      };
      const renderContent = () => {
        if (content === 'Plot') {
          if (metric === 'Best Finisher') {
            return <BarChart labels={dataList} data={goaldiff} />;
          } else if (metric === 'Most Expected Goals') {
            return <GroupedBarChart labels={dataList} actual={actual} expected={expected} />;
          }
          else if (metric === 'Outside The Box')
          {
            return <BarChart labels={dataList} data={obshots} />;
          }
          else{
            return null
          }



        }
         else if (content === 'Table') {
          return <TableData data={items}/>;
        }
        return null;
      };
      


      useEffect(() => {
        console.log('----------------------------------')

console.log(items)        
      }, []);


    const metrics = [
        { name: 'Best Finisher' },
        { name: 'Most Expected Goals' },
        { name: 'Outside The Box'},
    ]

    const team = [
      { name: 'Real Madrid' },
      { name: 'Barcelona' },
      { name: 'Juventus'},
      { name: 'Paris Saint German' }
  ]
    const text = useTypingEffect('Find Suited Player',100)
    return(
        <><div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover',
        minHeight: '100vh'}}>

        <Box sx={{width:'375px',height:'520px',marginLeft:'60em' ,paddingTop:'10em',border: '2px solid black' , borderRadius:'30px',
  boxShadow: '0px 3px 3px rgba(0, 0, 0, 0.25)',
  backgroundColor: '#F9F9F9',position:'absolute', top:'210px'}}>
            <h1 style={{marginLeft:'35px',marginTop:'-100px'}}>{text}</h1>


            <Box sx={{ width: 100,marginLeft:'55px'}}>




     

      <Autocomplete
        placeholder="Choose team"
        options={team.map((team) => team.name)}
        autoHighlight
        sx={{ width: 235 , marginTop:'20px',height:30}}
        onChange={handleTeamSelection}
    />
   
      <Autocomplete
        placeholder="Desired Metric..."
        options={metrics.map((metric) => metric.name)}
        autoHighlight
        sx={{ width: 235 , marginTop:'20px',height:30}}
        onChange={handleMetricSelection}
    />


    <Button startDecorator={<SearchIcon />} sx={{marginTop:'40px',marginLeft:'70px',marginBottom:'30px'}} onClick={handleButtonClick}>
      Search
      </Button>
      </Box>
      </Box>
      

        </div>


        <div style={{height:'150vh',width:'100%',backgroundImage: 'linear-gradient(to bottom, #ffffff, #f0f0f0)' }} ref={ref} className='content'>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <RadioGroup
        orientation="horizontal"
        aria-labelledby="segmented-controls-example"
        name="justify"
        value={justify}
        onChange={handleContentRadioChange}
        sx={{
          minHeight: 48,
          padding: '4px',
          borderRadius: 'md',
          alignContent:'center',
          marginTop:'4em',
          marginLeft:'35em',
          bgcolor: 'neutral.softBg',
          '--RadioGroup-gap': '4px',
          '--Radio-actionRadius': '8px',
        }}
      >
        {['Plot', 'Table'].map((item) => (
          <Radio
            key={item}
            color="neutral"
            value={item}
            disableIcon
            label={item}
            variant="plain"
            sx={{
              px: 2,
              width:'200px',
              textAlign:'center',
              alignItems:'center'
            }}
            slotProps={{
              action: ({ checked }) => ({
                sx: {
                  ...(checked && {
                    bgcolor: 'background.surface',
                    boxShadow: 'md',
                    '&:hover': {
                      bgcolor: 'background.surface',
                    },
                  }),
                },
              }),
            }}
          />
        ))}
      </RadioGroup>
            </Box>
            <Box
  sx={{
    width: content === 'Plot' ? '900px' : '600px',
    height: content === 'Plot' ? '500px' : 'auto',
    marginTop: '4em',
    marginLeft: '20em',
    border: '1px black solid',
  }}
>                <div style={{padding:'20px'}}>
                {renderContent()}
            </div>
            </Box>
      </div>
        </>
    )
}

export default SuitedPlayer;