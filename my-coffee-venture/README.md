# MyCoffeeVenture by Andrew Nguyen

View our lovely founders who made this happen!

![image](https://user-images.githubusercontent.com/74166827/144359258-7dc448b8-e5da-4531-bbe6-e2ad50d021a3.png)


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.1.

This is the front-end of the project. 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Understand the code

### Go to my-coffee-venture -> src -> app 

app-routing.module.ts is the main routing module for the project. Each module is lazy-loaded, meaning that you will only load specific module once you access the component within the module.

app.component.html contains the router to allow the project to access modules.

### module folder stores all general components for the app.  


## Elevator pitch

This is the platform for coffee lovers - currently targeting Vietnamese enthusiasts - to write journals of their coffee experience, review cafes that they have been to, and choose a cafe that serves their need best based on our list of available cafes!


## Walk through!

### This is the sign in page with JWT authentication! 

Don't worry, your password will be hashed and even us don't know the password!

If you don't have an account, please click register! You will explore more functions as you become an user!

![image](https://user-images.githubusercontent.com/74166827/144357963-bd50bed5-2994-43b0-8dbc-70c6dbefb664.png)

### This is your user page!

Share your journals with our unqique calendar to track your journey!

![image](https://user-images.githubusercontent.com/74166827/144358662-48a154f1-0d35-4c29-8571-02ed56ada500.png)


### List shops!

View our list of wonderful shops that you can explore and select based on your purpose!

![image](https://user-images.githubusercontent.com/74166827/144358801-127ead0c-ce0b-4e87-9bd2-98f5227d3bde.png)

Click on a shop to view reviews and beautiful images, and write a review too.

![image](https://user-images.githubusercontent.com/74166827/144359067-8b8da6b3-c069-48b1-abcb-7a255727816c.png)

View your customized list of favorite shops! Such a convenient way to view your favorite shops whenever you want!

![image](https://user-images.githubusercontent.com/74166827/144359216-2dbf017a-c115-48d2-8d57-87e3cb1b7bed.png)

### View what other people are doing with our forum!

![image](https://user-images.githubusercontent.com/74166827/144359529-473aa68b-d21e-40d0-859c-d441d8324bc5.png)


Hope you enjoy our product! If you want to understand more how the back-end works, please visit our back-end repository.