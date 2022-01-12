var courses = [
    {
        name: 'Khang',
        old: 21
    },
    {
        name: 'Như',
        old: 19
    },
]


Array.prototype.filter2 = function(callback){
    var output = [];
    for(var key in this){
        if (this.hasOwnProperty(key)){
           var result =  callback(this[key], key, this);
           if(result){
               output.push(this[key]);
           }
    }
}
    return output;
}

var filterCourses = courses.filter2(function(course, index, array){
    return course.old > 0;
})

console.log(filterCourses)


