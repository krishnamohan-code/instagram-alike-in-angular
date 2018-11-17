import { Usuario } from './acesso/usuario.model';
import * as firebase from 'firebase';
export class Autenticacao {

  public cadastrarUsuario(usuario: Usuario): void {
    firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha);
  }
}
