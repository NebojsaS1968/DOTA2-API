import React from "react";
import { useQuery, gql } from "@apollo/client";

const HEROES_QUERY = gql`
  query HeroesQuery {
    heroes {
      id
      localized_name
      roles
    }
  }
`;

const Heroes = () => {
  const { loading, error, data } = useQuery(HEROES_QUERY);

  if (loading) return <div className="container">Loading...</div>;
  if (error) return <p>Error :(</p>;

  // Show just the needed roles PROBLEM, not empty strings if there are no more roles available for the current hero !!!!!!!!
  return data.heroes.map(({ id, localized_name, roles }) => (
    <div className="hero ml-5" key={id}>
      <p className="text-info">
        {localized_name} :
        <p className="text-success">
          {" "}
          Roles({roles[0]}, {roles[1]}, {roles[2]}, {roles[3]}, {roles[4]})
        </p>
      </p>
    </div>
  ));
};

export default Heroes;
