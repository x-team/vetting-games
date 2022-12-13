/* eslint-disable */
import * as types from './graphql.js';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  mutation loginWithGitHub($code: String!) {\n    loginWithGitHub(code: $code) {\n      access_token\n    }\n  }\n": types.LoginWithGitHubDocument,
    "\n  query game {\n    game {\n      id\n      startedAt\n      mission {\n        id\n        title\n        type\n        level\n        description\n      }\n    }\n  }\n": types.GameDocument,
    "\n  query missionsByType($type: String!) {\n    missionsByType(type: $type) {\n      id\n      title\n      type\n      level\n      description\n      releaseDate\n    }\n  }\n": types.MissionsByTypeDocument,
    "\n  mutation startMission($missionId: Int!) {\n    startGame(missionId: $missionId) {\n      id\n    }\n  }\n": types.StartMissionDocument,
};

export function gql(source: "\n  mutation loginWithGitHub($code: String!) {\n    loginWithGitHub(code: $code) {\n      access_token\n    }\n  }\n"): (typeof documents)["\n  mutation loginWithGitHub($code: String!) {\n    loginWithGitHub(code: $code) {\n      access_token\n    }\n  }\n"];
export function gql(source: "\n  query game {\n    game {\n      id\n      startedAt\n      mission {\n        id\n        title\n        type\n        level\n        description\n      }\n    }\n  }\n"): (typeof documents)["\n  query game {\n    game {\n      id\n      startedAt\n      mission {\n        id\n        title\n        type\n        level\n        description\n      }\n    }\n  }\n"];
export function gql(source: "\n  query missionsByType($type: String!) {\n    missionsByType(type: $type) {\n      id\n      title\n      type\n      level\n      description\n      releaseDate\n    }\n  }\n"): (typeof documents)["\n  query missionsByType($type: String!) {\n    missionsByType(type: $type) {\n      id\n      title\n      type\n      level\n      description\n      releaseDate\n    }\n  }\n"];
export function gql(source: "\n  mutation startMission($missionId: Int!) {\n    startGame(missionId: $missionId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation startMission($missionId: Int!) {\n    startGame(missionId: $missionId) {\n      id\n    }\n  }\n"];

export function gql(source: string): unknown;
export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;