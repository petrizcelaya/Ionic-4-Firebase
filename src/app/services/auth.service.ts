import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router'
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private Auth:AngularFireAuth,
    private Database:AngularFirestore,
    private router:Router
  ) { }

  isAuthenticated(){
    return this.Auth.auth.currentUser !== null;
  }

  loginUserEmail(email:string, password:string){
    this.Auth.auth.signInWithEmailAndPassword(email,password).then(user => {
      console.log(user.user.email);
      this.router.navigate(['/home']);
    }).catch(err => console.log(err.message));
  }

  createUserEmail(email:string, password:string,name:string){
    this.Auth.auth.createUserWithEmailAndPassword(email,password).then(user => {
      console.log(user.user.uid);
      const uid = user.user.uid;
      this.Database.collection('users').doc(uid).set({
        uid:uid,
        name:name,
        email:email
      }).then(()=>{
        console.log("Usuario creado correctamente");
        this.router.navigate(['/home']);
      }).catch(err => console.log(err.message));
    }).catch(err => console.log(err.message));
  }

  logout(){
    this.Auth.auth.signOut().then(() => {
      console.log("Esperamos verte pronto");
      this.router.navigate(['/login']);
    }).catch(err => console.log(err.message));
  }
}
