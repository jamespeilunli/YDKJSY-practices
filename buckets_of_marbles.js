// RED

function rows(amt) {
  // ORANGE
  if (amt === 0) return [];
  if (amt === 1) return [[1]];

  let ret = [[1]];
  let prev_row = [1];
  for (let i = 2; i < amt + 1; i++) {
    // YELLOW
    let cur_row = [1];
    for (let j = 0; j < i - 2; j++) {
      // GREEN
      cur_row.push(prev_row[j] + prev_row[j+1]);
    }
    cur_row.push(1);
    ret.push(cur_row);
    prev_row = cur_row;
  }

  return ret;
};

function time(func, args) {
    // BLUE
    let start = Date.now();
    func(...args);
    let end = Date.now();
    return end - start; // time in milliseconds it took to run func
}

let is_even = true;
console.log(`Generating 0 rows took ${time(rows, [0])} milliseconds. 0 is${is_even ? " " : " not "}an even number.`);

for (let i = 10000; i < 10005; i++) {
    // PURPLE
    let is_even = i % 2 == 0;
    console.log(`Generating ${i} rows took ${time(rows, [i])} milliseconds. ${i} is${is_even ? " " : " not "}an even number.`);
}

