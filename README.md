# Mood Tracker API
## Getting Started
1. Install Node, NPM, and Yarn.
2. In the root directory, generate private key:
```shell
openssl genrsa -out privateKey.pem 2048
```
3. In the root directory, generate public key:
```shell
openssl rsa -in privateKey.pem -pubout -out publicKey.pem
```
4. Duplicate `.env.example` file and rename it to `.env`.
5. Supply the needed env variables. 
6. Run `yarn install`
7. Run `yarn dev` for development.