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
- React-Router-Dom installed

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
**FEATURES**
HomePage Features
1. Sign In (Information logged to database)
2. Sign Out (Information logged to database)
3. Sign Up (Information logged to data)
    - First Name
    - Last Name
    - Occupation
    - Location 
    - Current Salary
    - 
**MODELS**
USER MODEL - 
*USED DJANGO ABSTRACT USER AUTHENTICATION MODEL, SO INCLUDING THIS DATA IN MODEL NOT NEEDED*
*EMAIL FIELD USED FOR REQUIRED USERNAME FIELD*
*NEED CSRF_EXEMPT STARTING OUT*
    - Email                     -- (not null, email field) *This will act as the username for signing in*
        USERNAME = 'email' 
        REQUIRED_FIELDS = []  

*AUTHORIZATION vs AUTHENTICATION*
Authentication --> how a user proves to the server that they are who they say they are; Django provides tools to help conveniently, and securely manage users
Authorization --> to limit who can do what, Django has a built-in permission system (AbstractUser)

USER EXPENSE MODEL *NEED FOR SAVING THEIR EXPENSE DATA SO THEY CAN REVISIT THEIR BUDGET SHEET AND NOT HAVE TO RE-ENTER WITH EVERY LOGIN*
    - Title             --  expenses can have titles (not null, charfield)
    - Amount            --  expenses can have amounts (not null, default decimal field $0.00)
        *Preset categories for each user will be created and displayed to the UI ...*
        - Category Title: Rent          
        - Category Title: Utilities         
        - Category Title: Shopping          
        - Category Title: Transportation    
        - Category Title: Entertainment     
        - Category Title: Food/Dining       
        - Category Title: Childcare         
        - Category Title: Uncategorized   

USER BUDGET MODEL 
    - user => user can have one monthly budget planning sheet 
    (OneToOne relationship, delete entire model if user is deleted)

    - budget_amount => budget amount needed for calculation of remaining balance 
    (default decimal field 0.0 --> meaning no budget set)

    - spend_amount => spend amount calculated as the sum of all expense inputs 
    (default decimal field 0.0 --> meaing no expenses yet)
   
    - remaining_balance => remaining balance calculated as difference of budget amount and spend amount
    (default decimal field 0.0 --> meaing no expenses yet)
        

USER EXPENSE MODEL
    - user => user can have many expenses within their budget planning sheet
    (ForeignKey relationship, delete entire model if user is deleted) 
    - title => this is the title of the expense category
    - amount => this is the amount that goes towards an expense category monthly 

**FEATURES**

## LOGIN/LOGOUT/SIGN-UP FEATURES
* [X] ~~*SIGN UP ['POST'] Request --> sending user data to the database on the backend for storage and later use of the information*~~ [2022-12-08]
* [ ] SIGN IN ['GET'] Request --> frontend retrieving information from the database and verify if correct --> Redirect to personal monthly budget planner (currently redirects to dashboard, which will be deleted as no use case found)
    - Email
    - Password
* [ ] SIGN OUT ['GET'] Request --> want to retrieve and verify the data of the user signing out of the program --> then Redirect to Authentication page on Frontend
    - Sign out with simple button click

## BUDGET PLANNING SHEET FEATURES   
- BUDGET AMOUNT - (Total amount user desires to spend and/or stay under)
- SPEND AMOUNT - (Sum of all expenses for the month) 
- REMAINING BALANCE (Budget Amount - Spend Amount = Remaining budget balance)
- EXPENSE LIST - (Each user expense displayed on UI in list format)

If a user edits their budget amount, the newly calculate spend/remaining balance will be automatically reflected on the UI and updated in the database.
If a user edits an expense amount or deletes a category, the newly calculate spend/remaining balance will be automatically reflected on UI and updated in the database.

*Pre-Set Expenses will have a default of $0.00 and will be calculated as floats/decimals*
    - Rent
    - Utilities
    - Shopping
    - Transportation
    - Entertainment
    - Food/Dining
    - Childcare
    - Uncategorized

# VIEWS
1. *index*
   ""
   For reading react static files and rendering react components to the UI

2. *createAccount*
   Server URL - "api/createAccount/" 
   Client Route - ""

   Not really a client-side route - simply a view used for sending POST request containing new user data to the database on the authentication/start-up page and will redirect the user to their new dashboard upon successful creation of account.

3. *signIn*
   Server URL - "api/signIn/"
   Client Route - ""

   Not really a client-side route - simply a view used for sending POST request to authenticate user login credentials using data from the client-side sign in feature. Upon successful login, client will be redirected to their existing dashboard.

   *Notes*
   **What exactly is request._request??**
    # request._request used to access the original request data sent by the client and retrieve the username and password
    
    # used to access and authenticate the data associated with a login request, and implements secure authentication 
    
    # the _ is simply to make the code more readable, no special meaning in this context*

4. *dashboard* (**WILL DELETE**)
   Server URL - "api/dashboard/"
   Client Route - "/dashboard"

5. *budget_sheet*
   SERVER URL - "api/budgetSheet/"
   
6. *salary_finder*

# API-TESTING
API: Rapid API - Job Salary Data (paid)

API: Alphavantage - News and Articles (Free)

# TODO:
- organize components/pages
- add more comments for functions/methods
- clean up unused imports/code
- add extra styling/formatting after all pages created
- add signout feature to navbar! *Done*
