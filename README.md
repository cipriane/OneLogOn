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
$ git remote add --track master upstream https://github.com/cipriane/OneLogOn
```

#### 2. Run `yarn install`

This will install both run-time project dependencies and developer tools listed
in `package.json` file.

#### 3. Setup virtualenv

To create a virtual environment, type `$ virtualenv env`.
If using Linux, type ``$ virtualenv venv -p `which python3``` Activate your virtualenv.
For Windows `PATH_TO_ENV\Scripts\activate` and for POSIX `source PATH_TO_ENV/bin/activate`.
Type `$ deactivate` to exit for both systems.

#### 4. Run `pip3 install -r requirements.txt`

This command will install all dependencies listed in `requirements.txt`.

#### 5. Run `yarn start`

This command will build the frontend bundle in development mode and automatically rebuild on file changes. This command will also start up the Django server at the same time.

#### 6. Navigate to [http://127.0.0.1:8000/](http://127.0.0.1:8000/) in your browser

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
