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
 - [Python](https://www.python.org/downloads/) (>=3 recommended)
 - [pip](https://pip.pypa.io/en/stable/) (>=1.3 install globally)
 - [virtualenv](https://virtualenv.pypa.io/en/latest/installation/) (run `$ [sudo] pip install virtualenv`)  
 You don't have to use virtualenv, but you should if you have multiple Django projects. Otherwise, all of your dependencies are installed globally and may conflict on different projects.
 - [Node](https://nodejs.org/en/download/) (Latest LTS recommended)
 - [Yarn](https://yarnpkg.com/lang/en/docs/install/#windows-stable)

### Quick Start

#### 1. Create a fork

Click on the "Fork" button.  After that, clone your repo.
(You should set up an SSH key for your machine)
```shell
$ git clone git@github.com:USERNAME/FORKED-PROJECT.git
```

Add the original project as a remote named upstream (used to easily grab changes)
```shell
$ git remote add --track master upstream https://github.com/cipriane/OneRegistrationOff
```

#### 2. Run `yarn install`

This will install both run-time project dependencies and developer tools listed
in `package.json` file.

#### 3. Run `pip install -r requirements.txt`

Activate your virtualenv first, if you have one setup. This command will install all dependencies listed in `requirements.txt`.

#### 4. Run `yarn start`

This command will build the frontend bundle in development mode and automatically rebuild on file changes. This command will also start up the Django server at the same time.

#### 5. Navigate to [http://127.0.0.1:8000/](http://127.0.0.1:8000/) in your browser

If everything works, you'll see the home landing page.
Refresh the page to see any code changes.  
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
