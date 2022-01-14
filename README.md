# NIU CSCI 467 E-Commerce Project

## PROJECT RULES

### Project Team
   - 4 people, other group sizes need special permission
   - Blackboard discussion board to ask/offer group memberships
   - Deadline Wednesday January 27 at 5pm

### Project specification
   - eCommerce system with web frontend, backend and DB
   - will be assigned once groups are formed

### Project deliverables
   - Use case model, due around midterm exam
   - Project demonstration, due last week of class
   - Source code

## Requirements
   - [Python 3.7+](https://www.python.org/downloads/)
   - [PostgreSQL](https://www.postgresql.org/download/)
   - [Node & NPM](https://nodejs.org/en/download/)

## Installation

The virtual environment step only needs to be done once. The pip install command
and the npm command may need to be run in the future in case we add more dependencies.

```sh
$ python -m venv .venv  # creates the python virtual environment
# WINDOWS: .venv\Scripts\activate.bat
# LINUX:   source .venv/bin/activate
$ pip install -r requirements.txt
$ npm i
```

## Development Commands

Ctrl + Shift + R or Ctrl + F5 on your browser reloads
the page and the cache. This is necessary for seeing changes
in the JavaScript.

Have two commandlines open. One of them runs the Python server and
the other will build the front end code as it's written.

```sh
$ python -m ecommerce  # starts the python web server
$ npm run build-dev    # builds the front end for serving
```