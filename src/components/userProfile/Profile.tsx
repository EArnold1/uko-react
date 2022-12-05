import { Box, Card, Grid } from '@mui/material';
import FlexBox from 'components/FlexBox';
import { H4, H6, Small } from 'components/Typography';
import { FC } from 'react';
import { UserModel } from 'types';
interface Props {
  data: UserModel
}

const Profile: FC<Props> = ({ data }) => {
  return (
    <Grid container spacing={3}>
      <Grid item md={7} xs={12}>
        <Card>
          <Box padding={3}>
            <H4 fontWeight={600}>User Details</H4>

            <Box mt={3}>
              <FlexBox alignItems="center" mt={1.5}>
                <H6 marginLeft={1}>
                  <Small>Full Name:</Small> {data.name}
                </H6>
              </FlexBox>
              <FlexBox alignItems="center" mt={1.5}>
                <H6 marginLeft={1}>
                  <Small>Email:</Small> {data.email}
                </H6>
              </FlexBox>
              <FlexBox alignItems="center" mt={1.5}>
                <H6 marginLeft={1}>
                  <Small>Phone Number:</Small> {data.phoneNumber}
                </H6>
              </FlexBox>
            </Box>
          </Box>
        </Card>
      </Grid>
      <Grid item md={5} xs={12}>
        <Card>
          <Box padding={3}>
            <H4 fontWeight={600}>Bank Details</H4>

            <Box mt={3}>
              <FlexBox alignItems="center" mt={1.5}>
                <H6 marginLeft={1}>
                  <Small>Bank Name:</Small> {data.bank.bankName}
                </H6>
              </FlexBox>
              <FlexBox alignItems="center" mt={1.5}>
                <H6 marginLeft={1}>
                  <Small>Account Name:</Small> {data.bank.acctName}
                </H6>
              </FlexBox>
              <FlexBox alignItems="center" mt={1.5}>
                <H6 marginLeft={1}>
                  <Small>Account Number:</Small> {data.bank.acctNo}
                </H6>
              </FlexBox>
            </Box>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Profile;
