#include <stdlib.h>
#include <stdio.h>
#include <string.h>

int main() {
    FILE *read_fp;
    char buffer[BUFSIZ + 1];
    int chars_read;
    // 分配内存
    memset(buffer, '\0', sizeof(buffer));
    // 打开进程
    read_fp = popen("ls -la", "r");
    if (read_fp != NULL) {
        // 读取进程输出
        chars_read = fread(buffer, sizeof(char), BUFSIZ, read_fp);
        if (chars_read > 0) {
            printf("Output was: -n%s\n", buffer);
        }
        // 等待进程退出
        pclose(read_fp);
        exit(EXIT_SUCCESS);
    }
    exit(EXIT_SUCCESS);
}
