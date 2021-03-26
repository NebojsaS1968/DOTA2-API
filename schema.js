const axios = require("axios");

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLFloat,
} = require("graphql");

// Hero Type
const HeroType = new GraphQLObjectType({
  name: "Hero",
  fields: () => ({
    id: { type: GraphQLInt },
    localized_name: { type: GraphQLString },
    primary_attr: { type: GraphQLString },
    attack_type: { type: GraphQLString },
    roles: { type: GraphQLList(GraphQLString) },
    legs: { type: GraphQLInt },
    base_str: { type: GraphQLInt },
    base_agi: { type: GraphQLInt },
    base_int: { type: GraphQLInt },
    move_speed: { type: GraphQLInt },
    turbo_picks: { type: GraphQLInt },
  }),
});

// ValuePercentileType for Benchmark
const ValuePercentileType = new GraphQLObjectType({
  name: "ValueAndPercentileStats",
  fields: () => ({
    percentile: { type: GraphQLFloat },
    value: { type: GraphQLFloat },
  }),
});

// Benchmark Type for hero stats per minute
const HeroBenchType = new GraphQLObjectType({
  name: "HeroBenchmarks",
  fields: () => ({
    gold_per_min: { type: GraphQLList(ValuePercentileType) },
    xp_per_min: { type: GraphQLList(ValuePercentileType) },
    kills_per_min: { type: GraphQLList(ValuePercentileType) },
    last_hits_per_min: { type: GraphQLList(ValuePercentileType) },
  }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    heroes: {
      type: new GraphQLList(HeroType),
      resolve: async (parent, args) => {
        const response = await axios.get(
          "https://api.opendota.com/api/heroStats"
        );
        return response.data;
      },
    },
    heroBenchmarks: {
      type: HeroBenchType,
      args: {
        hero_id: { type: GraphQLInt },
      },
      resolve: async (parent, args) => {
        const response = await axios.get(
          `https://api.opendota.com/api/benchmarks?hero_id=${args.hero_id}`
        );
        //console.log(response.data.result);
        return response.data.result;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
