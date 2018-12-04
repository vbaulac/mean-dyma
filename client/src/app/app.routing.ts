import { Route } from "@angular/router";
import { HomepageComponent } from "./homepage/homepage.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { SigninComponent } from "./auth/signin/signin.component";
import { ProfileComponent } from "./profile/profile.component";
import { AuthGuard } from "./shared/guards/auth.guard";

export const APP_ROUTES: Route[] = [
    { path: '', component: HomepageComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'profile', canActivate: [AuthGuard], component: ProfileComponent }
]