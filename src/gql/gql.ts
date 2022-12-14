/* eslint-disable */
import * as types from './graphql.js';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  mutation loginWithGitHub($code: String!) {\n    loginWithGitHub(code: $code) {\n      access_token\n    }\n  }\n": types.LoginWithGitHubDocument,
    "\n  query game($id: ID!) {\n    game(id: $id) {\n      id\n      startedAt\n      mission {\n        id\n        title\n        type\n        level\n        description\n        sourceCode {\n          src\n        }\n        bugs {\n          id\n          name\n          description\n        }\n      }\n      bugs {\n        bugId\n      }\n    }\n  }\n": types.GameDocument,
    "\n  mutation selectBug($gameId: ID!, $bugId: Int!) {\n    selectBug(gameId: $gameId, bugId: $bugId) {\n      id\n      bugs {\n        bugId\n      }\n    }\n  }\n": types.SelectBugDocument,
    "\n  mutation unselectBug($gameId: ID!, $bugId: Int!) {\n    unselectBug(gameId: $gameId, bugId: $bugId) {\n      id\n      bugs {\n        bugId\n      }\n    }\n  }\n": types.UnselectBugDocument,
    "\n  mutation finishGame($id: ID!) {\n    finishGame(id: $id) {\n      id\n      score\n      finishedAt\n    }\n  }\n": types.FinishGameDocument,
    "\n  query missionsByType($type: String!) {\n    missionsByType(type: $type) {\n      id\n      title\n      type\n      level\n      description\n      releaseDate\n    }\n  }\n": types.MissionsByTypeDocument,
    "\n  mutation startMission($missionId: Int!) {\n    startGame(missionId: $missionId) {\n      id\n    }\n  }\n": types.StartMissionDocument,
    "\n  query currentGame {\n    game {\n      id\n    }\n  }\n": types.CurrentGameDocument,
};

export function gql(source: "\n  mutation loginWithGitHub($code: String!) {\n    loginWithGitHub(code: $code) {\n      access_token\n    }\n  }\n"): (typeof documents)["\n  mutation loginWithGitHub($code: String!) {\n    loginWithGitHub(code: $code) {\n      access_token\n    }\n  }\n"];
export function gql(source: "\n  query game($id: ID!) {\n    game(id: $id) {\n      id\n      startedAt\n      mission {\n        id\n        title\n        type\n        level\n        description\n        sourceCode {\n          src\n        }\n        bugs {\n          id\n          name\n          description\n        }\n      }\n      bugs {\n        bugId\n      }\n    }\n  }\n"): (typeof documents)["\n  query game($id: ID!) {\n    game(id: $id) {\n      id\n      startedAt\n      mission {\n        id\n        title\n        type\n        level\n        description\n        sourceCode {\n          src\n        }\n        bugs {\n          id\n          name\n          description\n        }\n      }\n      bugs {\n        bugId\n      }\n    }\n  }\n"];
export function gql(source: "\n  mutation selectBug($gameId: ID!, $bugId: Int!) {\n    selectBug(gameId: $gameId, bugId: $bugId) {\n      id\n      bugs {\n        bugId\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation selectBug($gameId: ID!, $bugId: Int!) {\n    selectBug(gameId: $gameId, bugId: $bugId) {\n      id\n      bugs {\n        bugId\n      }\n    }\n  }\n"];
export function gql(source: "\n  mutation unselectBug($gameId: ID!, $bugId: Int!) {\n    unselectBug(gameId: $gameId, bugId: $bugId) {\n      id\n      bugs {\n        bugId\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation unselectBug($gameId: ID!, $bugId: Int!) {\n    unselectBug(gameId: $gameId, bugId: $bugId) {\n      id\n      bugs {\n        bugId\n      }\n    }\n  }\n"];
export function gql(source: "\n  mutation finishGame($id: ID!) {\n    finishGame(id: $id) {\n      id\n      score\n      finishedAt\n    }\n  }\n"): (typeof documents)["\n  mutation finishGame($id: ID!) {\n    finishGame(id: $id) {\n      id\n      score\n      finishedAt\n    }\n  }\n"];
export function gql(source: "\n  query missionsByType($type: String!) {\n    missionsByType(type: $type) {\n      id\n      title\n      type\n      level\n      description\n      releaseDate\n    }\n  }\n"): (typeof documents)["\n  query missionsByType($type: String!) {\n    missionsByType(type: $type) {\n      id\n      title\n      type\n      level\n      description\n      releaseDate\n    }\n  }\n"];
export function gql(source: "\n  mutation startMission($missionId: Int!) {\n    startGame(missionId: $missionId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation startMission($missionId: Int!) {\n    startGame(missionId: $missionId) {\n      id\n    }\n  }\n"];
export function gql(source: "\n  query currentGame {\n    game {\n      id\n    }\n  }\n"): (typeof documents)["\n  query currentGame {\n    game {\n      id\n    }\n  }\n"];

export function gql(source: string): unknown;
export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;