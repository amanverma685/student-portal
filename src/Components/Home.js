import  { useState,React,useEffect } from 'react';
import Swal from 'sweetalert2';
import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import axios from "axios";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Collapse from '@mui/material/Collapse';
import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {MDBInput} from 'mdb-react-ui-kit';
import Multiselect from 'multiselect-react-dropdown';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ImageIcon from '@mui/icons-material/Image';
import Divider from '@mui/material/Divider';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

const HomeScreen = () => {
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  // Add Specialisation Button Call
  const handleShow = () => {
    getCourses();
    setSelectedCourses([]);
    setShow(true);
  }

  const [code, setCode] = useState('');
  const [credits_required, setCreditsRequired] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [year, setYear] = useState(2022);
  
 // Specialisation
 const [spec, setSpec] = useState([]);

 const [courses, setCourses] = useState([]);

 const [selectdCourses , setSelectedCourses]= useState([]);

 const [expandedArray, setExpanded] = useState([]);


const onSelect =(selectedList, selectedItem) =>{
setSelectedCourses( current => [...current, selectedItem]);
}

const onRemove =(selectedList, removedItem) =>{
  setSelectedCourses((selectdCourses) =>
  selectdCourses.filter((data) => data.course_id !== removedItem));
}

  const handleChange_description = event => {
    setDescription(event.target.value);

  };
  const handleChange_name = event => {
    setName(event.target.value);

  };
  const handleChange_year = event => {
    setYear(event.target.value);

  };
  const handleChange_code = event => {
    setCode(event.target.value);

  };
  const handleChange_credits_required = event => {
    setCreditsRequired(event.target.value);
  };

 

  const handleExpandClick = (d,index) => {

    setExpanded( data => {
      return [...data.slice(0,index),
      !(data[index]),...data.slice(index+1)
      ]});
      
  };

  const getCourses = async() =>  {
    const get_all_courses = "http://localhost:9090/student_portal-1.0-SNAPSHOT/api/course/get_all_courses";
      await axios.get(get_all_courses)
      .then((response) => {
          setCourses(response.data);
          console.log(courses);
        })
        .catch(function (error) {
          console.log(error);
          
        })
      
    }

 const  deleteSpecialisation = async(e,specialisation_id)=> {

  const deleteURL = `http://localhost:9090/student_portal-1.0-SNAPSHOT/api/specialisation/${specialisation_id}`

  await axios.delete(deleteURL)
      .then((response) => {
        Swal.fire(
          'Deleted Successfully',
          'The Specialisation Course has been deleted successfully',
          'success'
        );
          

        })
        .catch(function (error) {
          console.log(error);
          Swal("Error");
        });
        await delay(1800);
        window.location.reload(true);
      }
  
  useEffect(() => {
    callApi();
    getCourses();
  },[]);

  const callApi = async() =>  {
    const baseURL = "http://localhost:9090/student_portal-1.0-SNAPSHOT/api/specialisation/get";
      await axios.get(baseURL)
      .then((response) => {
          
          setSpec(response.data);

          for(var i =0;i<response.data.length;i++)
          {
            expandedArray[i]= false;
          }
        })
        .catch(function (error) {
          console.log(error);
          
        })
      
    }

    const postSpecialisation = async() =>  {
      console.log(selectdCourses);
      const specialisationURL = "http://localhost:9090/student_portal-1.0-SNAPSHOT/api/specialisation/add";
        await axios.post(specialisationURL,
          {
          "code":code,
          "name":name,
          "description":description,
          "year":year,
          "credits_required":credits_required,
          "courses":selectdCourses
        })
        .then((response) => {
            // console.log(response.data);
            setSpec(response.data);
            Swal.fire(
              'Added Successfully',
              'The Specialisation Course has been added successfully',
              'success'
            );

  
          })
          .catch(function (error) {
            console.log(error);
            Swal("Error");
          })
          await delay(1000);
          window.location.reload(true);

        
      }
  

    return (
      <>
        <div className='d-flex justify-content-between'>
          <div className=''>
            <h2 style={{marginLeft:'2rem'}}>Specialisations </h2>
          </div>
          <div >
          <Button variant="info" onClick={handleShow} style={{margin:"1rem"}}>
              + Add Specialisation
            </Button>
          </div>
        </div>
        <div className='row'>
          {
            spec.map((s, index)=>{
            var text = `Credits required - ${s.credits_required}`;
            var code = `Course Code - ${s.code}`;
            var image_ = `./Assets/${s.code}.jpg`;
            var image_ = 'https://anubhava.iiitb.ac.in/content/images/size/w1000/2021/04/iiitb_high_5.jpg';

            return(
              <><div className='col'>
                <Card  style={{ width: "30rem", margin:"3.5rem" }}  key={index} sx={{ maxWidth: 600 }}>

                <CardHeader
                  title= {code}
                  subheader = {text}
                />

                <CardMedia
                  component="img"
                  height="250"
                  image={image_}
                  alt={s.code}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {s.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {s.description}
                    </Typography>
                </CardContent>

                <CardActions>
                  <IconButton onClick={e=> deleteSpecialisation(e,s.specialisation_id)} aria-label="delete">
                  Delete <DeleteIcon />
                  </IconButton>
                  <ExpandMore 
                    expand={expandedArray[index]} 
                    onClick={ d => handleExpandClick(d,index)}
                    aria-label="show more"
                  > 
                  <ExpandMoreIcon />
                    View Courses
                  </ExpandMore>

                </CardActions>
                
                <div>
                  <Collapse in={expandedArray[index]} timeout="auto" unmountOnExit>
                    <div className='row'>
                      {
                        s.courses.map((c,course_index)=>{

                return( 
                    <CardContent >
                      <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
                      <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <ImageIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <div className='row'>
                            <div className='col'>
                              <div className='row-md-2'>
                                <Typography variant='h5'>{s.courses[course_index].name}</Typography>
                              </div>
                              <div className='row-md-1'>
                              <Typography>
                              {s.courses[course_index].course_code}
                              </Typography>
                              </div>
                            </div>
                            <div className='col'>
                              <div className='row'>
                              <Typography>
                                capacity :{s.courses[course_index].capacity}
                              </Typography>
                              </div>
                              <div className='row'>
                              <Typography>
                                capacity :{s.courses[course_index].capacity}
                              </Typography>
                              </div>
                            </div>
                          </div>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        </List>
                    </CardContent>
                      )} )}
                    </div>
                  </Collapse>
              </div>
            </Card>
          </div></>
              
         );
      })
        }
        </div>
        <div className='Container'>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{color:"black"}}>Add Specialisation</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{color:'black',width:'28rem'}}>
        <div className='row'>
        <div className='col-md-4' style={{ marginRight :'2rem'}}>
          <MDBInput wrapperClass='mb-3' onChange={handleChange_code} value={code} label='Specialisation Code' id='forControlLg' type='email' size="lg"/>
        </div>
        <div className='col-md-4'>
        <MDBInput wrapperClass='mb-4' onChange={handleChange_credits_required}  value={credits_required} label='Total Credits' id='formControlLg' type='number' size="lg"/>
        </div>

        </div>
        <MDBInput wrapperClass='mb-4' onChange={handleChange_name}  value={name} label='Specialisation Name' id='formControlLg' type='text' size="lg"/>
        <MDBInput wrapperClass='mb-4' onChange={handleChange_description}  value={description} label='Description' id='formControlLg' type='text' size="lg"/>
        <div className='col-md-4' style={{ marginRight :'2rem'}} >
        <MDBInput wrapperClass='mb-4' onChange={handleChange_year}  value={year} label='Year' id='formControlLg' type='number' size="lg"/>
        </div>
        <div className='row'>
          <div>
            <div className='row' style={{marginLeft:'.1rem'}}>Courses to offer under Specialisation</div>
          <Multiselect
            options={courses} // Options to display in the dropdown
            selectedValues={[]} // Preselected value to persist in dropdown
            onSelect={onSelect} // Function will trigger on select event
            onRemove={onRemove} // Function will trigger on remove event
            displayValue="name" // Property name to display in the dropdown options
          />
          </div>

        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={postSpecialisation}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        </div>

      </>

      
      
    );
   
}

export default HomeScreen;
