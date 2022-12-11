import {
  Box,
  Button,
  Card,
  Grid,
  MenuItem,
  Select,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { Small } from 'components/Typography';
import moment from 'moment';
import { FC, useEffect, useState } from 'react';
import ScrollBar from 'simplebar-react';
import {
  TransactionModel,
  TransactionStatus,
  TransactionType,
  UserModel,
} from 'types';
import EditTrx from './EditTrx';
import ModalComp from './Modal';

const commonCSS = {
  minWidth: 120,
  '&:nth-of-type(2)': { minWidth: 170 },
  '&:nth-of-type(3)': { minWidth: 80 },
};

// Styled components
const HeadTableCell = styled(TableCell)(() => ({
  fontSize: 12,
  fontWeight: 600,
  minWidth: 150,
  padding: '0 20px',
  '&:first-of-type': { paddingLeft: 0, minWidth: 50 },
}));

const BodyTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: 12,
  fontWeight: 500,
  padding: 0,
  paddingLeft: '1rem',
  paddingTop: '0.7rem',
  minWidth: 150,
  paddingBottom: '0.5rem',
  '&:first-of-type': { paddingLeft: 0, minWidth: 50 },
  [theme.breakpoints.down('sm')]: { ...commonCSS },
  [theme.breakpoints.between(960, 1270)]: { ...commonCSS },
}));

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
const TrxTable: FC<Props> = ({ data, refetchDetails }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTrx, setCurrentTrx] = useState<TransactionModel | null>(null);
  const [sort, setSort] = useState('ALL');
  const [tableData, setTableData] = useState<(TransactionModel & TrxUser)[]>(
    []
  );

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const setTrxData = (data: TransactionModel) => {
    setCurrentTrx(data);
  };

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

  useEffect(() => {
    setTableData(data);
  }, [data]);

  useEffect(() => {
    setSortTable(sort);
    //eslint-disable-next-line
  }, [sort]);

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
      <ScrollBar>
        <Table>
          <TableHead
            sx={{
              borderBottom: '1.5px solid',
              borderColor: 'divider',
            }}
          >
            <TableRow>
              <HeadTableCell>S/N</HeadTableCell>
              <HeadTableCell>Name</HeadTableCell>
              <HeadTableCell>Phone Number</HeadTableCell>
              <HeadTableCell>Coin</HeadTableCell>
              <HeadTableCell>Amount(coin)</HeadTableCell>
              <HeadTableCell>Amount(naira)</HeadTableCell>
              <HeadTableCell>Trx Type</HeadTableCell>
              <HeadTableCell>Network</HeadTableCell>
              <HeadTableCell>Rate</HeadTableCell>
              <HeadTableCell>Status</HeadTableCell>
              <HeadTableCell>Wallet Address</HeadTableCell>
              <HeadTableCell>Date & Time</HeadTableCell>
              <HeadTableCell>Coin Received</HeadTableCell>
              <HeadTableCell>Cash Received</HeadTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map(
              (item: TransactionModel & TrxUser, index: number) => (
                <TableRow
                  key={index}
                  onClick={() => {
                    setTrxData(item);
                    toggleModal();
                  }}
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  <BodyTableCell>{index + 1}</BodyTableCell>
                  <BodyTableCell>{item.user.name}</BodyTableCell>
                  <BodyTableCell>{item.user.phoneNumber}</BodyTableCell>
                  <BodyTableCell>{item.coin}</BodyTableCell>
                  <BodyTableCell>
                    <Box display="flex" alignItems="center">
                      <Small ml="1rem">
                        {item.type === TransactionType.SELL
                          ? item.amount
                          : 'NaN'}
                      </Small>
                    </Box>
                  </BodyTableCell>
                  <BodyTableCell>
                    <Box display="flex" alignItems="center">
                      {item.type === TransactionType.BUY ? item.amount : 'NaN'}
                    </Box>
                  </BodyTableCell>
                  <BodyTableCell>
                    <StyledButton
                      sx={{
                        backgroundColor:
                          item.type === 'BUY' ? '#66bff4' : '#f1c232',
                      }}
                    >
                      <Box>{item.type}</Box>
                    </StyledButton>
                  </BodyTableCell>
                  <BodyTableCell>
                    <Box>{item.network ?? 'NaN'}</Box>
                  </BodyTableCell>
                  <BodyTableCell>
                    <Box>{item.rate}</Box>
                  </BodyTableCell>

                  <BodyTableCell>
                    <StyledButton
                      sx={{
                        backgroundColor: trxStatusColor(item.status),
                      }}
                    >
                      <Box>{item.status}</Box>
                    </StyledButton>
                  </BodyTableCell>
                  <BodyTableCell>
                    <Box>{item.wallet ?? 'NaN'}</Box>
                  </BodyTableCell>
                  <BodyTableCell>
                    <Box>{moment(item.date).format('L')}</Box>
                  </BodyTableCell>
                  <BodyTableCell>
                    <Box>{item.coinReceived ?? 'NaN'}</Box>
                  </BodyTableCell>
                  <BodyTableCell>
                    <Box>{item.cashReceived ?? 'NaN'}</Box>
                  </BodyTableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </ScrollBar>
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
