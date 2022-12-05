import { useQuery } from '@apollo/client';
import { Box } from '@mui/material';
import TrxTable from 'components/Layouts/TrxTable';
import useTitle from 'hooks/useTitle';
import { GET_TRANSACTIONS } from 'query/transactions';
import { FC, useEffect, useState } from 'react';
import { TransactionModel } from 'types';
// import { useNavigate } from "react-router-dom";

const UserList: FC = () => {
  // change navbar title
  useTitle('Transactions List');

  const { loading, error, data } = useQuery(GET_TRANSACTIONS);

  const [trxList, setTrxList] = useState<TransactionModel[]>([]);

  useEffect(() => {
    if (data) {
      setTrxList(data.adminGetTransactions);
    }
  }, [data]);

  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <Box pt={2} pb={4}>
      <TrxTable data={trxList} />
    </Box>
  );
};

export default UserList;
