import { gql } from '@apollo/client';

const UPDATE_TRX = gql`
  mutation AdminUpdateTransaction($id: String!, $status: TransactionStatus!) {
    adminUpdateTransaction(id: $id, status: $status) {
      status
    }
  }
`;

export { UPDATE_TRX };
