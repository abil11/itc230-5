"use strict";

let musics = [
    {name : "Rock", year : 2000, band: "The Pretty Reckless"},
    {name : "Rap", year : 2012, band : "30 seconds to Mars"},
    {name : "Pop", band : 1920, label : "Metalic"},

    ];


    exports.get = (name) => {
        return musics.find((item) => {
            return item.name == name;
        });
    };

    exports.delete = (name) => {
        var musicLen = musics.length;
        musics = musics.filter((item) => {
            return item.name !== name;
        });
        var deleted = (musics.length == musicLen) ? "" : "deleted";
        return { "Band": deleted, "Total": musics.length};
    };

    exports.add = (newMusic) => {
        for(var i = 0; i < musics.length; i++){
            if(newMusic.name == musics[i].name){
                return;
            }
        }
        var musicLen = musics.length;
        var musicName = newMusic.name;
        var musicYear = newMusic.year;
        var musicBand = newMusic.band;
        var completeMusic = {name : musicName, year : musicYear, band: musicBand};

        musics.push(completeMusic);
        var added = (musics.length == musicLen) ? "" : "added";
        return {"Band": added, "Total": musics.length};
     };
