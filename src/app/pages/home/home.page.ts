import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  rooms:any = [];
  constructor(
    private authService:AuthService,
    private roomService:RoomService
  ){}
  ngOnInit(): void {
   this.showRooms();
  }

  logOut(){
    this.authService.logout();
  }

  showRooms(){
    this.roomService.readRooms().subscribe(rooms =>{
      this.rooms = rooms;
    })
  }

  addRoom(){
    this.roomService.addRoomAlert();
  }

  updateRoom(room){
    this.roomService.updateRoomAlert(room.id,room.name);
  }

  deleteRoom(room){
    this.roomService.deleteRooms(room.id);
  }
}
