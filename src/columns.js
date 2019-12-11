import React from 'react'

const columns = [
  {
    fixed: true,
    // fixed: 'left',
    width: 100,
    title: '序号',
    dataIndex: 'index',
    sort: {
      defaultOrder: 'ascend',
      handle: (sortConf) => {
        console.log(sortConf)
      }
    }
  },
  {
    fixed: 'left',
    width: 150,
    title: '姓名',
    dataIndex: 'name',
    sort: {
      defaultOrder: 'descend',
      handle: (sortConf) => {
        console.log(sortConf)
      }
    },
    // ellipsis: true,
    toolTip: {
      placement: 'right'
    },
    render: (text, record, index) => {
      return (
        <div style={{ backgroundColor: index === 2 ? 'lightgreen' : '' }}>
          {text}
        </div>
      )
    }
  },
  {
    fixed: 'left',
    width: 100,
    title: '身高',  
    dataIndex: 'height',
    // ellipsis: true,
    toolTip: true,
  },
]


Array.from({ length: 10 }).forEach((_, index) => {
  columns.push({
    title: `标题${index + 1}`,
    width: 100,
    dataIndex: 'title-' + index
  })
})

columns.push(
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
)

export default columns