import React from 'react'
import AntdTableVirtulized from './AntdTableVirtualized'
import data from './data'
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedRowKeys: [0]
    }
  }
  render() {
    const rowSelection = {
      // columnWidth: 100,
      // fixed: 'left',
      selectedRowKeys: this.state.selectedRowKeys,
      getCheckboxProps: record => ({
        // disabled: record.name === 'Disabled User',
        // name: record.name,
      }),
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(selectedRowKeys, selectedRows)
        this.setState({ selectedRowKeys })
      },
      onSelect: (record, selected, selectedRows, nativeEvent) => {

      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        // console.log(selected, selectedRows, changeRows)
      }
    }

    return (
      <div className="App">
        <button onClick={() => {document.querySelector('button').style.display = 'none' }}>按钮</button>
        <AntdTableVirtulized
          striped
          bordered
          clickHighlight
          dataSource={data}
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
        />
      </div>
    )
  }
  
}

export default App;
