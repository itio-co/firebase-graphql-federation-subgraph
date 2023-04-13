"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const firestore = firebase_admin_1.default.firestore();
exports.typeDefs = (0, apollo_server_express_1.gql) `
  type Query {
    getData(id: ID!): Data
  }

  type Data @key(fields: "id") {
    id: ID!
    value: String
    name: String
  }
`;
const getData = (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = firestore.collection('data').doc(id);
    const doc = yield docRef.get();
    if (!doc.exists) {
        return null;
    }
    const data = doc.data();
    return { id: doc.id, value: data === null || data === void 0 ? void 0 : data.value, name: data === null || data === void 0 ? void 0 : data.name };
});
const resolveReference = (reference) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = firestore.collection('data').doc(reference.id);
    const doc = yield docRef.get();
    if (!doc.exists) {
        return null;
    }
    const data = doc.data();
    return { id: doc.id, value: data === null || data === void 0 ? void 0 : data.value };
});
exports.resolvers = {
    Query: {
        getData,
    },
    Data: {
        __resolveReference: resolveReference,
    },
};
