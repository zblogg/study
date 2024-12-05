# 变换

| 变换                            | 描述                             |
| ------------------------------- | -------------------------------- |
| translate(x, y)                 | 移动坐标系统,未指定Y则Y为0       |
| scale(xFactor, yFactor)         | 坐标系统缩放                     |
| scale(factor)                   | 和scale(factor, factor相同)      |
| rotate(angle)                   | 按照0,0旋转angle角度             |
| rotate(angle, centerX, centerY) | 按照centerX,centerY旋转angle角度 |
| skewX(angle)                    | 按照指定angle倾斜所有x坐标       |
| skewY(angle)                    | 按照指定angle倾斜所有y坐标       |
| matrix(a b c d e f)             | 指定六个值得变换矩阵             |