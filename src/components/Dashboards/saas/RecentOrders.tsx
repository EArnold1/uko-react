import {
  Box,
  Card,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { H5, Small } from 'components/Typography';
import moment from 'moment';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollBar from 'simplebar-react';

const commonCSS = {
  minWidth: 120,
  '&:nth-of-type(2)': { minWidth: 170 },
  '&:nth-of-type(3)': { minWidth: 80 },
};

// Styled components
const HeadTableCell = styled(TableCell)(() => ({
  fontSize: 12,
  fontWeight: 600,
  '&:first-of-type': { paddingLeft: 0 },
  '&:last-of-type': { paddingRight: 0 },
}));

const BodyTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: 12,
  fontWeight: 500,
  padding: 0,
  paddingLeft: '1rem',
  paddingTop: '0.7rem',
  '&:first-of-type': { paddingLeft: 0 },
  '&:last-of-type': { paddingRight: 0 },
  [theme.breakpoints.down('sm')]: { ...commonCSS },
  [theme.breakpoints.between(960, 1270)]: { ...commonCSS },
}));

export enum UserRoles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
export interface Props {
  usersList: {
    _id: string;
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    birthDate: string;
    bank?: {
      bankName: string;
      acctNo: string;
      acctName: string;
    };
    date: Date;
  }[];
}

const Users: FC<Props> = ({ usersList }) => {
  const navigate = useNavigate();

  const navigateUser = (id: string) => {
    navigate(`/dashboard/user/${id}`);
  };

  return (
    <Card sx={{ padding: '2rem' }}>
      <H5>Users</H5>

      <ScrollBar>
        <Table>
          <TableHead
            sx={{ borderBottom: '1.5px solid', borderColor: 'divider' }}
          >
            <TableRow>
              <HeadTableCell>Name</HeadTableCell>
              <HeadTableCell>Email</HeadTableCell>
              <HeadTableCell>Phone Number</HeadTableCell>
              <HeadTableCell>Birth-Date</HeadTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {usersList.map((item, index) => (
              <TableRow
                key={index}
                onClick={() => navigateUser(item._id)}
                sx={{
                  cursor: 'pointer',
                }}
              >
                <BodyTableCell>{item.name}</BodyTableCell>
                <BodyTableCell>
                  <Box display="flex" alignItems="center">
                    <Small ml="1rem">{item.email}</Small>
                  </Box>
                </BodyTableCell>
                <BodyTableCell>{item.phoneNumber}</BodyTableCell>
                <BodyTableCell>
                  <Box>{moment(item.birthDate).format('L')}</Box>
                </BodyTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollBar>
    </Card>
  );
};

export default Users;
