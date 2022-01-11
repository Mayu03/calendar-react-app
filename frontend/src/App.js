import react, { useEffect, useRef } from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Alert, Button, Form, Modal } from "react-bootstrap";

function FullCalendarApp() {
  // const id = useRef();
  const titleref = useRef();
  const descref = useRef();
  const fileref = useRef();
  const titlestart = useRef();
  const titleend = useRef();
  const [smShow, setSmShow] = useState(false);

  const [newEvent, setNewEvent] = useState({
    title: "",
    Description: "",
    start: "",
  });

  const [starttime, setStarttime] = useState();
  const [calVal, setcalVal] = useState([]);
  const getEvents = () => {
    axios
      .get("http://localhost:5000/api/calender")
      .then((res) => {
        console.log(res);
        setcalVal(res.data);
      })
      .catch((err) => console.log(err));

    console.log("GET EVNETS CALLED");
  };
  useEffect(() => {
    getEvents();
    // var anslocal = localStorage.getItem("events");
    // if (anslocal !== null) {
    //   // console.log("data received");
    //   const listRecord = JSON.parse(anslocal);
    //   console.log(listRecord);
    // var calendar = new Calendar(calendarEl, {
    //   events: listRecord,
    // });
  }, []);

  const handleClick = (e) => {
    // e.preventDefault();
    // console.log(e);
    // console.log("hello");

    setSmShow(true);
    let date = new Date(e.dateStr);
    const time = date.toLocaleTimeString({
      hour: "numeric",
      hour12: true,
      minute: "numeric",
    });
    let stringDate = date.toString();
    // console.log(time);
    // console.log(date);
    setStarttime(e.dateStr);
  };

  // const handleAddevent = () => {
  //   setallEvent([...allevent, newEvent]);
  // }

  const handlesubmit = (e) => {
    e.preventDefault();
    // console.log(id.current.value);
    // console.log(titleref.current.value);
    // console.log(descref.current.value);
    // console.log(fileref.current.value);

    let obj = {
      // id: id.current.value,
      title: titleref.current.value,
      desc: descref.current.value,
      filename: fileref.current.value,
      start: starttime,
      end: titleend.current.value,
    };
    console.log(obj);
    axios
      .post("http://localhost:5000/api/calender", obj)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    // var anslocal = localStorage.getItem("events");
    // // console.log(anslocal);
    // if (anslocal === null) {
    //   const listData = [];
    //   listData.push(obj);
    //   localStorage.setItem("events", JSON.stringify(listData));
    // } else {
    //   const list = JSON.parse(anslocal);
    //   list.push(obj);
    //   localStorage.setItem("events", JSON.stringify(list));
    // }

    // console.log("storage updtaed");
    setTimeout(getEvents, 3000);
  };

  function renderEventContent(eventInfo) {
    // console.log(eventInfo.event._def.extendedProps.filename);
    return (
      <>
        <div>
          <text>Title:{eventInfo.event._def.title}</text>
          <br />
          <text>Description:{eventInfo.event._def.extendedProps.desc}</text>
          <br />
          <text>
            {eventInfo.event._def.extendedProps.filename &&
              `FileName:` + eventInfo.event._def.extendedProps.filename}
          </text>
        </div>
      </>
    );
  }
  // function deleteHandler(eventInfo) {
  //   // console.log(eventInfo);
  //   let arr = [];
  //   arr.push(eventInfo);
  //   // console.log(arr);
  //   arr.filter((eventInfo) => eventInfo.event.remove());
  //   localStorage.removeItem("events", JSON.stringify(arr));
  //   // console.log(localStorage.removeItem("arr"));
  //   console.log(eventInfo);
  // }

  // console.log(event);

  return (
    <div className="App">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          center: "dayGridMonth,timeGridWeek,timeGridDay new",
        }}
        customButtons={{
          new: {
            text: "new",
            click: () => console.log("new event"),
          },
        }}
        events={calVal}
        eventColor="red"
        editable={true}
        nowIndicator
        dateClick={handleClick}
        eventContent={renderEventContent}
        eventDrop={(info) => {
          console.log(info);
        }}
      />

      <>
        <Modal
          size="sm"
          show={smShow}
          onHide={() => setSmShow(false)}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
              Small Modal
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Start Date :{starttime}
            <Form onSubmit={handlesubmit}>
              {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Start Date</Form.Label>
                <Form.Control type="date" ref={titlestart} />
              </Form.Group> */}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>End Date</Form.Label>
                <Form.Control type="date" ref={titleend} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  ref={titleref}
                  placeholder="Add task"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Decscription</Form.Label>
                <Form.Control
                  type="text"
                  ref={descref}
                  placeholder="Add Description"
                  value={newEvent.Description}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, Description: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="position-relative mb-3">
                <Form.Label>File</Form.Label>
                <Form.Control type="file" name="file" ref={fileref} />
              </Form.Group>
              <Button type="submit" onClick={() => setSmShow(false)}>
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
}

export default FullCalendarApp;
