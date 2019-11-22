import React from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { VariableSizeGrid as Grid } from 'react-window'
import scrollbarSize from 'dom-helpers/scrollbarSize'
import classNames from 'classnames'
import { Tooltip, Checkbox } from 'antd'

import columns from './columns'
import './AntdTableVirtualized.scss'

const classPrefix = 'Ant-Table-Virtualized'

export default class AntTableVirtualized extends React.Component {

  static defaultProps = {
    rowHeight: 40,
    rowHeadHeight: 40,
    clickHighlight: false,
    onRow: () => ({})
  }

  constructor(props) {
    super(props)

    this.state = {
      showLeftShadow: false,
      showRightShadow: true,
    }

    this.containerRef = React.createRef()

    this.leftTopGridRef = React.createRef()
    this.leftBottomGridRef = React.createRef()

    this.middleTopGridRef = React.createRef()
    this.middleBottomGridRef = React.createRef()
    this.middleBottomGridInnerRef = React.createRef()

    this.rightTopGridRef = React.createRef()
    this.rightBottomGridRef = React.createRef()

    this.columnsConf = this.columnsConf()
    this.clickedRowIndex = -1

    // horizontal scrollbar size
    this.horizontalScrollbarSize = scrollbarSize()
    this.scrollbarSize = scrollbarSize()
  }

