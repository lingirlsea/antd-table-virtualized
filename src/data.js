const data = []

Array.from({ length: 13 }).forEach((item, index) => {
  data.push({
    index: index + 1,
    name: '安德森安',
    height: '180180180180180180180',
    handle: '编辑',
    remarks: `备注-${index + 1}`,
    title: `内容${index + 1}`
  })
})

export default data