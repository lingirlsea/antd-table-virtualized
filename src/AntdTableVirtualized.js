import React from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { VariableSizeGrid as Grid } from 'react-window'
import scrollbarSize from 'dom-helpers/scrollbarSize'
import classNames from 'classnames'
import { Icon, Tooltip, Checkbox, Pagination } from 'antd'
import style from './AntdTableVirtualized.scss'

const classPrefix = style.classPrefix
const noopReturnEmptyObject = () => ({})
const defaultColumnWidth = 200

export default class AntdTableVirtualized extends React.Component {

  static defaultProps = {
    className: '',
    rowHeight: 40,
    rowHeadHeight: 40,
    clickHighlight: false,
    pagination: false,
    multipleSort: false,
    onRow: noopReturnEmptyObject,
    placeholder: (
      <div className="Default">
        No Data
      </div>
    )
  }

  constructor(props) {
    super(props)

    this.state = {
      showLeftShadow: false,
      showRightShadow: true,
      clickedRowIndex: -1,
      columnsSortConf: this.columnsSortConf(),
    }

    this.instanceKey = `${classPrefix}-${String(Math.random()).replace('.', '')}`

    this.containerRef = React.createRef()

    this.leftTopGridRef = React.createRef()
    this.leftBottomGridRef = React.createRef()

    this.middleTopGridRef = React.createRef()
    this.middleBottomGridRef = React.createRef()
    this.middleBottomGridInnerRef = React.createRef()

    this.rightTopGridRef = React.createRef()
    this.rightBottomGridRef = React.createRef()

    this.prevPage = 1
    this.page = 1

    this.columnsConf = this.columnsConf()

    // horizontal scrollbar size
    this.horizontalScrollbarSize = scrollbarSize()
    this.scrollbarSize = scrollbarSize()
  }

  componentDidUpdate() {
    if(this.prevPage !== this.page) {
      this.prevPage = this.page
      this.rightBottomGridRef.current.scrollTo({ scrollTop: 0 })
    }
  }

  columnsSortConf = () => {
    let ret = {}
    this.props.columns.forEach(item => {
      if(item.sort) {
        ret[item.dataIndex] = item.sort.defaultOrder
      }
    })
    
    return ret
  }

  columnsConf = () => {
    const { rowSelection, columns } = this.props
    const { contentColumns, headColumns } = flatten([...columns])

    let ret = {
      left: 0,
      right: 0,
      headLeft: 0,
      headRight: 0,

      leftWidth: 0,
      rightWidth: 0,
      totalWidth: 0,

      leftColumns: [],
      middleColumns: [],
      rightColumns: [],

      headLeftColumns: [],
      headMiddleColumns: [],
      headRightColumns: [],
    }

    if(rowSelection) {
      const checkColumn = {
        internalUseOnly: true,
        width: rowSelection.columnWidth || 48,
        fixed: rowSelection.fixed || 'left',
        render: (text, record, index) => {
          const { rowSelection: { selectedRowKeys, getCheckboxProps = noopReturnEmptyObject } } = this.props

          if(!selectedRowKeys) {
            throw Error(`selectedRowKeys should be Array in rowSelection prop`)
          }

          const checkboxProps = getCheckboxProps(record)

          let keys = Object.keys(checkboxProps)
          if(keys.indexOf('defaultChecked') > -1 || keys.indexOf('checked') > -1) {
            throw Error('Do not set `checked` or `defaultChecked` in `getCheckboxProps`. Please use `selectedRowKeys` instead.')
          }

          checkboxProps.checked = selectedRowKeys.some(i => i === index)

          return (
            <Checkbox
              {...checkboxProps}
              onClick={ e => this.onCheckboxClick(index, e) }
            />
          )
        }
      }

      if(checkColumn.fixed === 'left') {
        contentColumns.unshift(checkColumn)
        headColumns.unshift(checkColumn)

      } else {
        contentColumns.push(checkColumn)
        headColumns.push(checkColumn)
      }

    }

    headColumns.forEach(item => {
      if (!item.hasOwnProperty('width')) {
        item.width = 0
      }

      if(item.fixed === true) {
        item.fixed = 'left'
      }

      if (item.fixed === 'left') {
        ret.headLeft += 1
        // ret.leftWidth += item.width
        ret.headLeftColumns.push(item)

      } else if (item.fixed === 'right') {
        ret.headRight += 1
        // ret.rightWidth += item.width
        ret.headRightColumns.push(item)

      } else {
        
        ret.headMiddleColumns.push(item)
      }
    })

    contentColumns.forEach(item => {
      if (!item.hasOwnProperty('width')) {
        item.width = 0
      }

      ret.totalWidth += item.width

      if(item.fixed === true) {
        item.fixed = 'left'
      }

      if (item.fixed === 'left') {
        ret.left += 1
        ret.leftWidth += item.width
        ret.leftColumns.push(item)

      } else if (item.fixed === 'right') {
        ret.right += 1
        ret.rightWidth += item.width
        ret.rightColumns.push(item)

      } else {
        
        ret.middleColumns.push(item)
      }

    })

    ret.middleColumns = [...ret.leftColumns, ...ret.middleColumns]
    ret.headMiddleColumns = [...ret.headLeftColumns, ...ret.headMiddleColumns]

    return ret
  }

