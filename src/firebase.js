import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'
import * as firebase from 'firebase';
import {Redirect} from "react-router-dom";
import React from "react";

const config = {
    apiKey: "AIzaSyAfXTUNR9U2iGBsfQhNnEsd5zqf8GBh4hM",
    authDomain: "introlink-43281.firebaseapp.com",
    databaseURL: "https://introlink-43281.firebaseio.com",
    projectId: "introlink-43281",
    storageBucket: "introlink-43281.appspot.com",
    messagingSenderId: "902983528803",
    appId: "1:902983528803:web:08b456525173257dc52356",
    measurementId: "G-L9HRJGXCHV",
};

class Firebase {
	constructor() {
		app.initializeApp(config)
		this.auth = app.auth()
		this.db = app.firestore()
	}

	login(email, password) {
		this.auth.signInWithEmailAndPassword(email, password);
	}

	logout() {
		return this.auth.signOut()
	}

	addArticle(article) {
		if(!this.auth.currentUser) {
			return <Redirect to="/"/>
		}
		return  this.db.collection('/articles').add(article);
	}

	getArticles() {
		return  this.db.collection('/articles').get();
	}

	updateArticle(article) {
		return this.db.doc(`articles/${article.id}`).set(article)
	}

	deleteArticle(id) {
		return this.db.doc(`articles/${id}`).delete();
	}

	async register(name, email, password) {
		await this.auth.createUserWithEmailAndPassword(email, password)
		return this.auth.currentUser.updateProfile({
			displayName: name
		})
	}

	addQuote(quote) {
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}

		return this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).set({
			quote
		})
	}

	isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
		})
	}

	getCurrentUsername() {
		return this.auth.currentUser && this.auth.currentUser.displayName
	}

	async getCurrentUserQuote() {
		const quote = await this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).get()
		return quote.get('quote')
	}
}

export default new Firebase()