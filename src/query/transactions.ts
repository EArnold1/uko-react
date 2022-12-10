import { gql } from '@apollo/client';

const GET_TRANSACTIONS = gql`
  query AdminGetTransaction {
    adminGetTransactions {
      amount
      status
      coin
      rate
      type
      wallet
      date
      network
      id
      date
      user {
        name
        email
        phoneNumber
        password
        birthDate
        date
        _id
        bank {
          bankName
          acctName
          acctNo
        }
      }
    }
  }
`;

export { GET_TRANSACTIONS };
