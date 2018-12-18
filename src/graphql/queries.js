// eslint-disable
// this is an auto generated file. This will be overwritten

export const getPlayer = `query GetPlayer($id: ID!) {
  getPlayer(id: $id) {
    id
    name
    wins
    loses
    ties
  }
}
`;
export const listPlayers = `query ListPlayers(
  $filter: ModelPlayerFilterInput
  $limit: Int
  $nextToken: String
) {
  listPlayers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      wins
      loses
      ties
    }
    nextToken
  }
}
`;
