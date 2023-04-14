import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { useSignUpMutation } from '../../store/auth-reducer/authReducer';
import CustomButton from '../button/CustomButton';
import CustomTextField from '../mui-components/TextField';
import CustomizedSnackbars from '../snackbar/Snackbar';

const validationSchema = yup.object({
  firstname: yup.string().required('First name is required'),
  lastname: yup.string().required('Last name is required'),
  username: yup.string().required('Username is required'),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  confirmpassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Your passwords do not match.'),
});

const Signup = () => {
  const [handleSignUp, { data, isLoading, isError, error }] =
    useSignUpMutation();
  const navigate = useNavigate();

  const [snackData, setSnackBar] = useState({
    open: false,
    message: '',
    type: '',
  });

  const formik = useFormik({
    initialValues: {
      firstname: 'harsh',
      lastname: 'sabhaya',
      username: 'harsh',
      email: 'harsh@gmail.com',
      password: 'harsh@123',
      confirmpassword: 'harsh@123',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      delete values.confirmpassword;
      handleSignUp(values);
    },
  });

  useEffect(() => {
    if (data?.success) {
      navigate('/');
    } else if (isError) {
      setSnackBar((prev) => ({
        open: !prev.open,
        message: error?.data?.message,
        type: 'error',
      }));
    }
  }, [data, error?.data?.message, isError, navigate]);

  const handleSnackBar = () => {
    setSnackBar((prev) => ({
      ...prev,
      open: !prev.open,
    }));
  };

  return (
    <>
      <h1>Sign Up</h1>
      <div className="form-wrapper">
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
        >
          <CustomTextField id="firstname" label="First Name" formik={formik} />
          <CustomTextField id="lastname" label="Last Name" formik={formik} />
        </Box>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <CustomTextField id="username" label="Username" formik={formik} />
          <CustomTextField id="email" label="Email" formik={formik} />
        </Box>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <CustomTextField id="password" label="Password" formik={formik} />
          <CustomTextField
            id="confirmpassword"
            label="Confirm Password"
            formik={formik}
          />
        </Box>
        <CustomButton
          loading={isLoading}
          onClick={formik.handleSubmit}
          btnText={'Submit'}
          variant="contained"
        />
        <CustomizedSnackbars
          snackData={snackData}
          handleSnackBar={handleSnackBar}
        />
        Already have an account ? <Link to="/login">Login</Link>
      </div>
    </>
  );
};

export default Signup;
