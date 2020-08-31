import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';

import { Toolbox } from './helpers/toolbox';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
	toolbox = new Toolbox('AppComponent');

	public pages = [
		{ title: 'Home', url: '/home', icon: 'home', active: false },
		{ title: 'Storage Demo', url: '/demo', icon: 'albums', active: false },
		{ title: 'Identify Device', url: '/identify', icon: 'tablet-portrait', active: false },
		{ title: 'SQLite', url: '/sqlite', icon: 'apps', active: false }
	];

	constructor(
		private platform: Platform,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		private router: Router
	) {
		this.toolbox.log('constructor');

		this.initializeApp();
	}

	initializeApp() {
		this.toolbox.log('initializeApp');

		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
	}

	ngOnInit() {
		this.toolbox.log('ngOnInit');

		this.router.events.subscribe((event: RouterEvent) => {
			if (event instanceof NavigationEnd) {
				this.pages.map(p => {
					this.toolbox.log('ngOnInit', 'url=' + event.url + '/' + p.url);

					return (p.active = event.url === p.url);
				});
			}
		});
	}
}
