import React from "react";


export const showInfoAboutUsers = (data, condition) => {
    if (condition === "email")
        return data && data.map(item => <li>{item.email}</li>)
    if (condition === "date")
        return data && data.map(item => <li>{item.date}</li>)
    if (condition === "action")
        return data && data.map(item => <li>{item.action}</li>)
}


export const showRegisteredUsers = (data, condition) => {
    if (condition === "email")
        return data.map(user => <li>{user.email}</li>)
    if (condition === "date")
        return data.map(user => <li>{user.date && user.date.toString()}</li>)
}
