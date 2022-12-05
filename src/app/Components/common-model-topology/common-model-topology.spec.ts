import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModelComponentTopology } from './common-model-topology';
describe('CommonModelComponent', () => {
    let component: CommonModelComponentTopology;
    let fixture: ComponentFixture<CommonModelComponentTopology>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CommonModelComponentTopology]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CommonModelComponentTopology);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
