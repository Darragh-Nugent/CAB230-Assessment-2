import { useState, useEffect } from 'react';


const path = "http://4.237.58.241:3000/user/";

export async function login(email, password) {
    return await fetch(path + "login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Invalid email or password');
                }
                throw new Error("Login failed");
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem('token', data.token);
            return data;
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}

export async function register(email, password) {
    return await fetch(path + "register", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(response => {
            if (!response.ok) {
                if (response.status === 409) {
                    throw new Error('Account already exists');
                }
                else {
                    throw new Error('Registration failed');
                }
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem('token', data.token);
            return data;
        })
}


export function logout() {
    localStorage.removeItem('token');
}