  columnsConf = () => {
    const { rowSelection } = this.props
    const _columns = [...columns]

    let ret = {
      left: 0,
      right: 0,

      leftWidth: 0,
      rightWidth: 0,
      totalWidth: 0,

      leftColumns: [],
      middleColumns: [],
      rightColumns: [],
    }

    if(rowSelection) {
      const checkColumn = {
        internalUseOnly: true,
        width: rowSelection.columnWidth || 48,
        fixed: rowSelection.fixed || 'left',
        render: (text, record, index) => {
          const { rowSelection } = this.props
          const selectedRowKeys = rowSelection.selectedRowKeys

          if(!selectedRowKeys) {
            throw Error(`selectedRowKeys should be Array in rowSelection prop`)
          }

          let checked = selectedRowKeys.some(i => i === index)

          return (
            <Checkbox
              checked={checked}
              onClick={ e => this.onCheckboxClick(index, e) }
            />
          )
        }
      }

      if(checkColumn.fixed === 'left') {
        _columns.unshift(checkColumn)

      } else {
        _columns.push(checkColumn)
      }

    }

    _columns.forEach(item => {
      if (!item.hasOwnProperty('width')) {
        item.width = 0
      }

      ret.totalWidth += item.width

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

  onScrollRightBottom = ({ scrollLeft, scrollTop }) => {
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
    const classes = classNames('Cell Cell-Head')
    const columnItem = this.columnsConf[`${place}Columns`][columnIndex]
    let content = columnItem['title']

    if(place === 'middle' && columnItem.fixed === 'left') {
      content = ''
    }

    // when rowSecection prop avaiable
    if(columnItem.internalUseOnly) {

      const { dataSource, rowSelection: { selectedRowKeys } } = this.props
      const checked = selectedRowKeys.length === dataSource.length
      const indeterminate = checked ? false : selectedRowKeys.length ? true : false

      content = (
        <Checkbox
          checked={checked}
          indeterminate={indeterminate}
          onClick={ e => this.onCheckboxClick(-1, e) }
        />
      )
    }

    return (
      <div className={classes} style={style}>
        {content}
      </div>
    )
  }

  renderBottomCell = ({ place, columnIndex, rowIndex, style }) => {
    const { dataSource, striped } = this.props
    const columnItem = this.columnsConf[`${place}Columns`][columnIndex]
    const key = columnItem['dataIndex']
    let content = dataSource[rowIndex][key]

    const styles = {
      ...style,
      lineHeight: `${columnItem.ellipsis ? this.rowHeight() - 1 : ''}px`
    }

    let classes = classNames(
      'Cell Cell-Body',
      striped ? rowIndex % 2 ? 'Cell-Even' : 'Cell-Odd' : '',
      {
        'Click-Highlight': this.clickedRowIndex === rowIndex,
        Ellipsis: columnItem.ellipsis && !columnItem.toolTip
      }
    )
    
    if(place === 'middle' && columnItem.fixed === 'left') {
      content = ''
    } else {

      if(columnItem.render) {
        content = columnItem.render(content, dataSource[rowIndex], rowIndex)
        const backgroundColor = content.props.style && content.props.style['backgroundColor']
        if(backgroundColor) {
          styles.backgroundColor = backgroundColor
        }
      } else {

        let toolTip = typeof columnItem.toolTip === 'boolean' ? {} : columnItem.toolTip
        if(columnItem.ellipsis && toolTip) {
          content = (
            <Tooltip title={content} {...toolTip}>
              <div className="Ellipsis">
                {content}
              </div>
            </Tooltip>
          )
        }
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
    return this.renderTopCell({ place: 'left', columnIndex, style })
  }

  renderLeftBottomCell = ({ columnIndex, rowIndex, style }) => {
    return this.renderBottomCell({ place: 'left', columnIndex, rowIndex, style })
  }

  renderMiddleTopCell = ({ columnIndex, rowIndex, style }) => {
    return this.renderTopCell({ place: 'middle', columnIndex, style })
  }

  renderMiddleBottomCell = ({ columnIndex, rowIndex, style }) => {
    return this.renderBottomCell({ place: 'middle', columnIndex, rowIndex, style })
  }

  renderRightTopCell = ({ columnIndex, rowIndex, style }) => {
    return this.renderTopCell({ place: 'right', columnIndex, style })
  }

  renderRightBottomCell = ({ columnIndex, rowIndex, style }) => {
    return this.renderBottomCell({ place: 'right', columnIndex, rowIndex, style })
  }

  render() {
    const { rowHeadHeight, dataSource, bordered } = this.props
    const rowCount = dataSource.length

    return (
      <div style={{ flex: 1 }}>
        <AutoSizer>
        {({height, width}) => {

          const diff = width - this.columnsConf.totalWidth - this.scrollbarSize

          if (diff >= 0) {            
            this.horizontalScrollbarSize = 0
          }

          const bodyHeight = height - rowHeadHeight - this.scrollbarSize - this.horizontalScrollbarSize

          for (let i = 0; i < this.columnsConf.middleColumns.length; i++) {
            let item = this.columnsConf.middleColumns[i]
            
            if (item.width === 0) {
              if (diff >= 0) {
                item.width = diff
              } else {
                item.width = 200
              }

              break
            }
          }
          
          return (
            <div
              ref={this.containerRef}
              className={classNames(classPrefix, { Bordered: bordered })}
              style={{ width, height: height - this.scrollbarSize }}
            >
              <div
                className={classNames(
                  'Left-Grid-Wrapper',
                  { 'With-Shadow': this.state.showLeftShadow }
                )}
                style={{ height: height - this.scrollbarSize }}
              >
                <div
                  className="Left-Top-Grid-Wrapper"
                  style={{ height: rowHeadHeight }}>
                  <Grid
                    className={classNames('Left-Top-Grid')}
                    columnCount={this.columnsConf.left}
                    columnWidth={index => this.columnsConf.leftColumns[index].width}
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
                style={{ height: height - this.scrollbarSize }}
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
                    columnCount={this.columnsConf.middleColumns.length}
                    columnWidth={index => this.columnsConf.middleColumns[index].width}
                    height={rowHeadHeight + this.scrollbarSize}
                    rowCount={1}
                    rowHeight={this.rowHeadHeight}
                    width={width - this.scrollbarSize}
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
                    style={{ paddingLeft: this.columnsConf.rightWidth }}
                    columnCount={this.columnsConf.middleColumns.length}
                    columnWidth={index => this.columnsConf.middleColumns[index].width}
                    width={width}
                    height={bodyHeight + this.horizontalScrollbarSize}
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

              <div
                style={{ height: height - this.scrollbarSize }}
                className={classNames(
                  'Right-Grid-Wrapper',
                  { 'With-Shadow': this.columnsConf.right && this.state.showRightShadow }
                )}>
                <div
                  className="Right-Top-Grid-Wrapper"
                  style={{
                    width: this.columnsConf.rightWidth + this.scrollbarSize,
                    height: rowHeadHeight
                  }}
                >
                  <Grid
                    className={classNames('Right-Top-Grid')}
                    columnCount={this.columnsConf.right}
                    columnWidth={index => this.columnsConf.rightColumns[index].width}
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
                    width: this.columnsConf.rightWidth + this.scrollbarSize
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

    // // Fixed-Left Shadow
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

  onCheckboxClick = (rowIndex, event) => {
    event.stopPropagation()

    const checked = event.target.checked
    const { dataSource } = this.props
    const { selectedRowKeys, onChange, onSelect, onSelectAll } = this.props.rowSelection

    let copySelectedRowKeys = [...selectedRowKeys]
    let selectedRows = []
    let changeRows = []

    if(rowIndex === -1) {
      let _selectedRows = []
      let _selectedRowKeys = []

      dataSource.forEach((item, index) => {
        if(copySelectedRowKeys.some(i => i === index)) {
          changeRows.push(item)
        }
        _selectedRows.push(item)
        _selectedRowKeys.push(index)
      })

      selectedRows = checked ? _selectedRows : []
      copySelectedRowKeys = checked ? _selectedRowKeys : []

      onSelectAll && onSelectAll(checked, selectedRows, changeRows)
      // console.log(this.leftBottomGridRef.current.resetAfterRowIndex(0))
    } else {

      if(checked) {
        copySelectedRowKeys.push(rowIndex)
        copySelectedRowKeys.sort((a, b) => a - b)
  
      } else {
        let index = copySelectedRowKeys.findIndex(index => index === rowIndex)
        copySelectedRowKeys.splice(index, 1)
      }

      copySelectedRowKeys.forEach(index => selectedRows.push(dataSource[index]))

      onSelect && onSelect(dataSource[rowIndex], checked, copySelectedRowKeys, event.nativeEvent)
    }

    onChange && onChange(copySelectedRowKeys, selectedRows)
  }

  highlightAfterClick = rowIndex => {
    if(this.props.clickHighlight && rowIndex !== this.clickedRowIndex) {
      this.containerRef.current
        .querySelectorAll('.Click-Highlight')
        .forEach(el => el.classList.remove('Click-Highlight'))

      this.containerRef.current
        .querySelectorAll(`[data-row-index="${rowIndex}"]`)
        .forEach(el => el.classList.add('Click-Highlight'))
    }

    this.clickedRowIndex = rowIndex
  }
}
