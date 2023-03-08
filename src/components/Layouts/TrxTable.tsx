import {
  Box,
  Button,
  Card,
  Grid,
  MenuItem,
  Select,
  styled,
} from '@mui/material';
import { Small } from 'components/Typography';
import CustomTable from 'components/userManagement/CustomTable';
import moment from 'moment';
import { FC, useEffect, useState } from 'react';
// import ScrollBar from 'simplebar-react';
import {
  TransactionModel,
  TransactionStatus,
  TransactionType,
  UserModel,
} from 'types';
import EditTrx from './EditTrx';
import ModalComp from './Modal';

// Styled components

const StyledButton = styled(Button)(({ theme }) => ({
  width: 83,
  padding: 0,
  height: 25,
  fontSize: 10,
  fontWeight: 500,
  borderRadius: '11px',
}));

type TrxUser = {
  user: UserModel;
};

interface Props {
  data: (TransactionModel & TrxUser)[];
  refetchDetails: () => void;
}

const trxStatusColor = (status: TransactionModel['status']) => {
  switch (status) {
    case TransactionStatus.PENDING:
      return '#e4e4e4';
    case TransactionStatus.CONFIRMED:
      return '#0fbd24';
    case TransactionStatus.DECLINED:
      return '#ff084c';
    default:
      return '#e4e4e4';
  }
};

const columns = [
  {
    Header: 'Name',
    accessor: 'name',
    Cell: ({ row: { original } }: any) => {
      const {
        user: { name },
      } = original;
      return <p>{name}</p>;
    },
  },
  {
    Header: 'Phone Number',
    accessor: 'phoneNumber',
    Cell: ({ row: { original } }: any) => {
      const {
        user: { phoneNumber },
      } = original;
      return <p>{phoneNumber}</p>;
    },
  },
  {
    Header: 'Coin',
    accessor: 'coin',
    Cell: ({ row: { original } }: any) => {
      const { coin } = original;
      return <p>{coin}</p>;
    },
  },
  {
    Header: 'Amount(coin/naira)',
    accessor: 'amount',
    Cell: ({ row: { original } }: any) => {
      const { type, amount } = original;
      return (
        <Box display="flex" alignItems="center">
          <Small ml="1rem">
            {type === TransactionType.SELL ? amount : `N ${amount}`}
          </Small>
        </Box>
      );
    },
  },
  {
    Header: 'Trx Type',
    accessor: 'type',
    Cell: ({ row: { original } }: any) => {
      const { type } = original;
      return (
        <StyledButton
          sx={{
            backgroundColor: type === 'BUY' ? '#66bff4' : '#f1c232',
          }}
        >
          <Box>{type}</Box>
        </StyledButton>
      );
    },
  },
  {
    Header: 'Network',
    accessor: 'network',
    Cell: ({ row: { original } }: any) => {
      const { network } = original;
      return <Box>{network ?? 'NaN'}</Box>;
    },
  },
  {
    Header: 'Rate',
    accessor: 'rate',
    Cell: ({ row: { original } }: any) => {
      const { rate } = original;
      return <Box>{rate}</Box>;
    },
  },
  {
    Header: 'Status',
    accessor: 'status',
    Cell: ({ row: { original } }: any) => {
      const { status } = original;
      return (
        <StyledButton
          sx={{
            backgroundColor: trxStatusColor(status),
          }}
        >
          <Box>{status}</Box>
        </StyledButton>
      );
    },
  },
  {
    Header: 'Wallet',
    accessor: 'wallet',
    Cell: ({ row: { original } }: any) => {
      const { wallet } = original;
      return <Box>{wallet ?? 'NaN'}</Box>;
    },
  },
  {
    Header: 'Date & Time',
    accessor: 'date',
    Cell: ({ row: { original } }: any) => {
      const { date } = original;
      return <Box>{moment(date).format('L')}</Box>;
    },
  },
  {
    Header: 'Coin Received',
    accessor: 'coinReceived',
    Cell: ({ row: { original } }: any) => {
      const { coinReceived } = original;
      return <Box>{coinReceived.length ? coinReceived : '-'}</Box>;
    },
  },
  {
    Header: 'Cash Received',
    accessor: 'cashReceived',
    Cell: ({ row: { original } }: any) => {
      const { cashReceived } = original;
      return <Box>{cashReceived.length ? cashReceived : '-'}</Box>;
    },
  },
];

const TrxTable: FC<Props> = ({ data, refetchDetails }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTrx, setCurrentTrx] = useState<TransactionModel | null>(null);
  const [sort, setSort] = useState('ALL');
  const [tableData, setTableData] = useState<(TransactionModel & TrxUser)[]>(
    []
  );

  const setSortTable = (val: string) => {
    let res;
    switch (val) {
      case 'ALL':
        return setTableData(data);
      case 'BUY':
        res = data.filter((trx) => trx.type === 'BUY');
        return setTableData(res);
      case 'SELL':
        res = data.filter((trx) => trx.type === 'SELL');
        return setTableData(res);

      default:
        return setTableData(data);
    }
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const setTrxData = (data: TransactionModel) => {
    setCurrentTrx(data);
  };

  useEffect(() => {
    setTableData(data);
  }, [data]);

  useEffect(() => {
    setSortTable(sort);
    //eslint-disable-next-line
  }, [sort]);

  const onRowClick = (state: any) => {
    return {
      onClick: () => {
        setTrxData(state);
        toggleModal();
      },
    };
  };

  return (
    <Card
      style={{
        padding: '5px 10px',
      }}
    >
      <Grid item sm={6} xs={12} mb={5}>
        <Select
          labelId="Sort"
          id="Sort"
          name="sort"
          value={sort}
          label="Sort"
          onChange={(e) => {
            setSort(e.target.value);
          }}
        >
          <MenuItem value={'ALL'}>ALL</MenuItem>
          <MenuItem value={'SELL'}>SELL</MenuItem>
          <MenuItem value={'BUY'}>BUY</MenuItem>
        </Select>
      </Grid>
      <CustomTable
        hidePagination={false}
        columnShape={columns}
        data={tableData}
        rowClick={onRowClick}
      />
      {modalOpen && currentTrx !== null && (
        <ModalComp
          title="update transaction"
          open={modalOpen}
          toggleModal={toggleModal}
        >
          <EditTrx
            data={currentTrx}
            refetchDetails={refetchDetails}
            toggleModal={toggleModal}
          />
        </ModalComp>
      )}
    </Card>
  );
};

export default TrxTable;
