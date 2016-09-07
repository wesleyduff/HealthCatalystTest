 Health Catalyst Test for Wesley Duff

# ASP.NET MVC 6 & ASP.NET CORE w/ Code First Entity Framework

## RUN - APP

* git clone into directory
* Open solution inside VS that has 
** __ASP.NET Core__
** __Visual Studio 2015 Update 3 .NET Core 1.0.0__
** __VS 2015 Tooling Preview 2__
* [ASP.NET CORE Downloads for the Update and Tooling Preview](https://www.microsoft.com/net/core#windows)
* After the app has fully loaded
** Will require around 3 mintues or so. All of the dependencies need to be pulled down from the internet by __Bower__, __NPM__ and other package manager utilities.
* Once the solutions have loaded you can run the app __CTRL + F5__

### Run C# Unit Tests
* cd into __\test\Person.Tests__
* type : dotnet test in the terminal
* Or open the test explorer and run all tests

### Run JavaScritp Tests
* In Visual Studio : 
  - Open Task Runner Explorer
    - __select__ "Asset1.Web" from dropdown
    - Click "Test" or for Test Driven Development click "TDD"
* Inside the terminal : cd into src\Asset1 : Type in : karma start
* 
-----

# Features

* DashBoard
  - Filter by any matches in first name or last name
  - Hover over icons to view information
  - Images have an image loader before images are served from RandomMe's API
  - Responsive layout for Moblie, Tablet and Desktop
  - Dashboard gets updated instantly when new data is added by the user
  - Data is chaced when going between views
    - Keeps calls to the server to a minimum
  - Dashboard is seeded with three people on startup

## Adding People

* Validation on items marked with a __"*"__
* Validation messaging
* Validation on server side and client side
* Tabing to input data
* Placeholder data for easy usability
* event prevent default to keep from posting unwanted data and page refreshes.
* Select a photo
  - Adding photo uploading and management of file size and poor quality photos seemed out of scope. So I am just gaining access to random photos URIs and saving those to the database.
  - Photo selection easily managed
  - if you do not select a photo then a generic __Male__ or __Female__ photo will be selected for you depending upon your gender.
    - Gender is selected from your selected title.
  - Images for the image selection have a preloading image to allow the user insight on why images are not available at the moment.
- People are saved throuh an ASYNC method on the back-end

## Back-end

- __Interfaces__, __BaseClasses__, __Builder__, __Director__, __Repository__, __Composer__, __ServiceClient__ patterns put in place with separation of core platforms in their respective project assemblies.
- Code First Entity Framework put in place as part of the ASP.NET MVC 6 / ASP.NET Core implementation.
  - Migrations managed by __dotnet__ command line appliation wtih build in __migration__ support
- Unit Testing performed with XUNIT


## Front-end 

- HTML5
- CSS3 | Using LESS | Gulp to Build
- Gulp to build | combine files for LazyLoading Angular Modules
- Angular 1.5.x
- Angular UI Router
- OC.LazyLoad for loading modules only when needed
- RequireJS used for modular JavaScript dependencies
- RazorView for loading the Main Page
- ViewModels created for Controller implemtation into the View.
- __Composer__, __Builder__, __Service__, __Modules__ (in requireJS and Oc.LazyLoad), __Singleton__ patterns used.
- __Testing JavaScript__
  - Gulp script to run TDD and one off Tests within Visual Studio
  - Karam, Jasmin, requireJS used for the test runner, testing software and module loading.
- Implementation of Fontawesome, HTML5 Boiler Plate, Bootstrap, jQuery, and other frameworks.
- Implementation of raw javascript as well for Utilities (GO_GO_GADGET)





