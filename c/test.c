#include <arpa/inet.h>
#include <stdio.h>

int main() {
    in_addr_t inaddr = inet_addr("111.111.111.111");
	printf("%u", inaddr);
    return 0;
}
