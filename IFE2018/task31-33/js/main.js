      let productList = $('input', $('#product'), true);
      let regionList = $('input', $('#region'), true);
      let saleList = $('input', $('#sale'), true);
      let showData = $('#showData');
      let btn = $('#submit');
      btn.addEventListener('click', submitEvent, false);


      function submitEvent(e) {
        e.preventDefault();
        let selectP = getSort(productList);
        let selectR = getSort(regionList);
        let selectS = getSort(saleList);

        let filterP = filter(sourceData, selectP, 'product');
        let filterR = filter(filterP, selectR, 'region');
        let filterS = filter(filterR, selectS, 'sale');

        makeTable(filterS);
      }


      function makeTable(arr) {
        while (showData.firstChild) {
          showData.removeChild(showData.firstChild);
        }

        if (!arr || arr.length == 0) {
          showData.textContent = '无符合要求的数据';
          return;
        }

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

        for (let i = 0; i < arr.length; i++) {
          body.insertRow(i);
          for (let l = 0; l < 14; l++) {
            body.rows[i].insertCell(l);
            if (l>1) {
              body.rows[i].cells[l].textContent = arr[i].sale[l-2];
            }
          }
          body.rows[i].cells[0].textContent = arr[i].product;
          body.rows[i].cells[1].textContent = arr[i].region;
        }

        showData.appendChild(table);
      }

      function filter(Data, arr, type) {
        let newData = [];

        if (type != 'sale') {
          for (let i = 0; i < arr.length; i++) {
            let filterArr = Data.filter((v) => {
              return v[type] === arr[i];
            });
            newData = newData.concat(filterArr);
          }
        } else {
          let cache = JSON.stringify(Data);
          cache = JSON.parse(cache);   
          for (let l = 0; l < Data.length; l++) {
            let saleCache = Data[l][type].filter((v, i) => {
              return arr.includes(i + '');
            })
            cache[l][type] = saleCache
          }
          newData = newData.concat(cache);
        }
        return newData;
      }


      function getSort(list) {
        let arr = [];
        for (let i = 0; i < list.length; i++) {
          if (list[i].checked == true) {
            arr.push(list[i].id)
          }
        }
        return arr;
      }


      function $(e, element = document.body, isAll = false) {
        if (isAll) {
          return element.querySelectorAll(e);
        }
        return element.querySelector(e);
      }
