import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import firebase from '../config/firebase';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

export default function SignUp() {
    const [isLoading, setisLoading] = useState(false);
    const history = useHistory();
    
    return (
        <Formik
            initialValues={{email:'', password:''}}
            onSubmit={(value, formikBag)=>{
                if(isLoading)return;
                    setisLoading(true)
                firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
                .then((res) => {
                    history.replace('/');
                    setisLoading(false)
                })
                .catch((e)=> {
                    formikBag.setFieldError('password', e.message)
                    setisLoading(false)
                })
            }}
            validationSchema={Yup.object({
                email: Yup.string().required().email(),
                password: Yup.string().required()
            })}
        >
        <div className='rel'>
            <div className='center-log bg-dark text-white p-4 rounded-lg shadow login-div'>
                <h1 className='text-center'>Sign Up</h1>
                <Form>
                <label for='email' className='form-label'>Email:</label>
                <Field name='email' type='email' id='email' className='form-control' placeholder='Enter email'></Field>
                <p className='text-warning'><ErrorMessage name='email' /></p>
                <label for='pwd' className='form-label'>Password:</label>
                <Field name='password' type='password' id='pwd' className='form-control' placeholder='Enter password'></Field>
                <small className='text-muted'>password should not be less than 6 characters</small>
                <p className='text-warning'><ErrorMessage name='password' /></p>
                <button type='submit' className='btn btn-outline-warning btn-block mt-4'>
                {
                    isLoading ? <Spinner animation="border" size='sm' variant="light" /> : 'Sign Up'

                }
                </button>
                </Form>
            </div>
        </div>
        </Formik>
      )
}