  onScrollLeftBottom = ({ scrollTop }) => {
    const current = this.middleBottomGridRef.current
    if(current) {
      current.scrollTo({ scrollTop })
    }
  }

  onScrollMiddleTop = ({ scrollLeft }) => {
    const current = this.middleBottomGridRef.current
    if(current) {
      current.scrollTo({ scrollLeft })
    }
  }

  onScrollMiddleBottom = ({ horizontalScrollDirection, scrollLeft, scrollTop }) => {
    this.showShadow(horizontalScrollDirection, scrollLeft)

    const current1 = this.middleTopGridRef.current
    const current2 = this.leftBottomGridRef.current
    const current3 = this.rightBottomGridRef.current

    if(current1) {
      current1.scrollTo({ scrollLeft })
    }

    if(current2) {
      current2.scrollTo({ scrollTop })
    }

    if(current3) {
      current3.scrollTo({ scrollTop })
    }
  }

  onScrollRightBottom = ({ scrollTop }) => {
    const current1 = this.leftBottomGridRef.current
    const current2 = this.middleBottomGridRef.current

    if(current1) {
      current1.scrollTo({ scrollTop })
    }

    if(current2) {
      current2.scrollTo({ scrollTop })
    }
  }

  rowHeight = () => {
    return this.props.rowHeight
  }

  rowHeadHeight = () => {
    return this.props.rowHeadHeight
  }

  renderTopCell = ({ place, columnIndex, style }) => {
    const columnItem = this.columnsConf[`head${place}Columns`][columnIndex]
    const classes = classNames(
      'Cell Cell-Head',
      {
        'Align-Center': columnItem['align'] === 'center',
        'Align-Right': columnItem['align'] === 'right',
        'Sortable': !!columnItem['sort'],
        'Sorting': !!this.state.columnsSortConf[columnItem['dataIndex']]
      }
    )

    let content = columnItem['title']

    if(columnItem.sort) {
      const caretUpClassName = classNames({
        'Activated': this.state.columnsSortConf[columnItem.dataIndex] === 'ascend'
      })
      const caretDownClassName = classNames({
        'Activated': this.state.columnsSortConf[columnItem.dataIndex] === 'descend'
      })

      content = (
        <div className="Sortable-Wrapper">
          <div className="Content">
            {content}
          </div>
          <div className="Icons">
            <Icon className={caretUpClassName} style={{ marginBottom: -4 }} type="caret-up" />
            <Icon className={caretDownClassName} type="caret-down" />
          </div>
        </div>
      )
    }

    if(place === 'Middle' && columnItem.fixed === 'left') {
      content = ''
    }

    // when rowSecection prop available
    if(columnItem.internalUseOnly) {
      const { dataSource, rowSelection: { selectedRowKeys } } = this.props
      const checked = !!dataSource.length && selectedRowKeys.length === dataSource.length
      const indeterminate = checked ? false : selectedRowKeys.length ? true : false

      content = (
        <Checkbox
          disabled={!dataSource.length}
          checked={checked}
          indeterminate={indeterminate}
          onClick={ e => this.onCheckboxClick(-1, e) }
        />
      )
    } else {
      if(columnItem.render) {
        content = columnItem.render(content)
      }
    }

    return (
      <div
        className={classes}
        style={style}
        onClick={() => { this.onHeadCellClick(columnItem) }}
      >
        {content}
      </div>
    )
  }

