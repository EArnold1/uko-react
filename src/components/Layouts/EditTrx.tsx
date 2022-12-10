import { useMutation } from '@apollo/client';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Card,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
} from '@mui/material';
import FlexBox from 'components/FlexBox';
import LightTextField from 'components/LightTextField';
import { H4, H6, Small } from 'components/Typography';
import { useFormik } from 'formik';
import useTitle from 'hooks/useTitle';
import { UPDATE_TRX } from 'mutations/transactionMutations';
import { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { TransactionModel, UserModel } from 'types';
import * as Yup from 'yup';

type TrxUser = {
  user?: UserModel;
};

interface Props {
  data: TransactionModel & TrxUser;
  refetchDetails: () => void;
  toggleModal: () => void;
}

const EditTrx: FC<Props> = ({ data, refetchDetails, toggleModal }) => {
  // change navbar title
  useTitle('Update User');

  const [errorState, setErrorState] = useState('');
  const [loading, setLoading] = useState(false);

  const [adminUpdateTransaction, resData] = useMutation(UPDATE_TRX);

  const validationSchema = Yup.object().shape({
    status: Yup.string().required('Name is Required!'),
    cashReceived: Yup.string(),
    coinReceived: Yup.string(),
  });

  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues: {
      status: data.status,
      coinReceived: '',
      cashReceived: '',
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      adminUpdateTransaction({
        variables: {
          id: data.id,
          status: values.status,
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
        <Grid item md={4} xs={12}>
          <Card>
            <Box padding={3}>
              <H4 fontWeight={600}>User Details</H4>

              <Box mt={3}>
                <FlexBox alignItems="center" mt={1.5}>
                  <H6 marginLeft={1}>
                    <Small>Full Name:</Small> {data.user?.name}
                  </H6>
                </FlexBox>
                <FlexBox alignItems="center" mt={1.5}>
                  <H6 marginLeft={1}>
                    <Small>Email:</Small> {data.user?.email}
                  </H6>
                </FlexBox>
                <FlexBox alignItems="center" mt={1.5}>
                  <H6 marginLeft={1}>
                    <Small>Phone Number:</Small> {data.user?.phoneNumber}
                  </H6>
                </FlexBox>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item md={4} xs={12}>
          <Card>
            <Box padding={3}>
              <H4 fontWeight={600}>Transaction Details</H4>

              <Box mt={3}>
                <FlexBox alignItems="center" mt={1.5}>
                  <H6 marginLeft={1}>
                    <Small>Transaction Id:</Small> {data.trxId ?? 'NaN'}
                  </H6>
                </FlexBox>
                <FlexBox alignItems="center" mt={1.5}>
                  <H6 marginLeft={1}>
                    <Small>Wallet</Small> {data.wallet ?? 'NaN'}
                  </H6>
                </FlexBox>
                <FlexBox alignItems="center" mt={1.5}>
                  <H6 marginLeft={1}>
                    <Small>Current Status</Small> {data.status}
                  </H6>
                </FlexBox>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item md={4} xs={12}>
          <Card>
            <Box padding={3}>
              <H4 fontWeight={600}>Bank Details</H4>

              <Box mt={3}>
                <FlexBox alignItems="center" mt={1.5}>
                  <H6 marginLeft={1}>
                    <Small>Bank Name:</Small> {data.user?.bank.bankName}
                  </H6>
                </FlexBox>
                <FlexBox alignItems="center" mt={1.5}>
                  <H6 marginLeft={1}>
                    <Small>Account Name:</Small> {data.user?.bank.acctName}
                  </H6>
                </FlexBox>
                <FlexBox alignItems="center" mt={1.5}>
                  <H6 marginLeft={1}>
                    <Small>Account Number:</Small> {data.user?.bank.acctNo}
                  </H6>
                </FlexBox>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ padding: 3 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item sm={6} xs={12}>
                  <Select
                    fullWidth
                    labelId="Status"
                    id="status"
                    name="status"
                    value={values.status}
                    label="Status"
                    onChange={handleChange}
                    error={Boolean(touched.status && errors.status)}
                  >
                    <MenuItem value={'PENDING'}>PENDING</MenuItem>
                    <MenuItem value={'DECLINED'}>DECLINED</MenuItem>
                    <MenuItem value={'CONFIRMED'}>CONFIRMED</MenuItem>
                  </Select>
                </Grid>

                <Grid item sm={6} xs={12}>
                  <LightTextField
                    fullWidth
                    name="coinReceived"
                    placeholder="Coin Received"
                    value={values.coinReceived}
                    onChange={handleChange}
                    error={Boolean(touched.coinReceived && errors.coinReceived)}
                    helperText={touched.coinReceived && errors.coinReceived}
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <LightTextField
                    fullWidth
                    name="cashReceived"
                    placeholder="Cash Received"
                    value={values.cashReceived}
                    onChange={handleChange}
                    error={Boolean(touched.cashReceived && errors.cashReceived)}
                    helperText={touched.cashReceived && errors.cashReceived}
                  />
                </Grid>

                <Grid item xs={12}>
                  {loading ? (
                    <LoadingButton loading variant="contained">
                      Update Transaction
                    </LoadingButton>
                  ) : (
                    <Button type="submit" variant="contained">
                      Update Transaction
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

export default EditTrx;
