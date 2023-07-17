import React,{useState} from 'react';
import { Modal, Button } from 'react-bootstrap';

const Model = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (<>
    <Button className='btn-color' onClick={handleShow}>
      Submit
    </Button>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title></Modal.Title>
      </Modal.Header>
       <Modal.Body>Information Submit Successfully</Modal.Body>
       {console.log(props.error)}
      {props.error  && <Modal.Body>Please fill mandatory fields</Modal.Body>}
      
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Okay
        </Button>
      </Modal.Footer>
    </Modal>
  </>);
}
export default Model;