function $(e, element = document.body, isAll = false) {
  if (isAll) {
    return element.querySelectorAll(e);
  }
  return element.querySelector(e);
}