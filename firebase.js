// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    onSnapshot,
    getDoc,
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage, ref,uploadBytes, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwBNu8TlV4KqIwVeDvir3uuvMtLANcMRA",
  authDomain: "fir-js-crud-a72e7.firebaseapp.com",
  projectId: "fir-js-crud-a72e7",
  storageBucket: "fir-js-crud-a72e7.appspot.com",
  messagingSenderId: "559352586840",
  appId: "1:559352586840:web:2d637ee1a80eec7eff602d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

const storage = getStorage();


export const saveTask = (title, description) => {
    addDoc(collection(db, 'tasks'), { title, description });
}

export const getTasks = () => getDocs(collection(db, 'tasks'));

export const onGetTasks = (callback) => onSnapshot(collection(db, 'tasks'), callback);

export const deleteTask = (id) => deleteDoc(doc(db, 'tasks', id));

export const getTask = (id) => getDoc(doc(db, 'tasks', id));

export const updateTask = (id, newFields) =>
    updateDoc(doc(db, "tasks", id), newFields);

export const saveImage = file => {
    console.log(file);
    const storageRef = ref(storage, `images/${file.name}`);


    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', 
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //console.log('Upload is ' + progress + '% done');
        document.querySelector('.progress-bar').style.width=`${progress}%`;
      },
      (error) => {
        // Handle unsuccessful uploads
      }, 
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        // document.querySelector('#progress').value='Fin';
          console.log('File available at', downloadURL);
          document.querySelector('#image').src=downloadURL;
        });
      }
    );
    
}