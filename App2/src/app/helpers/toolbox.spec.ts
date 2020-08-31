import { TestBed } from '@angular/core/testing';

import { Toolbox } from './toolbox';

describe('Toolbox', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: Toolbox = TestBed.get(Toolbox);
		expect(service).toBeTruthy();
	});
});
