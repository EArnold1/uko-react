import { useQuery } from '@apollo/client';
import { Box, Button, Grid, styled } from '@mui/material';
import Footer from 'components/Dashboards/saas/Footer';
import RecentOrders from 'components/Dashboards/saas/RecentOrders';
import FlexBox from 'components/FlexBox';
import SearchInput from 'components/SearchInput';
import useTitle from 'hooks/useTitle';
import { GET_USERS } from 'query/users';
import { FC, useEffect, useState } from 'react';

const StyledFlexBox = styled(FlexBox)(({ theme }) => ({
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  marginBottom: 20,
  [theme.breakpoints.down(500)]: {
    width: '100%',
    '& .MuiInputBase-root': { maxWidth: '100%' },
    '& .MuiButton-root': {
      width: '100%',
      marginTop: 15,
    },
  },
}));

const SaaS: FC = () => {
  // change navbar title
  useTitle('Users List');

  const { loading, error, data } = useQuery(GET_USERS);

  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    console.log(data);
    if (data) {
      setUsersList(data.getAllUsers);
    }
  }, [data]);

  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <Box pt={2} pb={4}>
      <Grid item xs={12}>
        <StyledFlexBox>
          <SearchInput placeholder="Search user..." />
          <Button variant="contained">Send mail</Button>
        </StyledFlexBox>
      </Grid>
      <Grid container spacing={4} pt={4}>
        {!loading && data && (
          <Grid item lg={12} md={7} xs={12}>
            <RecentOrders usersList={usersList} />
          </Grid>
        )}
        <Grid item xs={12}>
          <Footer imageLink="/static/illustration/sass-dashboard.svg" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SaaS;
