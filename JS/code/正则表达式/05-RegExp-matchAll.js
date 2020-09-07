const regexp = RegExp('foo[a-z]*','g');
const str = 'table football, foosball';
const matches = str.matchAll(/foo[a-z]*/g); // 返回值是一个迭代器指针

for (const match of matches) {
    console.log(`Found ${match[0]} start=${match.index} end=${match.index + match[0].length}.`);
}

console.log(matches)
console.log([...str.matchAll(regexp)])
