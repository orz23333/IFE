      let productList = $('input', $('#product'), true);
      let regionList = $('input', $('#region'), true);
      let saleList = $('input', $('#sale'), true);
      let showData = $('#showData');
      let btn = $('#submit');
      let toggle = $('#toggle');
      btn.addEventListener('click', submitEvent, false);
      toggle.addEventListener('click', toggleSelect, false);

      init();

      function init() {
        productList[0].checked = true;
        regionList[0].checked = true;
        for (let i = 0; i < saleList.length; i++) {
          saleList[i].checked = true;
        }
        clickEvent();        
      }

      function toggleSelect(e) {
        e.preventDefault();
        for (let i = 0; i < saleList.length; i++) {
          saleList[i].checked = !saleList[i].checked;
        }
      }

      function clickEvent() {
        let event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, true, document.defaultView);
        btn.dispatchEvent(event);
      }


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

        let test = Array.from(saleList).some((v,i) => {
          return v.checked != false;
        });

        if (!arr || arr.length == 0 || !test) {
          showData.textContent = '无符合要求的数据';
          return;
        }

        console.log(arr);

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
          }
          for (let l = 0; l < arr[i].sale.length; l++) {
            const e = arr[i].sale[l];
            let cache = e.split('-');
            let index = +cache[0] + 2;
            body.rows[i].cells[index].textContent = cache[1];
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
