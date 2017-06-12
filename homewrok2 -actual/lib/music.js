//list of items
let music = [
    {course: "rock", performer: "Oxxymiron", genre:"Rock"},
    {course: "rnb", performer: "BOYJ", genre:"RNB"},
    {course: "Rap", performer: "NAta", genre:"Rap"},
];



exports.get = (course) => {
    return music.find((item) => {
    return item.course == course;
    });
}

exports.delete = (course) => {
    let oldLength = music.length;
    var newCourse = music.filter((item) => {
        return item.course !==course;
    })
    music = newCourse;



return { deleted: music.length !==oldLength, total: music.length}
};
