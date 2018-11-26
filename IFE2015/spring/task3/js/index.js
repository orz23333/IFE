let file;

let allList = document.querySelectorAll('#left h4')[0];



///////////////////////////新增分类模块
let tarGet;
let addSort = document.querySelector('#sort + div');
let sortList = document.querySelector('#sort ul');

sortList.addEventListener('click', function () {
  if (event.target.nodeName.toLowerCase() == 'span') {
    tarGet = event.target;
  }
}, false);

addSort.addEventListener('click', function () {
  let folder = tarGet.nextElementSibling;
  if ( folder && folder.nodeName.toLowerCase() == 'ul') {
    let node = document.createElement('li');
    node.innerHTML = `<span>new items</span>`;
    folder.appendChild(node);
  } else {
    let newFolder = document.createElement('ul');
    let newList = document.createElement('li');
    newList.innerHTML = `<span>new Ul and new item</span>`;
    newFolder.appendChild(newList);
    tarGet.parentNode.appendChild(newFolder);
  }
}, false);



/////////////////////////////新增任务模块
