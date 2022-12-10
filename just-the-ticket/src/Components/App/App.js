import { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import Collapsible from '../Collapsible';
import Form from '../Form'
import Heading2 from '../Heading2';
import NavBar from '../NavBar';
import TicketDetails from '../TicketDetails';
import './App.css';

const App = () => {

  //useEffect hook is called when the component is mounted to the DOM
  useEffect(() => { // the reason we are using the hook is to perform the side effect of fetching our backend data from the api endpoints which is api/tickets.

  //async function to fetch data from the specified endpoint
async function getInitialData() {
  //fetch data from the specified endpoint
  let response = await fetch('http://localhost:8000/api/tickets');
  //parse the fetched data as JSON
  let data = await response.json(); 
  //set the fetched data as the value of the `ticketList` state
  setTicketList(data);
}
//call the `getInitialData` function
getInitialData();
//pass an empty array as the second argument to the useEffect hook to ensure that the function is only called when the component is mounted to the DOM
}, []);


//initialize the ticketList state with an empty array
const [ticketList, setTicketList] = useState([])
//initialize the userTicket state with an object containing empty strings as the values of each field
const [userTicket, setUserTicket] = useState({
name: "",
question: "",
roomNumber: "",
problem: "",
description: "",
code: "",
errorLog: ""})

//async function to handle a form submission
const handleSubmit = async (event) => { // the event in this instance is the for submission event.
//prevent the default form submission behavior
event.preventDefault();
//check if any of the fields in the userTicket state object are empty
if (
userTicket.name === "" ||
userTicket.question === "" ||
userTicket.roomNumber === "" ||
userTicket.problem === "" ||
userTicket.description === "" ||
userTicket.code === "" ||
userTicket.errorLog === ""
) {
//if any of the fields are empty, show an alert
return alert("All must be filled out");
}
 //create a new `ticket` object with the same fields as the `userTicket` state object
const ticket = {
  name: userTicket.name,
  question: userTicket.question,
  roomNumber: userTicket.roomNumber,
  problem: userTicket.problem,
  description: userTicket.description,
  code: userTicket.code,
  errorLog: userTicket.errorLog
}

//clear the form after a successful submission


  // This line is setting the initial state of the userTicket object to be empty.
setUserTicket({
  name: "",
  question: "",
  roomNumber: "",
  problem: "",
  description: "",
  code: "",
  errorLog: ""})

  // This is an async function that sends a POST request to the specified endpoint with the `ticket` object in the request body.
  const postData = async () => { // declaring an async function called postData
    await fetch('http://localhost:8000/api/tickets', { //sending an HTTP request to our backend to post
      method: 'POST',
      headers: { "Content-Type": "application/json" },//setting the content type of the header to be in json format, that is because the server is expecting the data as json type. 
      body: JSON.stringify(ticket) //is setting the body of the request to be the JSON representation of the ticket object. 
      }).then(() => {//The .then() method is called after the fetch request has completed successfully, and it logs a message to the console to indicate that a new ticket has been created.
        console.log('✅ New ticket CREATED');
      })
    }
    // This line calls the `postData` function.
    await postData();
  
  // This is an async function that sends a GET request to the specified endpoint and logs a message to the console.
  const getData = async () => {
    let response = await fetch('http://localhost:8000/api/tickets')
    console.log('✅ All tickets READ');
    
    // This line gets the data from the response in JSON format and sets it to the `ticketList` state.
    let data = await response.json();
    setTicketList(data);
  }
  // This line calls the `getData` function.
  await getData();
  
  // This line displays an alert to the user.
  alert("Thank you for your submission. You can find your new ticket in the latest tickets section.")
  }
  
  // This is a function that deletes a ticket.
  const deleteTicket = (event, ticketId) => {


confirmAlert({
  customUI: ({ onClose }) => {// This line displays a custom UI for confirming the deletion.
    return (
      <div className="alert"> {/* this is the div that creates an alert when the user hits the delete button*/} 
        <h1 className="alert__title">Delete Ticket</h1> {/* the classnames are being declared for styling purposes*/}
        <p className="alert__body">Warning: This action is irreversible. <br/> Are you sure you want to delete this ticket?</p>
        {/*This code is defining a button element with an onClick event handler. When the button is clicked, it will call the on Close function and then the handleDelete function, passing the event object and the ticketId as arguments to the handleDelete function. When clicked, the onClick event handler will trigger the handleDelete function, which will delete a ticket with the specified ticketId from the system.*/}
        <button 
          onClick={() => {
            onClose();
            handleDelete(event, ticketId);
          }}
          className="alert__btn alert__btn--yes"
        >
          Delete
        </button>
        <button onClick={onClose} className="alert__btn alert__btn--no"> Cancel </button>
      </div>
    );
  }
});

// This is an async function that sends a DELETE request to the specified endpoint.
const handleDelete = async (event, ticketId) => {
  event.preventDefault();
  
  // This is an async function that sends the DELETE request.
  const deleteData = async () => {
    await fetch(`http://localhost:8000/api/tickets/${ticketId}`, {
      method: 'DELETE'
    }).then(() => {
      console.log(`✅ Ticket ${ticketId} DELETED`);
    })
  }
  // This line calls the `deleteData` function.
  await deleteData();
      
      const getData = async () => {
        let response = await fetch('http://localhost:8000/api/tickets')
        let data = await response.json();
        setTicketList(data);
      }
      await getData();
    }
  }
  return (
    <div className="App">
    <NavBar />
    <div className="main-container">

      <div className="create-ticket-container">
       <Heading2 
          containerClassName="form-header-container" 
          headingClassName="form-header" 
          text="Create Ticket"
        /> 

        <Form setTicket={setUserTicket} userTicket={userTicket} handleSubmit={handleSubmit} /> 
      </div>
      <div className="latest-tickets-container">
        <div className="tickets-header-container">
          <h2 className="tickets-header">Latest Tickets</h2>
        </div>
        <div className= "tickets-container">
          {ticketList.map((ticket) => {
            return (
              <Collapsible key={ticket.id}
                id={ticket.id} 
                name={ticket.question_author} 
                room={ticket.room_number}
                title={ticket.question_title}
                handleDelete={deleteTicket}
              >

                <TicketDetails 
                containerClassName = "input-container"
                label="Problem Summary:"
                detailsContainerClassName="ticket-details-container"
                text={ticket.problem_summary}
                pClassName= "ticket-p"
              /> 

                <TicketDetails 
                containerClassName = "input-container"
                label="Steps Taken:"
                detailsContainerClassName="ticket-details-container"
                text={ticket.problem_summary}
                pClassName= "ticket-p"
              /> 
                <TicketDetails 
                containerClassName = "monospace-container"
                label="Code:"
                detailsContainerClassName="code-details-container"
                text={ticket.code}
                pClassName= "ticket-p"
              /> 
                
                <div className="monospace-container">
                  <label>Code:</label>
                  <div className="code-details-container">
                    <code className="ticket-p">{ticket.code}</code>
                  </div>
                </div>
                <div className="monospace-container">
                  <label>Error Logs:</label>
                  <div className="error-details-container">
                    <code className="ticket-p">{ticket.error_logs}</code>
                  </div> 
                </div>
              </Collapsible>
            )
          })}
        </div>
      </div>
      </div>
    </div>
  );
}

export default App;
