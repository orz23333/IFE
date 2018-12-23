      let singleTable = function () {
        let table;
        return function () {
          if (table) {
            return table;
          } else {
            //设置表格样式和class类名，插入thead和tbody，渲染表头月份等
            let mouth = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
            table = document.createElement('table');
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
              head.rows[0].cells[2 + i].outerHTML = `<th>${mouth[i]}</th>`
            }
            return table;
          }
        }
      }();

      //渲染表格的逻辑
      function makeTable(arr) {
        //如果源数据中无数据，或者没有选择月份分类，直接返回
        let test = Array.from(saleList).some((v, i) => {
          return v.checked != false;
        });
        if (!arr || arr.length == 0 || !test) {
          showData.textContent = '无符合要求的数据';
          return;
        }

        let table = singleTable();
        let body = table.tBodies[0];
        
        //避免出现每次点击“确定”渲染表格重复，移除节点
        while (body.firstChild) {
          body.removeChild(body.firstChild);
        }

        //针对传入的arr数据，进行表格体的渲染
        for (let i = 0; i < arr.length; i++) {
          //插入行和单个表格
          body.insertRow(i);
          for (let l = 0; l < 14; l++) {
            body.rows[i].insertCell(l);
            if (l > 1) {
              body.rows[i].cells[l].setAttribute('data-sale', l);
            } else {
              body.rows[i].cells[l].setAttribute('data-head', l)
            }
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

      //单例模式创建编辑框
      let singleTon = function () {
        let div;
        return function () {
          if (div) {
            return div
          } else {
            div = document.createElement('div');
            div.className = 'clickBox';
            div.id = 'clickBox';
            let input = document.createElement('input');
            input.type = 'text';
            input.id = 'input';
            let btn1 = document.createElement('button');
            let btn2 = document.createElement('button');
            let br = document.createElement('br');
            btn1.textContent = '确认';
            btn2.textContent = '取消';
            div.appendChild(input);
            div.appendChild(br);
            div.appendChild(btn1);
            div.appendChild(btn2);
            btn1.onclick = makeInput;

            //设置专有识别代码
            div.setAttribute('data-set', 'true');
            input.setAttribute('data-set', 'true');
            btn1.setAttribute('data-set', 'true');
            btn2.setAttribute('data-set', 'true');

            function makeInput() {
              div.previousSibling.nodeValue = input.value;
              input.value = '';
              input.focus();
              div.parentNode.removeAttribute('data-select');
            };

            btn2.onclick = cancelInput;

            function cancelInput() {
              div.parentNode.removeAttribute('data-select');
              div.parentNode.removeChild(div);
              input.value = '';
            };

            //过滤输入为数字
            //input.addEventListener('keydown', quit, false);
            input.addEventListener('keydown', filterInput, false)

            function filterInput(e) {
              let code = e.keyCode || e.charCode;
              let inputV = String.fromCharCode(code);
              if (/\d/.test(inputV) || code < 9 || e.ctrlKey || (code > 95 && code < 105) || code == 13 || code == 27) {} else {
                e.preventDefault();
                input.value = '请输入数字';
                input.select();
                return;
              }
              if (code == 27) {
                console.log(code);
                cancelInput();
                return;
              }
              if (code == 13) {
                makeInput();
                return;
              }
            };
            return div;
          }
        }
      }();