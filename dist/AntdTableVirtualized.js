"use strict";

function _typeof3(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof3 = function _typeof3(obj) { return typeof obj; }; } else { _typeof3 = function _typeof3(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof3(obj); }

function _typeof2(obj) {
  if (typeof Symbol === "function" && _typeof3(Symbol.iterator) === "symbol") {
    _typeof2 = function _typeof2(obj) {
      return _typeof3(obj);
    };
  } else {
    _typeof2 = function _typeof2(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof3(obj);
    };
  }

  return _typeof2(obj);
}

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactVirtualizedAutoSizer = _interopRequireDefault(require("react-virtualized-auto-sizer"));

var _reactWindow = require("react-window");

var _scrollbarSize = _interopRequireDefault(require("dom-helpers/scrollbarSize"));

var _classnames = _interopRequireDefault(require("classnames"));

var _antd = require("antd");

var _AntdTableVirtualized = _interopRequireDefault(require("./AntdTableVirtualized.scss"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

var classPrefix = _AntdTableVirtualized.default.classPrefix;

var noopReturnEmptyObject = function noopReturnEmptyObject() {
  return {};
};

var AntdTableVirtualized =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AntdTableVirtualized, _React$Component);

  function AntdTableVirtualized(props) {
    var _this;

    _classCallCheck(this, AntdTableVirtualized);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AntdTableVirtualized).call(this, props));

    _this.columnsSortConf = function () {
      var ret = {};

      _this.props.columns.forEach(function (item) {
        if (item.sort) {
          ret[item.dataIndex] = item.sort.defaultOrder;
        }
      });

      return ret;
    };

    _this.columnsConf = function () {
      var _this$props = _this.props,
          rowSelection = _this$props.rowSelection,
          columns = _this$props.columns;

      var _columns = _toConsumableArray(columns);

      var ret = {
        left: 0,
        right: 0,
        leftWidth: 0,
        rightWidth: 0,
        totalWidth: 0,
        leftColumns: [],
        middleColumns: [],
        rightColumns: []
      };

      if (rowSelection) {
        var checkColumn = {
          internalUseOnly: true,
          width: rowSelection.columnWidth || 48,
          fixed: rowSelection.fixed || 'left',
          render: function render(text, record, index) {
            var _this$props$rowSelect = _this.props.rowSelection,
                selectedRowKeys = _this$props$rowSelect.selectedRowKeys,
                _this$props$rowSelect2 = _this$props$rowSelect.getCheckboxProps,
                getCheckboxProps = _this$props$rowSelect2 === void 0 ? noopReturnEmptyObject : _this$props$rowSelect2;

            if (!selectedRowKeys) {
              throw Error("selectedRowKeys should be Array in rowSelection prop");
            }

            var checkboxProps = getCheckboxProps(record);
            var keys = Object.keys(checkboxProps);

            if (keys.indexOf('defaultChecked') > -1 && keys.indexOf('checked') > -1) {
              throw Error("defaultChecked and checked can not be set at the same time in getCheckboxProps which in rowSelection prop");
            }

            checkboxProps.checked = selectedRowKeys.some(function (i) {
              return i === index;
            });
            return _react.default.createElement(_antd.Checkbox, _extends({}, checkboxProps, {
              onClick: function onClick(e) {
                return _this.onCheckboxClick(index, e);
              }
            }));
          }
        };

        if (checkColumn.fixed === 'left') {
          _columns.unshift(checkColumn);
        } else {
          _columns.push(checkColumn);
        }
      }

      _columns.forEach(function (item) {
        if (!item.hasOwnProperty('width')) {
          item.width = 0;
        }

        ret.totalWidth += item.width;

        if (item.fixed === 'left') {
          ret.left += 1;
          ret.leftWidth += item.width;
          ret.leftColumns.push(item);
        } else if (item.fixed === 'right') {
          ret.right += 1;
          ret.rightWidth += item.width;
          ret.rightColumns.push(item);
        } else {
          ret.middleColumns.push(item);
        }
      });

      ret.middleColumns = [].concat(_toConsumableArray(ret.leftColumns), _toConsumableArray(ret.middleColumns));
      return ret;
    };

    _this.onScrollLeftBottom = function (_ref) {
      var scrollTop = _ref.scrollTop;
      var current = _this.middleBottomGridRef.current;

      if (current) {
        current.scrollTo({
          scrollTop: scrollTop
        });
      }
    };

    _this.onScrollMiddleTop = function (_ref2) {
      var scrollLeft = _ref2.scrollLeft;
      var current = _this.middleBottomGridRef.current;

      if (current) {
        current.scrollTo({
          scrollLeft: scrollLeft
        });
      }
    };

    _this.onScrollMiddleBottom = function (_ref3) {
      var horizontalScrollDirection = _ref3.horizontalScrollDirection,
          scrollLeft = _ref3.scrollLeft,
          scrollTop = _ref3.scrollTop;

      _this.showShadow(horizontalScrollDirection, scrollLeft);

      var current1 = _this.middleTopGridRef.current;
      var current2 = _this.leftBottomGridRef.current;
      var current3 = _this.rightBottomGridRef.current;

      if (current1) {
        current1.scrollTo({
          scrollLeft: scrollLeft
        });
      }

      if (current2) {
        current2.scrollTo({
          scrollTop: scrollTop
        });
      }

      if (current3) {
        current3.scrollTo({
          scrollTop: scrollTop
        });
      }
    };

    _this.onScrollRightBottom = function (_ref4) {
      var scrollTop = _ref4.scrollTop;
      var current1 = _this.leftBottomGridRef.current;
      var current2 = _this.middleBottomGridRef.current;

      if (current1) {
        current1.scrollTo({
          scrollTop: scrollTop
        });
      }

      if (current2) {
        current2.scrollTo({
          scrollTop: scrollTop
        });
      }
    };

    _this.rowHeight = function () {
      return _this.props.rowHeight;
    };

    _this.rowHeadHeight = function () {
      return _this.props.rowHeadHeight;
    };

    _this.renderTopCell = function (_ref5) {
      var place = _ref5.place,
          columnIndex = _ref5.columnIndex,
          style = _ref5.style;

      var columnItem = _this.columnsConf["".concat(place, "Columns")][columnIndex];

      var classes = (0, _classnames.default)('Cell Cell-Head', {
        'Sortable': !!columnItem['sort'],
        'Sorting': !!_this.state.columnsSortConf[columnItem['dataIndex']]
      });
      var content = columnItem['title'];

      if (columnItem.sort) {
        var caretUpClassName = (0, _classnames.default)({
          'Activated': _this.state.columnsSortConf[columnItem.dataIndex] === 'ascend'
        });
        var caretDownClassName = (0, _classnames.default)({
          'Activated': _this.state.columnsSortConf[columnItem.dataIndex] === 'descend'
        });
        content = _react.default.createElement("div", {
          className: "Sortable-Wrapper"
        }, _react.default.createElement("div", {
          className: "Content"
        }, content), _react.default.createElement("div", {
          className: "Icons"
        }, _react.default.createElement(_antd.Icon, {
          className: caretUpClassName,
          style: {
            marginBottom: -4
          },
          type: "caret-up"
        }), _react.default.createElement(_antd.Icon, {
          className: caretDownClassName,
          type: "caret-down"
        })));
      }

      if (place === 'middle' && columnItem.fixed === 'left') {
        content = '';
      } // when rowSecection prop available


      if (columnItem.internalUseOnly) {
        var _this$props2 = _this.props,
            dataSource = _this$props2.dataSource,
            selectedRowKeys = _this$props2.rowSelection.selectedRowKeys;
        var checked = !!dataSource.length && selectedRowKeys.length === dataSource.length;
        var indeterminate = checked ? false : selectedRowKeys.length ? true : false;
        content = _react.default.createElement(_antd.Checkbox, {
          disabled: !dataSource.length,
          checked: checked,
          indeterminate: indeterminate,
          onClick: function onClick(e) {
            return _this.onCheckboxClick(-1, e);
          }
        });
      }

      return _react.default.createElement("div", {
        className: classes,
        style: style,
        onClick: function onClick() {
          _this.onHeadCellClick(columnItem);
        }
      }, content);
    };

    _this.renderBottomCell = function (_ref6) {
      var place = _ref6.place,
          columnIndex = _ref6.columnIndex,
          rowIndex = _ref6.rowIndex,
          style = _ref6.style;
      var _this$props3 = _this.props,
          dataSource = _this$props3.dataSource,
          striped = _this$props3.striped,
          rowSelection = _this$props3.rowSelection;

      var columnItem = _this.columnsConf["".concat(place, "Columns")][columnIndex];

      var key = columnItem['dataIndex'];
      var text = dataSource[rowIndex][key];
      var hasSelectedClassName = false;

      if (rowSelection) {
        hasSelectedClassName = rowSelection.selectedRowKeys.some(function (i) {
          return i === rowIndex;
        });
      }

      var styles = _objectSpread({}, style, {
        lineHeight: "".concat(columnItem.ellipsis ? _this.rowHeight() - 1 : '', "px")
      });

      var classes = (0, _classnames.default)('Cell Cell-Body', striped ? rowIndex % 2 ? 'Cell-Even' : 'Cell-Odd' : '', {
        'Click-Highlight': _this.state.clickedRowIndex === rowIndex,
        'Ellipsis': columnItem.ellipsis && !columnItem.toolTip,
        'Selected': hasSelectedClassName
      });
      var content = text;

      if (place === 'middle' && columnItem.fixed === 'left') {
        content = '';
      } else {
        if (columnItem.render) {
          content = columnItem.render(content, dataSource[rowIndex], rowIndex);
          var backgroundColor = content.props.style && content.props.style['backgroundColor'];

          if (backgroundColor) {
            styles.backgroundColor = backgroundColor;
          }
        }

        var toolTip = typeof columnItem.toolTip === 'boolean' ? {} : columnItem.toolTip;

        if (columnItem.ellipsis && toolTip) {
          content = _react.default.createElement(_antd.Tooltip, _extends({
            title: text
          }, toolTip), _react.default.createElement("div", {
            className: "Ellipsis"
          }, content));
        }
      }

      return _react.default.createElement("div", {
        className: classes,
        style: styles,
        "data-row-index": rowIndex,
        onMouseEnter: function onMouseEnter() {
          _this.onRowMouseEnter(rowIndex);
        },
        onMouseLeave: function onMouseLeave() {
          _this.onRowMouseLeave(rowIndex);
        },
        onClick: function onClick() {
          _this.onRowClick(rowIndex);
        },
        onDoubleClick: function onDoubleClick() {
          _this.onRowonDoubleClick(rowIndex);
        },
        onContextMenu: function onContextMenu() {
          _this.onRowContextMenu(rowIndex);
        }
      }, content);
    };

    _this.renderLeftTopCell = function (_ref7) {
      var columnIndex = _ref7.columnIndex,
          rowIndex = _ref7.rowIndex,
          style = _ref7.style;
      return _this.renderTopCell({
        place: 'left',
        columnIndex: columnIndex,
        style: style
      });
    };

    _this.renderLeftBottomCell = function (_ref8) {
      var columnIndex = _ref8.columnIndex,
          rowIndex = _ref8.rowIndex,
          style = _ref8.style;
      return _this.renderBottomCell({
        place: 'left',
        columnIndex: columnIndex,
        rowIndex: rowIndex,
        style: style
      });
    };

    _this.renderMiddleTopCell = function (_ref9) {
      var columnIndex = _ref9.columnIndex,
          rowIndex = _ref9.rowIndex,
          style = _ref9.style;
      return _this.renderTopCell({
        place: 'middle',
        columnIndex: columnIndex,
        style: style
      });
    };

    _this.renderMiddleBottomCell = function (_ref10) {
      var columnIndex = _ref10.columnIndex,
          rowIndex = _ref10.rowIndex,
          style = _ref10.style;
      return _this.renderBottomCell({
        place: 'middle',
        columnIndex: columnIndex,
        rowIndex: rowIndex,
        style: style
      });
    };

    _this.renderRightTopCell = function (_ref11) {
      var columnIndex = _ref11.columnIndex,
          rowIndex = _ref11.rowIndex,
          style = _ref11.style;
      return _this.renderTopCell({
        place: 'right',
        columnIndex: columnIndex,
        style: style
      });
    };

    _this.renderRightBottomCell = function (_ref12) {
      var columnIndex = _ref12.columnIndex,
          rowIndex = _ref12.rowIndex,
          style = _ref12.style;
      return _this.renderBottomCell({
        place: 'right',
        columnIndex: columnIndex,
        rowIndex: rowIndex,
        style: style
      });
    };

    _this.showShadow = function (horizontalScrollDirection, scrollLeft) {
      // initialization
      if (horizontalScrollDirection === 'forward' && scrollLeft === 0) {
        return;
      } // Fixed-Right Shadow


      if (_this.columnsConf.right) {
        var elem = _this.middleBottomGridRef.current;
        var innerElem = _this.middleBottomGridInnerRef.current;
        var totalWidth = innerElem.clientWidth + innerElem.offsetLeft + (0, _scrollbarSize.default)();

        if (totalWidth - elem.props.width - scrollLeft < 5) {
          if (_this.state.showRightShadow) {
            _this.setState({
              showRightShadow: false
            });
          }
        } else {
          if (!_this.state.showRightShadow) {
            _this.setState({
              showRightShadow: true
            });
          }
        }
      } // Fixed-Left Shadow


      if (_this.columnsConf.left) {
        if (horizontalScrollDirection === 'backward' && scrollLeft < 5) {
          if (_this.state.showLeftShadow) {
            _this.setState({
              showLeftShadow: false
            });
          }
        } else {
          if (!_this.state.showLeftShadow) {
            _this.setState({
              showLeftShadow: true
            });
          }
        }
      }
    };

    _this.onHeadCellClick = function (column) {
      var multipleSort = _this.props.multipleSort;

      if (column.sort) {
        var columnsSortConf = _objectSpread({}, _this.state.columnsSortConf);

        var dataIndex = column['dataIndex'];
        var val = columnsSortConf[dataIndex];

        if (multipleSort) {
          if (val === 'ascend') {
            val = 'descend';
          } else if (val === 'descend') {
            val = '';
          } else {
            val = 'ascend';
          }
        } else {
          for (var key in columnsSortConf) {
            if (key === dataIndex) {
              if (val === 'ascend') {
                val = 'descend';
              } else if (val === 'descend') {
                val = '';
              } else {
                val = 'ascend';
              }
            } else {
              columnsSortConf[key] = '';
            }
          }
        }

        columnsSortConf[dataIndex] = val;

        _this.setState({
          columnsSortConf: columnsSortConf
        }, function () {
          column.sort.handle(columnsSortConf);
        });
      }
    };

    _this.onRowMouseEnter = function (rowIndex, event) {
      _this.containerRef.current.querySelectorAll("[data-row-index=\"".concat(rowIndex, "\"]")).forEach(function (el) {
        return el.classList.add('Highlight');
      });

      _this.handleEvent('onMouseEnter', rowIndex, event);
    };

    _this.onRowMouseLeave = function (rowIndex, event) {
      _this.containerRef.current.querySelectorAll("[data-row-index=\"".concat(rowIndex, "\"]")).forEach(function (el) {
        return el.classList.remove('Highlight');
      });

      _this.handleEvent('onMouseLeave', rowIndex, event);
    };

    _this.onRowClick = function (rowIndex, event) {
      _this.highlightAfterClick(rowIndex);

      _this.handleEvent('onClick', rowIndex, event);
    };

    _this.onRowonDoubleClick = function (rowIndex, event) {
      _this.handleEvent('onDoubleClick', rowIndex, event);
    };

    _this.onRowContextMenu = function (rowIndex, event) {
      _this.handleEvent('onContextMenu', rowIndex, event);
    };

    _this.handleEvent = function (type, rowIndex, event) {
      var _this$props4 = _this.props,
          onRow = _this$props4.onRow,
          dataSource = _this$props4.dataSource;

      if (onRow()[type]) {
        onRow(dataSource[rowIndex])[type](event);
      }
    };

    _this.onPaginationChange = function (page, pageSize) {
      _this.page = page;
      _this.firstUpdate = true;

      _this.props.pagination.onChange(page, pageSize);
    };

    _this.onCheckboxClick = function (rowIndex, event) {
      event.stopPropagation();
      var checked = event.target.checked;
      var dataSource = _this.props.dataSource;
      var _this$props$rowSelect3 = _this.props.rowSelection,
          selectedRowKeys = _this$props$rowSelect3.selectedRowKeys,
          onChange = _this$props$rowSelect3.onChange,
          onSelect = _this$props$rowSelect3.onSelect,
          onSelectAll = _this$props$rowSelect3.onSelectAll,
          _this$props$rowSelect4 = _this$props$rowSelect3.getCheckboxProps,
          getCheckboxProps = _this$props$rowSelect4 === void 0 ? noopReturnEmptyObject : _this$props$rowSelect4;

      var copySelectedRowKeys = _toConsumableArray(selectedRowKeys);

      var selectedRows = [];
      var changeRows = [];

      if (rowIndex === -1) {
        dataSource.forEach(function (item, index) {
          var exist = copySelectedRowKeys.some(function (i) {
            return i === index;
          });
          var disabled = getCheckboxProps(item).disabled;

          if (!disabled) {
            if (exist !== checked) {
              changeRows.push(item);
            }

            if (checked) {
              if (!exist) {
                selectedRows.push(item);
                copySelectedRowKeys.push(index);
              }
            } else {
              if (exist) {
                var i = copySelectedRowKeys.indexOf(index);
                copySelectedRowKeys.splice(i, 1);
              }
            }
          }
        }); // when contain disabled row, we should jump out after checkall

        if (selectedRows.length === 0) {
          copySelectedRowKeys = [];
        }

        copySelectedRowKeys.sort(function (a, b) {
          return a - b;
        });
        onSelectAll && onSelectAll(checked, selectedRows, changeRows);
      } else {
        if (checked) {
          if (copySelectedRowKeys.indexOf(rowIndex) === -1) {
            copySelectedRowKeys.push(rowIndex);
            copySelectedRowKeys.sort(function (a, b) {
              return a - b;
            });
          }
        } else {
          var index = copySelectedRowKeys.indexOf(rowIndex);
          copySelectedRowKeys.splice(index, 1);
        }

        copySelectedRowKeys.forEach(function (index) {
          return selectedRows.push(dataSource[index]);
        });
        onSelect && onSelect(dataSource[rowIndex], checked, copySelectedRowKeys, event.nativeEvent);
      }

      onChange && onChange(copySelectedRowKeys, selectedRows);
    };

    _this.highlightAfterClick = function (rowIndex) {
      var clickHighlight = _this.props.clickHighlight;
      var clickedRowIndex = _this.state.clickedRowIndex;
      var isColorValue = typeof clickHighlight === 'string';

      if (clickHighlight && rowIndex !== clickedRowIndex) {
        if (isColorValue && clickedRowIndex === -1) {
          _this.containerRef.current.setAttribute('data-key', _this.instanceKey);

          addStylesheetRules([["[data-key=\"".concat(_this.instanceKey, "\"] .Cell-Body.Click-Highlight"), ['background-color', clickHighlight]]]);
        }

        _this.setState({
          clickedRowIndex: rowIndex
        });
      }
    };

    _this.state = {
      showLeftShadow: false,
      showRightShadow: true,
      clickedRowIndex: -1,
      columnsSortConf: _this.columnsSortConf()
    };
    _this.instanceKey = "".concat(classPrefix, "-").concat(String(Math.random()).replace('.', ''));
    _this.containerRef = _react.default.createRef();
    _this.leftTopGridRef = _react.default.createRef();
    _this.leftBottomGridRef = _react.default.createRef();
    _this.middleTopGridRef = _react.default.createRef();
    _this.middleBottomGridRef = _react.default.createRef();
    _this.middleBottomGridInnerRef = _react.default.createRef();
    _this.rightTopGridRef = _react.default.createRef();
    _this.rightBottomGridRef = _react.default.createRef();
    _this.prevPage = 1;
    _this.page = 1; // used when row set defaultChecded=true for first update

    _this.firstUpdate = true;
    _this.columnsConf = _this.columnsConf(); // horizontal scrollbar size

    _this.horizontalScrollbarSize = (0, _scrollbarSize.default)();
    _this.scrollbarSize = (0, _scrollbarSize.default)();
    return _this;
  }

  _createClass(AntdTableVirtualized, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this2 = this;

      var _this$props5 = this.props,
          dataSource = _this$props5.dataSource,
          rowSelection = _this$props5.rowSelection;

      if (this.prevPage !== this.page) {
        this.prevPage = this.page;
        this.rightBottomGridRef.current.scrollTo({
          scrollTop: 0
        });
      } // Handle data checked and disabled


      if (rowSelection) {
        var selectedRowKeys = rowSelection.selectedRowKeys,
            _rowSelection$getChec = rowSelection.getCheckboxProps,
            getCheckboxProps = _rowSelection$getChec === void 0 ? noopReturnEmptyObject : _rowSelection$getChec,
            onChange = rowSelection.onChange;

        var _selectedRowKeys = _toConsumableArray(selectedRowKeys);

        var _selectedRows = [];
        dataSource.forEach(function (item, index) {
          var checkboxProps = getCheckboxProps(item);
          var exist = selectedRowKeys.some(function (i) {
            return i === index;
          });

          if (!exist) {
            if (checkboxProps.disabled) {
              if (checkboxProps.defaultChecked || checkboxProps.checked) {
                _selectedRowKeys.push(index);
              }
            } else {
              if (checkboxProps.checked || checkboxProps.defaultChecked && _this2.firstUpdate) {
                _selectedRowKeys.push(index);
              }
            }
          }
        }); // Just ensure data sort by index

        if (_selectedRowKeys.length !== selectedRowKeys.length) {
          _selectedRowKeys.sort(function (a, b) {
            return a - b;
          });

          _selectedRowKeys.forEach(function (key) {
            return _selectedRows.push(dataSource[key]);
          });

          onChange(_selectedRowKeys, _selectedRows);
        }
      }

      this.firstUpdate = false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props6 = this.props,
          rowHeadHeight = _this$props6.rowHeadHeight,
          dataSource = _this$props6.dataSource,
          bordered = _this$props6.bordered,
          placeholder = _this$props6.placeholder,
          pagination = _this$props6.pagination;
      var rowCount = dataSource.length;
      var showLeftShadow = rowCount && this.state.showLeftShadow;
      var showRightShadow = rowCount && this.columnsConf.right && this.state.showRightShadow;
      var paginationHeight = pagination ? pagination.height || 50 : 0;
      return _react.default.createElement("div", {
        style: {
          flex: 1
        }
      }, _react.default.createElement(_reactVirtualizedAutoSizer.default, null, function (_ref13) {
        var height = _ref13.height,
            width = _ref13.width;
        var diff = width - _this3.columnsConf.totalWidth - _this3.scrollbarSize - 2;

        if (diff >= 0) {
          _this3.horizontalScrollbarSize = 0;
        } // Minus the border top & bottom 2px


        var bodyHeight = height - rowHeadHeight - _this3.horizontalScrollbarSize - 2;
        height = height - paginationHeight;
        bodyHeight = bodyHeight - paginationHeight;

        for (var i = 0; i < _this3.columnsConf.middleColumns.length; i++) {
          var item = _this3.columnsConf.middleColumns[i];

          if (item.width === 0) {
            if (diff >= 0) {
              item.width = diff;
            } else {
              item.width = 200;
            }

            break;
          }
        }

        return _react.default.createElement("div", {
          ref: _this3.containerRef,
          className: (0, _classnames.default)(classPrefix, {
            Bordered: bordered
          }),
          style: {
            width: width,
            height: height
          }
        }, !dataSource.length && _react.default.createElement("div", {
          className: "Placeholder",
          style: {
            height: height - rowHeadHeight - 2,
            top: rowHeadHeight
          }
        }, placeholder), _react.default.createElement("div", {
          className: "Grids-Wrapper",
          style: {
            height: height
          }
        }, _react.default.createElement("div", {
          className: (0, _classnames.default)('Left-Grid-Wrapper', {
            'With-Shadow': showLeftShadow
          })
        }, _react.default.createElement("div", {
          className: (0, _classnames.default)('Left-Top-Grid-Wrapper', {
            'With-Shadow': !dataSource.length
          }),
          style: {
            height: rowHeadHeight
          }
        }, _react.default.createElement(_reactWindow.VariableSizeGrid, {
          className: (0, _classnames.default)('Left-Top-Grid'),
          columnCount: _this3.columnsConf.left,
          columnWidth: function columnWidth(index) {
            return _this3.columnsConf.leftColumns[index].width;
          },
          height: rowHeadHeight + _this3.scrollbarSize,
          rowCount: 1,
          rowHeight: _this3.rowHeadHeight,
          width: _this3.columnsConf.leftWidth,
          ref: _this3.leftTopGridRef
        }, _this3.renderLeftTopCell)), _react.default.createElement("div", {
          className: "Left-Bottom-Grid-Wrapper",
          style: {
            width: _this3.columnsConf.leftWidth
          }
        }, _react.default.createElement(_reactWindow.VariableSizeGrid, {
          className: (0, _classnames.default)('Left-Bottom-Grid'),
          columnCount: _this3.columnsConf.left,
          columnWidth: function columnWidth(index) {
            return _this3.columnsConf.leftColumns[index].width;
          },
          height: bodyHeight,
          rowCount: rowCount,
          rowHeight: _this3.rowHeight,
          width: _this3.columnsConf.leftWidth + _this3.scrollbarSize,
          ref: _this3.leftBottomGridRef,
          onScroll: _this3.onScrollLeftBottom
        }, _this3.renderLeftBottomCell))), _react.default.createElement("div", {
          className: "Middle-Grid-Wrapper",
          style: {
            height: height
          }
        }, _react.default.createElement("div", {
          className: "Middle-Top-Grid-Wrapper",
          style: {
            width: width,
            height: rowHeadHeight
          }
        }, _react.default.createElement(_reactWindow.VariableSizeGrid, {
          className: (0, _classnames.default)('Middle-Top-Grid'),
          style: {
            paddingLeft: _this3.columnsConf.rightWidth
          },
          columnCount: _this3.columnsConf.middleColumns.length,
          columnWidth: function columnWidth(index) {
            return _this3.columnsConf.middleColumns[index].width;
          },
          height: rowHeadHeight + _this3.scrollbarSize,
          rowCount: 1,
          rowHeight: _this3.rowHeadHeight,
          width: width - _this3.scrollbarSize - 2,
          ref: _this3.middleTopGridRef,
          onScroll: _this3.onScrollMiddleTop
        }, _this3.renderMiddleTopCell)), _react.default.createElement("div", {
          className: "Middle-Bottom-Grid-Wrapper"
        }, _react.default.createElement(_reactWindow.VariableSizeGrid, {
          className: (0, _classnames.default)('Middle-Bottom-Grid'),
          style: {
            paddingLeft: _this3.columnsConf.rightWidth,
            overflow: 'scroll'
          },
          columnCount: _this3.columnsConf.middleColumns.length,
          columnWidth: function columnWidth(index) {
            return _this3.columnsConf.middleColumns[index].width;
          },
          width: width - 2,
          height: bodyHeight + (_this3.horizontalScrollbarSize || _this3.scrollbarSize),
          rowCount: rowCount,
          rowHeight: _this3.rowHeight,
          innerRef: _this3.middleBottomGridInnerRef,
          ref: _this3.middleBottomGridRef,
          onScroll: _this3.onScrollMiddleBottom
        }, _this3.renderMiddleBottomCell))), _this3.columnsConf.right > 0 && _react.default.createElement("div", {
          className: (0, _classnames.default)('Right-Grid-Wrapper', {
            'With-Shadow': showRightShadow
          })
        }, _react.default.createElement("div", {
          className: (0, _classnames.default)('Right-Top-Grid-Wrapper', {
            'With-Shadow': !dataSource.length
          }),
          style: {
            width: _this3.columnsConf.rightWidth + _this3.scrollbarSize,
            height: rowHeadHeight
          }
        }, _react.default.createElement(_reactWindow.VariableSizeGrid, {
          className: (0, _classnames.default)('Right-Top-Grid'),
          columnCount: _this3.columnsConf.right,
          columnWidth: function columnWidth(index) {
            return _this3.columnsConf.rightColumns[index].width;
          },
          height: rowHeadHeight + _this3.scrollbarSize,
          rowCount: 1,
          rowHeight: _this3.rowHeadHeight,
          width: _this3.columnsConf.rightWidth,
          ref: _this3.rightTopGridRef,
          onScroll: _this3.onScrollRightTop
        }, _this3.renderRightTopCell)), _react.default.createElement("div", {
          className: "Right-Bottom-Grid-Wrapper",
          style: {
            width: _this3.columnsConf.rightWidth + _this3.scrollbarSize
          }
        }, _react.default.createElement(_reactWindow.VariableSizeGrid, {
          className: (0, _classnames.default)('Right-Bottom-Grid'),
          columnCount: _this3.columnsConf.right,
          columnWidth: function columnWidth(index) {
            return _this3.columnsConf.rightColumns[index].width;
          },
          height: bodyHeight,
          rowCount: rowCount,
          rowHeight: _this3.rowHeight,
          width: _this3.columnsConf.rightWidth + _this3.scrollbarSize,
          ref: _this3.rightBottomGridRef,
          onScroll: _this3.onScrollRightBottom
        }, _this3.renderRightBottomCell)))), pagination && _react.default.createElement("div", {
          className: "Pagination-Wrapper",
          style: _objectSpread({
            height: paginationHeight
          }, pagination.wrapperStyle)
        }, _react.default.createElement(_antd.Pagination, _extends({}, pagination, {
          onChange: _this3.onPaginationChange
        }))));
      }));
    }
  }]);

  return AntdTableVirtualized;
}(_react.default.Component); // https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/insertRule


exports.default = AntdTableVirtualized;
AntdTableVirtualized.defaultProps = {
  rowHeight: 40,
  rowHeadHeight: 40,
  clickHighlight: false,
  pagination: false,
  multipleSort: false,
  onRow: noopReturnEmptyObject
};

function addStylesheetRules(decls) {
  var style = document.createElement('style');
  document.getElementsByTagName('head')[0].appendChild(style);

  if (!window.createPopup) {
    /* For Safari */
    style.appendChild(document.createTextNode(''));
  }

  var s = document.styleSheets[document.styleSheets.length - 1];

  for (var i = 0, dl = decls.length; i < dl; i++) {
    var j = 1,
        decl = decls[i],
        selector = decl[0],
        rulesStr = '';

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
    } else {
      /* IE */
      s.addRule(selector, rulesStr, -1);
    }
  }
}
