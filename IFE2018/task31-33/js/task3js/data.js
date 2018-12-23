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
