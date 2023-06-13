import React from 'react';


export const showInfoAboutUsers = (data, condition) => {
    if (condition === 'email')
        return data && data.map((item) => <li key={item.id}>{item.email}</li>);
    if (condition === 'date')
        return data && data.map((item) => <li key={item.id}>{item.date}</li>);
    if (condition === 'action')
        return data && data.map((item) => <li key={item.id}>{item.action}</li>);
};


export const showRegisteredUsers = (data, condition) => {
    if (condition === 'email')
        return data.map((user) => <li key={user.id}>{user.email}</li>);
    if (condition === 'date')
        return data.map((user) => <li key={user.id}>{user.date && user.date.toString()}</li>);
};
