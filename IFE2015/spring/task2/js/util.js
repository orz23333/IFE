// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
  return Array.isArray(arr);
}



// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
  return typeof fn === 'function';
}



// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(o) {
  if (typeof o !== 'object') {
    throw new Error('参数必须为对象');
  }

  let newO = {};
  for (const item in o) {
    if (typeof o[item] !== 'object') {
      newO[item] = o[item];
    } else {
      newO[item] = cloneObject(o[item]);
    }
  }

  return newO;
}



// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
  return Array.of(...new Set(arr));
}



// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
  return str.trim();
}



// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
  arr.forEach((item, index) => {
    fn(item, index);
  });
}



// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
  let length = 0;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      length++;
    }
  }
  return length;
}



// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    element.classList.add(newClassName);
}



// 移除element中的样式oldClassName+
function removeClass(element, oldClassName) {
    element.classList.remove(oldClassName);
}



// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    return element.parentNode == siblingNode.parentNode;
}



// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    const position = element.getBoundingClientRect();
    return position;
}

let h1 = document.body.querySelector('h1');
let p = document.body.querySelector('div p');
