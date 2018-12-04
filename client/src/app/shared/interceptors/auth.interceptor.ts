import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";

export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next : HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('jwt');
        if (token) { // si il y a un token, on ajoute ce token au header de la requete, avant de la relancer
            const authReq = req.clone( {
                headers: req.headers.set('authorization', token)
            });
            return next.handle(authReq);
        } else { // si il n'y a pas de token la requette va continuer a s'executer sansêtre modifée
            return next.handle(req);
        }
    }
}
