#include<stdio.h>
#include<unistd.h> 
int main(){
    int sec = 0 ;
    int hr = 0;
    int min = 0;
    int c; 
    while(1){
        printf("\r%02d:%02d:%02d",hr,min,sec);
        fflush(stdout);
        sec++;
        if(sec==60){
            min++;
            sec = 0;
        }
        if(min==60){
            hr++;
            min = 0;
        }
        if(hr==24){
            hr = 0;
        }
        sleep(1);
    }
    return 0;
}