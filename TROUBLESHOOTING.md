# PetCare Pro CRM - Troubleshooting Guide

## Database Connection Issues

### Issue: "Connection refused" (MySQL)

**Problem:** MySQL server is not running or not accessible.

**Solutions:**

#### Option 1: Start MySQL Service

```bash
# Ubuntu/Debian
sudo systemctl start mysql
sudo systemctl status mysql

# macOS
brew services start mysql
# or
mysql.server start

# Windows
net start MySQL
```

#### Option 2: Use SQLite Instead (Recommended for Development)

SQLite is easier for development and requires no server setup.

**Step 1: Install PHP SQLite Extension**

```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install php-sqlite3 php8.2-sqlite3

# macOS (usually included)
# Verify: php -m | grep sqlite

# Windows
# Enable in php.ini:
# extension=pdo_sqlite
# extension=sqlite3
```

**Step 2: Configure Laravel for SQLite**

Edit `.env` file:
```env
DB_CONNECTION=sqlite
# Comment out MySQL settings:
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=petcare_crm
# DB_USERNAME=root
# DB_PASSWORD=
```

**Step 3: Create Database File**

```bash
touch database/database.sqlite
```

**Step 4: Clear Config and Migrate**

```bash
php artisan config:clear
php artisan migrate --seed
```

#### Option 3: Use PostgreSQL

If you have PostgreSQL installed:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=petcare_crm
DB_USERNAME=postgres
DB_PASSWORD=your_password
```

### Issue: "could not find driver"

**Problem:** Required PHP database extension is not installed.

**Solution:** Install the appropriate PHP extension:

```bash
# For MySQL
sudo apt-get install php8.2-mysql

# For SQLite
sudo apt-get install php8.2-sqlite3

# For PostgreSQL
sudo apt-get install php8.2-pgsql

# Then restart PHP/web server
sudo systemctl restart php8.2-fpm
# or
sudo systemctl restart apache2
```

**Verify Installation:**
```bash
php -m | grep -i pdo
php -m | grep -i sqlite
php -m | grep -i mysql
```

### Issue: "Access denied for user"

**Problem:** Incorrect database credentials.

**Solution:**
1. Verify credentials in `.env` file
2. Test connection:
```bash
mysql -u root -p
# Enter password when prompted
```

3. Create database user if needed:
```sql
CREATE USER 'petcare_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON petcare_crm.* TO 'petcare_user'@'localhost';
FLUSH PRIVILEGES;
```

## Migration Issues

### Check Migration Status

```bash
php artisan migrate:status
```

### Reset Migrations

If migrations are stuck or corrupted:

```bash
# WARNING: This deletes all data
php artisan migrate:fresh --seed
```

### Run Specific Migration

```bash
php artisan migrate --path=/database/migrations/2026_01_05_104134_add_role_and_profile_fields_to_users_table.php
```

## Environment Issues

### Clear All Caches

```bash
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
```

### Verify PHP Version

```bash
php -v
# Should be 8.2 or higher
```

### Check Required Extensions

```bash
php -m
```

Required extensions:
- PDO
- pdo_mysql (for MySQL) OR pdo_sqlite (for SQLite)
- mbstring
- openssl
- tokenizer
- xml
- ctype
- json
- bcmath

### Install Missing Extensions

```bash
# Ubuntu/Debian
sudo apt-get install php8.2-{mbstring,xml,bcmath,curl,zip,gd}

# macOS
brew install php@8.2

# Check installed extensions
php -m
```

## Frontend Issues

### Node Modules Not Found

```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

```bash
# Clear npm cache
npm cache clean --force

# Reinstall
npm install

# Build
npm run build
```

### Vite Not Running

```bash
# Kill any running process
pkill -f vite

# Start fresh
npm run dev
```

## Permission Issues

### Storage/Cache Permissions

```bash
chmod -R 775 storage bootstrap/cache
chown -R $USER:www-data storage bootstrap/cache
```

### Database File Permissions (SQLite)

```bash
chmod 664 database/database.sqlite
chmod 775 database/
```

## Quick Fix Checklist

Run these commands in order:

```bash
# 1. Clear all caches
php artisan config:clear
php artisan cache:clear

# 2. Verify environment
php -v
php -m | grep pdo

# 3. Check database connection
php artisan tinker
# Then type: DB::connection()->getPdo();
# Press Ctrl+D to exit

# 4. Run migrations
php artisan migrate:status
php artisan migrate --seed

# 5. Build frontend
npm install
npm run build

# 6. Start server
php artisan serve
```

## Database Setup for Different Systems

### Ubuntu/Debian + MySQL

```bash
# Install MySQL
sudo apt-get update
sudo apt-get install mysql-server php8.2-mysql

# Secure installation
sudo mysql_secure_installation

# Create database
sudo mysql -u root -p
```

```sql
CREATE DATABASE petcare_crm CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'petcare'@'localhost' IDENTIFIED BY 'SecurePassword123!';
GRANT ALL PRIVILEGES ON petcare_crm.* TO 'petcare'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

Update `.env`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=petcare_crm
DB_USERNAME=petcare
DB_PASSWORD=SecurePassword123!
```

### macOS + MySQL

```bash
# Install via Homebrew
brew install mysql

# Start service
brew services start mysql

# Create database
mysql -u root -p
```

Follow same SQL commands as above.

### Windows + MySQL

1. Download MySQL from https://dev.mysql.com/downloads/installer/
2. Install MySQL Server
3. Use MySQL Workbench or command line to create database

### Any System + SQLite (Easiest)

```bash
# Install PHP SQLite
# Ubuntu/Debian
sudo apt-get install php8.2-sqlite3

# macOS - usually included
php -m | grep sqlite

# Create database
touch database/database.sqlite

# Update .env
DB_CONNECTION=sqlite
```

## Still Having Issues?

### Get Detailed Error Information

Enable debug mode in `.env`:
```env
APP_DEBUG=true
APP_ENV=local
```

### Check Laravel Logs

```bash
tail -f storage/logs/laravel.log
```

### Test Database Connection

```bash
php artisan tinker
```

Then run:
```php
DB::connection()->getPdo();
// Should return PDO object
DB::select('SELECT 1');
// Should return array
exit
```

### Verify Composer Dependencies

```bash
composer install --no-cache
composer dump-autoload
```

## Common Error Messages

| Error | Solution |
|-------|----------|
| "could not find driver" | Install PHP database extension |
| "Connection refused" | Start database server |
| "Access denied" | Check database credentials |
| "Table doesn't exist" | Run migrations |
| "Class not found" | Run `composer dump-autoload` |
| "npm command not found" | Install Node.js |
| "Permission denied" | Fix file permissions |

## Getting Help

1. Check this troubleshooting guide
2. Review `storage/logs/laravel.log`
3. Run `php artisan tinker` to test connections
4. Verify all prerequisites are installed
5. Check Laravel documentation: https://laravel.com/docs

---

**Need more help?** Open an issue with:
- Your operating system
- PHP version (`php -v`)
- Error message (full stack trace)
- What you've already tried
