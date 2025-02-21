# scss笔记

## 变量

### 变量声明
```
$highlight-color: #F90;
```
### 变量引用
```
$highlight-color: #F90;
.selected {
  border: 1px solid $highlight-color;
}

//编译后

.selected {
  border: 1px solid #F90;
}
```

### 变量名用中划线
```
$highlight-color: #F90;
```

## 嵌套css规则

```
#content {
  article {
    h1 { color: #333 }
    p { margin-bottom: 1.4em }
  }
  aside { background-color: #EEE }
}
```

## 父选择器的标识符&;
```
article a {
  color: blue;
  &:hover { color: red }
}
```

## 群组选择器的嵌套
```
.container {
  h1, h2, h3 {margin-bottom: .8em}
}
```

## 子组合选择器和同层组合选择器：>、+和~;
```
article {
  ~ article { border-top: 1px dashed #ccc }
  > section { background: #eee }
  dl > {
    dt { color: #333 }
    dd { color: #555 }
  }
  nav + & { margin-top: 0 }
}
```

## 嵌套属性
```
nav {
  border-style: solid;
  border-width: 1px;
  border-color: #ccc;
}

nav {
  border: 1px solid #ccc;
  border-left: 0px;
  border-right: 0px;
}

```

## 导入sass文件 @import

### 嵌套导入
```
.blue-theme {@import "blue-theme"}

//生成的结果跟你直接在.blue-theme选择器内写_blue-theme.scss文件的内容完全一样。

.blue-theme {
  aside {
    background: blue;
    color: #fff;
  }
}
```

## 静默注释
```
body {
  color: #333; // 这种注释内容不会出现在生成的css文件中
  padding: 0; /* 这种注释内容会出现在生成的css文件中 */
}
```

## 混合器
如果你发现自己在不停地重复一段样式，那就应该把这段样式结构造成优良的混合器。
```
@mixin rounded-corners{
    border-radius:5px;
}

notice{
    background-color:green;
    border:2px solid #00aa00;
    @include rounded-corners;
}

//最终生成
.notice {
  background-color: green;
  border: 2px solid #00aa00;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}
```

### 5-2. 混合器中的CSS规则;
```
@mixin no-bullets {
  list-style: none;
  li {
    list-style-image: none;
    list-style-type: none;
    margin-left: 0px;
  }
}

```

### 给混合器传参
```
@mixin link-colors($normal, $hover, $visited) {
  color: $normal;
  &:hover { color: $hover; }
  &:visited { color: $visited; }
}
```

## 使用选择器继承来精简CSS;
```
//通过选择器继承继承样式
.error {
  border: 1px solid red;
  background-color: #fdd;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
```

## 数据类型
* 数字
* 字符串
* 颜色
* 布尔值
* 空值
* 数组
* maps

## 运算
```
p {
  font: 10px/8px;             // Plain CSS, no division
  $width: 1000px;
  width: $width/2;            // Uses a variable, does division
  width: round(1.5)/2;        // Uses a function, does division
  height: (500px/2);          // Uses parentheses, does division
  margin-left: 5px + 8px/2px; // Uses +, does division
}
```

## 插入语句
```
$name: foo;
$attr: border;
p.#{$name} {
  #{$attr}-color: blue;
}

编译成：
p.foo {
  border-color: blue; }

```

## 控制指令

### if 
```
p {
  @if 1 + 1 == 2 { border: 1px solid; }
  @if 5 < 3 { border: 2px dotted; }
  @if null  { border: 3px double; }
}
```

### for
```
@for $i from 1 through 3 {
  .item-#{$i} { width: 2em * $i; }
}
```

### @each
```
@each $animal in puma, sea-slug, egret, salamander {
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
  }
}
```

### @while
```
$i: 6;
@while $i > 0 {
  .item-#{$i} { width: 2em * $i; }
  $i: $i - 2;
}
```

### 函数指令
```
$grid-width: 40px;
$gutter-width: 10px;

@function grid-width($n) {
  @return $n * $grid-width + ($n - 1) * $gutter-width;
}

```

## sass 什么情况下使用混合指令、什么情况下使用继承、什么情况下使用函数
```
在 Sass 中，混合指令（@mixin）、继承（@extend）和函数（@function）是三种强大的工具，它们各自有不同的使用场景和特点。以下是它们的适用场景和建议：
1. 混合指令（@mixin）
混合指令适用于需要复用小块样式或需要灵活传递参数的场景。以下是具体使用场景：
通用样式组件：当需要复用一些通用的样式模式（如按钮、阴影、圆角等）时，混合指令非常合适。例如，定义一个按钮的混合指令，可以传入不同的颜色和尺寸参数：
scss
复制
@mixin button($color, $background-color) {
  color: $color;
  background-color: $background-color;
  padding: 10px 20px;
  border-radius: 5px;
}
参数化样式：混合指令支持参数传递和默认值，适合需要根据不同需求定制样式的场景。
动态样式：通过参数和条件语句，混合指令可以生成动态的样式，例如响应式设计中的不同断点样式。
2. 继承（@extend）
继承适用于需要复用大块样式或需要保持样式一致性的场景。以下是具体使用场景：
共享通用样式：当多个元素需要共享相同的样式时，继承可以减少冗余代码。例如，定义一个基础按钮样式，其他按钮样式可以继承它并添加额外的样式：
scss
复制
.base-button {
  padding: 10px;
  border-radius: 5px;
}
.primary-button {
  @extend .base-button;
  background-color: blue;
  color: white;
}
保持一致性：通过继承，可以确保多个元素的样式保持一致，同时方便维护。
减少 CSS 文件大小：继承可以有效减少生成的 CSS 代码量。
3. 函数（@function）
函数适用于需要进行复杂计算或值转换的场景。以下是具体使用场景：
数学计算：函数可以用于执行复杂的数学运算，例如计算宽度、间距等。
scss
复制
@function calculate-width($base, $multiplier) {
  @return $base * $multiplier;
}
颜色操作：函数可以用于颜色的调整，例如改变颜色的透明度或亮度。
动态值生成：函数可以生成动态的值，例如根据变量生成不同的样式值。
总结
混合指令：适用于需要复用小块样式或需要灵活传递参数的场景。
继承：适用于需要复用大块样式或保持样式一致性的场景。
函数：适用于需要进行复杂计算或值转换的场景。
在实际开发中，可以根据具体需求选择合适的工具，以提高代码的可维护性和可读性。
```


