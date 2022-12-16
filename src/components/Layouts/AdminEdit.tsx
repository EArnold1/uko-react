import { useMutation } from '@apollo/client';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, FormHelperText, Grid } from '@mui/material';
import LightTextField from 'components/LightTextField';
import { useFormik } from 'formik';
import useTitle from 'hooks/useTitle';
import { UPDATE_ADMIN } from 'mutations/userMutation';
import { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AdminDetails } from 'types';
import * as Yup from 'yup';

interface Props {
  data: AdminDetails;
  refetchDetails: () => void;
  toggleModal: () => void;
}

const EditAdmin: FC<Props> = ({ data, refetchDetails, toggleModal }) => {
  // change navbar title
  useTitle('Update User');

  const [errorState, setErrorState] = useState('');
  const [loading, setLoading] = useState(false);

  const [updateAdmin, resData] = useMutation(UPDATE_ADMIN);

  const validationSchema = Yup.object().shape({
    acctName: Yup.string().required('account name is Required!'),
    acctNumber: Yup.number().required('account number is Required!'),
    bankName: Yup.string().required('bank name is Required!'),
    sellRate: Yup.number().required('sell rate  is Required!'),
    buyRate: Yup.number().required('buy rate is Required!'),
  });

  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues: {
      acctName: data.acctName,
      acctNumber: data.acctNumber,
      bankName: data.bankName,
      sellRate: data.sellRate,
      buyRate: data.buyRate,
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      values.sellRate = +values.sellRate;
      values.buyRate = +values.buyRate;
      updateAdmin({
        variables: {
          id: data.id,
          ...values,
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
      toggleModal();
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
                    placeholder="Account Name"
                    id="acctName"
                    name="acctName"
                    value={values.acctName}
                    label="Account Name"
                    onChange={handleChange}
                    error={Boolean(touched.acctName && errors.acctName)}
                    helperText={touched.acctName && errors.acctName}
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <LightTextField
                    fullWidth
                    name="acctNumber"
                    placeholder="Account Number"
                    value={values.acctNumber}
                    onChange={handleChange}
                    error={Boolean(touched.acctNumber && errors.acctNumber)}
                    helperText={touched.acctNumber && errors.acctNumber}
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <LightTextField
                    fullWidth
                    name="bankName"
                    placeholder="Bank Name"
                    value={values.bankName}
                    onChange={handleChange}
                    error={Boolean(touched.bankName && errors.bankName)}
                    helperText={touched.bankName && errors.bankName}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <LightTextField
                    fullWidth
                    name="sellRate"
                    placeholder="Sell rate"
                    value={values.sellRate}
                    onChange={handleChange}
                    error={Boolean(touched.sellRate && errors.sellRate)}
                    helperText={touched.sellRate && errors.sellRate}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <LightTextField
                    fullWidth
                    name="buyRate"
                    placeholder="Buy Rate"
                    value={values.buyRate}
                    onChange={handleChange}
                    error={Boolean(touched.buyRate && errors.buyRate)}
                    helperText={touched.buyRate && errors.buyRate}
                  />
                </Grid>

                <Grid item xs={12}>
                  {loading ? (
                    <LoadingButton loading variant="contained">
                      Update
                    </LoadingButton>
                  ) : (
                    <Button type="submit" variant="contained">
                      Update
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

export default EditAdmin;