  renderBottomCell = ({ place, columnIndex, rowIndex, style }) => {
    const { dataSource, striped, rowSelection } = this.props
    const columnItem = this.columnsConf[`${place}Columns`][columnIndex]
    const key = columnItem['dataIndex']
    let text = dataSource[rowIndex][key]
    let hasSelectedClassName = false

    if(rowSelection) {
      hasSelectedClassName = rowSelection.selectedRowKeys.some(i => i === rowIndex)
    }

    const styles = {
      ...style,
      lineHeight: `${columnItem.ellipsis ? this.rowHeight() - 1 : ''}px`
    }

    let classes = classNames(
      'Cell Cell-Body',
      striped ? rowIndex % 2 ? 'Cell-Even' : 'Cell-Odd' : '',
      {
        'Align-Center': columnItem['align'] === 'center',
        'Align-Right': columnItem['align'] === 'right',
        'Click-Highlight': this.state.clickedRowIndex === rowIndex,
        'Ellipsis': columnItem.ellipsis && !columnItem.toolTip,
        'Selected': hasSelectedClassName,
      }
    )

    let content = text
    
    if(place === 'middle' && columnItem.fixed === 'left') {
      content = ''
    } else {

      if(columnItem.render) {
        content = columnItem.render(content, dataSource[rowIndex], rowIndex)
        const backgroundColor = content.props.style && content.props.style['backgroundColor']
        if(backgroundColor) {
          styles.backgroundColor = backgroundColor
        }
      }

      let toolTip = typeof columnItem.toolTip === 'boolean' ? {} : columnItem.toolTip
      if(columnItem.ellipsis && toolTip) {
        content = (
          <Tooltip title={text} {...toolTip}>
            <div className="Ellipsis">
              {content}
            </div>
          </Tooltip>
        )
      }
    }

    return (
      <div
        className={classes}
        style={styles}
        data-row-index={rowIndex}
        onMouseEnter={() => { this.onRowMouseEnter(rowIndex) }}
        onMouseLeave={() => { this.onRowMouseLeave(rowIndex) }}
        onClick={() => { this.onRowClick(rowIndex) }}
        onDoubleClick={() => { this.onRowonDoubleClick(rowIndex) }}
        onContextMenu={() => { this.onRowContextMenu(rowIndex) }}
      >
        {content}
      </div>
    )
  }

  renderLeftTopCell = ({ columnIndex, rowIndex, style }) => {
    return this.renderTopCell({ place: 'Left', columnIndex, style })
  }

  renderLeftBottomCell = ({ columnIndex, rowIndex, style }) => {
    return this.renderBottomCell({ place: 'left', columnIndex, rowIndex, style })
  }

  renderMiddleTopCell = ({ columnIndex, rowIndex, style }) => {
    return this.renderTopCell({ place: 'Middle', columnIndex, style })
  }

  renderMiddleBottomCell = ({ columnIndex, rowIndex, style }) => {
    return this.renderBottomCell({ place: 'middle', columnIndex, rowIndex, style })
  }

  renderRightTopCell = ({ columnIndex, rowIndex, style }) => {
    return this.renderTopCell({ place: 'Right', columnIndex, style })
  }

  renderRightBottomCell = ({ columnIndex, rowIndex, style }) => {
    return this.renderBottomCell({ place: 'right', columnIndex, rowIndex, style })
  }

