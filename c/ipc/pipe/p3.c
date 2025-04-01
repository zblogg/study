#include <stdlib.h>
#include <stdio.h>
#include <string.h>

int main() {
    int data_processed;
    int file_pipes[2];
    const char some_data[] = "123";
    char buffer[BUFSIZ + 1];
    memset(buffer, '\0', sizeof(buffer));
    // pipe函数初始化两个通道
    if (pipe(file_pipes) == 0) {
        // 向 1 中写入数据
        data_processed = write(file_pipes[1], some_data, strlen(some_data));
        printf("Wrote %d bytes\n", data_processed);
        // 从 0 中读取1中的数据
        data_processed = read(file_pipes[0], buffer, BUFSIZ);
        printf("Read %d bytes: %s\n", data_processed, buffer);
        exit(EXIT_SUCCESS);
    }
    exit(EXIT_SUCCESS);
}
