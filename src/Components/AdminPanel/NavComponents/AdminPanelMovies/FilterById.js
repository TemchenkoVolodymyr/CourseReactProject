
export const FilterById = (movies, blackListFirestore, setAdminPanelMovies) => {

    movies.map((item) => {

        blackListFirestore.map((blacklist) => {

            if(item.id === blacklist.id) {

                const index = movies.findIndex((el) => el.id === blacklist.id);

                if(index !== -1) {

                    const filterMoviesById = movies.filter((item) => !blackListFirestore
                        .some((blacklist) => item.id === blacklist.id));
                    setAdminPanelMovies(filterMoviesById);
                }
            }
        });
    });
};

