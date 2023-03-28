### 声明响应式状态

不管是vue2还是vue3生命周期以及声明响应式的方式都没有改变，都是通过 `data`选项来声明响应式状态。Vue将在创建组件新实例的时候调用此函数，并将函数返回的对象用响应式系统进行包装。

```vue
export default {
  data() {
    return {
      count: 1
    }
  },

  // `mounted` 是生命周期钩子，之后我们会讲到
  mounted() {
    // `this` 指向当前组件实例
    console.log(this.count) // => 1

    // 数据属性也可以被更改
    this.count = 2

  }
}
```

