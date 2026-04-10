# Setup Guide for Contributors

## First Time Setup

After cloning the repository, follow these steps:

### 1. Install Dependencies

```bash
# Install PHP dependencies
composer install

# Install Node dependencies
npm install
```

### 2. Configure Environment

```bash
# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

**Important**: The `.env` file is gitignored and will NOT be synced. Each developer must create their own.

### 3. Database Setup

```bash
# Run migrations (SQLite will be created automatically)
php artisan migrate

# Seed demo data
php artisan db:seed
```

### 4. Build Frontend Assets

```bash
npm run build
```

### 5. Start Development Server

```bash
php artisan serve
```

Access the app at: http://localhost:8000

## Development Workflow

### Frontend Development (Auto-refresh)
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Run Tests
```bash
php artisan test
```

## Database Setup for PostgreSQL (Production)

If deploying to production with PostgreSQL:

1. Update `.env`:
```env
DB_CONNECTION=pgsql
DB_HOST=your-db-host
DB_PORT=5432
DB_DATABASE=event_management
DB_USERNAME=db_user
DB_PASSWORD=secure_password
```

2. Create database and run migrations:
```bash
php artisan migrate --seed
```

## Git Workflow

### What NOT to commit:
- `.env` files (configuration with secrets)
- `node_modules/` (rebuilt from package.json)
- `vendor/` (rebuilt from composer.json)
- `database/database.sqlite` (can be regenerated)
- `.vscode/`, `.idea/` (IDE files)
- `storage/logs/`

### What TO commit:
- `.env.example` (template only)
- Source code
- Migrations
- Tests
- Configuration files (that don't contain secrets)
- `composer.lock` and `package-lock.json`

## Common Issues

### "Cannot read properties of undefined"
- Clear cache: `php artisan optimize:clear`
- Rebuild assets: `npm run build`

### Database locked
- Remove `.sqlite-shm` and `.sqlite-wal` files
- Drop and recreate: `php artisan migrate:reset && php artisan migrate`

### Port 8000 already in use
```bash
php artisan serve --port=8001
```

### npm build fails
```bash
rm -rf node_modules
npm install
npm run build
```

## Code Style

### PHP
- PSR-12 standard
- Use type hints
- Follow Laravel conventions

### JavaScript/React
- ESLint configuration provided
- Prettier for formatting
- Component-based architecture

## Deployment Checklist

- [ ] Update `.env` for production
- [ ] Run `php artisan optimize:clear`
- [ ] Run `npm run build` for production assets
- [ ] Run migrations: `php artisan migrate --force`
- [ ] Update `APP_KEY` in production
- [ ] Set `APP_DEBUG=false`
- [ ] Update `APP_URL`
- [ ] Configure database credentials

## Support

For additional help, see main README.md or check Laravel/React documentation.