  render() {
    const { className, rowHeadHeight, dataSource, bordered, placeholder, pagination } = this.props
    const rowCount = dataSource.length
    const showLeftShadow = rowCount && this.state.showLeftShadow
    const showRightShadow = rowCount && this.columnsConf.right && this.state.showRightShadow
    const paginationHeight = pagination ? pagination.height || 50 : 0
    // Need to minus wrapper element border
    const gap = bordered ? 2 : 0

    return (
      <div style={{ flex: 1 }}>
        <AutoSizer>
        {({height, width}) => {

          const diff = width - this.columnsConf.totalWidth - this.scrollbarSize - gap

          if (diff >= 0) {
            this.horizontalScrollbarSize = 0
          }

          let bodyHeight = height - rowHeadHeight - this.horizontalScrollbarSize - gap

          height = height - paginationHeight
          bodyHeight = bodyHeight - paginationHeight

          for (let i = 0; i < this.columnsConf.middleColumns.length; i++) {
            let item = this.columnsConf.middleColumns[i]
            
            if (item.width === 0) {
              if (diff >= 0) {
                item.width = diff
              } else {
                item.width = defaultColumnWidth
              }

              break
            }
          }
          
          return (
            <div
              ref={this.containerRef}
              className={classNames(classPrefix, className, { Bordered: bordered })}
              style={{ width, height }}
            >
              {/* placeholder when no data */}
              {
                !dataSource.length &&
                <div
                  className="Placeholder"
                  style={{
                    height: height - rowHeadHeight - 2,
                    top: rowHeadHeight
                  }}
                >
                  {placeholder}
                </div>
              }
              <div className="Grids-Wrapper" style={{ height }}>
                <div
                  className={classNames(
                    'Left-Grid-Wrapper',
                    { 'With-Shadow': showLeftShadow }
                  )}
                >
                  <div
                    className={classNames(
                      'Left-Top-Grid-Wrapper',
                      { 'With-Shadow': !dataSource.length }
                    )}
                    style={{ height: rowHeadHeight }}>
                    <Grid
                      className={classNames('Left-Top-Grid')}
                      columnCount={this.columnsConf.headLeft}
                      columnWidth={index => this.columnsConf.headLeftColumns[index].width}
                      height={rowHeadHeight + this.scrollbarSize}
                      rowCount={1}
                      rowHeight={this.rowHeadHeight}
                      width={this.columnsConf.leftWidth}
                      ref={this.leftTopGridRef}
                    >
                      {this.renderLeftTopCell}
                    </Grid>
                  </div>
                  <div className="Left-Bottom-Grid-Wrapper" style={{ width: this.columnsConf.leftWidth }}>
                    <Grid
                      className={classNames('Left-Bottom-Grid')}
                      columnCount={this.columnsConf.left}
                      columnWidth={index => this.columnsConf.leftColumns[index].width}
                      height={bodyHeight}
                      rowCount={rowCount}
                      rowHeight={this.rowHeight}
                      width={this.columnsConf.leftWidth + this.scrollbarSize}
                      ref={this.leftBottomGridRef}
                      onScroll={this.onScrollLeftBottom}  
                    >
                      {this.renderLeftBottomCell}
                    </Grid>
                  </div>
                </div>

                <div
                  className="Middle-Grid-Wrapper"
                  style={{ height }}
                >
                  <div
                    className="Middle-Top-Grid-Wrapper"
                    style={{
                      width,
                      height: rowHeadHeight,
                    }}
                  >
                    <Grid
                      className={classNames('Middle-Top-Grid')}
                      style={{ paddingLeft: this.columnsConf.rightWidth }}
                      columnCount={this.columnsConf.headMiddleColumns.length}
                      columnWidth={index => this.columnsConf.headMiddleColumns[index].width}
                      height={rowHeadHeight + this.scrollbarSize}
                      rowCount={1}
                      rowHeight={this.rowHeadHeight}
                      width={width - this.scrollbarSize - 2}
                      ref={this.middleTopGridRef}
                      onScroll={this.onScrollMiddleTop}
                    >
                      {this.renderMiddleTopCell}
                    </Grid>
                  </div>
                  <div
                    className="Middle-Bottom-Grid-Wrapper"
                  >
                    <Grid
                      className={classNames('Middle-Bottom-Grid')}
                      style={{ paddingLeft: this.columnsConf.rightWidth, overflow: 'scroll' }}
                      columnCount={this.columnsConf.middleColumns.length}
                      columnWidth={index => this.columnsConf.middleColumns[index].width}
                      width={width - gap}
                      height={bodyHeight + (this.horizontalScrollbarSize || this.scrollbarSize) }
                      rowCount={rowCount}
                      rowHeight={this.rowHeight}
                      innerRef={this.middleBottomGridInnerRef}
                      ref={this.middleBottomGridRef}
                      onScroll={this.onScrollMiddleBottom}
                    >
                      {this.renderMiddleBottomCell}
                    </Grid>
                  </div>
                </div>

                {
                  this.columnsConf.right > 0 &&
                  <div
                    className={classNames(
                      'Right-Grid-Wrapper',
                      { 'With-Shadow': showRightShadow }
                    )}>
                    <div
                      className={classNames(
                        'Right-Top-Grid-Wrapper',
                        { 'With-Shadow': !dataSource.length }
                      )}
                      style={{
                        width: this.columnsConf.rightWidth + this.scrollbarSize,
                        height: rowHeadHeight
                      }}
                    >
                      <Grid
                        className={classNames('Right-Top-Grid')}
                        columnCount={this.columnsConf.headRight}
                        columnWidth={index => this.columnsConf.headRightColumns[index].width}
                        height={rowHeadHeight + this.scrollbarSize}
                        rowCount={1}
                        rowHeight={this.rowHeadHeight}
                        width={this.columnsConf.rightWidth}
                        ref={this.rightTopGridRef}
                        onScroll={this.onScrollRightTop}
                      >
                        {this.renderRightTopCell}
                      </Grid>
                    </div>
                    <div
                      className="Right-Bottom-Grid-Wrapper"
                      style={{
                        width: this.columnsConf.rightWidth + this.scrollbarSize,
                      }}
                    >
                      <Grid
                        className={classNames('Right-Bottom-Grid')}
                        columnCount={this.columnsConf.right}
                        columnWidth={index => this.columnsConf.rightColumns[index].width}
                        height={bodyHeight}
                        rowCount={rowCount}
                        rowHeight={this.rowHeight}
                        width={this.columnsConf.rightWidth + this.scrollbarSize}
                        ref={this.rightBottomGridRef}
                        onScroll={this.onScrollRightBottom}
                      >
                        {this.renderRightBottomCell}
                      </Grid>
                    </div>
                  </div>
                }

              </div>
              {
                pagination &&
                <div
                  className="Pagination-Wrapper"
                  style={{
                    height: paginationHeight,
                    ...pagination.wrapperStyle
                  }}
                >
                  <Pagination
                    {...pagination}
                    onChange={this.onPaginationChange}
                  />
                </div>
              }
            </div>
          )
        }}
      </AutoSizer>
      </div>
    )
  }

