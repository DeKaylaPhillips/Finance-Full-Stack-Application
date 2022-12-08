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
**MODELS**
USER MODEL - 
*USED DJANGO ABSTRACT USER AUTHENTICATION MODEL, SO INCLUDING THIS DATA IN MODEL NOT NEEDED*
*EMAIL FIELD USED FOR REQUIRED USERNAME FIELD*
*NEED CSRF_EXEMPT STARTING OUT*
    - First Name                -- (not null, charfield)
    - Last Name                 -- (not null, charfield)
    - Email                     -- (not null, email field) *This will act as the username for signing in*
        USERNAME = 'email' 
        REQUIRED_FIELDS = []  
    - Password                  -- (not null, password field, validators possibly needed here)

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
    - user              --  user can have one monthly budget planning sheet (OneToOne relationship , not null, delete entire model if user is deleted)
    - expenses          --  budget can have many expenses within its sheets (ForeignKey relationship, not null, delete expenses if the budget sheet is deleted)
    - budget_amount     --  budget amount needed for calculation of remaining balance (not null, default decimal field 0.00 --> meaning no budget set)
    - spend_amount      --  spend amount calculated as the sum of all expense inputs (not null, default decimal field 0.00 --> meaing no expenses yet) 
    - remaining_balance --  remaining balance calculated as difference of budget amount and spend amount (not null)
                            if budget amount set, but no expenses calculated, budget amount = remaining balance
                            if budget amount not set, remaining balance = $0.00

*budget can have many expenses items* OneToMany/ForeignKey 
*a user can have only one budget sheet* OneToOne


 
**FEATURES**

## LOGIN/LOGOUT/SIGN-UP FEATURES
- SIGN UP ['POST'] Request --> sending user data to the database on the backend for storage and later use of the information
- SIGN IN ['GET'] Request --> frontend retrieving information from the database and verify if correct --> Redirect to personal monthly budget planner
    - Email
    - Password
- SIGN OUT ['GET'] Request --> want to retrieve and verify the data of the user signing out of the program --> then Redirect to Home Page on Frontend
    - Sign out with simple button click

## BUDGET PLANNING FEATURES   
- BUDGET AMOUNT - (Total amount user desires to spend and/or stay under)
['GET'] Request     -->     will retrieve budget amount from database and display on the UI
                            if no budget amount set yet, default amount is $0
['POST'] Request    -->     add a budget amount to the database based on the user's input and display on the UI once submitted
                            will then allow for GET requests to be called on user budget
['PUT'] Request     -->     user will have the ability to edit the budget amount as needed; 
                            will recalculate the remaining budget balance for the user in the database if this method is called

- SPEND AMOUNT - (Sum of all expenses for the month) 
['GET'] Request     -->     retrieve the spend amount stored in the database and display on the UI
                            if no expenses calculated then default spend amount is $0.00
['POST'] Request    -->     add the spend amount to the database based on the category and display on UI once submitted
['PUT'] Request*    -->     user will be able to update the expense totals as needed
                            will recalculate the spend amount for the user in the database if this method is called

- REMAINING BALANCE (Budget Amount - Spend Amount = Remaining budget balance)
['GET'] Request     -->     retrieve the remaining balance stored in the database and 
                            recalculate on the backend as needed with edits to the expense amounts and/or deletion of expense categories and their respectives spend amounts, if any

## EXPENSES 
['GET'] Request     -->     retrieve the expense amounts for each category values from the backend database to display on the page
['POST'] Request    -->     send the user's expense amount to the backend database for that category; if no input for the expense category, default $0
['PUT'] Request     -->     user can edit the amount they'd set for the expense and this should update in the database
['DELETE'] Request  -->     user can delete categories that they do not need to include when calculating their budget

*If a user edits an expense amount or deletes a category, the spend amount needs to reflect the change in the database*
- Have to get the spend amount on the backend, recalculate the spend amount by subtracting either the new edited amount AND/OR subtracting a pre-existing category's amount, 
then the new spend amount should be reflected on the UI and in the database.

*Pre-Set Expenses will have a default on $0.00 and will be calculated as floats/decimals*
    - Rent
    - Utilities
    - Shopping
    - Transportation
    - Entertainment
    - Food/Dining
    - Childcare
    - Uncategorized

*Possibly use onChange event handler to show automatic calculation of the data and change its state on the frontend and then the ability to submit the form based on the calculate total which will then send the data to the spend amount in the database??? --> Either reload the page with the new spend amount or figure out a way to automatically update the forntend to reflect the new spend amount based on the sum of the expenses*

    





# API-TESTING
...