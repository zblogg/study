## gcc编译参数

官方网址：https://gcc.gnu.org/onlinedocs/gcc/Option-Summary.html

```bash
gcc --help
```

### 输出选项

示例（以输入文件foo.c为例）：  

1. `gcc foo.c`  
输出默认的可执行文件：`a.out`

#### -E 

2. `gcc -E foo.c > foo.i`  
`-E` 输出预处理文件`foo.i`

#### -S

3. `gcc -S foo.c`  
`-S` 输出汇编文件`foo.s`

#### -c

4. `gcc -c foo.c`  
`-c` 输出object文件`foo.o`

5. `gcc -o foo foo.c`  
`-o` 输出可执行文件`foo`。（foo.c可以是中间文件，foo.s、foo.o等）

#### -dumpbase

6. `gcc -save-temps -S foo.c`  
`-save-temps` 输出中间文件`foo.i`和`foo.s`  

`gcc -save-temps -dumpbase save-foo -c foo.c`  
`-dumpbase` 指定中间文件前缀，生成`save-foo.i`、`save-foo.s`和目标文件`foo.o`  

`gcc foo.c -c -o out/foo.o -dumpbase alt/foo -dumpdir pfx- -save-temps=cwd`  
忽略`-dumpdir`参数，-dumpbase强制覆盖掉其  

`gcc foo.c bar.c -c -dumpbase main -save-temps`  
中间文件以main-前缀

`gcc -c foo.c -o out/foo.o -dumpbase '' -save-temps`  
中间文件为默认前缀

#### -dumpbase-ext *auxdropsuf*  

`gcc foo.c -c -o dir/foo.o -dumpbase x-foo.c -dumpbase-ext .c -save-temps`  
去除-dump-base的后缀  
输出：
> dir/x-foo.i  
> dir/x-foo.s

`gcc foo.c bar.c -o main.out -dumpbase-ext .out -save-temps`  
附加到dumppfx作为可执行后缀替代项  

`gcc -dumpdir dir/ -c foo.c -o obj/bar.o -save-temps`