  showShadow = (horizontalScrollDirection, scrollLeft) => {
    // initialization
    if(horizontalScrollDirection === 'forward' && scrollLeft === 0) {
      return
    }

    // Fixed-Right Shadow
    if(this.columnsConf.right) {
      const elem = this.middleBottomGridRef.current
      const innerElem = this.middleBottomGridInnerRef.current
      const totalWidth = innerElem.clientWidth + innerElem.offsetLeft + scrollbarSize()

      if (totalWidth - elem.props.width - scrollLeft < 5) {
        if (this.state.showRightShadow) {
          this.setState({ showRightShadow: false })
        }
      } else {
        if (!this.state.showRightShadow) {
          this.setState({ showRightShadow: true })
        }
      }
    }

    // Fixed-Left Shadow
    if(this.columnsConf.left) {
      if (horizontalScrollDirection === 'backward' && scrollLeft < 5) {
        if (this.state.showLeftShadow) {
          this.setState({ showLeftShadow: false })
        }

      } else {
        if (!this.state.showLeftShadow) {
          this.setState({ showLeftShadow: true })
        }
      }
    }

  }

  onHeadCellClick = column => {
    const { multipleSort } = this.props

    if(column.sort) {
      let columnsSortConf = {...this.state.columnsSortConf}
      let dataIndex = column['dataIndex']
      let val = columnsSortConf[dataIndex]

      if(multipleSort) {
        if(val === 'ascend') {
          val = 'descend'
        } else if (val === 'descend') {
          val = ''
        } else {
          val = 'ascend'
        }
  
      } else {
        for(let key in columnsSortConf) {
          if(key === dataIndex) {
            if(val === 'ascend') {
              val = 'descend'
            } else if (val === 'descend') {
              val = ''
            } else {
              val = 'ascend'
            }
  
          } else {
            columnsSortConf[key] = ''
          }
        }
      }

      columnsSortConf[dataIndex] = val
      this.setState({ columnsSortConf }, () => {
        let sortFields = {}
        for(let key in columnsSortConf) {
          if(columnsSortConf[key]) {
            sortFields[key] = columnsSortConf[key]
          }
        }
        column.sort.handle(sortFields)
      })
    }
  }

  onRowMouseEnter = (rowIndex, event) => {
    this.containerRef.current
      .querySelectorAll(`[data-row-index="${rowIndex}"]`)
      .forEach(el => el.classList.add('Highlight'))
    
    this.handleEvent('onMouseEnter', rowIndex, event)
  }

  onRowMouseLeave = (rowIndex, event) => {
    this.containerRef.current
      .querySelectorAll(`[data-row-index="${rowIndex}"]`)
      .forEach(el => el.classList.remove('Highlight'))

    this.handleEvent('onMouseLeave', rowIndex, event)
  }

