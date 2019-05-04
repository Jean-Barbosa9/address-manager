# Address Manager

## Public link to application

https://address-manager-3e841.firebaseapp.com/

## Application features

- Search for the address as soon as the zip code is fulfilled;
- If zip code is wrong, returns an info message about the error;
- Saves addresses into browsers memory, allowing persitance after page reloads.
- CRUD actions;

## Project setup

This project is using `pnpm` as package management dependency. So to install dependencies be sure to have this installed. To do this just run at your favorite terminal the command below:

```
pnpm --version
```

With pnpm install, run the command below after had cloned the repository.

```
pnpm install
```

### Compiles and hot-reloads for development

In order to simulate this application locally development purpose, run the command below:

```
pnpm run serve
```

### Compiles and minifies for production

In order to runs application correctly into the browser, it's necessary compile by running:

```
pnpm run build
```

### Run your tests

```
pnpm run test
```

### Lints and fixes files

To fix files error that is console logged after compiling, run the command below:

```
pnpm run lint
```

### Customize webpack configuration

It's possible change webpack scripts setting up it's files. If has interesting on it <a href="https://cli.vuejs.org/config/" target="_blank">follow the docs</a>.
