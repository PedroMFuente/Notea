import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Nota } from 'src/app/model/nota';
import { NotasService } from 'src/app/services/notas.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-edit-nota',
  templateUrl: './edit-nota.page.html',
  styleUrls: ['./edit-nota.page.scss'],
})
export class EditNotaPage {

  @Input('nota') nota: Nota;

  public tasks: FormGroup;

  constructor(private utilities:UtilitiesService, private formBuilder: FormBuilder, private notasS: NotasService, private modalController: ModalController) {
    this.tasks = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      //email:[this.authS.user.email]
    });
  }

  ionViewDidEnter(){
    this.tasks.get('title').setValue(this.nota.titulo);
    this.tasks.get('description').setValue(this.nota.texto)

  }

  public async sendForm() {
    await this.utilities.presentLoading();
    let data: Nota = {
      titulo: this.tasks.get('title').value,
      texto: this.tasks.get('description').value,
      email: this.nota.email
    }
    this.notasS.actualizaNota(this.nota.id, data).then((respuesta) => {
      this.utilities.loadingController.dismiss();
      this.utilities.presentToast(this.utilities.traducctionphrase("SAVENOTE"), "success");
      this.modalController.dismiss();
    }).catch((err) => {
      this.utilities.loadingController.dismiss();
      this.utilities.presentToast(this.utilities.traducctionphrase("ERRORSN"), "danger");
      console.log(err);
    });
  }

}
