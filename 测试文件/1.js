const d = {
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 1,
  2: 2,
};
// [K] 1/4*2
// i1  a=1  b=[13,4,2]
// i1执行myfun([K,4,2], 24 + 1) 
// i1 i1 myfun([4,2], 24 + 1 + 13)
// i1 i1 i1 myfun([2], 24 + 1 + 13 + 4) false
// i1执行myfun([K,4,2], 24 + 1) 
// i1 i1 myfun([4,2], 24 + 1 - 13)
// i1 i1 i1 myfun([2], 24 + 1 - 13 + 4) false
// i1执行myfun([K,4,2], 24 + 1) 
// i1 i1 myfun([4,2], 24 + 1 - 13)
// i1 i1 i1 myfun([2], 24 + 1 - 13 - 4) false
// ...后边的组合还有
// [24 + 1 + 13 + 4 + 2] 

// 当在24 后放+的共有4*4*4 种可能
// 24后放什么符号又有 4种可能 则一共4*4*4种可能
// 这个大循环会执行4次 因为不确定谁在第一个 则一共4*4*4*4=256种可能

// 执行到这里发现 后边不能放+号,开始试着放-号在开头
// i1执行myfun([K,4,2], 24 + 1) 
// i1 i1 myfun([4,2], 24 + 1 + 13)
// i1 i1 i1 myfun([2], 24 + 1 + 13 + 4) false
// i1执行myfun([K,4,2], 24 + 1) 
// i1 i1 myfun([4,2], 24 + 1 - 13)
// i1 i1 i1 myfun([2], 24 + 1 - 13 + 4) false
// i1执行myfun([K,4,2], 24 + 1) 
// i1 i1 myfun([4,2], 24 + 1 - 13)
// i1 i1 i1 myfun([2], 24 + 1 - 13 - 4) false
const res = [];
function myfun(nums, target) {
  // [A,K,4,2]
  if (nums.length == 1) {
    if (d[nums[0]] == target) {
      res.push(nums[0]);
      return true;
    } else {
      return false;
    }
  }

  for (let i = 0; i < nums.length; i++) {
    const a = nums[i];
    const b = nums.slice(0, i).concat(nums.slice(i + 1));
    if (myfun(b, target + d[a])) {
      res.push("-" + a);
      return true;
    } else if (myfun(b, target - d[a])) {
      res.push("+" + a);
      return true;
    } else if (myfun(b, target * d[a])) {
      res.push("/" + a);
      return true;
    } else if (target % d[a] === 0 && myfun(b, target / d[a])) {
      res.push("*" + a);
      return true;
    }
  }
  return false;
}
function get24(str) {
  var nums = str.split(" ");
  console.log("gggg---", nums);
  if (nums.includes("joker") || nums.includes("JOKER")) {
    console.log("ERROR");
  } else {
    if (myfun(nums, 24)) {
      console.log(res.join(""));
    } else {
      console.log("NONE");
    }
  }
}
get24("4 2 K A");

const get24 = (str) => {
  const myobj = {
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 1,
    2: 2,
  };

  if (str.includes("JOKER") || str.includes("joker")) {
    console.log("ERROR");
    return;
  }

  const strArr = str.split(" ");
  const mathSObj = {
    0: "+",
    1: "-",
    2: "*",
    3: "/",
  };

  const allNumArr = [
    [0, 1, 2, 3],
    [0, 1, 3, 2],
    [0, 3, 1, 2],
    [0, 3, 2, 1],
    [0, 2, 3, 1],
    [0, 2, 1, 3],

    [1, 0, 2, 3],
    [1, 0, 3, 2],
    [1, 3, 0, 2],
    [1, 3, 2, 0],
    [1, 2, 3, 0],
    [1, 2, 0, 3],

    [2, 1, 0, 3],
    [2, 1, 3, 0],
    [2, 3, 1, 0],
    [2, 3, 0, 1],
    [2, 0, 3, 1],
    [2, 0, 1, 3],

    [3, 1, 2, 0],
    [3, 1, 0, 2],
    [3, 0, 1, 2],
    [3, 0, 2, 1],
    [3, 2, 0, 1],
    [3, 2, 1, 0],
  ];
  const mathCalc = (num1, type, num2) => {
    switch (type) {
      case 0:
        return num1 + num2;
      case 1:
        return num1 - num2;
      case 2:
        return num1 * num2;
      case 3:
        return num1 / num2;

      default:
        break;
    }
  };
  const doCal = (numArr, nameArr) => {
    // 首层循环
    let mLen = 4;
    let count;
    let countArr = [];
    let i = 0;
    let count1 = numArr[0];

    while (i < mLen) {
      let count2 = mathCalc(count1, i, numArr[1]);
      let j = 0;

      while (j < mLen) {
        let count3 = mathCalc(count2, j, numArr[2]);
        let m = 0;

        while (m < mLen) {
          count = mathCalc(count3, m, numArr[3]);

          if (count === 24) {
            countArr = [
              nameArr[0],
              mathSObj[i],
              nameArr[1],
              mathSObj[j],
              nameArr[2],
              mathSObj[m],
              nameArr[3],
            ];

            break;
          }

          m++;
        }

        if (count === 24) {
          break;
        }

        j++;
      }

      if (count === 24) {
        break;
      }

      i++;
    }

    return countArr;
  };

  for (const group of allNumArr) {
    const numArr = [];
    const nameArr = [];

    for (const index of group) {
      numArr.push(myobj[strArr[index]]);
      nameArr.push(strArr[index]);
    }

    const resArr = doCal(numArr, nameArr);

    if (resArr.length) {
      console.log(resArr.join(""));

      return;
    }
  }

  console.log("NONE");
};

let lineStr;

while ((lineStr = readline())) {
  if (lineStr) {
    get24(lineStr);
  }
}
