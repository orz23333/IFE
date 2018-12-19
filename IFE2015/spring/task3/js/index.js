/////////////////////////////////组合模式
var Folder = function (name) {
  this.name = name;
  this.parent = null; //增加this.parent 属性
  this.files = [];
};

Folder.prototype.add = function (file) {
  file.parent = this; //设置父对象
  this.files.push(file);
};

Folder.prototype.scan = function () {
  console.log('开始扫描文件夹: ' + this.name);
  for (var i = 0, file, files = this.files; file = files[i++];) {
    file.scan();
  }
};

Folder.prototype.remove = function () {
  if (!this.parent) { //根节点或者树外的游离节点
    return;
  }
  for (var files = this.parent.files, l = files.length - 1; l >= 0; l--) {
    var file = files[l];
    if (file === this) {
      files.splice(l, 1);
    }
  }
};

var File = function (name) {
  this.name = name;
  this.parent = null;
};

File.prototype.add = function () {
  throw new Error('不能添加在文件下面');
};

File.prototype.scan = function () {
  console.log('开始扫描文件: ' + this.name);
};

File.prototype.remove = function () {
  if (!this.parent) { //根节点或者树外的游离节点
    return;
  }

  for (var files = this.parent.files, l = files.length - 1; l >= 0; l--) {
    var file = files[l];
    if (file === this) {
      files.splice(l, 1);
    }
  }
};



let tarGet = {
  goal: null,
  rank: 0,
  arr: [],
};

const arr = new Folder('分类任务');

/////////////////////////////新增分类模块
let addSortBtn = document.querySelector('#sort + div');
let sortList = document.querySelectorAll('#sort li');

const changeTarget = function (event) {
  tarGet.goal = event.currentTarget;
  let tag = event.currentTarget.getAttribute('data-rank');
  tarGet.arr.push(tag);
}

const addSort = function () {
  let n = 0;
  return function () {
    let name = prompt('请输入分类名');
    if (!name) {
      return;
    }
    let nodeVal = document.createElement('span');
    let nodeLi = document.createElement('li');
    let upperRank = tarGet.goal.parentNode.getAttribute('data-rank');
    let preRank = tarGet.goal.previousElementSibling.getAttribute('data-rank');
    let rank;
    if ( preRank ) {
      let preRankArr = preRank.split('-');
      rank = preRankArr.slice(-1) +  



    }

    nodeVal.innerHTML = name;
    nodeLi.appendChild(nodeVal);
    let folder = tarGet.goal.nextElementSibling;
    if (folder && folder.nodeName.toLowerCase() == 'ul') {
      folder.appendChild(nodeLi);
    } else {
      let nodeUl = document.createElement('ul');
      nodeUl.appendChild(nodeLi);
      tarGet.goal.parentNode.appendChild(nodeUl);
    }
  }
}();

for (let i = 0; i < sortList.length; i++) {
  const element = sortList[i];
  element.onclick = changeTarget;
}



addSortBtn.addEventListener('click', addSort, false);



/////////////////////////////新增任务模块
let center = document.querySelector('#center');
let addTask = center.lastElementChild;