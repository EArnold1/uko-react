import { Card } from '@mui/material';
import { H5 } from 'components/Typography';
import CustomTable from 'components/userManagement/CustomTable';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

// Styled components

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

const columns = [
  {
    Header: 'Name',
    accessor: 'name',
    Cell: ({ row: { original } }: any) => {
      const { name } = original;
      return <p>{name}</p>;
    },
  },
  {
    Header: 'Email',
    accessor: 'email',
    Cell: ({ row: { original } }: any) => {
      const { email } = original;
      return <p>{email}</p>;
    },
  },
  {
    Header: 'Phone Number',
    accessor: 'phoneNumber',
    Cell: ({ row: { original } }: any) => {
      const { phoneNumber } = original;
      return <p>{phoneNumber}</p>;
    },
  },
  {
    Header: 'Birth Date',
    accessor: 'birthDate',
    Cell: ({ row: { original } }: any) => {
      const { birthDate } = original;
      return <p>{birthDate}</p>;
    },
  },
];

const Users: FC<Props> = ({ usersList }) => {
  const navigate = useNavigate();

  const navigateUser = (id: string) => {
    navigate(`/dashboard/user/${id}`);
  };

  const onRowClick = (state: any) => {
    return {
      onClick: () => navigateUser(state._id),
    };
  };

  return (
    <Card sx={{ padding: '2rem' }}>
      <H5>Users</H5>

      <CustomTable
        hidePagination={false}
        columnShape={columns}
        data={usersList}
        rowClick={onRowClick}
      />
    </Card>
  );
};

export default Users;
