import { gql } from '@apollo/client';

const UPDATE_TRX = gql`
  mutation AdminUpdateTransaction(
    $id: String!
    $status: TransactionStatus
    $coinReceived: String
    $cashReceived: String
  ) {
    adminUpdateTransaction(
      id: $id
      status: $status
      coinReceived: $coinReceived
      cashReceived: $cashReceived
    ) {
      status
    }
  }
`;

export { UPDATE_TRX };
