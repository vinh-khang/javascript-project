var courses = [
    {
        name: 'Khang',
        old: 21
    },
    {
        name: 'Ngân',
        old: 19
    }
]

Array.prototype.some2 = function(callback){
    var n = false;
    for(var key in this){
        if (this.hasOwnProperty(key)){
            var result = callback(this[key], key, this);
            if(result){
                n = true;
              
                break;
            }
    }
}
    return n;
}

var someValue = courses.some2(function(course, index, array){
    return course.old === 21;
});

console.log(someValue);

