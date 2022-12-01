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
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Collapse from '@mui/material/Collapse';
import Button from 'react-bootstrap/Button';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Modal from 'react-bootstrap/Modal';
import {MDBInput} from 'mdb-react-ui-kit';
import Multiselect from 'multiselect-react-dropdown';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
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
  const [code, setCode] = useState('');
  const [credits_required, setCreditsRequired] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [year, setYear] = useState(2022);
  
 // Specialisation
 const [spec, setSpec] = useState([]);

 const [courses, setCourses] = useState([]);

 const [selectdCourses , setSelectedCourses]= useState([]);

 const [image_url , set_image_url]= useState('https://anubhava.iiitb.ac.in/content/images/size/w1000/2021/04/iiitb_high_5.jpg');

 const [expandedArray, setExpanded] = useState([]);

 const [specialisation_id, Setspecialisation_id]=useState([]);

  const [update_model, setUpdateModel] = useState(false);

  const handleUpdateClose = () => setUpdateModel(false);

  useEffect(() => {
    callApi();
    getCourses();
  },[]);

  // Show model on button click
  const handleShow = () => {
    // Api call to get all courses
    getCourses();
    
    //  Api call to initialise selected courses to []
    setSelectedCourses([]);

    // Enabling model to true
    setShow(true);
  }
// 
const onSelect =(selectedList, selectedItem) =>{
  console.log(selectedItem)
setSelectedCourses( current => [...current, selectedItem]);
}


