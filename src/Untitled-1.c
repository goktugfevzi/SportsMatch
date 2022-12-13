
main {
    int a=5,b,c,d;
    b=a++;
    c=--b;
    d=(b++)+(c--);
    printf("%d",b*c*d);
}