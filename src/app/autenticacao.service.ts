import { Usuario } from './acesso/usuario.model';
import * as firebase from 'firebase';
export class Autenticacao {

  public cadastrarUsuario(usuario: Usuario): Promise<any> {
    return  firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha);
  }

  public autenticar(email: string, senha: string): void {
    console.log(email + ' ' + senha);
    firebase.auth().signInWithEmailAndPassword(email, senha)
      .then((resposta: any) => console.log(resposta) )
      .catch((error: Error) => console.log(error));
  }
}
