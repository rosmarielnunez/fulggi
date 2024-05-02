import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail, AuthErrorCodes } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loggedIn: boolean = false;

  constructor(private auth: Auth ) { }

  register({email, password}: any){
    return createUserWithEmailAndPassword(this.auth, email, password)
    .catch(error => this.handleError(error));
  }

  login({email, password}: any){
    this.loggedIn = true;
    return signInWithEmailAndPassword(this.auth, email, password)
    .catch(error => this.handleError(error));
  }

  loginWithGoogle(){
    return signInWithPopup(this.auth, new GoogleAuthProvider())
    .catch(error => this.handleError(error));
  }

  logout(){
    this.loggedIn = false;
    console.log(Response)
    return signOut(this.auth);
  
  }

  isLoggetIn(): boolean {
    return this.loggedIn;
  }

  async recoverPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
      console.log('Contraseña recuperada con éxito');
    } catch (error) {
      console.error('Error al recuperar la contraseña:', error);
      throw this.handleError(error); 
    }
  }

  private handleError(error: any): Promise<any> {
    const errorCode = error?.code || 'unknown-error';
    const errorMessage = this.getErrorMessage(errorCode);
    return Promise.reject(errorMessage);
  }

  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case AuthErrorCodes.EMAIL_EXISTS:
        return 'El correo electrónico ya está en uso.';
      case AuthErrorCodes.WEAK_PASSWORD:
        return 'La contraseña debe tener al menos 6 caracteres.';
      case AuthErrorCodes.INVALID_EMAIL:
        return 'Correo electrónico inválido.';
      default:
        return 'Error desconocido al autenticar.';
    }
  }
  
}
