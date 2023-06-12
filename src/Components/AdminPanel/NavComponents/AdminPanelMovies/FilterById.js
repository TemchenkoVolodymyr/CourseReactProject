
export const FilterById = (movies, blackListFirestore, setAdminPanelMovies) => {

    movies.map(item => {

        blackListFirestore.map(blacklist => {

            if(item.id === blacklist.id) {

                let index = movies.findIndex((el) => el.id === blacklist.id)

                if(index !== -1) {

                    let filterMoviesById = movies.filter(item => !blackListFirestore.some(blacklist => item.id === blacklist.id))
                    setAdminPanelMovies(filterMoviesById)
                }
            }
        })
    })
};

