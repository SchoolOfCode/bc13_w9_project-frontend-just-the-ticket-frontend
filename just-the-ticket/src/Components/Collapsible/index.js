import React from 'react';
import { useState, useRef } from 'react';
import "./Collapsible.css"

const Collapsible = ({ children, id, name, room, title }) => {

    const [open, setOpen] = useState(false);

    const contentRef = useRef();

    const toggle = () => {
        setOpen(!open);
    };
    return(
        <div className="single-ticket-container">
            <div className="ticket-body-container">
                <h3 className="ticket-info"> 
                    <span className="status-span">● OPEN </span>-
                    <span className="text-span"> Ticket {id}</span> - from 
                    <span className="name-span"> {name} </span> in  
                    <span className=""> Room {room} </span>
                </h3>
                    <div className="question-title-container" onClick={toggle}>
                        <p className="question-title">
                            <span className="arrow-span">{open ? "▼" : "▶"}</span> {title} 
                        </p>
                    </div>
                <div 
                className={open ? "content-show" : "content-parent"} 
                ref={contentRef}
                style={open ? { height: contentRef.current.scrollHeight + "px" } : { height: "0px" }}
                >   
                    <div className="content"> {children} </div>
                </div>
            </div>

        </div>
    )
}
export default Collapsible;


// // USEREF COLLAPSE TUTORIAL ---> https://blog.openreplay.com/creating-a-collapsible-component-for-react/
// const Collapsible = ({ label, children })=>{
//     const [open, setOpen] = useState(false);
//     const contentRef = useRef();
//     if (contentRef.current) console.log(contentRef.current.scrollHeight);
//     const toggle = () => {
//         setOpen(!open);
//     };
//     return(
//         <div>
//             <button onClick={toggle}> {label} </button>
//             <div 
//             className={open ? "content-show" : "content-parent"} 
//             ref={contentRef}
//             style={open ? { height: contentRef.current.scrollHeight + "px" } : { height: "0px" }}
//             >   
//                 <div className='content'> {children} </div>
//             </div>
//         </div>
//     )
// }
// export default Collapsible;

// // BASIC TOGGLE COMPONENT BEFORE ANIMATION AND USEREF
// const Collapsible = ({ label, children })=>{
//     const [open, setOpen] = useState(false);
//     const toggle = () => {
//         setOpen(!open);
//       };
//     return(
//         <div>
//         <button onClick={toggle}> {label} </button>
//         {open && (
//             <div className="toggle"> {children} </div>
        
//         )}
//       </div>
//     )
// }
// export default Collapsible;