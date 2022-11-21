import { useState, useEffect } from 'react'
import SignUp from './components/signupModal'
import reactLogo from './assets/react.svg'
import './App.css'
import QRCode from "react-qr-code";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css'
function App() {
  const [count, setCount] = useState(0)
  const [value, setValue] = useState(null)
  let faceio;
  useEffect(() => {
    faceio = new faceIO("fioa697f");
  }, []);

  const handleSignIn = async (event) => {
    try {
      // event.target.form.requestSubmit();
      let response = await faceio.enroll({
        locale: "auto",
        payload: {
          email: "example@gmail.com",
          pin: "12345",
        },
      });
      setValue(response.facialId);
      console.log(` Unique Facial ID: ${response.facialId}
      Enrollment Date: ${response.timestamp}
      Gender: ${response.details.gender}
      Age Approximation: ${response.details.age}`);
      if (localStorage.getItem(`${response.facialId}` + "Count")) {
        console.log("inside if")
        let newInt = +localStorage.getItem(`${response.facialId}` + "Count")
        localStorage.setItem(`${response.facialId}` + "Count", (newInt + 1))
      }
      else {
        console.log("inside else")
        localStorage.setItem(`${response.facialId}` + "Count", 1)
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogIn = async () => {
    try {
      let response = await faceio.authenticate({
        locale: "auto",
      });
      setValue(response.facialId);
      console.log(` Unique Facial ID: ${response.facialId}
          PayLoad: ${response.payload}
          `, JSON.stringify(response.payload));

      if (localStorage.getItem(`${response.facialId}` + "Count")) {
        console.log("inside if")
        let newInt = +localStorage.getItem(`${response.facialId}` + "Count")
        localStorage.setItem(`${response.facialId}` + "Count", (newInt + 1))
      }
      else {
        console.log("inside else")
        localStorage.setItem(`${response.facialId}` + "Count", 1)
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [popupRegister, setpopupRegister] = useState(false);
  return (
    <>
      {/* <section>
        <SignUp />
      </section> */}
      <div>
      <section >
        <h1>Face Authentication by FaceIO</h1>
        {/* <Popup trigger={<button onClick={()=>console.log("clicked me")} >Register</button>
        } position="center" modal>
          <div> <section>
            <SignUp />
          </section></div>
        </Popup> */}
        <button onClick={handleSignIn} style={{margin:"10px", fontSize:"16px"}}>Register</button>
        <button onClick={handleLogIn} style={{margin:"10px", fontSize:"16px"}}>Log-in</button>
      </section>
      {value ? <section><QRCode value={value} /></section> : <section> QR not generated</section>}
      </div>
    </>

  )
}

export default App
