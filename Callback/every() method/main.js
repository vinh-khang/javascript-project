var courses = [
    {
        name: 'Khang',
        old: 21
    },
    {
        name: 'Ngân',
        old: 192
    },
    {
        name: 'Ngân',
        old: 192
    }
]

Array.prototype.every2 = function(callback){
    var n = true;
    for(var key in this){
        if (this.hasOwnProperty(key)){
            var result = callback(this[key], key, this);
            if(!result){
                n = false;
                break;
            }
    }
}
    return n;
}

var everyValue = courses.every2(function(course, index, array){
    return course.old > 20;
});

console.log(everyValue);

