import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';

import { IonicStorageModule } from '@ionic/storage';

import { SQLite } from '@ionic-native/sqlite/ngx';
// import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';

import { Toolbox } from './helpers/toolbox';

import { DeveloperProvider } from './blocks/sqlite/providers/developer/provider';

@NgModule({
	declarations: [AppComponent],
	entryComponents: [],
	imports: [
		BrowserModule,
		IonicStorageModule.forRoot(),
		IonicModule.forRoot(),
		AppRoutingModule,
		HttpClientModule
	],
	providers: [
		StatusBar,
		SplashScreen,
		Toolbox,
		SQLite,
		// SQLiteObject,
		SQLitePorter,
		DeveloperProvider,
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
	],
	bootstrap: [AppComponent]
})
export class AppModule {
	toolbox = new Toolbox('AppModule');

	constructor() {
		this.toolbox.log('constructor');
	}
}
