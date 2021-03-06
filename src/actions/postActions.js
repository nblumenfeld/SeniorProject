import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
    BOOK_INITIALIZE,
    BOOK_UPDATE,
    BOOK_CREATE,
    BOOK_SAVE_SUCCESS,
    BOOK_DELETE_SUCCESS,
    CREATING_BOOK
} from './types';
import { uploadImage } from './imageActions';

export const bookInitialize = () => {
    return { 
        type: BOOK_INITIALIZE
     };
 };

export const bookUpdate = ({ prop, value }) => {
    return {
        type: BOOK_UPDATE,
        payload: { prop, value }
    };
};

export const bookCreate = ({ title, author, edition, courseId, condition, price, picture, notes }) => {
    const { currentUser } = firebase.auth();
    const email = currentUser.email;
    return(dispatch) =>{
        dispatch({type:CREATING_BOOK})
        if(picture){
            //only upload post after picture has been uploaded
            uploadImage(picture, 'image/jpeg').then(data =>{ 
                picture = data
                firebase.database().ref(`/users/${currentUser.uid}/posts`)
                .push({ title, author, edition, courseId, condition, price, picture, notes, email })
                .then((userPostReference) => {
                    firebase.database().ref(`/users/${currentUser.uid}/school`).on('value', snapshot => {
                        let userSchool = snapshot.val();
                        firebase.database().ref(`/Schools/${userSchool}/Posts`)
                        .push({ refId: userPostReference.key, title, author, edition, courseId, condition, price, picture, notes, email })
                        .then((communalPostReference) => {
                            firebase.database().ref(`/users/${currentUser.uid}/posts/${userPostReference.key}`)
                            .set({ comRefId: communalPostReference.key, title, author, edition, courseId, condition, price, picture, notes, email })
                            dispatch({ type: BOOK_CREATE })
                            Actions.pop();
                        });
                    });
                });
            });
        }
        else{
            picture='default';
            firebase.database().ref(`/users/${currentUser.uid}/posts`)
            .push({ title, author, edition, courseId, condition, price, picture, notes, email })
            .then((userPostReference) => {
                firebase.database().ref(`/users/${currentUser.uid}/school`).on('value', snapshot => {
                    let userSchool = snapshot.val();
                    firebase.database().ref(`/Schools/${userSchool}/Posts`)
                    .push({ refId: userPostReference.key, title, author, edition, courseId, condition, price, picture, notes, email })
                    .then((communalPostReference) => {
                        firebase.database().ref(`/users/${currentUser.uid}/posts/${userPostReference.key}`)
                        .set({ comRefId: communalPostReference.key, title, author, edition, courseId, condition, price, picture, notes, email })
                        dispatch({ type: BOOK_CREATE })
                        Actions.pop();
                    });
                });
            });
        };
    }
};
    
export const bookSave = ({ title, author, edition, courseId, condition, price, picture, notes, communalPostId, refId }) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/posts/${refId}`)
            .update({ title, author, edition, courseId, condition, price, picture, notes })
            .then((reference) => {
                firebase.database().ref(`/users/${currentUser.uid}/school`).on('value', snapshot => {
                    let userSchool = snapshot.val();
                    firebase.database().ref(`/Schools/${userSchool}/Posts/${communalPostId}`)
                        .update({ refId, title, author, edition, courseId, condition, price, picture, notes })
                        .then(() => {
                            dispatch({ type: BOOK_SAVE_SUCCESS });
                            Actions.pop();
                        });
                });
            });
    };
};

export const bookDelete = ({ comRefId, uid }) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/posts/${uid}`)
            .remove()
            .then(() => {
                firebase.database().ref(`/users/${currentUser.uid}/school`).on('value', snapshot => {
                    let userSchool = snapshot.val();
                    firebase.database().ref(`/Schools/${userSchool}/Posts/${comRefId}`)
                        .remove()
                        .then(() => {
                            dispatch({ type: BOOK_DELETE_SUCCESS });
                            Actions.pop();
                        });
                });
            });
    };
}

