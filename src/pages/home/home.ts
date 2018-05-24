import { Component, Injectable } from '@angular/core';
/*import { NavController } from 'ionic-angular';*/
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Note } from '../../model/note/note.model';

@Injectable()
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  itemsRef: AngularFireList<any>;
  items: Observable<Note[]>;
  constructor(db: AngularFireDatabase) {
    this.itemsRef = db.list('note-list');
    this.items = this.itemsRef.snapshotChanges().pipe(
       map(changes =>
         changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }
}
