# 🚀 MateMago Deployment Guide

Esta guía explica cómo desplegar MateMago en diferentes entornos de producción.

## 📋 Prerrequisitos de Producción

- **Servidor Linux** (Ubuntu 20.04+ recomendado)
- **Python 3.8+**
- **Node.js 16+**
- **Nginx** (como reverse proxy)
- **Certificado SSL** (Let's Encrypt recomendado)
- **Firewall configurado** (UFW recomendado)
- **API Key de Google Gemini** válida

## 🏗️ Arquitectura de Producción

```
Internet
    ↓
[Nginx Reverse Proxy] (Puerto 80/443)
    ↓
[Frontend Static Files] + [Backend API] (Puerto 8000)
    ↓
[Google Gemini AI Service]
```

## 🔧 Configuración del Servidor

### 1. Actualizar Sistema

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y python3-pip python3-venv nginx certbot python3-certbot-nginx
```

### 2. Instalar Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

### 3. Crear Usuario de Aplicación

```bash
sudo adduser matemago
sudo usermod -aG sudo matemago
sudo su - matemago
```

## 📦 Deploy Backend

### 1. Configurar Aplicación

```bash
cd /home/matemago
git clone https://github.com/tuusuario/MatemagoAgent.git
cd MatemagoAgent/backend

# Crear entorno virtual
python3 -m venv venv
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt
```

### 2. Configurar Variables de Entorno

```bash
cp .env.example .env
nano .env
```

```bash
# .env de producción
GOOGLE_API_KEY=tu_api_key_aqui
DEBUG=False
HOST=127.0.0.1
PORT=8000
ALLOWED_ORIGINS=https://tudominio.com
```

### 3. Crear Servicio Systemd

```bash
sudo nano /etc/systemd/system/matemago-backend.service
```

```ini
[Unit]
Description=MateMago Backend API
After=network.target

[Service]
Type=simple
User=matemago
Group=matemago
WorkingDirectory=/home/matemago/MatemagoAgent/backend
Environment=PATH=/home/matemago/MatemagoAgent/backend/venv/bin
ExecStart=/home/matemago/MatemagoAgent/backend/venv/bin/uvicorn app.main:app --host 127.0.0.1 --port 8000
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable matemago-backend
sudo systemctl start matemago-backend
sudo systemctl status matemago-backend
```

## 🌐 Deploy Frontend

### 1. Build de Producción

```bash
cd /home/matemago/MatemagoAgent/frontend

# Instalar dependencias
npm ci

# Configurar para producción
echo "VITE_API_URL=https://tudominio.com/api/v1" > .env.production

# Build
npm run build
```

### 2. Servir Archivos Estáticos

```bash
sudo mkdir -p /var/www/matemago
sudo cp -r dist/* /var/www/matemago/
sudo chown -R www-data:www-data /var/www/matemago
```

## ⚙️ Configurar Nginx

### 1. Configuración Principal

```bash
sudo nano /etc/nginx/sites-available/matemago
```

```nginx
server {
    listen 80;
    server_name tudominio.com www.tudominio.com;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name tudominio.com www.tudominio.com;
    
    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/tudominio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/tudominio.com/privkey.pem;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    
    # Frontend static files
    location / {
        root /var/www/matemago;
        index index.html;
        try_files $uri $uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
    
    # Backend API
    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Timeouts for AI requests
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
    
    # Health check
    location /health {
        proxy_pass http://127.0.0.1:8000;
        access_log off;
    }
}
```

### 2. Activar Sitio

```bash
sudo ln -s /etc/nginx/sites-available/matemago /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 🔒 Configurar SSL

### 1. Obtener Certificado

```bash
sudo certbot --nginx -d tudominio.com -d www.tudominio.com
```

### 2. Renovación Automática

```bash
sudo crontab -e
```

```bash
0 12 * * * /usr/bin/certbot renew --quiet
```

## 🔥 Configurar Firewall

```bash
sudo ufw enable
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw status
```

## 📊 Monitoreo y Logs

### 1. Logs de Aplicación

```bash
# Backend logs
sudo journalctl -u matemago-backend -f

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### 2. Monitoreo de Recursos

```bash
# CPU y memoria
htop

# Espacio en disco
df -h

# Estado de servicios
sudo systemctl status matemago-backend nginx
```

### 3. Health Checks

```bash
# API health
curl https://tudominio.com/api/health

# Frontend
curl -I https://tudominio.com
```

## 🔄 Actualizaciones

### 1. Script de Deploy

```bash
nano /home/matemago/deploy.sh
```

```bash
#!/bin/bash
set -e

echo "🚀 Desplegando MateMago..."

# Backend
echo "📦 Actualizando backend..."
cd /home/matemago/MatemagoAgent
git pull origin main

cd backend
source venv/bin/activate
pip install -r requirements.txt

# Reiniciar backend
sudo systemctl restart matemago-backend

# Frontend
echo "🌐 Actualizando frontend..."
cd ../frontend
npm ci
npm run build

# Actualizar archivos estáticos
sudo rm -rf /var/www/matemago/*
sudo cp -r dist/* /var/www/matemago/
sudo chown -R www-data:www-data /var/www/matemago

echo "✅ Deploy completado!"
```

```bash
chmod +x /home/matemago/deploy.sh
```

### 2. Uso del Script

```bash
./deploy.sh
```

## 🐛 Troubleshooting

### Error 502 Bad Gateway

```bash
# Verificar estado del backend
sudo systemctl status matemago-backend

# Verificar logs
sudo journalctl -u matemago-backend --since "1 hour ago"

# Reiniciar servicio
sudo systemctl restart matemago-backend
```

### Error de SSL

```bash
# Verificar certificado
sudo certbot certificates

# Renovar manualmente
sudo certbot renew
```

### Alta Latencia

```bash
# Verificar recursos
htop
df -h

# Verificar logs de Nginx
sudo tail -f /var/log/nginx/access.log | grep "request_time"
```

## 🛡️ Seguridad

### 1. Firewall Adicional

```bash
# Fail2ban para proteger SSH
sudo apt install fail2ban
```

### 2. Actualizaciones Automáticas

```bash
sudo apt install unattended-upgrades
sudo dpkg-reconfigure unattended-upgrades
```

### 3. Backup de Datos

```bash
# Script de backup
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
tar -czf /home/matemago/backup_${DATE}.tar.gz /home/matemago/MatemagoAgent
```

## 📈 Optimizaciones

### 1. Caché Redis (Opcional)

```bash
sudo apt install redis-server
```

### 2. Load Balancer (Para múltiples instancias)

```nginx
upstream matemago_backend {
    server 127.0.0.1:8000;
    server 127.0.0.1:8001;
}
```

### 3. CDN para Archivos Estáticos

Considerar usar CloudFlare o AWS CloudFront para servir archivos estáticos globalmente.
