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


      //“确定”按钮的处理逻辑
      function submitEvent(e) {
        e.preventDefault();
        //获得选中的分类，存储在getSort返回的数组中
        let selectP = getSort(productList);
        let selectR = getSort(regionList);
        let selectS = getSort(saleList);

        //根据选中的分类，依次对源数据进行筛选
        let storage = localStorage.getItem('sourceData');
        let filterP;
        if (storage) {
          storage = JSON.parse(storage);
          filterP = filter(storage, selectP, 'product');         
        } else {
          filterP = filter(sourceData, selectP, 'product');
        }

        let filterR = filter(filterP, selectR, 'region');
        let filterS = filter(filterR, selectS, 'sale');

        //根据筛选后的数据，渲染表格
        makeTable(filterS);
      }

      //退出编辑框
      function quit(e) {
        let dataSet = e.target.getAttribute('data-set');
        if (e.target.nodeName.toLowerCase() != 'td' && $('[data-select]') && !dataSet) {
          $('[data-select').removeAttribute('data-select');
          $('#clickBox').parentNode.removeChild($('#clickBox'));
        }
      }

      //保存数据
      function saveStorage(e) {
        e.preventDefault();
        let sourceData = [];
        if (!$('#showData table')) {
          localStorage.setItem('sourceData', '');
          return;
        }
        let trows = $('#showData table').tBodies[0].rows;
        for (let i = 0, l = trows.length; i < l; i++) {
          let cells = trows[i].cells;
          sourceData[i] = {};
          sourceData[i].product = cells[0].textContent;
          sourceData[i].region = cells[1].textContent;
          sourceData[i].sale = [];
          for (let j = 0, k = cells.length - 2; j < k; j++) {
            sourceData[i].sale[j] = cells[j+2].textContent;
          }
        }
        let s = JSON.stringify(sourceData);
        localStorage.setItem('sourceData', s);
        return sourceData;
      }

      //修改数据
      function changeData(e) {
        if (!e.target.getAttribute('data-sale')) {
          return;
        } else if ($('[data-select')) {
          $('[data-select]').removeAttribute('data-select');
        }

        e.target.setAttribute('data-select', 'true');
        let tdPosition = e.target.getBoundingClientRect();
        let nodeName = e.target.nodeName.toLowerCase();

        if (nodeName === 'td') {
          let div = singleTon();
          e.target.appendChild(div);
          let divPisition = div.getBoundingClientRect();
          let divWidth = divPisition.width;
          div.style.top = tdPosition.top - divPisition.height + 'px';
          div.style.left = tdPosition.left - (divWidth-tdPosition.width) / 2 + 'px';
          $('#input').focus();
        } 
      }

      //自封装的dom节点操作
      function $(e, element = document.body, isAll = false) {
        if (isAll) {
          return element.querySelectorAll(e);
        }
        return element.querySelector(e);
      }


      function chartJs() {
        showData.innerHTML += `
          <div class="canvas1">
            <canvas id="canvasNo1"></canvas>
            <canvas id="canvasNo2"></canvas>
          </div>
        `;
      }