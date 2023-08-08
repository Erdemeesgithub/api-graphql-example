import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql
  type Country {
    code: String
    currency: String
    name: String
    phone: Int
  }
  type Query {
    countries: [Country]
    country(code: String): Country
  }

  type Mutation {
    updateCountry(code: String): Country
    deleteCountry(code: String): Country
  }
`;

const sampleCountries = [
  {
    code: "AD",
    emoji: "🇦🇩",
    phone: 376,
    name: "Andorra",
  },
  {
    code: "AE",
    emoji: "🇦🇪",
    phone: 971,
    name: "United Arab Emirates",
  },
  {
    code: "AF",
    emoji: "🇦🇫",
    phone: 93,
    name: "Afghanistan",
  },
  {
    code: "AG",
    emoji: "🇦🇬",
    phone: 1268,
    name: "Antigua and Barbuda",
  },
];

const resolvers = {
  Query: {
    countries: () => {
      //business logic
      return sampleCountries;
    },
    country: (_, args) => {
      console.log({ args });

      return sampleCountries.find((country) => country.code === args.code);
    },
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
