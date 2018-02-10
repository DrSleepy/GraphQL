import gql from 'graphql-tag';

// my version
export const GET_ALL_USERS_QUERY = gql`
  query {
    getAllUsers {
      displayName
    }
  }
`;

export const GET_ALL_PRIVATE_CHATS_QUERY = gql`
  query {
    getAllPrivateChats {
      name
    }
  }
`;

// original
export const ALL_LINKS_QUERY2 = gql`
  query AllLinksQuery {
    allLinks {
      id
      createdAt
      url
      description
    }
  }
`;

export const CREATE_NEW_USER_QUERY = gql`
  mutation {
    createNewUser
  }
`;

export const LOGIN_MUTATION = gql`
  mutation LoginQuery($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;
