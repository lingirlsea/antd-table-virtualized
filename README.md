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

```js

import AntdTableVirtualized from 'antd-table-virtualized'

// Note: in order to autosize the table, you need to set the
//       wrapper element's style property `display` to `flex`.
//       Otherwise the view will be blank.

<div style={{ dispaly: 'flex' }}>
  <AntdTableVirtualized
    {/* props here */}
  />
</div>
```

Please refer to src/App.js for usage, feel free to contact me <lingirlsea@gmail.com> :heart:


## Related libraries

* [`antd`](https://www.npmjs.com/package/antd): An enterprise-class UI design language and React UI library.
* [`react-window`](https://www.npmjs.com/package/react-window): React components for efficiently rendering large lists and tabular data.
* [`react-virtualized-auto-sizer`](https://npmjs.com/package/react-virtualized-auto-sizer): HOC that grows to fit all of the available space and passes the width and height values to its child.


## License

MIT
