var expect = require("chai").expect;
var musics = require("../lib/musics");

describe("Musics", function() {
    it("returns requested music", function(){
        var result = musics.get("Pop");
        expect(result).to.deep.equal({name: "Pop", year: 1920, band: "Methalic"});
    });//invalid
    it("fails with incorrect music", function(){
        var result = musics.get("KKAS");
        expect(result).to.be.undefined;
    });//succes add
    it("adds music", function(){
        var completeMusic = {name: "GOG", year: 1234, band: "GOG"};
        var result = musics.add(completeMusic);
        expect(result).to.deep.equal({"Music": "added", "Total": 4});
    });//fail to add
    it("adding fails", function(){
        var result = musics.add({name : "Rock", year : 2000, band : "The Pretty Reckless"});
        expect(result).to.be.undefined;
    });//success delete
    it("deleting  musics", function(){
        var result = music.delete("Rock");
        expect(result).to.deep.equal({"MusicAction": "deleted", "Total": 3});
    });//fails with delete
    it("can't delete", function(){
        var result = musics.delete("Pop");
        expect(result).to.deep.equal({"MusicAction": '', "Total": 3 });
    });
});
