### 文档说明

这个插件设置了3个接口，其中俩个是可读的，一个是可以用来创建轮播的可执行命令；

- `node` -- 轮播容器DOM节点；
- `imgInfo` -- 轮播图片的详情
- `createNode` -- 创建轮播的命令接口
- `json`文件说明

```json
{
    "name": "imgGroup1",    //图片组名称
    "count": 9,     //图片数量
    "start": 3,     //起始图片标号
    "autoPlay": "left",     //自动播放方向
    "delay": 3000,      //自动轮播延时
    "width": 900,       //轮播图片宽度
    "height": 500,      //轮播图片高度
    "icon": {       //icon信息
        "width": 64,        //icon图片宽度
        "height": 64,       //icon图片高度
        "src_left": "img/icon/left-square.svg",     //iconLeft位置
        "src_right": "img/icon/right-square.svg"     //iconRight位置
    },
    "bullet": {     //轮播点击按钮信息
        "color": "#FF6666",     //按钮颜色
        "activeColor": "#006699",       //按钮点击颜色
        "width": 50,        //按钮宽度
        "height": 12,       //按钮高度
        "bottom": 10,       //按钮距离底部的距离
        "margin": 10        //按钮的间距
    },
    "value": [{     //轮播图片的信息
        "title": "css3",        //图片的title
        "src": "img/file/css3.svg",     //图片的位置
        "link": "#",        //点击图片跳转的地址
        "num": 1        //图片的标号
        },
        {...}
        ]
}
```
只暴露了这3个接口，创建多个只需要创建函数实例即可，
`new Carousel(node3, "imgGroup03");`
需要传入俩个参数
- 一个是轮播的容器DOM节点
- 另一个是要使用的`json`文件的图片组名称
- 可以在`json`中单独对每个轮播设置图片、按钮颜色、尺寸、轮播尺寸。
