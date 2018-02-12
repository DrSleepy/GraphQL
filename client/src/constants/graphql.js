import gql from 'graphql-tag';

export const LOGIN_MUTATION = gql`
  mutation LoginQuery($loginDetails: LoginInput) {
    login(loginDetails: $loginDetails) {
      ok
      errors {
        path
        message
      }
      user {
        displayName
        age
      }
      token
    }
  }
`;

export const GET_ALL_USERS_QUERY = gql`
  query {
    getAllUsers {
      _id
      displayName
      age
      email
      password
    }
  }
`;
