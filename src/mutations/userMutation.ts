import { gql } from '@apollo/client';

const UPDATE_USER = gql`
  mutation AdminEditUser(
    $email: String
    $name: String
    $password: String
    $phoneNumber: String
    $id: String!
  ) {
    adminEditUser(
      id: $id
      name: $name
      password: $password
      phoneNumber: $phoneNumber
      email: $email
    ) {
      name
      email
      phoneNumber
    }
  }
`;

export { UPDATE_USER };
