//
export const getDepth = columns => Math.max.apply(null, columns.map(column => column.$level))


export const getColumnsSortConf = columns => {
  let ret = {}

  columns.forEach(column => {
    if(column.sort) {
      ret[column.dataIndex] = column.sort.defaultOrder
    }
  })

  return ret
}


export const flatten = root => {
  let result = [], $id = 1

  root.forEach(item => {
    let tmp = []

    if(item.children) {
      deep(item, tmp)

      tmp.forEach(el => {
        if(item.fixed) {
          el.fixed = item.fixed
        }
      })

    } else {
      item.$id = $id++
      item.$level = 1
      result.push(item)
    }

    result = result.concat(tmp)
  })
  
  return result

  //
  function deep(item, result, $level = 1, $pid = 0) {
    if(item.children) {
      $level++
      item.$id = $id++
      item.$pid = $pid++
      $pid = item.$id

      item.children.forEach(subItem => {
        deep(subItem, result, $level, $pid)
      })

      item.$level = $level - 1
      result.push(item)

    } else {
      item.$id = $id++
      item.$pid = $pid
      item.$level = $level
      result.push(item)
    }
  }
}


export const getChildren = (columnId, columns, children) => {
  let filter = columns.filter(column => column.$pid === columnId)

  // children.splice(children.length - 1, 0, ...filter)
  children.push.apply(children, filter)
  filter.forEach(column => getChildren(column.$id, columns, children))
}


// https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/insertRule
export const addStylesheetRules = decls => {
  var style = document.createElement('style');
  document.getElementsByTagName('head')[0].appendChild(style);
  if (!window.createPopup) { /* For Safari */
    style.appendChild(document.createTextNode(''));
  }
  var s = document.styleSheets[document.styleSheets.length - 1];
  for (var i = 0, dl = decls.length; i < dl; i++) {
    var j = 1, decl = decls[i], selector = decl[0], rulesStr = '';
    if (Object.prototype.toString.call(decl[1][0]) === '[object Array]') {
      decl = decl[1];
      j = 0;
    }
    for (var rl = decl.length; j < rl; j++) {
      var rule = decl[j];
      rulesStr += rule[0] + ':' + rule[1] + (rule[2] ? ' !important' : '') + ';\n';
    }

    if (s.insertRule) {
      s.insertRule(selector + '{' + rulesStr + '}', s.cssRules.length);
    }
    else { /* IE */
      s.addRule(selector, rulesStr, -1);
    }
  }
}



