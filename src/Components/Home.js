import  { useState,React,useEffect } from 'react';
import Swal from 'sweetalert2';
import { styled } from '@mui/material/styles';
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



import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
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
  const handleShow = () => setShow(true);

  const [code, setCode] = useState('');
  const [credits_required, setCreditsRequired] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [year, setYear] = useState(2022);
  

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

  // Specialisation
  const [spec, setSpec] = useState([]);

  // For Expansion Panel
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
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
  },[]);

  const callApi = async() =>  {
    const baseURL = "http://localhost:9090/student_portal-1.0-SNAPSHOT/api/specialisation/get";
      await axios.get(baseURL)
      .then((response) => {
          // console.log(response.data);
          setSpec(response.data);
          

        })
        .catch(function (error) {
          console.log(error);
          Swal("Error");
        })
      
    }

    const postSpecialisation = async() =>  {
      const specialisationURL = "http://localhost:9090/student_portal-1.0-SNAPSHOT/api/specialisation/add";
        await axios.post(specialisationURL,{
          "code":code,
          "name":name,
          "description":description,
          "year":year,
          "credits_required":credits_required
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
            <h2>Specialisations </h2>
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
            return(
      <Card  style={{ width: "25rem", margin:"3rem" }}  key={index} sx={{ maxWidth: 400 }}>
        
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
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"> 

            <ExpandMoreIcon />
             View Courses
          </ExpandMore>

        </CardActions>
        <div id={index}>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Method:</Typography>
              <Typography paragraph>
                Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                aside for 10 minutes.
              </Typography>
              <Typography paragraph>
                stirring often until thickened and fragrant, about 10 minutes. Add
                saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
              </Typography>
              <Typography paragraph>
                minutes more. (Discard any mussels that don&apos;t open.)
              </Typography>
              <Typography>
                Set aside off of the heat to let rest for 10 minutes, and then serve.
              </Typography>
            </CardContent>
          </Collapse>
      </div>
    </Card>
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
        <MDBInput wrapperClass='mb-4' onChange={handleChange_description}  value={description} label='Description' id='formControlLg' type='text' size="lg"/>
        <MDBInput wrapperClass='mb-4' onChange={handleChange_name}  value={name} label='Specialisation Name' id='formControlLg' type='text' size="lg"/>
        <div className='col-md-4' style={{ marginRight :'2rem'}} >
        <MDBInput wrapperClass='mb-4' onChange={handleChange_year}  value={year} label='Year' id='formControlLg' type='number' size="lg"/>
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
