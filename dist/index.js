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
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const federation_1 = require("@apollo/federation");
const fs_1 = require("fs");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
// Initialize Firebase
const firebaseServiceAccount = JSON.parse((0, fs_1.readFileSync)('./config/firebaseServiceAccountKey.json', 'utf-8'));
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(firebaseServiceAccount)
});
const graphql_1 = require("./graphql");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    const server = new server_1.ApolloServer({
        schema: (0, federation_1.buildFederatedSchema)([{ typeDefs: graphql_1.typeDefs, resolvers: graphql_1.resolvers }]),
    });
    const PORT = 4001;
    const { url } = yield (0, standalone_1.startStandaloneServer)(server, {
        listen: { port: PORT },
    });
    console.log(`🚀  Server ready at: ${url}`);
});
main().catch((error) => {
    console.error(error);
    process.exit(1);
});
