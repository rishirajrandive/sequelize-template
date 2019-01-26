# sequelize-template

### Template to use Sequelize ORM in Node JS
### This app uses MySQL for integration

## How to run:
1. Run `npm install` to install all the dependencies required
2. Add `.env` file in root directory with your MYSQL database credentials using below format

```$xslt
MYSQL_USER=root
MYSQL_PASSWORD=root
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DB=test_template
```
3. Then just run the app using `npm start` or Webstorm's run button


#### This app just give a structure on which you can build your app.

### Useful scripts:
1. There are three scripts added in `package.json` scripts section to easily add 
test data to MySQL tables;
2. Run `npm run db:create:tables` to create tables
3. Run `npm run db:enter:data` to add data to tables
4. Run `npm run db:drop:tables` to delete tables

You can press `ctrl+c` once the scripts come to halt after running without error.
If error check and solve it.


#### Make sure to add `.env` to `.gitignore` of your project before pushing to Git.
```$xslt
# dotenv environment variables file
.env
```



