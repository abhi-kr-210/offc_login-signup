import React, { useState ,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row, Form, ProgressBar } from 'react-bootstrap';
import "../Styles/LoginStyles.css";
import img1 from "../assets/brandlogo1.png";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import zxcvbn from 'zxcvbn'; //password strength checker

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordst, setPasswordst] = useState(0); 
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const handleLogin = (e) => {
    e.preventDefault();
    let formErrors = {};

    if (!name) {
      formErrors.name = 'Name is required';
    }

    if (!email) {
      formErrors.email = 'Email is required';
    }

    if (!password) {
      formErrors.password = 'Password is required';
    }

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {

        if(rememberMe){
          localStorage.setItem('email', email);
        }else{
          localStorage.removeItem('email');
        }
      toast.success('Sign Up Successful', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }


  };
  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, [rememberMe]);
  const checkStrength = (password) => {
    const result = zxcvbn(password);
    const strength = result.score; 
    const strengthPercentage = strength * 25; 
    setPasswordst(strengthPercentage);
  };

  return (
    <section className='login_section'>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <header className='login_section_header'>
        <Link to="/">
          <img src={img1} className="img-fluid" style={{ maxWidth: "200px", maxHeight: "85px", padding: "10px" }} alt="Hero" />
        </Link>
      </header>

      <Container className='login_container'>
        <Row className='login_container_row'>
          <Col lg={{ span: 8, offset: 2 }}>
            <div className='text-center mb-0' style={{ background: "white", padding: "8px 40px", display: "inline-block", borderTop: "5px solid rgb(45 75 69)" }}>
              <h4 style={{ fontFamily: "Open Sans" }}>SIGN UP</h4>
            </div>

            <div className='login_container_col'>
              <Form className='login_form' style={{ padding: "30px 50px", maxWidth: "420px" }} onSubmit={handleLogin}>
                <div className='line d-flex justify-content-center align-items-center' style={{ fontWeight: 500 }}>
                  <span></span> &nbsp;&nbsp;&nbsp;&nbsp;
                  <span></span>
                </div>
                <Form.Group className="mb-4 mt-3" controlId="exampleForm.ControlInput1">
                  <Form.Label style={{ fontWeight: 500 }}>Full Name : <span style={{ color: "grey" }}>*</span></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && <div style={{ color: 'red' }}>{errors.name}!</div>}
                </Form.Group>

                <Form.Group className="mb-4 mt-3" controlId="exampleForm.ControlInput1">
                  <Form.Label style={{ fontWeight: 500 }}>Email : <span style={{ color: "grey" }}>*</span></Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && <div style={{ color: 'red' }}>{errors.email}!</div>}
                </Form.Group>

                <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                  <div className='d-flex justify-content-between align-items-center'>
                    <Form.Label style={{ fontWeight: 500 }}>Password : <span style={{ color: "grey" }}>*</span></Form.Label>
                    {show && <div style={{ cursor: "pointer", color: "#2079c3" }} onClick={() => setShow(!show)}>
                      <i className="bi bi-eye-fill"></i> Show
                    </div>}
                    {!show && <div style={{ cursor: "pointer", color: "#2079c3" }} onClick={() => setShow(!show)}>
                      <i className="bi bi-eye-slash-fill"></i> Hide
                    </div>}
                  </div>
                  <Form.Control
                    type={show ? "password" : "text"}
                    placeholder=""
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      checkStrength(e.target.value); 
                    }}
                  />
                  {errors.password && <div style={{ color: 'red' }}>{errors.password}!</div>}
                  <div style={{ marginTop: "10px" }}>
                    <ProgressBar
                      now={passwordst}
                      label={`${passwordst}%`}
                      variant={passwordst<50?'danger':passwordst<75?'warning':'success'}
                      style={{ height: "8px" }}
                    />
                  </div>
                </Form.Group>
                 
                <Form.Group className="mb-4">
                <Form.Check
                    type="checkbox"
                    label="Remember me"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)} 
                />
                </Form.Group>
                <div className='mt-4'>
                  <button type="submit" className='btn btn-primary' style={{ padding: "9px 30px", borderRadius: "2px" }}>Register</button>
                </div>

                <p className='mt-4'>Already have an account? <Link to="/login" style={{ textDecoration: "none" }}>Login</Link></p>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Signup;