  onRowClick = (rowIndex, event) => {
    this.highlightAfterClick(rowIndex)
    this.handleEvent('onClick', rowIndex, event)
  }

  onRowonDoubleClick = (rowIndex, event) => {
    this.handleEvent('onDoubleClick', rowIndex, event)
  }

  onRowContextMenu = (rowIndex, event) => {
    this.handleEvent('onContextMenu', rowIndex, event)
  }

  handleEvent = (type, rowIndex, event) => {
    const { onRow, dataSource } = this.props

    if(onRow()[type]) {
      onRow(dataSource[rowIndex])[type](event)
    }
  }

  onPaginationChange = (page, pageSize) => {
    this.page = page
    this.props.pagination.onChange(page, pageSize)
  }

  onCheckboxClick = (rowIndex, event) => {
    event.stopPropagation()

    const checked = event.target.checked
    const { dataSource } = this.props
    const { selectedRowKeys, onChange, onSelect, onSelectAll, getCheckboxProps = noopReturnEmptyObject } = this.props.rowSelection

    let copySelectedRowKeys = [...selectedRowKeys]
    let changeRows = []
    let isCheckedAll = true

    if(rowIndex === -1) {
      dataSource.forEach((item, index) => {
        let exist = copySelectedRowKeys.some(i => i === index)
        let disabled = getCheckboxProps(item).disabled

        if(!disabled) {
          if(exist !== checked) {
            changeRows.push(item)
          }
  
          if(checked) {
            if(!exist) {
              isCheckedAll = false
              copySelectedRowKeys.push(index)
            }
          } else {
            if(exist) {
              let i = copySelectedRowKeys.indexOf(index)
              copySelectedRowKeys.splice(i, 1)
            }
          }
        }
      })

      if(isCheckedAll) {
        let tmp = []
        dataSource.forEach((item, index) => {
          let exist = copySelectedRowKeys.some(i => i === index)
          let disabled = getCheckboxProps(item).disabled

          if(exist && disabled) {
            tmp.push(index)
          }
        })

        copySelectedRowKeys = tmp
      }

      copySelectedRowKeys.sort((a, b) => a - b)
      onSelectAll && onSelectAll(checked, copySelectedRowKeys.map(key => dataSource[key]), changeRows)
    } else {

      if(checked) {
        if(copySelectedRowKeys.indexOf(rowIndex) === -1) {
          copySelectedRowKeys.push(rowIndex)
          copySelectedRowKeys.sort((a, b) => a - b)
        }
        
      } else {
        let index = copySelectedRowKeys.indexOf(rowIndex)
        copySelectedRowKeys.splice(index, 1)
      }

      onSelect && onSelect(dataSource[rowIndex], checked, copySelectedRowKeys, event.nativeEvent)
    }

    onChange && onChange(copySelectedRowKeys, copySelectedRowKeys.map(key => dataSource[key]))
  }

  highlightAfterClick = rowIndex => {
    const { clickHighlight } = this.props
    const { clickedRowIndex } = this.state
    const isColorValue = typeof clickHighlight === 'string'

    if(clickHighlight && rowIndex !== clickedRowIndex) {
      if(isColorValue && clickedRowIndex === -1) {
        this.containerRef.current.setAttribute('data-key', this.instanceKey)
        addStylesheetRules([
          [`[data-key="${this.instanceKey}"] .Cell-Body.Click-Highlight`,
            ['background-color', clickHighlight]
          ], 
        ])
      }

      this.setState({ clickedRowIndex: rowIndex })
    }
  }
}

// https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/insertRule
function addStylesheetRules(decls) {
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

function flatten(root) {
  let headColumns = [...root], contentColumns = []

  root.forEach((item, index) => {
    let ret = []
    if(item.children) {
      headColumns[index]['width'] = 0
      deep(item, ret)

      ret.forEach(el => {
        el.fixed = item.fixed
        headColumns[index]['width'] += el.width || defaultColumnWidth
      })
    } else {
      contentColumns.push(item)
    }

    contentColumns = contentColumns.concat(ret)
  })

  function deep(node, result) {
    node.children.forEach(child => {
      if(child.children) {
        deep(child, result)
      } else {
        result.push(child)
      }
    })
  }

  return { headColumns,  contentColumns }
}

