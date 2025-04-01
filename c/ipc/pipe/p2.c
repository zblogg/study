#include <stdlib.h>
#include <stdio.h>
#include <string.h>

int main() {
    FILE *write_fp;
    char buffer[BUFSIZ + 1];
    // 分配内存
    memset(buffer, '\0', sizeof(buffer));
    // 缓存中写入字符串
    sprintf(buffer, "abc123b");
    // 打开进程
    write_fp = popen("grep -E '\\d+' -o", "w");
    if (write_fp != NULL) {
        // 写入进程信息
        fwrite(buffer, sizeof(char), strlen(buffer), write_fp);
        pclose(write_fp);
        exit(EXIT_SUCCESS);
    }
    exit(EXIT_SUCCESS);
}
