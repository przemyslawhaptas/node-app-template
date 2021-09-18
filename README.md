# node-app-template

## Why

As I decided to leave Ruby-based backend development (I've been a Rails + React full stack developer for the last couple of years) in favour of Node, I felt I needed to come up with an example web application.

Firstly, I needed to get my hands dirty with Node, but I also needed a template I could use to jumpstart recruitment exercises. I already knew writing JavaScript on the backend is a less opinionated endeavour than doing the same in Rails, still, the number of decisions I needed to make really took me by surprise. Below is a listing of most of such decisions. Some of them were made to follow what I thought were Node community's best practices, some were made out of my feeling of how some things simply should be done, regardless of this or that tech community's practice, then some were made simply because I thought something was fun to try. They might be obvious to some and blasphemous to others but they all were supposed to serve some purpose for me personally.

I won't dive into much detail in each of them, at least not at this point, so if you want to discuss or ask me about anything, feel free to open a PR/issue and let's figure out the best possible solution together!

## How

### System architecture
  1. Backend
    * Express - a single web server
    * public endpoints serving HTML
    * public JSON API endpoints
  2. Frontend
    * None at the moment - server-rendered HTML templates only
  3. Data storage
    * PostgreSQL database

### Project architecture

  1. `/config` - a single place for configuration based on environment variables
  2. `/scripts` - console entry points utilizing use cases defined in `/src`
  3. `/src` - code divided into four layers, based on some of DDD/Clean architecture ideas:
    1. `/app`
      * joins domain and infrastructure layers to build use cases used in interfaces (eg. Express-based HTTP server or console scripts)
    2. `/domain`
      * defines business logic domain as bounded contexts
      * each bounded context may include elements such as:
          * entities - objects representing various actors in the system, specific to a given domain; often many entities in different domains may correspond to a single DB table
          * value objects - usually immutable pieces of domain logic
          * application services - perform business logic, may use repositories to sync entities with data storage
    3. `/infra`
      * handles auxiliary services/tech such as data storage
      * its `/db` directory is further divided into:
          - `/mappers` responsible for mapping domain elements to and from SQL tables
          - `/migrations` - simply containing SQL migrations
          - `/repositories` - the second only place where all the actual SQL queries and commands are defined; it encapsulates most of the DB-specific logic so that its clients only need to depend on domain elements
    4. `/interfaces`
      * encapsulates HTTP server-related logic such as Express server, middlewares, routing etc.
      * uses Express routers to keep different entry points (e.g. browser and JSON APIs) or an entry point's screens/modules separate
      * directories are usually divided into:
          - `routes` that route to controller actions
          - `controller` that defines actions that utilize domain use cases and renders views
          - `views` that define HTML view templates
      * it would be possible to define a frontend app inside this directory if one needed to keep it in the same project
  4. `/test`
    * defines test config and helpers rather than tests themselves (see _Testing_ below)

### Testing
  * I decided to try to keep tests as close to the code they cover as possible in order to better encapsulate project layers/domains/bounded contexts
  * there's no clean distinction between unit and integration/system tests at the moment but I'm wondering if it's possible that unit tests will naturally land next to domain code, integration specs next to interfaces/http code and feature specs next to use cases
  * I'm only actually accessing the database in repository specs - I set up a test DB and a database cleaner for this purpose
  * I'm stubbing all of the dependencies passed as function arguments (see _Dependency Injection_ below)
  * I'm also mocking libraries imported directly in files when it makes sense
  * I don't use any Selenium-style e2e tests at the moment

### Style
  * Dependency Injection
    - I looked at different libraries but ended up going the simplest route - passing dependencies manually as function arguments, usually in a form of a higher-order function `...deps -> ...args -> body`
    - I've had hard time naming functions defined this way, though, and ended up resorting to names such as `buildSomething` or `constructSomething`, e.g. the service `createApiKey` is exported as function `constructCreateApiKey` which, with its dependencies applied, returns function `createApiKey`. I'm not a fan of this approach but couldn't find one objectively better at this point.
  * OOO vs FP
    - in short, I'm leaning towards FP where possible
    - I don't use ES6 classes and rely heavily on higher-order-functions instead
    - I avoid making side-effects and mutating objects as much as possible, as well as using loops or functions returning elements of more than single type.
    - I try to avoid `undefined` and `nil`. Instead, I wrap optional values in `Maybe` monads.
    - I use `Either` monads for result objects, which greatly simplifies error handling ("railway-oriented programming")
    - I try to favor readability over FP purity e.g. I don't stress too much about writing point-free code and make side effects if it's really inconvenient no to
  * linting - I try to keep the style consistent by using eslint with a plethora of plugins

### Security
  * helmet for basic things
  * the JSON API is secured with a simple API key strategy - two UUIDs are generated and returned to the user in plaintext as well as persisted in the DB, with the exception that the private key is first hashed with `bcrypt`. Then, whenever a user wants to access the JSON API, they need to pass the public key in the header.

### Other project decisions
  * I decided to go with raw SQL queries - learning from the problems with using an approach such as Rails' Active Record I first wanted to decouple application models from SQL tables but then also I though using SQL directly would incline users to use it's full power (e.g. materialized views). With the SQL queries encapsulated in repositories, it doesn't leak into the whole app; I'm still using knex for it's migration features, though.
  * I used React as an HTML templating library - I know it's not a popular joice but I wanted to see if it's possible to do this easily - and it seems it is!

### Tech used
  * server:
    - express
    - nodemon
  * logging:
    - morgan
  * config:
    - dotenv
  * templates:
    - express-react-views
    - react
    - react-dom
  * security:
    - helmet
    - bcrypt
    - uuid
    - passport
    - passport-headerapikey
  * FP:
    - monet
  * HTTP:
    - body-parser
    - express-joi-validation
    - joi
  * datastore:
    - pg
    - knex
    - knex-cleaner
  * linting:
    - eslint
  * testing:
    - jest
    - supertest

### Inspirations

* https://github.com/joshuaalpuerto/node-ddd-boilerplate
* https://github.com/ktomana/iot-backend (private but deserves a public shout out!)
