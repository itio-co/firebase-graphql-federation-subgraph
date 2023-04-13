Firebase Graphql Federation Subgraph
--------------

This is a GraphQL federation subgraph that integrates with Firebase to provide a unified data API for all Firebase services.

Setup
=====

1. Clone the repository:
```
git clone https://github.com/itio-co/firebase-graphql-federation-subgraph.git
```

2. Install the dependencies:

```
cd firebase-graphql-federation-subgraph
npm install
```

3. Create a Firebase project and download the service account key JSON file. This file contains the credentials necessary for the Node.js admin SDK to authenticate with Firebase.

> Copy and rename the downloaded JSON file to `firebaseServiceAccountKey.json` and place it in the `./config` directory.


4. Start the subgraph server:

```
npm start
```
The subgraph server should now be running on http://localhost:4001/.


Usage
====

The subgraph supports the following GraphQL queries:

```graphql
query {
  getData(id: "1") {
    id
    value
  }
}
```

You can make queries to the subgraph using any GraphQL client, such as Apollo, Relay, or even the GraphiQL interface that's built into the subgraph server itself.


Contributing
====

Contributions are welcome! Please feel free to submit a pull request or open an issue if you find any bugs or have any suggestions for improvement.


License
====
This project is licensed under the MIT License, which means you can use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software, subject to the conditions in the LICENSE file.

