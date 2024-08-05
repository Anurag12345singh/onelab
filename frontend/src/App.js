import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useState } from 'react';

function App() {
  const [data, setData] = useState({
    id: "",
    name: "",
    email: "",
    mobile: ""
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/post', data);
      console.log(response.data);
      setData({
        id: "",
        name: "",
        email: "",
        mobile: ""
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container d-flex justify-content-center mt-5 ">
      <div style={{height:"400px", width:"400px"}} >
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicId">
          <Form.Label>ID</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter id"
            name='id'
            value={data.id}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter Name"
            name="name" 
            value={data.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email"
            name='email'
            value={data.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicMobile">
          <Form.Label>Mobile</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter Mobile" 
            name='mobile'
            value={data.mobile}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      </div>
    </div>
  );
}

export default App;
