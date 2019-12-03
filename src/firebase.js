import firebase from 'firebase'
const config = {
    apiKey: process.env.API_KEY,
    projectId: process.env.PROJECT_ID
};
firebase.initializeApp(config);
export default firebase;