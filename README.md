# RMUTL-Equipment-Rental-System


## Run Project
```bash
git clone https://github.com/Methapon2001/RMUTL-Equipment-Rental-System.git ./equipment-rental-system

cd ./equipment-rental-system

# npm i
yarn install 

echo "DATABASE_URL=\"{protocal}://{username}:{password}@{hostname}:{port}/{database}\"" > .env

# npx prisma migrate dev -n init
# npx prisma studio
yarn prisma migrate dev -n init
yarn prisma studio
```
In your first terminal
```bash
# npm run dev
yarn run dev
```
In your second terminal
```bash
cd ./client

# npm i
# npm run dev
yarn install
yarn run dev
```

Server run at port 5000
Client run at port 8080
