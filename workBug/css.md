#### antd组件中Menu在窗口变化时菜单的折叠不适应

==问题复现==

![pic1](E:\soso\soso-note\assets\pic1.png)

==解决问题方案==

监听窗口的变化，然后设置导航的宽度，注意：menu一定要设置靠右，不然会默认居左。

==代码==

````react
useEffect(() => {
  window.addEventListener('resize', () => {
   setMystyle({
       width: 'calc(100% - 350px)',
   });
   setMystyle2({
       display: 'flex',
       justifyContent: 'right',
   });
  });
}, []);
//dom中渲染
<div className="right-btns" style={mystyle}>
    <Menu style={mystyle2}>
        ...
    </Menu>
</div>
````

