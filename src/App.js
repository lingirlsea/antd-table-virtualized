import React from 'react'
import Axios from 'axios'
import AntdTableVirtulized from './AntdTableVirtualized/AntdTableVirtualized'
// import { Table } from 'antd'
import columns from './columns'
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      dataSource: [],
      selectedRowKeys: []
    }
  }

  componentDidMount() {
    this.onChange()
  }

  onChange = (page, pageSize) => {
    this.getData(page, pageSize)
  }

  onShowSizeChange = (current, size) => {
    this.getData(current, size)
  }

  getData = (current = 1, size = 4) => {
    Axios
      .post('http://127.0.0.1:8360/index/getData', { current, size })
      .then(rs => {
        if(rs.status === 200) {
          this.setState({ dataSource: rs.data.data })
        }
      })
  }

  render() {
    const rowSelection = {
      // columnWidth: 100,
      // fixed: 'left',
      selectedRowKeys: this.state.selectedRowKeys,
      getCheckboxProps: record => {
        return {
          disabled: record.index === 1,
        }
      },
      onChange: (selectedRowKeys, selectedRows) => {
        // console.log(selectedRowKeys, selectedRows)
        this.setState({ selectedRowKeys })
      },
      onSelect: (record, selected, selectedRows, nativeEvent) => {
        // console.log('--')
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        // console.log(selected, selectedRows, changeRows)
      }
    }

    const pagination = {
      total: 1000,
      wrapperStyle: { color: 'red' },
      height: 60,
      showTotal: total => `共 ${total} 条`,
      showSizeChanger: true,
      showQuickJumper: true,
      onChange: this.onChange,
      onShowSizeChange: this.onShowSizeChange,
    }

    return (
      <div className="App">
        <AntdTableVirtulized
          striped
          bordered
          // clickHighlight
          // clickHighlight="red"
          multipleSort
          className="MyClassName"
          columns={columns}
          dataSource={this.state.dataSource}
          rowHeight={40}
          rowHeadHeight={30}
          onRow={record => {
            return {
              onClick: event => {
                console.log(record)
              },
              onDoubleClick: event => {
                console.log('dblclick')
              },
              onContextMenu: event => {
                console.log('right click')
              },
              onMouseEnter: event => {
                // console.log('mouse enter')
              },
              onMouseLeave: event => {
                // console.log('mouse leave')
              },
            }
          }}
          rowSelection={rowSelection}
          pagination={pagination}
        />

        {/* <Table
          bordered
          size="middle"
          columns={columns}
          dataSource={this.state.dataSource}
          rowSelection={rowSelection}
          scroll={{x: 1000, y: 300}}
          rowKey="index"
        /> */}
      </div>
    )
  }

}

export default App;
