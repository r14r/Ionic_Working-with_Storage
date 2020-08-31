import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Toolbox } from './helpers/toolbox';

const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule) },
	{ path: 'demo', loadChildren: () => import('./blocks/storage/pages/demo/demo.module').then(m => m.StorageDemoPageModule) },
	{ path: 'identify', loadChildren: () => import('./blocks/reactivestorage/pages/identify-device.module').then(m => m.IdentifyDevicePageModule) },
	{ path: 'add', loadChildren: () => import('./pages/add/add.module').then(m => m.AddPageModule) },
	{ path: 'sqlite', loadChildren: () => import('./blocks/sqlite/pages/home/home.module').then(m => m.HomePageModule) },
	{ path: 'sqlite/add', loadChildren: () => import('./blocks/sqlite/pages/add/add.module').then(m => m.AddPageModule) },

	{ path: 'developers', loadChildren: () => import('./blocks/sqlite/pages/developers/developers.module').then(m => m.DevelopersPageModule) },
	{ path: 'developers/:id', loadChildren: () => import('./blocks/sqlite/pages/developers/developers.module').then(m => m.DevelopersPageModule) },
	{ path: 'developer', loadChildren: () => import('./blocks/sqlite/pages/developer/developer.module').then(m => m.DeveloperPageModule) },
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
	toolbox = new Toolbox('AppRoutingModule');

	constructor() {
		this.toolbox.log('constructor');
	}
}
