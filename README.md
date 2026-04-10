# Event Management System (EMS)

A complete event management application built with Laravel 12, React 18, Inertia.js, and Tailwind CSS.

## Features

- **Event Management** - Create, edit, and track events with status (Planning, Ongoing, Completed)
- **Client Management** - Manage clients and link them to events
- **Budget Tracking** - Track planned vs actual expenses with budget items
- **Timeline Management** - Create tasks and assign to team members
- **Role-Based Access Control** - Admin and Staff roles with specific permissions
- **Dashboard** - Real-time statistics and upcoming events

## Tech Stack

- **Backend**: Laravel 12, PHP 8.2+, Spatie Permission
- **Frontend**: React 18, Inertia.js, Tailwind CSS
- **Database**: SQLite (dev), PostgreSQL (production-ready)
- **Build**: Vite, npm
- **Testing**: Pest PHP

## Installation

### Prerequisites
- PHP 8.2 or higher
- Composer
- Node.js 18+
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd laravel-app
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Setup environment file**
   ```bash
   cp .env.example .env
   ```

4. **Generate application key**
   ```bash
   php artisan key:generate
   ```

5. **Install Node dependencies**
   ```bash
   npm install
   ```

6. **Run migrations and seeders**
   ```bash
   php artisan migrate --seed
   ```

7. **Build frontend assets**
   ```bash
   npm run build
   ```

8. **Start development server**
   ```bash
   php artisan serve
   ```

The application will be available at `http://localhost:8000`

## Demo Credentials

After running seeders, use these credentials to login:

- **Admin Account**
  - Email: `admin@demo.com`
  - Password: `password`

- **Staff Account**
  - Email: `staff@demo.com`
  - Password: `password`

## Database

The application uses SQLite by default for development. To use PostgreSQL in production:

1. Update `.env`:
   ```
   DB_CONNECTION=pgsql
   DB_HOST=127.0.0.1
   DB_PORT=5432
   DB_DATABASE=event_management
   DB_USERNAME=postgres
   DB_PASSWORD=yourpassword
   ```

2. Run migrations:
   ```bash
   php artisan migrate --seed
   ```

## Development

### Watch mode (for development)
```bash
npm run dev
```

### Build for production
```bash
npm run build
```

### Run tests
```bash
php artisan test
```

## Project Structure

```
laravel-app/
├── app/
│   ├── Http/Controllers/     # API controllers
│   ├── Models/               # Eloquent models
│   └── Policies/             # Authorization policies
├── database/
│   ├── migrations/           # Database migrations
│   ├── factories/            # Model factories
│   └── seeders/              # Database seeders
├── resources/
│   ├── js/
│   │   ├── pages/           # React page components
│   │   ├── components/      # Reusable components
│   │   └── app.tsx          # Main app file
│   └── css/                 # Tailwind CSS
├── routes/                  # Web routes
└── tests/                   # Test files
```

## Key Features

### Authentication
- Email/password login with session-based auth
- CSRF protection
- Password reset functionality

### Authorization
- Role-based access control (Admin/Staff)
- Resource-level policies for Events, Clients, Budgets
- Middleware-based route protection

### Events
- Full CRUD operations
- Status tracking (Planning, Ongoing, Completed)
- Multi-client support
- Budget integration
- Timeline management

### Clients
- Client database with contact info
- Track client-event relationships
- Company and notes tracking

### Budget
- Plan vs Actual tracking
- Budget items with automatic total recalculation
- Category-based expense tracking

### Responsive Design
- Mobile-friendly with Tailwind CSS
- Sidebar navigation
- Responsive tables and forms

## Troubleshooting

### Build errors
```bash
npm run build
```

### Database issues
```bash
php artisan migrate:reset
php artisan migrate --seed
```

### Asset compilation
```bash
npm run build
php artisan optimize:clear
```

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Support

For issues and questions, please create an issue in the repository.
