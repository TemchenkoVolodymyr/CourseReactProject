import React from 'react';

export const drawnInfo = (data, condition) => {
    if (data) {
        if (condition === "title")
            return data.map(movie => <li>{movie.original_title}</li>)
        if (condition === 'rating')
            return data.map(movie => <li>{movie.vote_average}</li>)
        if (condition === 'genres')
            return data.map(movie => <li>Fantasy,Action</li>)
    } else {
        return null
    }
}

export const drawnInfoSearch = (data, condition) => {
    if (data) {
        if (condition === 'movies')
            data.map(movie => <li>{movie.original_title}</li>)
        if (condition === 'genres')
            data.map(movie => <li>NO</li>)
        if (condition === 'ratings')
            data.map(movie => <li>{movie.vote_average}</li>)
        if (condition === 'actions')
            data.map(movie => <li>Delete</li>)
    } else {
        return null
    }
}
