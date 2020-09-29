# 1. Setup database -- Create models and tables

```
npx sequelize-cli init

npm run migrate:create:model -- --name User --attributes name:string,email:string,password:string,deletedAt:date --models-path src/api/v1.0/user

npm run migrate:create:model -- --name Account --attributes name:string,logo:string,type:string,deletedAt:date --models-path src/api/v1.0/account

npm run migrate:create:model -- --name Billing --attributes accountId:uuid,cardName:string,cardNumber:string,cvv:string,expiration:date,deletedAt:date --models-path src/api/v1.0/billing

npm run migrate:create:model -- --name AccountUser --attributes accountId:uuid,userId:uuid,deletedAt:date --models-path src/api/v1.0/account

npm run migrate:run -- --url 'postgres://postgres:your_postgres_password@brodevhood_postgres:5433/brodevhood'
```


