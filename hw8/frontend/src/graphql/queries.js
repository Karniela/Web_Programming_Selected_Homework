import { gql } from '@apollo/client';

export const CHATBOX_QUERY = gql`
  query {
    posts {
      title
      body
      author {
        name
      }
      published
    }
  }
`;
