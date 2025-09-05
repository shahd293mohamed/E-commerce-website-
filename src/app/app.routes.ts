import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Faq } from './layout/faq/faq';
import { Contactus } from './layout/contactus/contactus';
import { Products } from './layout/products/products';
import { ProductDetail } from './layout/products/product-detail/product-detail';
import { Login } from './layout/login/login';
import { Dashboard } from './dashboard/dashboard';
import { authGuardGuard } from './core/gaurds/auth-guard-guard';
import { Cart } from './layout/cart/cart';
import { Carts } from './layout/carts/carts';
import { Addproduct } from './dashboard/Productcontrol/addproduct/addproduct';
import { Addcategory } from './dashboard/CategoryControl/addcategory/addcategory';
import { Getallcategories } from './dashboard/CategoryControl/getallcategories/getallcategories';
import { Getallproducts } from './dashboard/Productcontrol/getallproducts/getallproducts';
import { UpdateProduct } from './dashboard/Productcontrol/update-product/update-product';
import { GetAllorders } from './dashboard/OrdersControl/get-allorders/get-allorders';
import { GellAllmessages } from './dashboard/UsersMsg/gell-allmessages/gell-allmessages';
import { AddWebSett } from './dashboard/WebSett/add-web-sett/add-web-sett';
import { Updatesetting } from './dashboard/WebSett/updatesetting/updatesetting';
import { GetReport } from './dashboard/Report/get-report/get-report';
import { Profile } from './layout/profile/profile';
import { adminGuardGuard } from './core/gaurds/admin-guard-guard';
import { Signup } from './layout/signup/signup';
import { Home } from './layout/home/home';

export const routes: Routes = [
    {
        path: '', component: Layout, children: [
            { path: '', component: Home },
            { path: 'faq', component: Faq },
            { path: 'contactus', component: Contactus },
            { path: 'products', component: Products },
            { path: 'product/:route', component: ProductDetail },
            { path: 'login', component: Login },
            { path: 'signup', component: Signup },
            { path: 'cart', component: Carts, canActivate: [authGuardGuard] },
            { path: 'profile', component: Profile, canActivate: [authGuardGuard] },
        ]
    },

    {
        path: 'dashboard', canMatch: [adminGuardGuard], loadComponent: () => import('./dashboard/dashboard').then(d => d.Dashboard), children: [//lazy loading  ssr not csr

            { path: 'addcategory', loadComponent: () => import('./dashboard/CategoryControl/addcategory/addcategory').then(d => d.Addcategory) },
            { path: 'getcategory', loadComponent: () => import('./dashboard/CategoryControl/getallcategories/getallcategories').then(d => d.Getallcategories) },
            { path: 'addproduct', loadComponent: () => import('./dashboard/Productcontrol/addproduct/addproduct').then(d => d.Addproduct) },
            { path: 'getproduct', loadComponent: () => import('./dashboard/Productcontrol/getallproducts/getallproducts').then(d => d.Getallproducts) },
            { path: 'update-product/:id', loadComponent: () => import('./dashboard/Productcontrol/update-product/update-product').then(d => d.UpdateProduct) },
            { path: 'orders', loadComponent: () => import('./dashboard/OrdersControl/get-allorders/get-allorders').then(d => d.GetAllorders) },
            { path: 'messages', loadComponent: () => import('./dashboard/UsersMsg/gell-allmessages/gell-allmessages').then(d => d.GellAllmessages) },
            { path: 'addsettings', loadComponent: () => import('./dashboard/WebSett/add-web-sett/add-web-sett').then(d => d.AddWebSett) },
            { path: 'updatesettings', loadComponent: () => import('./dashboard/WebSett/updatesetting/updatesetting').then(d => d.Updatesetting) },
            { path: 'report', loadComponent: () => import('./dashboard/Report/get-report/get-report').then(d => d.GetReport) },
        ]
    }
];
