import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ClientesComponent } from './clientes.component';
import { ClienteService } from '../../services/cliente.service';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../environments/environment';

describe('ClientesComponent', () => {
  let component: ClientesComponent;
  let fixture: ComponentFixture<ClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientesComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebase)
      ],
      providers: [ ClienteService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
