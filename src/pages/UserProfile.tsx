import { useQuery } from '@apollo/client';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Card, styled, Tab } from '@mui/material';
import FlexBox from 'components/FlexBox';
import TrxTable from 'components/Layouts/TrxTable';
import { H3, Small } from 'components/Typography';
import UkoAvatar from 'components/UkoAvatar';
import Profile from 'components/userProfile/Profile';
import useAuth from 'hooks/useAuth';
import useTitle from 'hooks/useTitle';
import moment from 'moment';
import { GET_USER } from 'query/users';
import { FC, SyntheticEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddNewUser from './userManagement/AddNewUser';

// styled components
const StyledCard = styled(Card)(() => ({
  position: 'relative',
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
}));

const ContentWrapper = styled(FlexBox)(() => ({
  top: -20,
  alignItems: 'center',
  position: 'relative',
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  fontSize: 13,
  color: theme.palette.text.primary,
}));

const StyledTabList = styled(TabList)(({ theme }) => ({
  [theme.breakpoints.down(780)]: {
    width: '100%',
    '& .MuiTabs-flexContainer': {
      justifyContent: 'space-start',
    },
    marginBottom: 20,
  },
  [theme.breakpoints.up('sm')]: {
    '& .MuiTabs-flexContainer': {
      minWidth: 400,
      justifyContent: 'space-start',
    },
  },
}));

const StyledTabPanel = styled(TabPanel)(() => ({
  padding: 0,
}));

const UserProfile: FC = () => {
  // change navbar title
  useTitle('User Profile');
  const { user } = useAuth();

  const [value, setValue] = useState('1');

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const { id } = useParams();

  const { loading, data, error, refetch } = useQuery(GET_USER, {
    variables: {
      id,
    },
  });

  const refetchDetails = () => {
    refetch();
  };

  // const navigate = useNavigate();

  // const navigateUser = (id: string) => {
  //   navigate(`/dashboard/user/${id}`);
  // };

  return (
    <Box pt={2} pb={4}>
      {data && (
        <>
          <TabContext value={value}>
            <StyledCard>
              <Box sx={{ height: 200, width: '100%', overflow: 'hidden' }}>
                <img
                  src="/static/background/user-cover-pic.png"
                  alt="User Cover"
                  height="100%"
                  width="100%"
                  style={{ objectFit: 'cover' }}
                />
              </Box>
              <FlexBox
                flexWrap="wrap"
                padding="0 2rem"
                alignItems="center"
                justifyContent="space-between"
              >
                <ContentWrapper>
                  <UkoAvatar
                    src={user?.avatar || '/static/avatar/001-man.svg'}
                    sx={{
                      border: 4,
                      width: 100,
                      height: 100,
                      borderColor: 'background.paper',
                    }}
                  />

                  <Box marginLeft={3} marginTop={3}>
                    <H3 lineHeight={1.2}>{data.adminGetUser.name}</H3>
                    <Small color="text.disabled">
                      Birthday:{' '}
                      {moment(data.adminGetUser.birthDate).format('L')}
                    </Small>
                  </Box>
                </ContentWrapper>

                <StyledTabList onChange={handleChange}>
                  <StyledTab label="Profile" value="1" />
                  <StyledTab label="Transactions" value="2" />
                  <StyledTab label="Update" value="3" />
                </StyledTabList>
              </FlexBox>
            </StyledCard>

            <Box marginTop={3}>
              <StyledTabPanel value="1">
                <Profile data={data.adminGetUser} />
              </StyledTabPanel>

              <StyledTabPanel value="2">
                {data.adminGetUser.transactions.length === 0 ? (
                  <H3>No Transaction yet</H3>
                ) : (
                  <TrxTable
                    data={data.adminGetUser.transactions}
                    refetchDetails={refetchDetails}
                  />
                )}
              </StyledTabPanel>

              <StyledTabPanel value="3">
                <AddNewUser
                  data={data.adminGetUser}
                  refetchDetails={refetchDetails}
                />
              </StyledTabPanel>
            </Box>
          </TabContext>
        </>
      )}
    </Box>
  );
};

export default UserProfile;
