import { useMutation } from '@apollo/client';
import CancelIcon from '@mui/icons-material/Cancel';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, FormHelperText, Grid } from '@mui/material';
import FlexBox from 'components/FlexBox';
import LightTextField from 'components/LightTextField';
import { H4, H6 } from 'components/Typography';
import UkoAvatar from 'components/UkoAvatar';
import { useFormik } from 'formik';
import useTitle from 'hooks/useTitle';
import { ADD_COIN, DELETE_COIN } from 'mutations/userMutation';
import { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AdminDetails } from 'types';
import * as Yup from 'yup';

interface Props {
  data: AdminDetails['coins'];
  adminId: AdminDetails['id'];
  refetchDetails: () => void;
  toggleModal: () => void;
}

const EditCoin: FC<Props> = ({
  adminId,
  data,
  refetchDetails,
  toggleModal,
}) => {
  // change navbar title
  useTitle('Update User');

  const [errorState, setErrorState] = useState('');
  const [loading, setLoading] = useState(false);

  const [addCoinAdmin, resData] = useMutation(ADD_COIN);
  const [deleteCoinAdmin, deleteCoinData] = useMutation(DELETE_COIN);

  const validationSchema = Yup.object().shape({
    crypto: Yup.string().required('Name is Required!'),
    image: Yup.string(),
  });

  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues: {
      crypto: '',
      image: '',
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      addCoinAdmin({
        variables: {
          id: adminId,
          ...values,
        },
      });
    },
  });

  const deleteCoin = (id: string) => {
    deleteCoinAdmin({
      variables: {
        id: adminId,
        coinId: id,
      },
    });
  };

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
    if (deleteCoinData.data) {
      setLoading(false);
      toast.success('Delete successful');
      refetchDetails();
      deleteCoinData.reset();
    }
    //eslint-disable-next-line
  }, [deleteCoinData.data]);

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
      {data && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <Box padding={3}>
                <H4 fontWeight={600}>Coins</H4>
                <Box mt={3}>
                  <FlexBox
                    alignItems="center"
                    justifyContent={'between'}
                    mt={1.5}
                    gap={1}
                  >
                    {data.map((coin, index) => (
                      <FlexBox
                        alignItems="center"
                        mt={1.5}
                        key={index}
                        marginLeft={2}
                      >
                        <UkoAvatar
                          src={coin.image ?? ''}
                          sx={{
                            border: 4,
                            width: 40,
                            height: 40,
                            borderColor: 'background.paper',
                          }}
                          style={{
                            marginRight: '0',
                          }}
                        />
                        <H6 marginRight={2}>{coin.crypto}</H6>
                        <CancelIcon
                          onClick={() => deleteCoin(coin.id)}
                          style={{
                            cursor: 'pointer',
                          }}
                        />
                      </FlexBox>
                    ))}
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
                    <LightTextField
                      fullWidth
                      placeholder="Crypto Name"
                      id="crypto"
                      name="crypto"
                      value={values.crypto}
                      label="Crypto Name"
                      onChange={handleChange}
                      error={Boolean(touched.crypto && errors.crypto)}
                      helperText={touched.crypto && errors.crypto}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <LightTextField
                      fullWidth
                      name="image"
                      id="image"
                      placeholder="Image url"
                      value={values.image}
                      onChange={handleChange}
                      error={Boolean(touched.image && errors.image)}
                      helperText={touched.image && errors.image}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    {loading ? (
                      <LoadingButton loading variant="contained">
                        Add coin
                      </LoadingButton>
                    ) : (
                      <Button type="submit" variant="contained">
                        Add coin
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </form>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default EditCoin;
