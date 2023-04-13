import { gql } from 'apollo-server-express';
import admin from 'firebase-admin';

const firestore = admin.firestore();

export const typeDefs = gql`
  type Query {
    getData(id: ID!): Data
  }

  type Data @key(fields: "id") {
    id: ID!
    value: String
    name: String
  }
`;

const getData = async (_: any, { id }: { id: string }) => {
  const docRef = firestore.collection('data').doc(id);
  const doc = await docRef.get();

  if (!doc.exists) {
    return null;
  }

  const data = doc.data();
  return { id: doc.id, value: data?.value, name: data?.name };
};

const resolveReference = async (reference: { id: string }) => {
  const docRef = firestore.collection('data').doc(reference.id);
  const doc = await docRef.get();

  if (!doc.exists) {
    return null;
  }

  const data = doc.data();
  return { id: doc.id, value: data?.value };
};

export const resolvers = {
  Query: {
    getData,
  },
  Data: {
    __resolveReference: resolveReference,
  },
};
