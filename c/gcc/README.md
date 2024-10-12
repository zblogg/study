## gcc编译参数

官方网址：https://gcc.gnu.org/onlinedocs/gcc/Option-Summary.html

```bash
gcc --help
```

### 输出选项

示例（以输入文件hello.c为例）：  

1. `gcc hello.c`  
输出默认的可执行文件：`a.out`

2. `gcc -E hello.c > hello.i`  
输出预处理文件`hello.i`

3. `gcc -S hello.c`  
输出汇编文件`hello.s`

4. `gcc -c hello.c`  
输出object文件`hello.o`

5. `gcc -o hello hello.c`  
输出可执行文件`hello`。（hello.c可以是中间文件，hello.s、hello.o等）