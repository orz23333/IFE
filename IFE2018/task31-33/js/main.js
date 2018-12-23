      let productList = $('input', $('#product'), true);
      let regionList = $('input', $('#region'), true);
      let saleList = $('input', $('#sale'), true);
      let showData = $('#showData');
      let btn = $('#submit');
      let toggle = $('#toggle');
      let table = $('#showData, table');
      btn.addEventListener('click', submitEvent, false);
      toggle.addEventListener('click', toggleSelect, false);

      init();

      //页面初始化，选中所有CheckBox
      function init() {
        for (let i = 0; i < productList.length; i++) {
          productList[i].checked = true;
        }
        for (let i = 0; i < regionList.length; i++) {
          regionList[i].checked = true;
        }
        for (let i = 0; i < saleList.length; i++) {
          saleList[i].checked = true;
        }
        //模拟鼠标事件，点击确定button
        clickEvent();        
      }


      //反选按键逻辑
      function toggleSelect(e) {
        e.preventDefault();
        for (let i = 0; i < saleList.length; i++) {
          saleList[i].checked = !saleList[i].checked;
        }
      }

      //模拟点击“确定”的鼠标事件
      function clickEvent() {
        let event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, true, document.defaultView);
        btn.dispatchEvent(event);
      }

      function changeData() {
        
      }


      //“确定”按钮的处理逻辑
      function submitEvent(e) {
        e.preventDefault();
        //获得选中的分类，存储在getSort返回的数组中
        let selectP = getSort(productList);
        let selectR = getSort(regionList);
        let selectS = getSort(saleList);

        //根据选中的分类，依次对源数据进行筛选
        let filterP = filter(sourceData, selectP, 'product');
        let filterR = filter(filterP, selectR, 'region');
        let filterS = filter(filterR, selectS, 'sale');

        //根据筛选后的数据，渲染表格
        makeTable(filterS);
      }


      //渲染表格的逻辑
      function makeTable(arr) {
        //避免出现每次点击“确定”渲染表格重复，移除节点
        while (showData.firstChild) {
          showData.removeChild(showData.firstChild);
        }

        //如果源数据中无数据，或者没有选择月份分类，直接返回
        let test = Array.from(saleList).some((v,i) => {
          return v.checked != false;
        });
        if (!arr || arr.length == 0 || !test) {
          showData.textContent = '无符合要求的数据';
          return;
        }

        //设置表格样式和class类名，插入thead和tbody，渲染表头月份等
        let mouth = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
        let table = document.createElement('table');
        let head = table.createTHead();
        let body = document.createElement('tbody');
        table.createCaption();
        table.caption.textContent = 'MIE System';
        table.appendChild(body);
        table.className = 'table';
        table.border = '1';
        head.insertRow();
        head.rows[0].insertCell();
        head.rows[0].insertCell();
        head.rows[0].cells[0].outerHTML = '<th>商品</th>';
        head.rows[0].cells[1].outerHTML = '<th>地区</th>';    
        for (let i = 0; i < 12; i++) {
          head.rows[0].insertCell();
          head.rows[0].cells[2+i].outerHTML = `<th>${mouth[i]}</th>`
        }

        //针对传入的arr数据，进行表格体的渲染
        for (let i = 0; i < arr.length; i++) {
          //插入行和单个表格
          body.insertRow(i);
          for (let l = 0; l < 14; l++) {
            body.rows[i].insertCell(l);
          }
          //表前两列固定
          body.rows[i].cells[0].textContent = arr[i].product;
          body.rows[i].cells[1].textContent = arr[i].region;
          //选择的月份以“月份-数据”的逻辑存储，所以要拆开。
          for (let l = 0; l < arr[i].sale.length; l++) {
            const e = arr[i].sale[l];
            let cache = e.split('-');
            let index = +cache[0] + 2;
            body.rows[i].cells[index].textContent = cache[1];
          }
        }
        showData.appendChild(table);
      }

      //根据传入的源数据Data，分类arr，和分类规则进行数据筛选
      function filter(Data, arr, type) {
        let newData = [];

        //分类规则不为sale时，逻辑比较急简单
        if (type != 'sale') {
          for (let i = 0; i < arr.length; i++) {
            let filterArr = Data.filter((v) => {
              return v[type] === arr[i];
            });
            newData = newData.concat(filterArr);
          }
        } else {
          //分类规则为sale时，深复制一个源数据，否则因为数组是引用类型，会导致源数据被更改。
          let cache = JSON.stringify(Data);
          cache = JSON.parse(cache);   
          for (let l = 0; l < Data.length; l++) {
            let saleCache = Data[l][type].map((v, i) => {
              return i + '-' + v;
            })
            saleCache = saleCache.filter((v, i) => {
              let newCache = v.split('-');
              return arr.includes(newCache[0]);
            })
            cache[l][type] = saleCache
          }
          newData = newData.concat(cache);
        }
        return newData;
      }

      //传入分类列表，返回选中的分类规则
      function getSort(list) {
        let arr = [];
        for (let i = 0; i < list.length; i++) {
          if (list[i].checked == true) {
            arr.push(list[i].id)
          }
        }
        return arr;
      }


      //自封装的dom节点操作
      function $(e, element = document.body, isAll = false) {
        if (isAll) {
          return element.querySelectorAll(e);
        }
        return element.querySelector(e);
      }
