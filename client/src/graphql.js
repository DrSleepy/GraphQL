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
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation LoginQuery($registerDetails: RegisterInput) {
    register(registerDetails: $registerDetails) {
      ok
      errors {
        path
        message
      }
      user {
        displayName
        age
        gender
      }
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

export const LOGOUT_MUTATION = gql`
  mutation {
    logout
  }
`;

export const MY_PROFILE_QUERY = gql`
  query {
    myProfile {
      _id
      displayName
      age
      email
      password
    }
  }
`;
