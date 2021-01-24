simple login with express js

environment
1. node js
2. mysql

how to use

npm install --save
1. init
2. express
3. mysql
4. body-parser
5. jsonwebtoken
6. md5
7. jwt-decode

run access port 3000

1. post login
url         : http://localhost:3000/restful-login-sample/login
header      : Content-Type:application/json
body        : 
    {
        "email":"udinworld@mail.com",
        "password":"@udinworld2021"
    }

2. get credential
url         : http://localhost:3000/restful-login-sample/credential
header      : Authorization:Bearer {{accessToken}}

