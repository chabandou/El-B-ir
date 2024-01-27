const mongoose = require('mongoose');
const truck = require("./truck");


const seed = () => {
    truck.insertMany([
        {
            name: "َAlaa",
            type: "Naturel",
            price: "10 DZD/L",
            location: "Nezla", //Nezla, Tebesbest, Touggourt, Zaouia El Abidia
            phone: "+16463865055",
        },
        {
            name: "َAmer",
            type: "Naturel",
            price: "15 DZD/L",
            location: "Touggourt", //Nezla, Tebesbest, Touggourt, Zaouia El Abidia
            phone: "+15613664252",
        },
        {
            name: "َQaher",
            type: "Filtrée",
            price: "10DZD/L",
            location: "Zaouia", //Nezla, Tebesbest, Touggourt, Zaouia 
            phone: "+16463865055",
        },
        {
            name: "َBadr",
            type: "Naturel",
            price: "10 DZD/L",
            location: "Touggourt", //Nezla, Tebesbest, Touggourt, Zaouia El Abidia
            phone: "+16463865055",
        },
        {
            name: "َFahd",
            type: "Naturel",
            price: "10 DZD/L",
            location: "Nezla", //Nezla, Tebesbest, Touggourt, Zaouia El Abidia
            phone: "+16463865055",
        },
        {
            name: "َFateh",
            type: "Filtrée",
            price: "10 DZD/L",
            location: "Tebesbest", //Nezla, Tebesbest, Touggourt, Zaouia El Abidia
            phone: "+16463865055",
        },
        {
            name: "َJamal",
            type: "Naturel",
            price: "15 DZD/L",
            location: "Zaouia", //Nezla, Tebesbest, Touggourt, Zaouia El Abidia
            phone: "+16463865055",
        },
        {
            name: "َHatem",
            type: "Naturel",
            price: "10 DZD/L",
            location: "Nezla", //Nezla, Tebesbest, Touggourt, Zaouia El Abidia
            phone: "+16463865055",
        },
        {
            name: "َIyad",
            type: "Filtrée",
            price: "10 DZD/L",
            location: "Touggourt", //Nezla, Tebesbest, Touggourt, Zaouia El Abidia
            phone: "+16463865055",
        },
        {
            name: "َMamedouh",
            type: "Naturel",
            price: "10 DZD/L",
            location: "Touggourt", //Nezla, Tebesbest, Touggourt, Zaouia El Abidia
            phone: "+16463865055",
        },
        {
            name: "َMaher",
            type: "Naturel",
            price: "10 DZD/L",
            location: "Zaouia", //Nezla, Tebesbest, Touggourt, Zaouia El Abidia
            phone: "+16463865055",
        },
        {
            name: "َRafik",
            type: "Filtrée",
            price: "10 DZD/L",
            location: "Tebesbest", //Nezla, Tebesbest, Touggourt, Zaouia El Abidia
            phone: "+16463865055",
        },
        {
            name: "َSadeq",
            type: "Naturel",
            price: "15 DZD/L",
            location: "Nezla", //Nezla, Tebesbest, Touggourt, Zaouia El Abidia
            phone: "+16463865055",
        },
        {
            name: "َSaif",
            type: "Naturel",
            price: "10 DZD/L",
            location: "Touggourt", //Nezla, Tebesbest, Touggourt, Zaouia El Abidia
            phone: "+16463865055",
        },
        {
            name: "َWassim",
            type: "Filtrée",
            price: "10 DZD/L",
            location: "Nezla", //Nezla, Tebesbest, Touggourt, Zaouia El Abidia
            phone: "+16463865055",
        },
    ])
} 

module.exports = seed

