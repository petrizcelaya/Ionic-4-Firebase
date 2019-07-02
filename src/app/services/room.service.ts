import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(
    private Database:AngularFirestore,
    public alertController: AlertController,
    public toastController: ToastController
  ) { }
  DBRef = this.Database.collection('rooms');
  
  createRoom(name:string){
    this.DBRef.add({
      name:name,
      status:true
    }).then(() =>{
      this.showToast("Room creado correctamente");
    }).catch(err => console.log(err.message));
  }

  readRooms(){
   return this.DBRef.snapshotChanges().pipe(map(rooms => {
      return rooms.map(room => {
        const data = room.payload.doc.data();
        const id = room.payload.doc.id;
        return {id,...data};
      })
    }))
  }

  updateRooms(id:string,name:string){
    this.DBRef.doc(id).update({
      name:name
    })
  }

  deleteRooms(id:string){
    this.DBRef.doc(id).delete().then(()=>{
      this.showToast("elemento eliminado correctamente");
    }).catch(err => console.log(err.message));
  }

  //Components:
  async addRoomAlert() {
    const alert = await this.alertController.create({
      header: 'Add New Room',
      inputs: [
        {
          name: 'nameRoom',
          type: 'text',
          placeholder: 'Name Room'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (name) => {
            console.log(name.nameRoom);
            this.createRoom(name.nameRoom);
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }
  
  async updateRoomAlert(id:string,name:string) {
    console.log(id);
    const alert = await this.alertController.create({
      header: 'Update Room',
      inputs: [
        {
          name: 'nameRoom',
          type: 'text',
          value: name
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (name) => {
            this.updateRooms(id,name.nameRoom);
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

  async showToast(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}
