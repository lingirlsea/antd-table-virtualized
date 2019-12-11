[![NPM registry](https://img.shields.io/npm/v/antd-table-virtualized.svg?style=for-the-badge&color=blue)](https://yarnpkg.com/en/package/antd-table-virtualized)[![NPM license](https://img.shields.io/badge/license-mit-red.svg?style=for-the-badge)](LICENSE.md)

## antd-table-virtualized
> React table components compatible with some antd table API

:warning: `This version is not stable yet, please do not use it in production environment`


## Install

```bash
# Yarn
yarn add antd-table-virtualized

# NPM
npm install --save antd-table-virtualized
```

## Usage

```jsx

import AntdTableVirtualized from 'antd-table-virtualized'

// Note: in order to autosize the table, you need to set the
//       wrapper element's style property `display` to `flex`.
//       Otherwise the view will be blank.

<div style={{ dispaly: 'flex' }}>
  <AntdTableVirtualized
    {/* props here */}
  />
  <div>
    {/* other code here */}
  </div>
</div>
```

Please refer to src/App.js for usage, feel free to contact me <lingirlsea@gmail.com> :heart:


## API

### AntdTableVirtualized 
|  Property   | Description  |  Type  |  Default  |  Version  |
|  ----   | ----  |  ----  |  ----    |  ----  |
| bordered | Whether to show all table borders | boolean | false |  |
| striped | Whether Table is striped | boolean | false |  |
| clickHighlight | Weather highlight the row after you clicked, support for custom color values | boolean \| string | false |  |
| rowHeight | Height for content row | number | 40 |  |
| rowHeadHeight | Height for head row | number | 40 |  |
| multipleSort | Multi-header sort, used with column `sort` | boolean | false |  |
| placeholder | To customize innerHTML when no data | ReactNode  | No Data |  |
| className | Table's className | string | - |  |
| columns | Columns of table | array | - |  |
| dataSource | Data record array to be displayed | array | - |  |
| pagination | Config of pagination.  You can ref table pagination config or full pagination [document](https://ant.design/components/pagination/), hide it by setting it to `false` | object | - |  |
| rowSelection | Row selection config | object | null |  |
| onRow | Set props on per row, [document](https://ant.design/components/table/#onRow-usage) | Function(record, index) | - |  |


pagination also support properties below

| Property | Description | Type | Default | Version |
| ---- | ---- | ---- | ---- | ---- |
| height | Pagination height | number | 50 |  |
| wrapperStyle | Wrapper element style for pagination | object | - |  |


### rowSelection
Properties for row selection.

| Property | Description | Type | Default | Version |
| ---- | ---- | ---- | ---- | ---- |
| columnWidth | Set the width of the selection column | number | 48 |  |
| getCheckboxProps |	Get Checkbox props | Function(record) | - |  |
| selectedRowKeys | Controlled selected row keys | number[] | [] |  |
| onChange | Callback executed when selected rows change | Function(selectedRowKeys, selectedRows) |  |  |
| onSelect | Callback executed when select/deselect one row | Function(selectedRowKeys, selectedRows) | - |  |
| onSelectAll | Callback executed when select/deselect all rows | Function(selected, selectedRows, changeRows) | - |  |



### Column
One of the Table columns prop for describing the table's columns, Column has the same API.

| Property | Description | Type | Default | Version |
| ---- | ---- | ---- | ---- | ---- |
| ellipsis | Ellipsize cell content | boolean | false |  |
| toolTip | A simple text popup tip, Used with `ellipsis`, [document](https://ant.design/components/tooltip/)  | boolean\|object | false |  |
| width | Width of this column | number | - |  |
| fixed |	Set column to be fixed: `true`(same as left) `'left'` `'right'` | boolean|string | - |  |
| sort |	Column sort, see example below | object | - |  |
| render | Renderer of the table cell. The return value should be a ReactNode | Function(text, record, index) {} | - |  |

```jsx
sort: {
  // 'ascend' | 'descend'
  defaultOrder: 'ascend',
  handle: (sortFields) => {
    console.log(sortFields)
  }
}
```


## Related libraries

* [`antd`](https://www.npmjs.com/package/antd): An enterprise-class UI design language and React UI library.
* [`react-window`](https://www.npmjs.com/package/react-window): React components for efficiently rendering large lists and tabular data.
* [`react-virtualized-auto-sizer`](https://npmjs.com/package/react-virtualized-auto-sizer): HOC that grows to fit all of the available space and passes the width and height values to its child.


## License

MIT
