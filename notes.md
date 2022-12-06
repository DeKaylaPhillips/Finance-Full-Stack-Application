# INSTALLATION/CONFIGURATIONS/SET-UP

**FRONTEND**
- React project created => *frontend/*
- Node installed into React project
- Vite configurations:
    - vite.config.js
        Base & Build configured:
        export default defineConfig({
            base: '/static/',
            build: {
                outDir: '..backend/static',
                emptyOutDir: true,
                sourcemap: true,
            },
            plugins: [react()]   
        })
    - package.json
        Watch script added:
        "build:watch": "vite build --watch",
- (To ensure proper working state, vite.svg moved from public/ directory to assets/ directory. Imported svg file in App.jsx, and created viteLogo variable as img src where need be.)
- Bootstrap installed
- Axios installed

**BACKEND**
- VM created
- Django installed
- Django Rest Frameworks installed
- Postgresql installed
- Database created *user_db*
- Django Project created *backend/*
    backend/urls.py configured to include app urls
- Django App created *backend/site_app/*
    site_app/urls.py created and taking in views.py
- Static directory *backend/static/*
- Setting configurations:
    INSTALLED_APPS = [
        ...
        'site_app',
        'rest_framework'
    ]

    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': 'user_db', 
    }

    STATICFILES_DIRS = [ BASE_DIR / 'static' ]
- Requirements.txt created


# PROJECT
...

# API-TESTING
...