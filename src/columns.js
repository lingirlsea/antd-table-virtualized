//
//
import React from 'react'

const columns = [
  {
    fixed: 'left',
    width: 100,
    title: '序号',
    dataIndex: 'index',
  },
  {
    fixed: 'left',
    width: 100,
    title: '姓名',
    dataIndex: 'name',
    // ellipsis: true,
    // toolTip: {
    //   placement: 'right'
    // },
    render: (text, record, index) => {
      return (
        <div style={{ backgroundColor: index === 2 ? 'lightblue' : '' }}>
          {text}
        </div>
      )
    }
  },
  {
    fixed: 'left',
    width: 60,
    title: '身高',
    dataIndex: 'height',
    ellipsis: true,
    toolTip: true,
  },

  {
    fixed: 'right', 
    width: 100,
    title: '操作',
    dataIndex: 'handle',
  },
  {
    fixed: 'right',
    width: 100,
    title: '备注',
    dataIndex: 'remarks',
  },  
]


Array.from({ length: 20 }).forEach((_, index) => {
  columns.push({
    title: `标题${index + 1}`,
    width: 100,
    dataIndex: 'title'
  })
})

export default columns