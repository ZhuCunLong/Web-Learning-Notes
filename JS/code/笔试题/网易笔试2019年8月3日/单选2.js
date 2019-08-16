function func(source){
    var target = {}
    for(var key in source){
        if(Object.prototype.hasOwnProperty.call(source,key)){
            if(typeof source[key] === 'object'){
                target[key] = func(source[key]);
            } else {
                target[key] = source[key]
            }
        }
    }
    return target
}

const a = {
    a1: 'a1',
    a2: {
        b1: 'b1',
        b2: 'b2'
    },
    a3: undefined,
    a4: 'null',
    a5: 1
}

const b = func(a);
console.log(b);
