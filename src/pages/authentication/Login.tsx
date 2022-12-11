import { useMutation } from '@apollo/client';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, FormHelperText } from '@mui/material';
import { TextFieldWrapper } from 'components/authentication/StyledComponents';
import FlexBox from 'components/FlexBox';
import LightTextField from 'components/LightTextField';
import { H1, Paragraph } from 'components/Typography';
import { useFormik } from 'formik';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { LOGIN } from '../../mutations/authMutation';

const Login: FC = () => {
  const [authLogin, { error, data, reset }] = useMutation(LOGIN);

  const [errorState, setErrorState] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
    submit: null,
    remember: true,
  };
  // form field value validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Must be a valid email')
      .max(255)
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password should be of minimum 6 characters length')
      .required('Password is required'),
  });

  const { errors, values, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: (values: any) => {
        reset();
        setLoading(true);
        authLogin({
          variables: {
            email: values.email,
            password: values.password,
          },
        });
      },
    });

  useEffect(() => {
    if (data) {
      localStorage.setItem('authToken', data.loginAdmin.token);
      setLoading(false);
      navigate('/dashboard');
    }
    //eslint-disable-next-line
  }, [data]);

  useEffect(() => {
    if (error) {
      setErrorState(error.message);
      setLoading(false);
    }
  }, [error]);

  return (
    <FlexBox
      sx={{
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        height: { sm: '100%' },
      }}
    >
      <Card sx={{ padding: 4, maxWidth: 600, boxShadow: 20 }}>
        <FlexBox
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
          mb={5}
        >
          <Box width={38} mb={1}>
            <img src="/static/logo/logo.svg" width="100%" alt="Uko Logo" />
          </Box>
          <H1 fontSize={24} fontWeight={700}>
            Sign In to One-click
          </H1>
        </FlexBox>

        <FlexBox justifyContent="space-between" flexWrap="wrap" my="1rem">
          <form noValidate onSubmit={handleSubmit} style={{ width: '100%' }}>
            <FlexBox justifyContent="space-between" flexWrap="wrap">
              <TextFieldWrapper>
                <Paragraph fontWeight={600} mb={1}>
                  Email
                </Paragraph>
                <LightTextField
                  fullWidth
                  name="email"
                  type="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email || ''}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
              </TextFieldWrapper>

              <TextFieldWrapper>
                <Paragraph fontWeight={600} mb={1}>
                  Password
                </Paragraph>
                <LightTextField
                  fullWidth
                  name="password"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password || ''}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
              </TextFieldWrapper>
            </FlexBox>

            {error && (
              <FormHelperText
                error
                sx={{
                  mt: 2,
                  fontSize: 13,
                  fontWeight: 500,
                  textAlign: 'center',
                }}
              >
                {errorState}
              </FormHelperText>
            )}

            <Box sx={{ mt: 4 }}>
              {loading ? (
                <LoadingButton loading fullWidth variant="contained">
                  Sign In
                </LoadingButton>
              ) : (
                <Button fullWidth type="submit" variant="contained">
                  Sign In
                </Button>
              )}
            </Box>
          </form>

          {/* <Small margin="auto" mt={3} color="text.disabled">
            Don't have an account?{' '}
            <Link to="/register">
              <Small color="primary.main">Create an account</Small>
            </Link>
          </Small> */}
        </FlexBox>
      </Card>
    </FlexBox>
  );
};

export default Login;
