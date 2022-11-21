import { useState, useEffect } from 'react'
import "./signup.css";
export default function SignUp(params) {
    let faceio;
    useEffect(() => {
        faceio = new faceIO("fioa697f");
    }, []);
    const handleSignIn = async (event) => {
        try {
            event.target.form.requestSubmit();
            let response = await faceio.enroll({
                locale: "auto",
                payload: {
                    email: "example@gmail.com",
                    pin: "12345",
                },
            });
            setValue(response.facialId);
            if(localStorage.getItem(`${response.facialId}`+"Count")){
                let newInt = +localStorage.getItem(`${response.facialId}`+"Count")
                localStorage.setItem(`${response.facialId}`+"Count",(newInt+1))
            }
            else{
                localStorage.setItem(`${response.facialId}`+"Count",1)
            }
            console.log(` Unique Facial ID: ${response.facialId}
          Enrollment Date: ${response.timestamp}
          Gender: ${response.details.gender}
          Age Approximation: ${response.details.age}`);
        } catch (error) {
            console.log(error);
        }
    };

    const [user, setUser] = useState({ fullname: "", email: "", password: "", enrollment: "" });

    const handleChange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value });
        console.log("user details", user)
    };
    const handleSubmit = (event) => {
        console.log("submit fired")
        handleSignIn(event);
        event.preventDefault();
        //event.target.form.requestSubmit();

    };
    return (
        <div className="signup">
            <form onSubmit={handleSubmit}>
                <label htmlFor="fullname">Full Name</label>
                <input type="text" name="fullname" onChange={handleChange} />
                <br />
                <label htmlFor="email">Email</label>
                <input type="email" name="email" onChange={handleChange} />
                <br />
                <label htmlFor="password">Passoword</label>
                <input type="password" name="password" onChange={handleChange} />
                <br />
                <label htmlFor="enrollment"> Enrollment Number</label>
                <input type="text" name="enrollment" onChange={handleChange} />
                <br />
{/*                 <button type="submit">Save</button>
 */}                <button onClick={handleSignIn}>Register</button>
            </form>
        </div>
    )
}