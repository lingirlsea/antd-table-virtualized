import React from 'react'
import Axios from "axios"
import AntdTableVirtulized from './AntdTableVirtualized'
import { Table } from 'antd'
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

  getData = (current = 1, size = 10) => {
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
      getCheckboxProps: record => ({
        disabled: record.index === 1,
        // checked: record.index === 1,
      }),
      onChange: (selectedRowKeys, selectedRows) => {
        // console.log(selectedRowKeys, selectedRows)
        this.setState({ selectedRowKeys })
      },
      onSelect: (record, selected, selectedRows, nativeEvent) => {

      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows)
      }
    }

    const pagination = {
      total: 1000,
      // wrapperStyle: {},
      // height: 60,
      showTotal: total => `共 ${total} 条`,
      showSizeChanger: true,
      showQuickJumper: true,
      onChange: this.onChange,
      onShowSizeChange: this.onShowSizeChange,
    }

    return (
      <div className="App">
        {/* <button onClick={() => {document.querySelector('button').style.display = 'none' }}>按钮</button> */}
        <AntdTableVirtulized
          striped
          bordered
          clickHighlight
          // multipleSort
          columns={columns}
          dataSource={this.state.dataSource}
          rowHeight={40}
          onRow={record => {
            return {
              onClick: event => {
                console.log(record) 
              },
              onDoubleClick: event => {},
              onContextMenu: event => {},
              onMouseEnter: event => {},
              onMouseLeave: event => {},
            }
          }}
          rowSelection={rowSelection}
          // pagination={false}
          pagination={pagination}
          placeholder={
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: '#ccc',
            }}>
              暂无数据
            </div>
          }
        />

        {/* <Table
          columns={columns}
          dataSource={this.state.dataSource}
          rowSelection={rowSelection}
          scroll={{y: 200}}
        /> */}
      </div>
    )
  }
  
}

export default App;
