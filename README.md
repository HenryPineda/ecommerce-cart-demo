# Ecommerce Cart Demo

A Laravel-based ecommerce application containerized with Docker.

## Quick Start

1. **Clone & Configure**
   ```bash
   git clone <repo_url>
   cd ecommerce-cart-demo
   cp .env.example .env
   # Update .env: REDIS_HOST=redis, MAIL_HOST=mailhog
   ```

2. **Start Docker**
   ```bash
   docker compose up -d
   ```

3. **Install Dependencies**
   ```bash
   docker compose exec app composer install
   docker compose exec app php artisan key:generate
   docker compose exec app php artisan migrate
   ```

4. **Build Frontend**
   ```bash
   # Installs Node 20 & builds assets inside container
   docker compose exec app sh -c "curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && apt-get install -y nodejs && npm install && npm run build"
   ```

5. **Browse**
   Add `127.0.0.1 ecommerce_cart.test` to your `/etc/hosts` file.
   Visit [http://ecommerce_cart.test](http://ecommerce_cart.test).

For detailed setup instructions, see [SETUP_GUIDE.md](SETUP_GUIDE.md).