const onRemove =(selectedList, removedItem) =>{
  setSelectedCourses((selectdCourses) =>
  selectdCourses.filter((data) => data.course_id !== removedItem));
}
// Changes in description
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

  const handleChange_image_url_required = event => {
    set_image_url(event.target.value);
  };
 

  const handleExpandClick = (d,index) => {

    setExpanded( data => {
      return [...data.slice(0,index),
      !(data[index]),...data.slice(index+1)
      ]});
      
  };


  const handleUpdate = (e,s) =>{
    Setspecialisation_id(s.specialisation_id);
    setCode(s.code);
    // setSelectedCourses(s.selectdCourses);
    setCreditsRequired(s.credits_required);
    setDescription(s.description);
    set_image_url(s.image_url);
    setName(s.name);
    setYear(s.year);
    setUpdateModel(true);
    
    }



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
          "courses":selectdCourses,
          "image_url":image_url
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
  
    const updateSpecialisation = async() =>  {
        
        
        const specialisationURL = "http://localhost:9090/student_portal-1.0-SNAPSHOT/api/specialisation/update";
          await axios.put(specialisationURL,
            {
            "specialisation_id":specialisation_id,
            "code":code,
            "name":name,
            "description":description,
            "year":year,
            "credits_required":credits_required,
            "courses":selectdCourses,
            "image_url":image_url
          })
          .then((response) => {
              // console.log(response.data);
              setSpec(response.data);
              Swal.fire(
                'Added Successfully',
                'The Specialisation Course has been Updated successfully',
                'success'
              );
    
            })
            .catch(function (error) {
              console.log(error);
              Swal("Error");
            })
            await delay(1000);
            // window.location.reload(true);
  
          
        }
    

    return (
      <>
        <div className='d-flex justify-content-between'>
          <div>
            <h1 style={{marginLeft:'2rem'}}> <span className="badge badge-primary">Specialisation</span></h1> 
          </div>
          <div >
          <Button variant="info"  onClick={handleShow} style={{margin:"1rem"}}>
              + Add Specialisation
            </Button>
          </div>
        </div>
        <div className='row'>
          {
            spec.map((s, index)=>{
            var text = `Credits required - ${s.credits_required}`;
            var code = `Course Code - ${s.code}`;
            // var image_ = `./Assets/${s.code}.jpg`;
            // var image_ = images[index];

            return(
              <>
              <div className='col'>
                <Card  style={{ width: "30rem", margin:"3rem" }}  key={index} >

                <CardHeader
                  title= {code}
                  subheader = {text}
                  action={
                    <Button onClick={e=> handleUpdate(e,s)} aria-label="edit">Update
                      <MoreVertIcon />
                    </Button>
                  }
                  
                />

                <CardMedia
                  component="img"
                  height="250"
                  image={s.image_url}
                  alt={s.code}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {s.name}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      {s.description}
                    </Typography>
                </CardContent>

                <CardActions>
                  <div className='row d-flex justify-content-between' >
                  <div className='col-md-2'>
                  <IconButton onClick={e=> deleteSpecialisation(e,s.specialisation_id)} color='error' aria-label="delete">
                  Delete <DeleteIcon />
                  </IconButton>
                  </div>
                  <div className='col'>
                  <ExpandMore  style={{marginLeft :'10rem'}}
                    expand={expandedArray[index]} 
                    onClick={ d => handleExpandClick(d,index)}
                  > 
                  <ExpandMoreIcon color='primary' />
                    View Courses
                  </ExpandMore>
                  </div>
                  </div>

                </CardActions>
                
                <div>
                  <Collapse in={expandedArray[index]} timeout="auto" unmountOnExit>
                    <div className='row'>
                    <Typography variant='h5' style={{marginLeft:'.2rem'}} >
                        courses
                      </Typography>
                      {
                        s.courses.map((c,course_index)=>{

                return( 
                    <CardContent >
                      
                      <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
                      <ListItem>
                          <ListItemAvatar>
                          <Avatar
                                alt=""
                                src="https://www.iiitb.ac.in/includefiles/settings/iiitb-silver-jubilee-logo1.jpg"
                                sx={{ width: 50, height: 50 }}
                              />
                          </ListItemAvatar>
                          <div className='row'>
                            <div className='col'>
                              <div className='row-md-2' style={{marginLeft:'1rem'}}>
                                <Typography variant='h6'>{s.courses[course_index].name}</Typography>
                              </div>
                              <div className='row'  style={{marginLeft:'1rem'}}>
                              <Typography >
                              {s.courses[course_index].course_code}  ( credits :{s.courses[course_index].credits} )
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
                                faculty :{s.courses[course_index].faculty}
                              </Typography>
                              </div>
                              
                            </div>
                            {/* <div className='col'>
                              <div className='row'>
                              <Typography>
                                
                              </Typography>
                              </div>
                              <div className='row'>
                              <Typography >
                                year :{s.courses[course_index].year}
                              </Typography>
                              </div>
                            </div> */}
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
        <MDBInput wrapperClass='mb-4' onChange={handleChange_credits_required}  value={credits_required} label='Total Credits' type='number' size="lg"/>
        </div>

        </div>
        <MDBInput wrapperClass='mb-4' onChange={handleChange_name}  value={name} label='Specialisation Name' type='text' size="lg"/>
        
        <MDBInput wrapperClass='mb-4' onChange={handleChange_description}  value={description} label='Description' type='text' size="lg"/>
        <MDBInput wrapperClass='mb-4' onChange={handleChange_image_url_required}  value={image_url} label='Image URL' type='texxt' size="md"/>

        <div className='col-md-4' style={{ marginRight :'2rem'}} >
        <MDBInput wrapperClass='mb-4' onChange={handleChange_year}  value={year} label='Year' type='number' size="lg"/>
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
          <Button variant="primary" onClick={postSpecialisation}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        </div>

        <div className='Container'>
        <Modal show={update_model} onHide={handleUpdateClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{color:"black"}}>Update Specialisation</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{color:'black',width:'28rem'}}>
        <div className='row'>
        <div className='col-md-4' style={{ marginRight :'2rem'}}>
          <MDBInput wrapperClass='mb-3' onChange={handleChange_code} value={code} label='Specialisation Code' id='forControlLg' type='email' size="lg"/>
        </div>
        <div className='col-md-4'>
        <MDBInput wrapperClass='mb-4' onChange={handleChange_credits_required}  value={credits_required} label='Total Credits' type='number' size="lg"/>
        </div>

        </div>
        <MDBInput wrapperClass='mb-4' onChange={handleChange_name}  value={name} label='Specialisation Name' type='text' size="lg"/>
        
        <MDBInput wrapperClass='mb-4' onChange={handleChange_description}  value={description} label='Description' type='text' size="lg"/>
        <MDBInput wrapperClass='mb-4' onChange={handleChange_image_url_required}  value={image_url} label='Image URL' type='texxt' size="md"/>

        <div className='col-md-4' style={{ marginRight :'2rem'}} >
        <MDBInput wrapperClass='mb-4' onChange={handleChange_year}  value={year} label='Year' type='number' size="lg"/>
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
          <Button variant="danger" onClick={handleUpdateClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateSpecialisation}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        </div>

      </>

      
      
    );
   
}

export default HomeScreen;
