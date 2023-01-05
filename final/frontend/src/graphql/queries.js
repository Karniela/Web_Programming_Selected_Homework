import {gql} from "@apollo/client";

export const ARTWORKS_QUERY = gql`
    query artworks($input: String!){
        artworks(input: $input){
            id
            title
            imgURL
            artist
            material
            dimension
            price
            auction_date
            auction_house
            area
            priceCentimeter
        }
    }
`;

export const ARTISTS_QUERY = gql`
    query artists($input: String!){
        artists(input: $input){
            id
            name
            imgURL
            description
        }
    }
`;

export const SINGLE_ARWORK_QUERY = gql`
    query artwork($id: ID!){
        artwork(id: $id){
            id
            title
            imgURL
            artist
            material
            dimension
            price
            auction_date
            auction_house
            area
            priceCentimeter
        }
    }
`;

export const SINGLE_ARTIST_QUERY = gql`
    query artist($id: ID!){
        artist(id: $id){
            id
            name
            imgURL
            description
        }
    }
`;

export const FEATURED_QUERY = gql`
    query featured{
        featured{
            id
            title
            imgURL
            artist
            material
            dimension
            price
            auction_date
            auction_house
            area
            priceCentimeter
        }
    }
`;

export const NEWEST_QUERY = gql`
    query newest{
        newest{
            id
            title
            imgURL
            artist
            material
            dimension
            price
            auction_date
            auction_house
            area
            priceCentimeter
        }
    }
`;