import {
  Box,
  Button,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { Small } from 'components/Typography';
import moment from 'moment';
import { FC } from 'react';
import ScrollBar from 'simplebar-react';
import { TransactionModel, TransactionStatus } from 'types';

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
  paddingBottom: '0.5rem',
  '&:first-of-type': { paddingLeft: 0 },
  '&:last-of-type': { paddingRight: 0 },
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

interface Props {
  data: TransactionModel[];
}
const TrxTable: FC<Props> = ({ data }) => {
  console.log(data);
  const trxStatusColor = (status: TransactionModel['status']) => {
    switch (status) {
      case TransactionStatus.PENDING:
        return '#e4e4e4';
      case TransactionStatus.CONFIRMED:
        return 'green';
      case TransactionStatus.DECLINED:
        return 'red';
      default:
        return '#e4e4e4';
    }
  };
  return (
    <ScrollBar>
      <Table>
        <TableHead
          sx={{
            borderBottom: '1.5px solid',
            borderColor: 'divider',
          }}
        >
          <TableRow>
            <HeadTableCell>Currency</HeadTableCell>
            <HeadTableCell>Amount</HeadTableCell>
            <HeadTableCell>Trx Type</HeadTableCell>
            <HeadTableCell>Network</HeadTableCell>
            <HeadTableCell>Rate</HeadTableCell>
            <HeadTableCell>Status</HeadTableCell>
            <HeadTableCell>Wallet</HeadTableCell>
            <HeadTableCell>Date</HeadTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item: TransactionModel, index: number) => (
            <TableRow
              key={index}
              // onClick={() => navigateUser(item.id)}
              sx={{
                cursor: 'pointer',
              }}
            >
              <BodyTableCell>{item.coin}</BodyTableCell>
              <BodyTableCell>
                <Box display="flex" alignItems="center">
                  <Small ml="1rem">{item.amount}</Small>
                </Box>
              </BodyTableCell>
              <BodyTableCell>
                <StyledButton
                  sx={{
                    backgroundColor:
                      item.type === 'BUY' ? '#0fbd24' : '#f1c232',
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollBar>
  );
};

export default TrxTable;
