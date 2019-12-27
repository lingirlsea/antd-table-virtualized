import React from 'react'

const columns = [
  {
    fixed: 'left',
    width: 100,
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
    width: 150,
    title: '姓名',
    dataIndex: 'name',
    align: 'center',
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
    // fixed: 'left',
    title: '地址',
    align: 'center',
    children: [
      {
        title: '省',
        width: 100,
        dataIndex: 'province',
        align: 'center'
      },
      {
        title: '具体1',
        children: [
          {
            title: '街道1',
            width: 100,
            dataIndex: 'street',
            align: 'right',
          },
          {
            title: '小区1',
            width: 100,
            dataIndex: 'zone',
            align: 'right',
          }
        ]
      },
    ],
    render: function() {
      return (
        <div style={{
          width: 'calc(100% + 20px)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          margin: '0 -10px',
        }}
      >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 40,
              borderBottom: '1px solid #e8e8e8',
            }}
          >地址</div>
          <div
            style={{
              flex: 1,
              display: 'flex',
              // alignItems: 'center',
              // justifyContent: 'center',
            }}>
            <div
              style={{
                width: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRight: '1px solid #e8e8e8',
              }}
            >省</div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 40,
                  borderBottom: '1px solid #e8e8e8',
                }}
              >
                具体1
              </div>
              <div style={{ flex: 1, display: 'flex' }}>
                <div
                  style={{
                    width: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRight: '1px solid #e8e8e8',
                  }}
                >街道1</div>
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >小区1</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
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