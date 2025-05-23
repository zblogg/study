#include <stdlib.h>
#include <stdio.h>
#include <string.h>

int main() {
    int data_processed;
    int file_pipes[2];
    const char some_data[] = "123";
    char buffer[BUFSIZ + 1];
    memset(buffer, '\0', sizeof(buffer));
    pid_t fork_result;
    if (pipe(file_pipes) == 0) {
       fork_result = fork();
       if (fork_result == -1) {
            fprintf(stderr, "Fork failure");
            exit(EXIT_SUCCESS);
       } else if (fork_result == 0) {
            // 当前是子进程，从pipe 0 中读取
            data_processed = read(file_pipes[0], buffer, BUFSIZ);
            printf("Read %d bytes: %s\n", data_processed, buffer);
            exit(EXIT_SUCCESS);
       } else {
            // 当前是父进程，向pipe 1 中写入
            data_processed = write(file_pipes[1], some_data, strlen(some_data));
            printf("Wrote %d bytes\n", data_processed);
       }
    }
    exit(EXIT_SUCCESS);
}
