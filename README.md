# PetCare Pro CRM

A comprehensive Customer Relationship Management system designed specifically for pet care businesses, built with Laravel 12 and React (via Inertia.js).

## Features

### Core Functionality
- **Client Management** - Complete client profiles with contact information and preferences
- **Pet Management** - Detailed pet records with medical history, vaccinations, and photos
- **Appointment Scheduling** - Full-featured calendar with staff assignment and service tracking
- **Service Catalog** - Customizable services (grooming, veterinary, boarding, training, daycare)
- **Staff Management** - Employee profiles, specializations, and appointment assignments
- **Medical Records** - Comprehensive health tracking with diagnosis, treatments, and medications
- **Vaccination Tracking** - Automated reminders for due vaccinations
- **Invoicing & Billing** - Professional invoice generation and payment tracking
- **Reminders** - Automated notifications for appointments and vaccinations
- **Dashboard Analytics** - Real-time insights and statistics

### User Roles
- **Admin** - Full system access and configuration
- **Staff** - Manage appointments, clients, and services
- **Client** - View pets, book appointments, and manage profile

## Technology Stack

- **Backend**: Laravel 12
- **Frontend**: React 18 with Inertia.js
- **Styling**: Tailwind CSS
- **Database**: MySQL (configurable for PostgreSQL or SQLite)
- **Authentication**: Laravel Breeze with Inertia

## Installation

### Prerequisites
- PHP >= 8.2
- Composer
- Node.js >= 18.x
- MySQL >= 8.0 (or PostgreSQL/SQLite)

### Setup Instructions

1. **Install dependencies**
```bash
composer install
npm install
```

2. **Configure environment**
```bash
cp .env.example .env
php artisan key:generate
```

3. **Configure database in .env**
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=petcare_crm
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

4. **Create database and run migrations**
```bash
# Create database
mysql -u root -p -e "CREATE DATABASE petcare_crm CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Run migrations and seeders
php artisan migrate --seed
```

5. **Build frontend**
```bash
npm run build
# Or for development
npm run dev
```

6. **Start server**
```bash
php artisan serve
```

Visit `http://localhost:8000`

## Default Credentials

### Admin
- Email: admin@petcare.com
- Password: password

### Staff
- Veterinarian: sarah@petcare.com / password
- Groomer: mike@petcare.com / password

### Clients
- john@example.com / password
- emily@example.com / password

**⚠️ Change these in production!**

## Database Schema

### Main Tables
- **users** - Authentication and profiles (all user types)
- **clients** - Extended client information
- **pets** - Pet records with medical history
- **pet_types** & **breeds** - Pet classification
- **appointments** - Scheduling system
- **services** - Service catalog
- **staff** - Employee information
- **medical_records** - Health tracking
- **vaccinations** - Immunization tracking
- **invoices** & **invoice_items** - Billing
- **reminders** - Notification system

## Project Structure

```
app/
├── Http/Controllers/      # Controllers
└── Models/                # Eloquent models

database/
├── migrations/            # Database schema
└── seeders/               # Sample data

resources/js/
├── Components/            # React components
└── Pages/                 # Inertia pages

routes/web.php            # Application routes
```

## Development

```bash
# Run tests
php artisan test

# Code formatting
./vendor/bin/pint

# Fresh database
php artisan migrate:fresh --seed
```

## Production Deployment

1. Set production environment
```env
APP_ENV=production
APP_DEBUG=false
```

2. Optimize
```bash
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
php artisan view:cache
npm run build
```

3. Set permissions
```bash
chmod -R 755 storage bootstrap/cache
```

4. Configure cron for scheduler
```bash
* * * * * cd /path-to-project && php artisan schedule:run >> /dev/null 2>&1
```

## API Routes

All routes require authentication:

- **/clients** - Client CRUD operations
- **/pets** - Pet management
- **/appointments** - Appointment scheduling
- **/services** - Service catalog
- **/staff** - Employee management
- **/medical-records** - Health records
- **/vaccinations** - Vaccination tracking
- **/invoices** - Billing system

## UI/UX Design

Color-coded by service category:
- 🟢 Green - Veterinary (health)
- 🟣 Purple - Grooming (luxury)
- 🟠 Orange - Daycare (energy)
- 🩷 Pink - Boarding (comfort)
- 🔵 Indigo - Training (learning)
- 🔴 Red - Emergency (urgency)

## Troubleshooting

### Database Issues
- Verify `.env` credentials
- Ensure database server is running
- Check migrations: `php artisan migrate:status`

### Frontend Issues
- Clear cache: `php artisan cache:clear`
- Rebuild assets: `npm run build`
- Check browser console for errors

### Permissions
```bash
chmod -R 755 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
```

## Future Features

- Online client booking portal
- SMS notifications
- Email campaigns
- Inventory management
- Mobile app
- Multi-location support
- Advanced analytics
- Payment gateway integration

## License

MIT License

---

**Version**: 1.0.0
**Built with**: Laravel, React, Inertia.js, Tailwind CSS
