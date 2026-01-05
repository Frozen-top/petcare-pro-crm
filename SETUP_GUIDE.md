# PetCare Pro CRM - Quick Setup Guide

## Prerequisites Check

Before starting, ensure you have:
- ✅ PHP 8.2 or higher: `php -v`
- ✅ Composer: `composer --version`
- ✅ Node.js 18+: `node -v`
- ✅ Database: MySQL 8.0+ OR SQLite (with PHP extensions)

**IMPORTANT:** You need PHP database extensions:
```bash
# Check if installed
php -m | grep -i pdo
php -m | grep -i sqlite    # For SQLite
php -m | grep -i mysql     # For MySQL

# Install if missing (Ubuntu/Debian)
sudo apt-get install php8.2-sqlite3 php8.2-mysql
```

## Step-by-Step Setup

### 1. Database Configuration

**Choose ONE option:**

#### Option A: SQLite (Easiest - Recommended for Testing)

1. Install PHP SQLite extension (if not installed):
```bash
# Ubuntu/Debian
sudo apt-get install php8.2-sqlite3

# macOS - usually included
# Windows - enable in php.ini
```

2. Create database file:
```bash
touch database/database.sqlite
```

3. Configure `.env`:
```env
DB_CONNECTION=sqlite
# Comment out MySQL settings
```

4. Skip to step 3 (Install Dependencies)

#### Option B: MySQL (For Production)

1. Start MySQL service:
```bash
# Ubuntu/Debian
sudo systemctl start mysql

# macOS
brew services start mysql
```

2. Create database:
```bash
mysql -u root -p
```

3. Run SQL:
```sql
CREATE DATABASE petcare_crm CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

4. Configure `.env`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=petcare_crm
DB_USERNAME=root
DB_PASSWORD=your_password
```

### 2. Environment Setup

The `.env` file is already configured. Update these values if needed:

```env
DB_DATABASE=petcare_crm
DB_USERNAME=root
DB_PASSWORD=your_password
```

### 3. Install Dependencies

```bash
# PHP dependencies
composer install

# JavaScript dependencies
npm install
```

### 4. Run Migrations

```bash
# Create all database tables and add sample data
php artisan migrate --seed
```

This creates:
- All database tables
- Pet types (Dog, Cat, Bird, Rabbit, Hamster) with breeds
- Sample services
- Admin, staff, and client users
- Sample data for testing

### 5. Build Frontend

```bash
# For development (with hot reload)
npm run dev

# For production
npm run build
```

### 6. Start Application

In a new terminal:
```bash
php artisan serve
```

Visit: http://localhost:8000

## Login Credentials

### Test the System

**Admin Dashboard:**
- Email: admin@petcare.com
- Password: password
- Access: Full system control

**Staff Access (Veterinarian):**
- Email: sarah@petcare.com
- Password: password
- Access: Manage appointments, clients, pets

**Staff Access (Groomer):**
- Email: mike@petcare.com
- Password: password
- Access: Manage grooming appointments

**Client Portal:**
- Email: john@example.com
- Password: password
- Access: View pets, book appointments

## Features to Test

### As Admin
1. View dashboard with all statistics
2. Manage clients, pets, and appointments
3. Configure services and staff
4. Generate invoices
5. View all records

### As Staff
1. Check today's appointments
2. Add medical records for pets
3. Update appointment statuses
4. Create new clients and pets

### As Client
1. View your pets
2. See upcoming appointments
3. Check invoices
4. Update profile

## Common Issues

### "could not find driver"
Install PHP MySQL extension:
```bash
# Ubuntu/Debian
sudo apt-get install php8.2-mysql

# macOS
brew install php@8.2
```

### "npm command not found"
Install Node.js from https://nodejs.org/

### Database connection failed
1. Ensure MySQL is running
2. Check .env credentials
3. Verify database exists

### Permission denied
```bash
chmod -R 755 storage bootstrap/cache
```

## Next Steps

1. **Change Default Passwords**: Update all default credentials in production
2. **Configure Email**: Set up mail server in `.env` for notifications
3. **Customize Services**: Add your own services and pricing
4. **Add Branding**: Update logo and colors in resources/js
5. **Configure Payment**: Integrate payment gateway if needed

## Project Structure Overview

```
├── app/Models/              # Database models (Client, Pet, Appointment, etc.)
├── app/Http/Controllers/    # Request handlers
├── database/migrations/     # Database schema
├── database/seeders/        # Sample data
├── resources/js/Pages/      # React pages (Dashboard, Clients, Pets, etc.)
├── resources/js/Components/ # Reusable React components
└── routes/web.php          # Application routes
```

## Development Workflow

1. Make changes to files
2. If modifying frontend: Keep `npm run dev` running
3. If changing routes/config: Run `php artisan route:clear`
4. Test in browser
5. Commit changes

## Getting Help

- Check README.md for detailed documentation
- Review database seeders for example data
- Examine existing controllers for patterns
- Use Laravel documentation: https://laravel.com/docs

## Production Deployment

When ready for production:

1. Update `.env`:
```env
APP_ENV=production
APP_DEBUG=false
```

2. Optimize:
```bash
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
php artisan view:cache
npm run build
```

3. Set up cron job for reminders and scheduled tasks

---

**You're all set!** 🎉

The system is ready to use with sample data. Explore the admin dashboard to see all features.
