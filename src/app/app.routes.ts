import { Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';

export const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: 'country',
        loadChildren: () => import('./country/routes/country.routes').then(c => c.countryRoutes),
    },
    {
        //Another approach is to create a 404 not found component and redirect the user
        path: "**",
        redirectTo: ''
    }
];
