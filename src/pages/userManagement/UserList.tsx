import { useQuery } from '@apollo/client';
import { Box, Grid } from '@mui/material';
import TrxTable from 'components/Layouts/TrxTable';
import LoadingScreen from 'components/LoadingScreen';
import useTitle from 'hooks/useTitle';
import { GET_TRANSACTIONS } from 'query/transactions';
import { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { TransactionModel, UserModel } from 'types';
// import { useNavigate } from "react-router-dom";

type TrxUser = {
  user: UserModel;
};

const UserList: FC = () => {
  // change navbar title
  useTitle('Transactions List');

  const { loading, error, data, refetch } = useQuery(GET_TRANSACTIONS);

  const refetchDetails = () => {
    refetch();
  };

  const [trxList, setTrxList] = useState<(TransactionModel & TrxUser)[]>([]);

  useEffect(() => {
    if (data) {
      setTrxList(data.adminGetTransactions);
    }
  }, [data]);

  const handleErr = (val: string) => {
    switch (val) {
      case 'User not found':
      case 'Access denied':
      case 'Invalid token':
        return localStorage.removeItem('authToken');
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
    <Box pt={2} pb={4}>
      {data && !loading ? (
        <TrxTable data={trxList} refetchDetails={refetchDetails} />
      ) : (
        <Grid item xs={12}>
          <LoadingScreen />
        </Grid>
      )}
    </Box>
  );
};

export default UserList;
