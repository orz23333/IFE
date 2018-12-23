      let productList = $('input', $('#product'), true);
      let regionList = $('input', $('#region'), true);
      let saleList = $('input', $('#sale'), true);
      let showData = $('#showData');
      let btn = $('#submit');
      let toggle = $('#toggle');
      let tableDiv = $('#showData');
      $('#save').addEventListener('click', saveStorage, false);
      btn.addEventListener('click', submitEvent, false);
      toggle.addEventListener('click', toggleSelect, false);
      tableDiv.addEventListener('click', changeData, false);
      document.addEventListener('click', quit, false);

      $('#reset').onclick = function(e) {
        e.preventDefault();
        localStorage.removeItem('sourceData');
        init();
      }
      init();