import { useQuery } from '@apollo/client';
import { Box } from '@mui/material';
import TrxTable from 'components/Layouts/TrxTable';
import useTitle from 'hooks/useTitle';
import { GET_TRANSACTIONS } from 'query/transactions';
import { FC, useEffect, useState } from 'react';
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
      console.log(data);
    }
  }, [data]);

  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <Box pt={2} pb={4}>
      <TrxTable data={trxList} refetchDetails={refetchDetails} />
    </Box>
  );
};

export default UserList;
