var courses = [
    'Khang',
    'A'
]

var courses2 = [
    'Khang',
    'Á',
    'An'
]

Array.prototype.forEach2 = function(callback){
    for(var key in this){
        if (this.hasOwnProperty(key)){
            callback(this[key], key, this);
    }
}
}

courses.forEach2(function(course, index, array){

})

