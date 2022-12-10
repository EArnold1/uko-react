import { useMutation } from '@apollo/client';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, FormHelperText, Grid } from '@mui/material';
import LightTextField from 'components/LightTextField';
import { useFormik } from 'formik';
import useTitle from 'hooks/useTitle';
import { UPDATE_USER } from 'mutations/userMutation';
import { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

interface UserUpdateModel {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
}

interface Props {
  data: UserUpdateModel;
  refetchDetails: () => void;
}

const AddNewUser: FC<Props> = ({ data, refetchDetails }) => {
  // change navbar title
  useTitle('Update User');

  const [errorState, setErrorState] = useState('');
  const [loading, setLoading] = useState(false);

  const [adminEditUser, resData] = useMutation(UPDATE_USER);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is Required!'),
    email: Yup.string().email().required('Email is Required!'),
    phoneNumber: Yup.number().min(11).required('Phone is Required!'),
    password: Yup.string().min(11),
  });

  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues: {
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      adminEditUser({
        variables: {
          email: values.email,
          password: values.password,
          name: values.name,
          phoneNumber: values.phoneNumber,
          id: data._id,
        },
      });
    },
  });

  useEffect(() => {
    if (resData.data) {
      setLoading(false);
      toast.success('Update successful');
      refetchDetails();
      resData.reset();
    }
    //eslint-disable-next-line
  }, [resData.data]);

  useEffect(() => {
    if (resData.error) {
      setErrorState(resData.error.message);
      setLoading(false);
      resData.reset();
    }
    //eslint-disable-next-line
  }, [resData.error]);

  return (
    <Box pt={2} pb={4}>
      {errorState && (
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
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={{ padding: 3 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item sm={6} xs={12}>
                  <LightTextField
                    fullWidth
                    name="name"
                    placeholder="Full Name"
                    value={values.name}
                    onChange={handleChange}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <LightTextField
                    fullWidth
                    name="email"
                    placeholder="Email Address"
                    value={values.email}
                    onChange={handleChange}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <LightTextField
                    fullWidth
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <LightTextField
                    fullWidth
                    name="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </Grid>

                {/* <Grid item xs={12}>
                    <LightTextField
                      multiline
                      fullWidth
                      rows={10}
                      name="about"
                      placeholder="About"
                      value={values.about}
                      onChange={handleChange}
                      error={Boolean(touched.about && errors.about)}
                      helperText={touched.about && errors.about}
                      sx={{
                        '& .MuiOutlinedInput-root textarea': { padding: 0 },
                      }}
                    />
                  </Grid> */}

                <Grid item xs={12}>
                  {loading ? (
                    <LoadingButton loading fullWidth variant="contained">
                      Update User
                    </LoadingButton>
                  ) : (
                    <Button type="submit" variant="contained">
                      Update User
                    </Button>
                  )}
                </Grid>
              </Grid>
            </form>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddNewUser;
