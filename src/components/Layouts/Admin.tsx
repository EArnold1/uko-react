import { useQuery } from '@apollo/client';
import { Box, Button, Card, Grid } from '@mui/material';
import FlexBox from 'components/FlexBox';
import LoadingScreen from 'components/LoadingScreen';
import { H4, H6, Small } from 'components/Typography';
import UkoAvatar from 'components/UkoAvatar';
import useTitle from 'hooks/useTitle';
import { GET_ADMIN } from 'query/users';
import { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AdminDetails } from 'types';
import EditAdmin from './AdminEdit';
import EditCoin from './EditCoin';
import ModalComp from './Modal';

const Admin: FC = () => {
  const [details, setDetails] = useState<AdminDetails | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [coinModal, setCoinModal] = useState(false);

  useTitle('Admin Profile');

  const navigate = useNavigate();

  const toggleModal = () => {
    setOpenModal(!openModal);
  };
  const toggleCoinModal = () => {
    setCoinModal(!coinModal);
  };

  const { loading, error, data, refetch } = useQuery(GET_ADMIN);

  const refetchDetails = () => {
    refetch();
  };

  useEffect(() => {
    if (data) {
      setDetails(data.adminGetDetails);
    }
  }, [data]);

  const handleErr = (val: string) => {
    switch (val) {
      case 'User not found':
      case 'Access denied':
      case 'Invalid token':
        localStorage.removeItem('authToken');
        navigate('/login');
    }
  };

  useEffect(() => {
    if (error?.message) {
      handleErr(error.message);
    }

    if (error?.networkError) {
      toast.error(error.networkError.message);
    }
  }, [error]);

  return (
    <Grid container spacing={3}>
      {details && !loading ? (
        <>
          <Grid item xs={12}>
            <Button variant="contained" onClick={() => setOpenModal(true)}>
              Edit
            </Button>
            <Card
              style={{
                marginTop: '10px',
              }}
            >
              <Box padding={3}>
                <H4 fontWeight={600}>User Details</H4>
                <Box mt={3}>
                  <FlexBox alignItems="center" mt={1.5}>
                    <H6 marginLeft={1}>
                      <Small>Account Name:</Small> {details.acctName}
                    </H6>
                  </FlexBox>
                  <FlexBox alignItems="center" mt={1.5}>
                    <H6 marginLeft={1}>
                      <Small>Account Number:</Small> {details.acctNumber}
                    </H6>
                  </FlexBox>
                  <FlexBox alignItems="center" mt={1.5}>
                    <H6 marginLeft={1}>
                      <Small>Bank Name:</Small> {details.bankName}
                    </H6>
                  </FlexBox>
                  <FlexBox alignItems="center" mt={1.5}>
                    <H6 marginLeft={1}>
                      <Small>Sell Rate:</Small> {details.sellRate}
                    </H6>
                  </FlexBox>
                  <FlexBox alignItems="center" mt={1.5}>
                    <H6 marginLeft={1}>
                      <Small>Buy Rate:</Small> {details.buyRate}
                    </H6>
                  </FlexBox>
                </Box>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={() => setCoinModal(true)}
              style={{
                margin: '10px 0',
              }}
            >
              Edit Coins
            </Button>
            <Card>
              <Box padding={3}>
                <H4 fontWeight={600}>Coins</H4>
                <Box mt={3}>
                  <FlexBox alignItems="center" mt={1.5} gap={1}>
                    {details.coins?.map((coin, index) => (
                      <FlexBox
                        alignItems="start"
                        flexDirection={'column'}
                        mt={1.5}
                        key={index}
                      >
                        <UkoAvatar
                          src={coin.image ?? ''}
                          sx={{
                            border: 4,
                            width: 40,
                            height: 40,
                            borderColor: 'background.paper',
                          }}
                        />
                        <H6 marginLeft={1}>{coin.crypto}</H6>
                        <H6
                          marginLeft={1}
                          style={{
                            width: '250px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {coin.wallet}
                        </H6>
                      </FlexBox>
                    ))}
                  </FlexBox>
                </Box>
              </Box>
            </Card>
          </Grid>
          {openModal && (
            <ModalComp
              title="Update Admin"
              toggleModal={toggleModal}
              open={openModal}
            >
              <EditAdmin
                refetchDetails={refetchDetails}
                data={details}
                toggleModal={toggleModal}
              />
            </ModalComp>
          )}
          {coinModal && (
            <ModalComp
              title="Update Admin"
              toggleModal={toggleCoinModal}
              open={coinModal}
            >
              <EditCoin
                data={details.coins}
                adminId={details.id}
                refetchDetails={refetchDetails}
                toggleModal={toggleCoinModal}
              />
            </ModalComp>
          )}
        </>
      ) : (
        <Grid item xs={12}>
          <LoadingScreen />
        </Grid>
      )}
    </Grid>
  );
};

export default Admin;
