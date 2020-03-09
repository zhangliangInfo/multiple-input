Multiple Input
======
根据输入内容分词，实现多条件查询
### Purpose
***
由于项目中需要输入多个id进行批量查询，故开发了此组件；输入内容以逗号进行分词；
### Useage
***
Install: npm install multiple-input
```
<MultipleInput {...props} />
```
### Options
***
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| placeholder | 输入框占位文本 | string | '请输入' |
| inputReg | 输入内容的正则匹配 | regexp | - |
| selectMax | 最大输入条数 | number | - |
| onChange | 输入完成后的回调 | (value) => void | - |
| handleSelectedChange | 输入条数达到max的回调 | (isCeil) => void | - |