import { GraphQLErrors } from "@apollo/client/errors";

export enum ErrorCode {
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  NOT_FOUND = "NOT_FOUND",
  GAME_ALREADY_STARTED = "GAME_ALREADY_STARTED",
}

export function hasGraphQLErrorCode(
  graphQLErrors: GraphQLErrors,
  code: ErrorCode
): boolean {
  return graphQLErrors.some(
    (graphQLError) => graphQLError.extensions?.code === code
  );
}
