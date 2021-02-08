import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Button, Spinner } from 'react-bootstrap';
import React, { useState } from 'react';
import firebase from '../config/firebase'
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

export default function Login() {
    const [isLoading, setisLoading] = useState(false);
    const history = useHistory();
    return (
        <Formik
            initialValues={{email:'', password:''}}
            onSubmit={(value, formikBag)=>{
                if(isLoading)return;
                    setisLoading(true)
                    firebase.auth().signInWithEmailAndPassword(value.email, value.password)
                    .then((res) => {
                        history.replace('/')
                        setisLoading(false)
                    })
                    .catch((e)=> {
                        formikBag.setFieldError('password', e.message);
                        setisLoading(false);
                    })
                }}
                validationSchema={Yup.object({
                    email: Yup.string().required().email(),
                    password: Yup.string().required()
                })}
        >
        <div className='center-div bg-dark text-white p-4 rounded-lg shadow login-div'>
            <h1 className='text-center'>Login</h1>
          <Form>
            <label for='email' className='form-label'>Email:</label>
            <Field name='email' type='email' id='email' className='form-control' placeholder='Enter email'></Field>
            <p className='text-warning'><ErrorMessage name='email' /></p>
            <label for='pwd' className='form-label'>Password:</label>
            <Field name='password' type='password' id='pwd' className='form-control' placeholder='Enter password'></Field>
            <p className='text-warning'><ErrorMessage name='password' /></p>
            <Button type='submit' className='btn btn-outline-warning btn-block mt-4'>
                {
                    isLoading ? <Spinner animation="border" size='sm' variant="success" /> : 'Login'

                }
            </Button>
            </Form>
        </div>
        </Formik>
      )
}
