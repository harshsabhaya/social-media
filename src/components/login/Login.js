import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { useAuth } from '../../context/AuthContext';
import { useLogInMutation } from '../../store/auth-reducer/authReducer';
import CustomButton from '../button/CustomButton';
import CustomizedSnackbar from '../snackbar/Snackbar';
import CustomTextField from './../mui-components/TextField';

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const Login = () => {
  const [handleLogin, { data, isLoading, isError, error }] = useLogInMutation();

  const navigate = useNavigate();
  const auth = useAuth();

  const [snackData, setSnackBar] = useState({
    open: false,
    message: '',
    type: '',
  });

  const handleSnackBar = () => {
    setSnackBar((prev) => ({
      ...prev,
      open: !prev.open,
    }));
  };

  const formik = useFormik({
    initialValues: {
      email: 'denish@gmail.com',
      password: 'denish@123',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  useEffect(() => {
    if (data?.success) {
      auth.setAuth(data?.data);
      setSnackBar((prev) => ({
        open: !prev.open,
        message: 'Login Successfully',
        type: 'success',
      }));
      navigate('/');
    } else if (isError) {
      setSnackBar((prev) => ({
        open: !prev.open,
        message: error?.data?.message,
        type: 'error',
      }));
    }
  }, [
    auth,
    data?.data,
    data?.success,
    error?.data?.message,
    isError,
    navigate,
  ]);

  return (
    <>
      <h1>Login</h1>
      <div className="form-wrapper">
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
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
        </Box>

        <CustomButton
          loading={isLoading}
          onClick={formik.handleSubmit}
          btnText={'Submit'}
          variant="contained"
        />
        <p>
          Don&apos;t have account ? <Link to="/signup">Signup</Link>
        </p>
      </div>
      <CustomizedSnackbar
        snackData={snackData}
        handleSnackBar={handleSnackBar}
      />
    </>
  );
};

export default Login;
