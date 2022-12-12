import { gql } from '@apollo/client';

const GET_USERS = gql`
  query Users {
    getAllUsers {
      email
      bank {
        acctName
        acctNo
        bankName
      }
      birthDate
      _id
      phoneNumber
      name
      date
    }
  }
`;

const GET_USER = gql`
  query AdminGetUser($id: String!) {
    adminGetUser(id: $id) {
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
      transactions {
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
  }
`;

const GET_ADMIN = gql`
  query AdminGetDetails {
    adminGetDetails {
      acctName
      acctNumber
      bankName
      id
      rate
      coins {
        crypto
        image
        id
        wallet
      }
    }
  }
`;

export { GET_USERS, GET_USER, GET_ADMIN };

