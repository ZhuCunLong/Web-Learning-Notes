function getProperty<T, K>(obj: T, key: K) {
    console.log(obj, key)
    return (<any>obj)[key]
}

let x = { a: 1, b: 2, c: 3, d: 4 };

const a = getProperty<Object, String>(x, "a");
const b = getProperty(x, "b");

console.log(a, b)

/*interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);  // Now we know it has a .length property, so no more error
    return arg;
}

loggingIdentity({length: 10, value: 3});*/
