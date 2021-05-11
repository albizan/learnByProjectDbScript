import { Movie } from "./entity/Movie";
import { getRepository } from "typeorm";
import { Genre } from "./entity/Genre";

const existingGenres: Genre[] = [];

export async function processLine(line: string) {
  // Split line
  const filmElements: string[] = line.split("\t");
  const type: string = filmElements[1];
  const genres: string = filmElements[8];

  // Filter only horror movies
  if (type === "movie" && genres.includes("Horror")) {
    // movie has to be saved
    const newMovie = new Movie();
    newMovie.id = filmElements[0];
    newMovie.title = filmElements[2];
    newMovie.originalTitle = filmElements[3];
    newMovie.year = parseInt(filmElements[5]);
    newMovie.length = parseInt(filmElements[7]) || null;

    // extract genres
    const filmGenres: string[] = genres.split(",");

    const genreRepo = await getRepository(Genre);
    const promises = filmGenres.map((g) => {
      if (!existingGenres.find((existingGenre) => existingGenre.label === g)) {
        const newGenre = new Genre();
        newGenre.label = g;
        existingGenres.push(newGenre);
        return genreRepo.save(newGenre);
      }
    });

    await Promise.all(promises);

    // Assing genres
    newMovie.genres = filmGenres.map((g) => existingGenres.find((e) => e.label === g));

    const movieRepo = await getRepository(Movie);
    try {
      await movieRepo.save(newMovie);
    } catch (error) {
      console.log(newMovie.title + " errore");
      console.log(newMovie);
      console.log(error.message);
    }

    console.log(newMovie.title + " salvato");
  }
}
