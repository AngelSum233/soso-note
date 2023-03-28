#### ag-grid整列填充下拉框显示有问题，屏蔽有些字段的填充

> 首先要清楚，ag表格的填充实现方式；它本质上是显示值的复制。也就是说在我们可编辑的列中，如果下拉读取后端的数据则是code码，显示的值则是使用`valueGetter`或者`cellRenderer`进行格式化。

##### 开始使用

`react`

``` react
// 省略了其他属性，请按照自己业务场景使用
<AgGridReact
  ...props
  enableRangeSelection={true} // allows copy / paste using cell ranges 允许复制，操作
  enableFillHandle={true} // enables the fill handle 填充属性
/>
```

`js`

````js
const gridOptions = {
  enableRangeSelection: true,
  enableFillHandle: true,
}
````

##### 实现功能

`react`

````react
const options = [
  { code: "1", label: "是" },
  { code: "0", label: "否" },
]
const columns = [
  {
    headerName: "是否直达",
    field: "isThrough",
    data: options,
    editable: true,
    cellEditor: SelectDropCellEditorForUser, // 自定义组件
    valueGetter: (params) => {
      return params.data.isThrough === "1" ? "是" : "否";
    },
    valueSetter: (params) => {
      params.data.isThrough = params.newValue;
      return true;
    },
  },
  {
    headerName: "到货地址",
    field: "arrivalAddr",
    editable: true,
  },
] 

<AgGridReact
  ...props
  columnDefs={columns}
  enableRangeSelection={true} // allows copy / paste using cell ranges 允许复制，操作
  enableFillHandle={true} // enables the fill handle 填充属性
  fillOperation={(params: any) => { 
    // 自定义填充规则
    let  =  params.column.colDef.field;
    // initialValues里面是选中的值
    if (field === "isThrough") {
      return params.initialValues.at(-1) === "是" ||
        params.initialValues.at(-1) === "1"
        ? "1"
        : "0";
    }
    // 不能进行填充的列
    if (field === "arrivalAddr") {
      return params.currentCellValue;
    }
    // 原本的规则
    return params.values[params.values.length - 1];
  }}
/>
````



