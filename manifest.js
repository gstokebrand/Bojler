const fs = require('fs');

module.exports = (client) => {


    fs.readdir("./handlers/", (err, files) => {
        if (err) console.error(err);
        let jsfiles = files.filter(f => f.split(".").pop() === "js");
        if (jsfiles.length <= 0) return console.log("There are no handlers to load!");
        console.log(`Loading ${jsfiles.length} events...`);
        jsfiles.forEach((f, i) => {
            require(`./handlers/${f}`);
            console.log(`${i+1}: ${f} loaded!`);
        });
    });


}