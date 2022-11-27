import React from "react";
import { Card } from "react-bootstrap";
import Swal from 'sweetalert2'

const CardComponent = ({data}) => {
    console.log(data[0])
  const cardInfo = [
    {
      image:
        "https://image.shutterstock.com/image-photo/old-well-used-clipboard-new-600w-777481483.jpg",
      title: "Project 1",
      text: "Static Website"
    },
    {
      image:
        "https://image.shutterstock.com/image-photo/old-well-used-clipboard-new-600w-777481483.jpg",
      title: "Project 2",
      text: "Newsletter Sign Up"
    },
    {
      image:
        "https://image.shutterstock.com/image-photo/old-well-used-clipboard-new-600w-777481483.jpg",
      title: "Project 3",
      text: "React App"
    },
    {
      image:
        "https://image.shutterstock.com/image-photo/old-well-used-clipboard-new-600w-777481483.jpg",
      title: "Project 4",
      text: "My App"
    }
  ];

  const renderCard = (card, index) => {
    return (data[0].code)? Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="">Why do I have this issue?</a>'
      }):(
      <Card style={{ width: "18rem" }} key={index} className="box">
        <Card.Img
          variant="top"
          src="https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"  
          
        />
        <Card.Body>
          <Card.Title>{card.title}</Card.Title>
          <Card.Text>{card.text}</Card.Text>
        </Card.Body>
      </Card>
    );
  };

  return <div className="grid">{cardInfo.map(renderCard)}</div>;
};

export default CardComponent;
