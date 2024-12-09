# Handbook

本手册基于typescript官网的指导手册：https://www.typescriptlang.org/docs/handbook/intro.html

修复`tsc xxx.ts`时的错误：
```
This is not the tsc command you are looking for
```

1. `npm uninstall -g typescript`
2. `npm install -g typescript`


TypeScript只关心结构和功能（是否拥有预期的属性）

type和interface
```
多数情况下，type和interface可以自由选择
```

1. type不能参与声明合并，interface可以
2. 接口只能声明object的形状，不能重命名基元（primitives）
3. 接口名称始终以原始形式显示在错误消息中
4. 对于编译器，带有extends的接口通常比带有交集的类型别名性能更高

## Narrowing
类型检查的紧缩（narrow）

typeof 类型守卫
真实性（Truthiness）紧缩
相等性（Equality）紧缩
in 操作紧缩
instanceof 紧缩
分配
控制流（Control flow analysis）分析
类型谓词
断言函数
联合类型

## 函数

### 泛型

编写良好泛型的准则

1. Push Type Parameters Down
2. Use Fewer Type Parameters

## Object

对象每个属性都可以指定以下几点：类型、属性是否可选、是否可写

