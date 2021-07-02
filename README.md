# Interested in working for Famly?

Give us a chance to see your beautiful code! 🤩

How to get started:
- Fork this repository
- Create a small application in React (or another agreed upon framework)
- Describe your design decisions and setup instructions in the README.md of the forked repository

The application should be able to do 3 things:
1. List children with some form of pagination/lazy-loading/infinite-scroll
2. Checkin a child
3. Checkout a child

There are no other requirements than that—don't worry about design or anything like that.

If you have any questions feel free to reach out to ckl@famly.co (Christian) or ab@famly.co (Adam) ☺️

## API Specification

Use this access token: `234ffdb8-0889-4be3-b096-97ab1679752c`

### Fetch some children from

The API does not support any limit or offset, so the pagination/lazy-loading/infinite-scroll will have to be done client-side only.

```
GET https://tryfamly.co/api/daycare/tablet/group
Arguments: {
	accessToken: <accessToken>,
	groupId: '11fc220c-ebba-4e55-9346-cd1eed714620',
	institutionId: 'fb6c8114-387e-4051-8cf7-4e388a77b673'
}
```

Example in cURL:

```bash
$ curl "https://tryfamly.co/api/daycare/tablet/group?accessToken=234ffdb8-0889-4be3-b096-97ab1679752c&groupId=11fc220c-ebba-4e55-9346-cd1eed714620&institutionId=fb6c8114-387e-4051-8cf7-4e388a77b673"
```

### Checkin child
```
POST https://tryfamly.co/api/v2/children/<childId>/checkins

Arguments: {
	accessToken: <accessToken>
	pickupTime: 16:00
}
```

Example in cURL:

```bash
$ curl \
  -d 'accessToken=234ffdb8-0889-4be3-b096-97ab1679752c&pickupTime=16:00' \
  https://tryfamly.co/api/v2/children/fcd683d0-bc31-468c-948f-1ca70b91439d/checkins
```

### Checkout child
```
POST https://tryfamly.co/api/v2/children/<childId>/checkout
Arguments: {
	accessToken: <accessToken>
}
```

Example in cURL:

```bash
$ curl \
  -d 'accessToken=234ffdb8-0889-4be3-b096-97ab1679752c' \
  https://tryfamly.co/api/v2/children/fcd683d0-bc31-468c-948f-1ca70b91439d/checkout
```


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
