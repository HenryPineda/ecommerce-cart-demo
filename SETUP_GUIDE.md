# Project Setup Guide

This guide will help you clone and set up the **Ecommerce Cart Demo** project on a new machine.

## Prerequisites
- **Git**: To clone the repository.
- **Docker** & **Docker Compose**: To run the application services.

## Setup Steps

### 1. Clone the Repository
Open your terminal and clone the project:
```bash
git clone <repository_url>
cd ecommerce-cart-demo
```

### 2. Environment Configuration
Copy the example environment file:
```bash
cp .env.example .env
```

Open `.env` in a text editor and ensure the following configurations are set for Docker compatibility:
```properties
DB_CONNECTION=pgsql
DB_HOST=db
DB_PORT=5432
DB_DATABASE=ecommerce_cart
DB_USERNAME=ecommerce
DB_PASSWORD=secret

REDIS_HOST=redis
MAIL_HOST=mailhog
```
> **Note**: `DB_PASSWORD` must match the initial volume password or be `secret` by default.

### 3. Start Application
Launch the containers in detached mode:
```bash
docker compose up -d
```
> This may take a few minutes to download images and build the application container.

### 4. Install PHP Dependencies
Run Composer inside the container to install dependencies:
```bash
docker compose exec app composer install
```

### 5. Generate Application Key
Generate the Laravel encryption key:
```bash
docker compose exec app php artisan key:generate
```

### 6. Run Database Migrations
Initialize the database schema:
```bash
docker compose exec app php artisan migrate
```

### 7. Install Frontend Dependencies & Build Assets
Since the application uses external Node.js tools, you need to build the assets. The most reliable way is to run this inside the Docker container (requires temporary Node installation) or use a local Node.js version (v20+).

**Option A: Using Docker (Recommended for Consistency)**
Run the following single command to install Node.js inside the app container and build the assets:
```bash
docker compose exec app sh -c "mkdir -p /etc/apt/keyrings && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && apt-get install -y nodejs && npm install && npm run build"
```

**Option B: Using Local Node.js**
If you have Node.js 20+ installed on your host machine:
```bash
npm install
npm run build
```

### 8. Access the Application
Add the following entry to your hosts file (`/etc/hosts` on Mac/Linux or `C:\Windows\System32\drivers\etc\hosts` on Windows):
```text
127.0.0.1 ecommerce_cart.test
127.0.0.1 traefik.test
127.0.0.1 mailhog.test
```

You can now access the site at:
- **App**: [http://ecommerce_cart.test](http://ecommerce_cart.test)
- **Mailhog**: [http://mailhog.test](http://mailhog.test)
- **Traefik Dashboard**: [http://traefik.test](http://traefik.test)
