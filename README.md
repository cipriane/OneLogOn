# Visitor and Employee Management System
#### for Zachary Dowell at the Innovation Center

### Meet the team - OneBitOff
- Aaron Hartigan
- Victor Uvarov
- Sergey Karchmit
- Alexandru Seremet
- Mitch Manzanares
- Nicholas Dubble
- Ciprian Elies

This repository is broken into two major folders - the frontend and the backend.
It is built with a Django backend using PostgresQL and a React frontend.

# Getting Started
### Requirements
 - [Python](https://www.python.org/downloads/) (>=3 recommnded)
 - [pip](https://pip.pypa.io/en/stable/) (>=1.3 install globally)
 - [virtualenv](https://virtualenv.pypa.io/en/latest/installation/) (run `$ [sudo] pip install virtualenv`)

 You don't have to use this, but you should if you have multiple Django projects. Otherwise, all of your dependencies are installed globally and may conflict on different projects.
 - Django (run `pip install Django`)
 - [Yarn](https://yarnpkg.com/lang/en/docs/install/#windows-stable)

### Quick Start

#### 1. Get the latest version

You can start by cloning the latest version on your local machine.  
(You should set up an SSH key for your machine)
```shell
$ git clone git@github.com:cipriane/OneRegistrationOff.git
```
#### 2. Run `yarn install`

This will install both run-time project dependencies and developer tools listed
in `package.json` file.

#### 3. Run `pip install -r requirements.txt`

Activate your virtualenv first, if you have one setup. This command will install all dependencies listed in `requirements.txt`.

#### 4. Navigate to `backend` and run `python manage.py runserver`

This command will start the Django server

#### 5. Navigate to [http://127.0.0.1:8000/](http://127.0.0.1:8000/) in your browser

If everything works, you'll see the home landing page.  
Quit the server with CONTROL-C.

#### Frontend
 Creates a SPA JavaScript bundle that is served through a Django template.  
Main contributors:
 - Aaron Hartigan
 - Sergey Karchmit
 - Victor Uvarov
#### Backend
Built with Django.  
Main contributors:
- Alexandru Seremet
- Mitch Manzanares
- Nicholas Dubble
- Ciprian Elies
