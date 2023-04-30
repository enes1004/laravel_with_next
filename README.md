# Change log

### Preparation
- create database and edit env

### Install Breeze
```
composer require laravel/breeze --dev
php artisan breeze:install api
php artisan migrate
```
### Add posts

- add resource controller with model and migration
```
 php artisan make:model Post -mrsf --policy --test
 ```

- edit migration and relations and factories

- Migrate

- Execute seeder with factory
```
php artisan migrate
php artisan db:seed
```

- Check database