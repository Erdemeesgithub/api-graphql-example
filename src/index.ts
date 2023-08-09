import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import MongoDBreq from "./utils/db.js";

const typeDefs = `#graphql
  type Post{
    text: String
    images: [String]
    usereId: String
    createdAt: String
  }
  type Query {
    getPosts : [Post]
    getPostDetail: Post
  }
  input PostInput {
    text: String
    images: [String]
  }

  type Mutation {
   createPost(postCreateInput: PostInput): Post,
   updatePost(id: ID!, postUpdateInput: PostInput): Post,
   deletePost(id: ID!): ID
  }
`;

const resolvers = {
  Query: {
    getPosts: () => {
      const get = MongoDBreq("find", {});
    },
    getPostDetail: () => {},
  },
  Mutation: {
    createPost: (_, args) => {
      console.log(args);

      const create = MongoDBreq("insertOne", {
        document: {
          text: args.text,
        },
      });
    },
    updatePost: () => {},
    deletePost: () => {},
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
