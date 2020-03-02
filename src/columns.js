import React from 'react'

const columns = [
  {
    fixed: 'left',
    width: 80,
    title: '序号',
    dataIndex: 'index',
    align: 'left',
    sort: {
      defaultOrder: 'ascend',
      handle: (sortConf) => {
        console.log(sortConf)
      }
    }
  },
  {
    fixed: 'left',
    width: 90,
    title: '姓名',
    dataIndex: 'name',
    align: 'center',
    sort: {
      defaultOrder: 'descend',
      handle: (sortConf) => {
        console.log(sortConf)
      }
    },
    ellipsis: true,
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
    title: '地址',
    children: [
      {
        title: '省',
        width: 90,
        dataIndex: 'province',
        align: 'center'
      },
      {
        title: '具体',
        children: [
          {
            title: '街道',
            width: 110,
            dataIndex: 'street',
            align: 'right',
          },
          {
            title: '小区',
            width: 120,
            dataIndex: 'zone',
            align: 'right',
          }
        ]
      },
    ],
  },
  // {
  //   // fixed: 'left',
  //   title: '地址',
  //   align: 'center',
  //   children: [
  //     {
  //       title: '省',
  //       width: 100,
  //       dataIndex: 'province',
  //       align: 'center'
  //     },
  //     {
  //       title: '具体1',
  //       children: [
  //         {
  //           title: '街道1',
  //           width: 100,
  //           dataIndex: 'street',
  //           align: 'right',
  //         },
  //         {
  //           title: '小区1',
  //           width: 100,
  //           dataIndex: 'zone',
  //           align: 'right',
  //         }
  //       ]
  //     },
  //   ],
  // },
]


Array.from({ length: 10 }).forEach((_, index) => {
  columns.push({
    title: `标题${index + 1}`,
    width: 100,
    // dataIndex: 'title-' + index
    dataIndex: 'title'
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