import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { MyAppState } from "../store";
import { Store, select } from "@ngrx/store";
import { tokenAuthSelector } from "../store/selectors/auth.selectors";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    public token: string;

    constructor(private store:Store<MyAppState>) {
        this.store.pipe(
            select(tokenAuthSelector)
        ).subscribe( (token: string) => {
            this.token = token;
        });
    }

    intercept(req: HttpRequest<any>, next : HttpHandler): Observable<HttpEvent<any>> {
        if (this.token) { // si il y a un token, on ajoute ce token au header de la requete, avant de la relancer
            const authReq = req.clone( {
                headers: req.headers.set('authorization', this.token)
            });
            return next.handle(authReq);
        } else { // si il n'y a pas de token la requette va continuer a s'executer sansêtre modifée
            return next.handle(req);
        }
    }
}
