import React from "react";
import renderer from "react-test-renderer";
import {GenreList} from "./genreList.jsx";

import {Genres} from "../../const.js";
import MOVIES from "../../mocks/films.js";

it(`render GenresList`, () => {
  const tree = renderer
    .create(
        <GenreList
          genre={Genres.ALL}
          onClick={()=>{}}
          movies={MOVIES}
        />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
